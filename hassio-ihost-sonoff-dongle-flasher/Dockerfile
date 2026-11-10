ARG BUILD_ARCH=aarch64
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.24
FROM ghcr.io/ihost-open-source-project/hassio-ihost-sonoff-dongle-flasher-${BUILD_ARCH}:1.3.4 AS upstream

FROM ${BUILD_FROM}
ARG BUILD_ARCH

ENV NODE_ENV=prod \
    LOG_LEVEL=debug
WORKDIR /workspace
EXPOSE 8324

# Alpine supplies cryptography on ARMv7, which has no PyPI wheel.
RUN apk add --no-cache nodejs npm tini udev python3 py3-pip py3-cryptography

COPY --from=upstream /workspace/ /workspace/
COPY --from=upstream /usr/local/bin/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY build-firmware.cjs patch-ezsp.cjs patch-detection.cjs patch-ui.cjs probe-firmware.cjs port-owner.cjs start.cjs ./
RUN node patch-ezsp.cjs && node patch-detection.cjs

RUN apk add --no-cache --virtual .build-deps build-base python3-dev linux-headers \
    && npm_config_build_from_source=true npm ci --omit=dev \
    && python3 -m venv --system-site-packages /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir esptool==5.6.0 \
    && ln -s /opt/venv/bin/esptool /usr/local/bin/esptool \
    && node build-firmware.cjs \
    && node patch-ui.cjs \
    && apk del .build-deps \
    && rm -rf /root/.npm /root/.cache

LABEL org.opencontainers.image.source="https://github.com/iHost-Open-Source-Project/hassio-ihost-addon" \
      org.opencontainers.image.description="SONOFF Dongle Flasher supports online firmware flashing for the iHost MG21 chip and the SONOFF Dongle series (ZBDongle-P, ZBDongle-E, Dongle-M, Dongle-PMG24, Dongle-LMG21, Dongle-PZG23 and Dongle-MZG23)." \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.version="1.3.5" \
      io.hass.name="SONOFF Dongle Flasher" \
      io.hass.version="1.3.5" \
      io.hass.type="addon" \
      io.hass.arch="${BUILD_ARCH}"

ENTRYPOINT ["/sbin/tini", "-s", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "start.cjs"]
