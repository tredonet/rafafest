FROM node:16 as base
WORKDIR /workdir
COPY . .
RUN npm i
RUN npm run build
RUN cd apps/frontend && npm run build-only
RUN cp -r apps/frontend/dist apps/backend/public
RUN mkdir apps/backend/public/templates
RUN cp apps/backend/src/utils/email.html apps/backend/public/templates
RUN npm i -g pkg
RUN cd apps/backend && pkg .

FROM ubuntu:22.04
WORKDIR /app
COPY --from=base /workdir/apps/backend/bin/backend /app/rafafest
ENTRYPOINT ["/app/rafafest"]
