FROM node:20-alpine as builder

RUN apk add --no-cache libc6-compat

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/

COPY package.json package-lock.json ./
RUN npm install --force sharp --production=true

COPY . .

RUN npm run build

FROM node:20-alpine as production

WORKDIR /app/

COPY --from=builder /app/package.json ./
RUN npm install --force sharp --production=true

FROM node:20-alpine

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /app/

COPY --from=production /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/jsconfig.json ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/.env.local ./

EXPOSE 3000
CMD ["npm", "run", "start"]
