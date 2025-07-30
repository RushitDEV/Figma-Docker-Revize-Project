FROM php:8.3-fpm

# Gerekli PHP eklentilerini kuruyoruz
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev zip git

# PHP için gerekli eklentileri kuruyoruz
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql xml

# Composer kurulumu
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Çalışma dizinini ayarlıyoruz
WORKDIR /var/www/html

# Proje dosyalarını kopyalamadan önce composer.json ve composer.lock'ı kopyalıyoruz
COPY composer.json composer.lock ./

# Symfony ve diğer bağımlılıkların kurulumu
RUN composer install --no-scripts --no-autoloader

# Diğer proje dosyalarını kopyalıyoruz
COPY . /var/www/html
