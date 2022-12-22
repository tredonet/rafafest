FROM node:16 as base
WORKDIR /workdir
COPY . .
RUN npm i
RUN npm run build
RUN cd apps/frontend && npm run build-only
RUN cp -r apps/frontend/dist apps/backend/public
RUN npm i -g pkg
RUN pkg apps/backend -o bin/rafafest -t node16-linux

# FROM alpine
# WORKDIR /app
# COPY --from=base /workdir/bin/rafafest /app
# # ENTRYPOINT ["/app/rafafest"]
