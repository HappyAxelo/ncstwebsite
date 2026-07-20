"use client";

import { useCallback, useEffect, useState } from "react";
import type { Collaborator, NewsItem, Partner, Settings } from "@/lib/store";
import { HiOutlineTrash, HiOutlinePencil, HiOutlinePhoto } from "react-icons/hi2";

const fieldCls =
  "w-full rounded-lg border border-mist-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:border-urblue-600 focus:ring-2 focus:ring-urblue-600/15";

const btnPrimary =
  "rounded-lg bg-urblue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-urblue-700 disabled:opacity-50";
const btnGhost =
  "rounded-lg border border-mist-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-urblue-600/40 hover:text-urblue-600";

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function api(path: string, key: string, init?: RequestInit) {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      "x-admin-key": key,
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

function ImagePicker({
  value,
  onChange,
  adminKey,
  label,
}: {
  value?: string;
  onChange: (url: string | undefined) => void;
  adminKey: string;
  label: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (file: File) => {
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { url } = await api("/api/upload", adminKey, { method: "POST", body: fd });
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-14 w-14 rounded-lg object-cover ring-1 ring-mist-200" />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-mist-50 text-xl text-ink-400 ring-1 ring-mist-200">
            <HiOutlinePhoto />
          </span>
        )}
        <div className="flex flex-col gap-1.5">
          <label className={`${btnGhost} cursor-pointer text-center text-xs`}>
            {busy ? "Uploading…" : label}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
                e.target.value = "";
              }}
            />
          </label>
          {value && (
            <button type="button" onClick={() => onChange(undefined)} className="text-xs text-red-500 hover:underline">
              Remove image
            </button>
          )}
        </div>
      </div>
      {err && <p className="mt-1.5 text-xs text-red-500">{err}</p>}
    </div>
  );
}

/* ---------------- news manager ---------------- */

const emptyNews = { id: "", title: "", date: today(), body: "", image: undefined as string | undefined };

function NewsManager({ adminKey }: { adminKey: string }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(emptyNews);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setItems(await api("/api/news", adminKey));
  }, [adminKey]);

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editing) {
        await api("/api/news", adminKey, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await api("/api/news", adminKey, { method: "POST", body: JSON.stringify(form) });
      }
      setForm(emptyNews);
      setEditing(false);
      await load();
      setMsg("Saved.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this news item?")) return;
    await api(`/api/news?id=${id}`, adminKey, { method: "DELETE" });
    await load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={submit} className="card h-fit space-y-3.5 p-6">
        <h2 className="font-display text-base font-semibold text-ink-900">
          {editing ? "Edit news item" : "Add news"}
        </h2>
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={fieldCls}
        />
        <input
          required
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className={fieldCls}
        />
        <textarea
          required
          rows={6}
          placeholder="Body text"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className={`${fieldCls} resize-none`}
        />
        <ImagePicker
          value={form.image}
          onChange={(image) => setForm({ ...form, image })}
          adminKey={adminKey}
          label="Upload image (optional)"
        />
        <div className="flex items-center gap-2 pt-1">
          <button type="submit" className={btnPrimary}>
            {editing ? "Save changes" : "Publish"}
          </button>
          {editing && (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setForm(emptyNews);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          )}
          {msg && <span className="text-xs text-ink-400">{msg}</span>}
        </div>
      </form>

      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-ink-400">No news yet.</p>}
        {items.map((n) => (
          <div key={n.id} className="card flex items-start gap-4 p-4">
            {n.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={n.image} alt="" className="h-16 w-16 rounded-lg object-cover ring-1 ring-mist-200" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink-400">{n.date}</p>
              <p className="truncate text-sm font-semibold text-ink-900">{n.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-ink-600">{n.body}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button
                onClick={() => {
                  setForm({ ...emptyNews, ...n });
                  setEditing(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-md p-2 text-ink-400 hover:bg-mist-50 hover:text-urblue-600"
                aria-label="Edit"
              >
                <HiOutlinePencil />
              </button>
              <button
                onClick={() => remove(n.id)}
                className="rounded-md p-2 text-ink-400 hover:bg-red-50 hover:text-red-500"
                aria-label="Delete"
              >
                <HiOutlineTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- collaborators manager ---------------- */

const emptyCollab = {
  id: "",
  name: "",
  role: "Co-Principal Investigator",
  org: "University of Rwanda",
  photo: undefined as string | undefined,
};

function CollabManager({ adminKey }: { adminKey: string }) {
  const [items, setItems] = useState<Collaborator[]>([]);
  const [form, setForm] = useState(emptyCollab);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setItems(await api("/api/collaborators", adminKey));
  }, [adminKey]);

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editing) {
        await api("/api/collaborators", adminKey, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await api("/api/collaborators", adminKey, { method: "POST", body: JSON.stringify(form) });
      }
      setForm(emptyCollab);
      setEditing(false);
      await load();
      setMsg("Saved.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this collaborator?")) return;
    await api(`/api/collaborators?id=${id}`, adminKey, { method: "DELETE" });
    await load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={submit} className="card h-fit space-y-3.5 p-6">
        <h2 className="font-display text-base font-semibold text-ink-900">
          {editing ? "Edit collaborator" : "Add collaborator"}
        </h2>
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={fieldCls}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className={fieldCls}
        >
          <option>Principal Investigator</option>
          <option>Co-Principal Investigator</option>
          <option>Researcher</option>
          <option>Postgraduate Student</option>
        </select>
        <select
          value={form.org}
          onChange={(e) => setForm({ ...form, org: e.target.value })}
          className={fieldCls}
        >
          <option>University of Rwanda</option>
          <option>University of Malawi</option>
          <option>Industry Partner</option>
        </select>
        <ImagePicker
          value={form.photo}
          onChange={(photo) => setForm({ ...form, photo })}
          adminKey={adminKey}
          label="Upload photo"
        />
        <div className="flex items-center gap-2 pt-1">
          <button type="submit" className={btnPrimary}>
            {editing ? "Save changes" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setForm(emptyCollab);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          )}
          {msg && <span className="text-xs text-ink-400">{msg}</span>}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((c) => (
          <div key={c.id} className="card flex items-center gap-4 p-4">
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.photo} alt="" className="h-12 w-12 rounded-lg object-cover ring-1 ring-mist-200" />
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-urblue-50 text-sm font-semibold text-urblue-600">
                {c.name
                  .replace(/^Dr\.?\s+/i, "")
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{c.name}</p>
              <p className="text-xs text-ink-600">
                {c.role} · {c.org}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button
                onClick={() => {
                  setForm({ ...emptyCollab, ...c });
                  setEditing(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-md p-2 text-ink-400 hover:bg-mist-50 hover:text-urblue-600"
                aria-label="Edit"
              >
                <HiOutlinePencil />
              </button>
              <button
                onClick={() => remove(c.id)}
                className="rounded-md p-2 text-ink-400 hover:bg-red-50 hover:text-red-500"
                aria-label="Delete"
              >
                <HiOutlineTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- partners manager ---------------- */

const emptyPartner = { id: "", name: "", type: "" };

function PartnersManager({ adminKey }: { adminKey: string }) {
  const [items, setItems] = useState<Partner[]>([]);
  const [form, setForm] = useState(emptyPartner);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    setItems(await api("/api/partners", adminKey));
  }, [adminKey]);

  useEffect(() => {
    load().catch(() => {});
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      if (editing) {
        await api("/api/partners", adminKey, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await api("/api/partners", adminKey, { method: "POST", body: JSON.stringify(form) });
      }
      setForm(emptyPartner);
      setEditing(false);
      await load();
      setMsg("Saved.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this partner?")) return;
    await api(`/api/partners?id=${id}`, adminKey, { method: "DELETE" });
    await load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={submit} className="card h-fit space-y-3.5 p-6">
        <h2 className="font-display text-base font-semibold text-ink-900">
          {editing ? "Edit partner" : "Add partner"}
        </h2>
        <input
          required
          placeholder="Partner name (e.g. African Improved Foods)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={fieldCls}
        />
        <input
          required
          placeholder="Type (e.g. Industry partner, Rwanda)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className={fieldCls}
        />
        <div className="flex items-center gap-2 pt-1">
          <button type="submit" className={btnPrimary}>
            {editing ? "Save changes" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                setForm(emptyPartner);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          )}
          {msg && <span className="text-xs text-ink-400">{msg}</span>}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="card flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{p.name}</p>
              <p className="text-xs text-ink-600">{p.type}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button
                onClick={() => {
                  setForm({ ...p });
                  setEditing(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-md p-2 text-ink-400 hover:bg-mist-50 hover:text-urblue-600"
                aria-label="Edit"
              >
                <HiOutlinePencil />
              </button>
              <button
                onClick={() => remove(p.id)}
                className="rounded-md p-2 text-ink-400 hover:bg-red-50 hover:text-red-500"
                aria-label="Delete"
              >
                <HiOutlineTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- site text manager ---------------- */

function SettingsManager({ adminKey }: { adminKey: string }) {
  const [form, setForm] = useState<Settings | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api("/api/settings", adminKey).then(setForm).catch(() => {});
  }, [adminKey]);

  if (!form) return <p className="text-sm text-ink-400">Loading…</p>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    try {
      await api("/api/settings", adminKey, { method: "PUT", body: JSON.stringify(form) });
      setMsg("Saved. The site updates right away.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed to save");
    }
  };

  return (
    <form onSubmit={submit} className="card max-w-3xl space-y-4 p-6">
      <h2 className="font-display text-base font-semibold text-ink-900">Site text</h2>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">
          Homepage headline
        </label>
        <textarea
          rows={2}
          value={form.heroTitle}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          className={`${fieldCls} resize-none`}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">
          Homepage subheading
        </label>
        <textarea
          rows={3}
          value={form.heroSubtitle}
          onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
          className={`${fieldCls} resize-none`}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">
          "The problem" paragraph (homepage)
        </label>
        <textarea
          rows={4}
          value={form.aboutText}
          onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
          className={`${fieldCls} resize-none`}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-600">
          Contact email (contact form sends here)
        </label>
        <input
          type="email"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          className={fieldCls}
        />
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button type="submit" className={btnPrimary}>
          Save site text
        </button>
        {msg && <span className="text-xs text-ink-400">{msg}</span>}
      </div>
    </form>
  );
}

/* ---------------- page ---------------- */

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState<"news" | "team" | "partners" | "settings">("news");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-key");
    if (saved) {
      setKey(saved);
      setEntered(true);
    }
  }, []);

  const enter = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // verify the key against a protected endpoint
      await api("/api/news", key, { method: "PUT", body: JSON.stringify({ id: "__check__" }) });
    } catch (err) {
      const m = err instanceof Error ? err.message : "";
      if (m.includes("Unauthorized")) {
        setError("Wrong admin key.");
        return;
      }
      // 404 "Not found" means the key was accepted
    }
    sessionStorage.setItem("admin-key", key);
    setEntered(true);
  };

  if (!entered) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist-50 px-6 pt-16">
        <form onSubmit={enter} className="card w-full max-w-sm p-8">
          <h1 className="font-display text-lg font-semibold text-ink-900">Admin access</h1>
          <p className="mt-1 text-sm text-ink-600">Enter the admin key to manage news and the team.</p>
          <input
            type="password"
            autoFocus
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={`${fieldCls} mt-4`}
          />
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          <button type="submit" className={`${btnPrimary} mt-4 w-full`}>
            Continue
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist-50 pb-20 pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink-900">Site admin</h1>
            <p className="mt-1 text-sm text-ink-600">
              Manage news and collaborators. Changes appear on the site immediately.
            </p>
          </div>
          <button
            className={btnGhost}
            onClick={() => {
              sessionStorage.removeItem("admin-key");
              setEntered(false);
              setKey("");
            }}
          >
            Sign out
          </button>
        </div>

        <div className="mt-6 flex w-fit flex-wrap gap-1 rounded-lg bg-white p-1 ring-1 ring-mist-200">
          {(
            [
              ["news", "News"],
              ["team", "Collaborators"],
              ["partners", "Partners"],
              ["settings", "Site text"],
            ] as const
          ).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t ? "bg-urblue-600 text-white" : "text-ink-600 hover:text-urblue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "news" && <NewsManager adminKey={key} />}
          {tab === "team" && <CollabManager adminKey={key} />}
          {tab === "partners" && <PartnersManager adminKey={key} />}
          {tab === "settings" && <SettingsManager adminKey={key} />}
        </div>
      </div>
    </div>
  );
}
