FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DATABASE_URL="postgres://postgres:52643F*-gDdCGDGbcgB*B6Ebd32D4Baf@viaduct.proxy.rlwy.net:25606/railway"

COPY .env.local .env.local

CMD npm run dev