"use client";

import { useEffect, useMemo, useState } from "react";
import { contentSchema, type Field, type ListDef } from "@/lib/contentSchema";
import { HiOutlineChevronDown, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi2";

const fieldCls =
  "w-full rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:border-urblue-600 focus:ring-2 focus:ring-urblue-600/15";
const btnPrimary =
  "rounded-lg bg-urblue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-urblue-700 disabled:opacity-50";
const btnGhost =
  "inline-flex items-center gap-1.5 rounded-lg border border-mist-200 px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-urblue-600/40 hover:text-urblue-600";

type Dict = Record<string, unknown>;

async function api(path: string, key: string, init?: RequestInit) {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
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

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "lines") {
    const text = Array.isArray(value) ? (value as string[]).join("\n") : "";
    return (
      <div>
        <label className="mb-1 block text-xs font-medium text-ink-600">{field.label}</label>
        <textarea
          rows={Math.max(2, text.split("\n").length)}
          value={text}
          onChange={(e) =>
            onChange(e.target.value.split("\n").map((l) => l.trimEnd()).filter((l, i, a) => l !== "" || i < a.length - 1))
          }
          className={`${fieldCls} resize-y`}
        />
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className="mb-1 block text-xs font-medium text-ink-600">{field.label}</label>
        <textarea
          rows={3}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldCls} resize-y`}
        />
      </div>
    );
  }
  if (field.type === "number") {
    return (
      <div>
        <label className="mb-1 block text-xs font-medium text-ink-600">{field.label}</label>
        <input
          type="number"
          value={value === undefined || value === null ? "" : (value as number)}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={fieldCls}
        />
      </div>
    );
  }
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink-600">{field.label}</label>
      <input
        type="text"
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={fieldCls}
      />
    </div>
  );
}

function ListEditor({
  def,
  items,
  onChange,
}: {
  def: ListDef;
  items: Dict[];
  onChange: (next: Dict[]) => void;
}) {
  const update = (idx: number, key: string, v: unknown) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: v } : it));
    onChange(next);
  };
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () => {
    const blank: Dict = {};
    for (const f of def.item) blank[f.key] = f.type === "number" ? 0 : f.type === "lines" ? [] : "";
    onChange([...items, blank]);
  };
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-mist-200 bg-mist-50/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{def.label}</p>
      <div className="mt-3 space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-lg border border-mist-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink-400">
                {def.itemNoun} {idx + 1}
              </span>
              <div className="flex items-center gap-1">
                <button onClick={() => move(idx, -1)} className="rounded p-1 text-ink-400 hover:bg-mist-50 hover:text-ink-700" aria-label="Move up" type="button">↑</button>
                <button onClick={() => move(idx, 1)} className="rounded p-1 text-ink-400 hover:bg-mist-50 hover:text-ink-700" aria-label="Move down" type="button">↓</button>
                <button onClick={() => remove(idx)} className="rounded p-1 text-ink-400 hover:bg-red-50 hover:text-red-500" aria-label="Remove" type="button">
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {def.item.map((f) => (
                <div key={f.key} className={f.type === "textarea" || f.type === "lines" ? "sm:col-span-2" : ""}>
                  <FieldInput field={f} value={it[f.key]} onChange={(v) => update(idx, f.key, v)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} type="button" className={`${btnGhost} mt-3`}>
        <HiOutlinePlus /> Add {def.itemNoun}
      </button>
    </div>
  );
}

export default function ContentManager({ adminKey }: { adminKey: string }) {
  const [content, setContent] = useState<Record<string, Dict> | null>(null);
  const [open, setOpen] = useState<string | null>(contentSchema[0].key);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setMsg("Could not load content"));
  }, []);

  const setField = (section: string, key: string, v: unknown) => {
    setContent((c) => (c ? { ...c, [section]: { ...c[section], [key]: v } } : c));
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMsg("");
    try {
      await api("/api/content", adminKey, { method: "PUT", body: JSON.stringify(content) });
      setMsg("Saved. The website updates within a few seconds.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const bar = useMemo(
    () => (
      <div className="sticky top-16 z-10 -mx-1 mb-4 flex items-center gap-3 rounded-xl border border-mist-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button onClick={save} disabled={saving || !content} className={btnPrimary}>
          {saving ? "Saving…" : "Save all changes"}
        </button>
        {msg && <span className="text-xs text-ink-500">{msg}</span>}
      </div>
    ),
    [saving, content, msg]
  );

  if (!content) return <p className="text-sm text-ink-400">Loading…</p>;

  return (
    <div>
      {bar}
      <p className="mb-4 text-sm text-ink-600">
        Edit any text, number or list on the public website. Click a section to open it, make your
        changes, then press <span className="font-semibold">Save all changes</span>.
      </p>
      <div className="space-y-3">
        {contentSchema.map((section) => {
          const data = content[section.key] || {};
          const isOpen = open === section.key;
          return (
            <div key={section.key} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : section.key)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left"
              >
                <span className="font-display text-[15px] font-semibold text-ink-900">
                  {section.title}
                </span>
                <HiOutlineChevronDown
                  className={`text-ink-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-mist-200 p-5">
                  {section.blurb && (
                    <p className="mb-4 rounded-lg bg-urblue-50/60 px-3 py-2 text-xs text-ink-600">
                      {section.blurb}
                    </p>
                  )}
                  {section.fields && section.fields.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.fields.map((f) => (
                        <div key={f.key} className={f.type === "textarea" || f.type === "lines" ? "sm:col-span-2" : ""}>
                          <FieldInput
                            field={f}
                            value={data[f.key]}
                            onChange={(v) => setField(section.key, f.key, v)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {section.lists && section.lists.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {section.lists.map((def) => (
                        <ListEditor
                          key={def.key}
                          def={def}
                          items={(data[def.key] as Dict[]) || []}
                          onChange={(next) => setField(section.key, def.key, next)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5">{bar}</div>
    </div>
  );
}
