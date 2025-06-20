ARG BUILD_FROM
FROM ${BUILD_FROM}

# Default ENV
ENV \
    LANG="C.UTF-8" \
    DEBIAN_FRONTEND="noninteractive" \
    CURL_CA_BUNDLE="/etc/ssl/certs/ca-certificates.crt" \
    S6_BEHAVIOUR_IF_STAGE2_FAILS=2 \
    S6_CMD_WAIT_FOR_SERVICES_MAXTIME=0 \
    S6_CMD_WAIT_FOR_SERVICES=1 \
    S6_SERVICES_READYTIME=50

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Build Args
ARG \
    BASHIO_VERSION \
    TEMPIO_VERSION \
    S6_OVERLAY_VERSION

# Base system
WORKDIR /usr/src
ARG BUILD_ARCH

# ─── 第一步：临时切换到 Debian Trixie 源，升级 glibc 到 ≥ 2.38 ───
RUN set -x \
    && echo "deb http://deb.debian.org/debian trixie main contrib non-free" > /etc/apt/sources.list.d/trixie.list \
    && echo "deb http://deb.debian.org/debian-security trixie-security main contrib non-free" >> /etc/apt/sources.list.d/trixie.list \
    && echo -e "Package: *\nPin: release a=trixie\nPin-Priority: 100" > /etc/apt/preferences.d/00-trixie-pin \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
         libc6 \
         libc6-dev \
         libstdc++6 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /etc/apt/sources.list.d/trixie.list /etc/apt/preferences.d/00-trixie-pin

# ─── 第二步：换回原来的 Bookworm/默认源，安装 gcc-12/g++-12 及其他构建工具 ───
RUN set -x \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
         build-essential \
         gcc-12 \
         g++-12 \
         bash \
         jq \
         tzdata \
         curl \
         ca-certificates \
         git \
         make \
         python3 \
         python3-pip \
         xz-utils \
    && update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-12 100 \
    && update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-12 100 \
    && update-alternatives --set gcc /usr/bin/gcc-12 \
    && update-alternatives --set g++ /usr/bin/g++-12 \
    && gcc --version && g++ --version \
    && rm -rf /var/lib/apt/lists/*

# ─── 安装 S6 Overlay、bashio、tempio 等，保持原样 ───
RUN set -x \
    && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
         bash \
         jq \
         tzdata \
         curl \
         ca-certificates \
         xz-utils \
    && mkdir -p /usr/share/man/man1 \
    && if [ "${BUILD_ARCH}" = "armv7" ]; then \
           export S6_ARCH="arm"; \
       elif [ "${BUILD_ARCH}" = "i386" ]; then \
           export S6_ARCH="i686"; \
       elif [ "${BUILD_ARCH}" = "amd64" ]; then \
           export S6_ARCH="x86_64"; \
       else \
           export S6_ARCH="${BUILD_ARCH}"; \
       fi \
    && curl -L -f -s "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${S6_ARCH}.tar.xz" \
       | tar Jxvf - -C / \
    && curl -L -f -s "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz" \
       | tar Jxvf - -C / \
    && curl -L -f -s "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-symlinks-arch.tar.xz" \
       | tar Jxvf - -C / \
    && curl -L -f -s "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-symlinks-noarch.tar.xz" \
       | tar Jxvf - -C / \
    && mkdir -p /etc/fix-attrs.d /etc/services.d \
    && curl -L -f -s -o /usr/bin/tempio \
         "https://github.com/home-assistant/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}" \
    && chmod a+x /usr/bin/tempio \
    && mkdir -p /usr/src/bashio \
    && curl -L -f -s "https://github.com/hassio-addons/bashio/archive/v${BASHIO_VERSION}.tar.gz" \
       | tar -xzf - --strip 1 -C /usr/src/bashio \
    && mv /usr/src/bashio/lib /usr/lib/bashio \
    && ln -s /usr/lib/bashio/bashio /usr/bin/bashio \
    && rm -rf /var/lib/apt/lists/* /usr/src/bashio

# S6-Overlay
WORKDIR /root
ENTRYPOINT ["/init"]

COPY rootfs /
