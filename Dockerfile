# specify the node base image with your desired version node:<version>
FROM node:18

RUN mkdir - p /home/application

COPY . /home/app

# replace this with your application's default port
EXPOSE 3000

CMD ["node", "/home/app/index.js"]
