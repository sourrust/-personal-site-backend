FROM node:10.18.0-alpine

# Create a work space for running application and copy all files into
# that work space.
ADD . /opt/backend
WORKDIR /opt/backend

# Install needed dependencies for the building of the strapi application
RUN apk update
RUN apk upgrade
RUN apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash

# Install dependencies to run strapi application
RUN npm install

# Export port running the application to host machine
EXPOSE 1337

CMD [ "npm", "run", "develop" ]
