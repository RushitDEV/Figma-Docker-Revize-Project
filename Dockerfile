# Use the official PHP 8.3 FPM image based on Alpine
FROM php:8.4-fpm-alpine

# Define PHPIZE_DEPS
ENV PHPIZE_DEPS="autoconf dpkg-dev dpkg file g++ gcc libc-dev make pkgconf re2c"

# Install system dependencies including PHPIZE_DEPS and Nginx
RUN apk add --no-cache \
    postgresql-dev \
    libpq \
    libzip-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    linux-headers \
    nginx \
    $PHPIZE_DEPS

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql zip gd intl mbstring opcache bcmath soap xml pcntl

# Install redis extension using pecl
RUN pecl install redis && docker-php-ext-enable redis

# Install APCu
RUN pecl install apcu \
    && docker-php-ext-enable apcu

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy custom php.ini
COPY docker/php.ini /usr/local/etc/php/conf.d/

# Copy Nginx configuration
COPY docker/nginx/http.d /etc/nginx/http.d
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.conf
# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .
ENV COMPOSER_ALLOW_SUPERUSER=1

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chown www-data:www-data /var/log \
    && chmod 666 /var/log/*

# Start Nginx and PHP-FPM
CMD ["sh", "-c", "nginx && php-fpm"]
