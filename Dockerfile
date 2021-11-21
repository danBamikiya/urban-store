FROM node:14-slim AS base

WORKDIR /app

# make non-root user 'node' the owner of WORKDIR
RUN chown -R node:node /app

COPY --chown=node:node ./package*.json ./


###################### dev environment ######################
FROM base AS ui-dev

WORKDIR /app

COPY --from=base --chown=node:node /app /app

RUN npm i

COPY --chown=node:node . .

USER node

EXPOSE 4050

ENTRYPOINT ["npm", "start"]


###################### prod environment ######################
FROM base AS build

WORKDIR /app

COPY --from=base --chown=node:node /app /app

RUN ci

COPY --chown=node:node . .

USER node

RUN npm build


###################### web server environment ######################
# nginx as a web server for production build
FROM nginx:1.18-alpine as ui-build

# remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# copy production build to nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE $PORT

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'