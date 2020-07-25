FROM node:12-alpine

WORKDIR /usr/src/app

ADD . .

RUN yarn install

CMD [ "yarn", "start" ]
EXPOSE 3000