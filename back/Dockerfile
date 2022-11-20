FROM node
WORKDIR /back
COPY ./package.json ./
COPY . .
RUN npm install
EXPOSE 8000
CMD node App.js

