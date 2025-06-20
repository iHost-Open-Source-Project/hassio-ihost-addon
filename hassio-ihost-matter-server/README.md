# Home Assistant Add-on: Matter Server

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg)

This repository provides **custom-built Matter Server add-ons and container images for armv7** which are not supported by the official Matter Server distribution.

## Prerequisites

- The Home Assistant OS version must be 15.2.1 or higher.

## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)


## About

Matter Python WebSocket Server for Home Assistant Core. Matter (formerly
known as Connected Home over IP or CHIP) is an IPv6 based smart home
standard. This add-on provides a Matter Controller which allows you to
commission and control of Matter devices. The matching Home Assistant Core
integration communicates via WebSocket with this server.
