FROM node:16.13.0-alpine3.13

WORKDIR /app

RUN apk update && \
    apk upgrade && \
    npm install -g npm && \
    npm install -g @vue/cli
