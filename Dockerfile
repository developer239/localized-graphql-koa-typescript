FROM node:alpine

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Bundle app source
COPY . /usr/app

# Install app dependencies
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
