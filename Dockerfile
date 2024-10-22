FROM node:16-alpine as base

ARG APP_PORT
EXPOSE ${APP_PORT}

WORKDIR /app
COPY . .
RUN yarn

FROM base as production

RUN yarn build && npm prune --omit=dev --force && rm package-lock.json
CMD ["node", "dist/main"]
