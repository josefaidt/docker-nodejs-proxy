FROM node:12
ENV NODE_VERSION 12.13.0
ENV app /usr/src/app
WORKDIR ${app}

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY index.js ./

EXPOSE 3000
CMD ["yarn", "start:prod"]`