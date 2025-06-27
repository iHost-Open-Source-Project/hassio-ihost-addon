# Home Assistant Add-on: OpenThread Border Router Add-on

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg)

OpenThread Border Router add-on. The add-on uses the upstream OpenThread
Border Router implementation and wraps it as an add-on for Home Assistant.

**NOTE:** This requires a supported 802.15.4 capable radio with OpenThread RCP firmware. 

> Important!!!
>
> When using the iHost’s built-in **MG21** chip (located at `/dev/ttyS4`) with this add-on, **hardware flow control must be disabled** for the OpenThread Border Router to function properly.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-openthread-border-router/images/otbr_configuration.png)

## About

This add-on allows you to form or join a Thread network and make Home Assistant
a Thread Border Router.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg


## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)