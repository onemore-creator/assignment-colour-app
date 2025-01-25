FROM node:23-alpine3.20

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]

CMD []
