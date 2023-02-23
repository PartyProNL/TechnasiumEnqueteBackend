FROM node:16.9.1-alpine as build-container
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
RUN npm ci
COPY server ./src
RUN npm run build
FROM node:16.9.1-alpine as production-container
WORKDIR /usr/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --only=production
RUN npm install pm2 -g
COPY --from=build-container /usr/app/dist .
EXPOSE 5555
ENV NODE_ENV=production
CMD ["pm2-runtime","app.js"]