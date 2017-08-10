FROM node:boron

WORKDIR /app/project

COPY . /app/project



EXPOSE 3000

ENTRYPOINT ["npm", "start"]
