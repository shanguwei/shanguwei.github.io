FROM nginx:alpine

RUN mkdir /data
RUN echo "flag{siw2hd4sk4u6nw}" > /flag

RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
