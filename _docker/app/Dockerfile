ARG NODE_VERSION=node:22.1.0

FROM $NODE_VERSION AS builder

WORKDIR /usr/src/app

ENV PATH /usr/src/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 5173 5177

CMD ["sh", "-c", "npm run dev"]