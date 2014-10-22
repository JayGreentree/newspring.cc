FROM newspring/expressionengine:2.8.1
MAINTAINER Drew Delianides <drew.delianides@newspring.cc>

RUN apt-get update

RUN mkdir -p /var/www/html/assets /var/www/html/images

ADD assets/ /var/www/html/assets
ADD images/ /var/www/html/images
ADD index.php /var/www/html/
ADD admin.php /var/www/html/
ADD .htaccess /var/www/html/

# Make sure permissions are correct
RUN chmod 664 /var/www/html/*.php
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 777 /var/www/html/images

ADD config/newspring-apache.conf /etc/apache2/sites-available/
RUN a2ensite newspring-apache
RUN a2dissite 000-default

EXPOSE 80
WORKDIR /var/www/html
# No CMD here, it uses the CMD from the Parent PHP image
ENTRYPOINT [ "apache2", "-DFOREGROUND" ]
