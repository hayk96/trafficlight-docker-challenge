FROM nginx:1.21
RUN rm -f /etc/nginx/conf.d/default.conf
COPY  nlb.conf /etc/nginx/conf.d/
EXPOSE 80
