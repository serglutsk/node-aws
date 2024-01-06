FROM node:latest

RUN mkdir -p /aws/app
WORKDIR /aws

COPY package.json /aws
COPY app /aws/app
COPY database /aws
COPY middlewares /aws
COPY routes /aws

RUN npm install --omit=dev

EXPOSE 3000/tcp

CMD ["npm", "run", "start"]