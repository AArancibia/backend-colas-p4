FROM node:12.22.12
LABEL authors="aarancis"

EXPOSE 4000
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:local"]
