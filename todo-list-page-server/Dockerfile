ARG NODE_VERSION
FROM node:${NODE_VERSION}-slim

RUN apt update && apt install dumb-init

ENV NODE_ENV=production
USER node
WORKDIR /app

COPY --chown=node:node package*.json ./
RUN --mount=type=secret,id=npmrc,mode=0644,dst=/app/.npmrc npm ci --production && \
    npm cache clear --force
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./dist ./dist

EXPOSE 80
ENV PORT=80

ENTRYPOINT ["dumb-init", "--", "node", "src/run-todo-list-page-server-server.js"]
