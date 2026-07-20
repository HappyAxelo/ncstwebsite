# Production image for the research project website
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
# admin data (news, collaborators, partners, settings, uploads) lives in /app/data
# mount a persistent volume there so content survives redeploys
VOLUME ["/app/data"]
EXPOSE 3000
CMD ["npm", "start"]
