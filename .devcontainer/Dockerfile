FROM mcr.microsoft.com/devcontainers/php:8.2

# Install Node.js (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Install unzip (needed for some npm packages)
RUN apt-get install -y unzip
