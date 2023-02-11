FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .

ENV PORT=4000
EXPOSE ${PORT}

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres
ENV POSTGRES_PORT=5432


CMD [ "npm","start" ]