FROM alpine:edge

RUN apk --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add \
 nodejs nodejs-npm chromium nss chromium-chromedriver firefox xwininfo xvfb dbus eudev ttf-freefont fluxbox gawk yarn sudo tzdata openjdk8-jre curl wget tar

ENV TZ=Europe/Berlin
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    apk del tzdata

COPY /scripts/protractor-docker.sh /scripts/protractor-docker.sh
RUN chmod +x /scripts/protractor-docker.sh

RUN yarn global add \
    protractor \
    typescript && \
    npm update

RUN adduser -D protractor && \
    rm -rf /tmp/* \
    /var/cache/apk/* \
    /root/.npm \
    /root/.node-gyp \
    /usr/lib/node_modules/npm/man \
    /usr/lib/node_modules/npm/doc \
    /usr/lib/node_modules/npm/html \
    /usr/share/man

WORKDIR /protractor/
ENV HOME=/protractor/project
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_DRIVER_BIN=/usr/bin/chromedriver

ENTRYPOINT ["/scripts/protractor-docker.sh"]