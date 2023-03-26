FROM node:18.12.1
WORKDIR /app/sfl-front
COPY package.json ./
RUN yarn config set network-timeout 300000
RUN yarn
COPY . .
RUN yarn build
ENV NODE_ENV production
EXPOSE 3000
CMD [ "npx", "serve", "build" ]