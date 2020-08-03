FROM alpine:3.12

RUN apk add --update nginx && rm -rf /var/cache/apk/*
COPY server-nginx/config/nginx.conf /etc/nginx/nginx.conf
COPY server-nginx/config/vhost.conf /etc/nginx/conf.d/vhost.conf

# forward request and error logs to docker log collector
RUN ln -svf /dev/stdout /var/log/nginx/access.log \
    && ln -svf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
