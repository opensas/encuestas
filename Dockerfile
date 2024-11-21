FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json .
COPY eslint.config.js .
COPY svelte.config.js .
COPY tsconfig.json .
RUN pnpm install 
RUN pnpm check:all
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
