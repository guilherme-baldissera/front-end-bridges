# Image Documentation : https://github.com/thecodingmachine/docker-images-nodejs
FROM thecodingmachine/nodejs:14-apache

RUN mkdir front-end-bridges
COPY . /front-end-bridges
WORKDIR /front-end-bridges
RUN sudo npm install
RUN sudo npm run build
RUN sudo cp -r build/* /var/www/html/
