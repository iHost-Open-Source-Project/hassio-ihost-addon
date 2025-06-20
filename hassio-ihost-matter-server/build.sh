sudo docker buildx build \
  --platform linux/arm/v7 \
  --build-arg BUILD_FROM=ghcr.io/ihost-open-source-project/python-matter-server:8.0.0 \
  --build-arg BUILD_ARCH=armv7 \
  --build-arg S6_OVERLAY_VERSION=3.1.6.2 \
  --build-arg TEMPIO_VERSION=2024.11.2 \
  --build-arg BASHIO_VERSION=0.16.2 \
  -t ghcr.io/ihost-open-source-project/armv7-addon-matter-server:8.0.0 \
  --push \
  .