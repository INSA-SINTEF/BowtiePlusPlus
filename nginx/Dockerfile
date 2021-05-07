FROM nginx:1.19.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
RUN touch /var/log/nginx-api.log
RUN touch /var/log/nginx/nginx-web.log

#RUN mkdir /etc/nginx/snippets /etc/nginx/certs /etc/nginx/keys /etc/nginx/dh
#COPY ./certs /etc/nginx/certs 
#COPY ./keys /etc/nginx/keys 
#COPY ./dh /etc/nginx/dh
COPY ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY self-signed.conf /etc/nginx/snippets/self-signed.conf
