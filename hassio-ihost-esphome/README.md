# ESPHome Device Builder

[![ESPHome logo][logo]][website]

[![GitHub stars][github-stars-shield]][repository]
[![Discord][discord-shield]][discord]
![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg)


### Disclaimer

This repository provides **custom-built ESPHome add-ons and container images for armv7** which are no longer supported by the official ESPHome distribution.

We only maintain compatibility and build infrastructure for the **32-bit architecture**.
If you encounter issues **unrelated to platform architecture** (such as ESPHome core features, YAML configuration, or device support), please report them to the [official ESPHome repository](https://github.com/esphome/esphome).


## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

## About

This add-on allows you to write configurations and turn your microcontrollers
into smart home devices directly through Home Assistant **with no programming experience required**.
All you need to do is write YAML configuration files; the rest (over-the-air updates, compiling) is all
handled by ESPHome.

<p align="center">
<img title="ESPHome Device Builder screenshot" src="https://github.com/esphome/home-assistant-addon/raw/main/esphome/images/screenshot.png" width="700px"></img>
</p>

[View the ESPHome documentation][website]

## Example

With ESPHome, you can go from a few lines of YAML straight to a custom-made
firmware. For example, to include a [DHT22][dht22]
temperature and humidity sensor, you just need to include 8 lines of YAML
in your configuration file:

<img title="ESPHome DHT configuration example" src="https://github.com/esphome/home-assistant-addon/raw/main/esphome/images/dht-example.png" width="500px"></img>

Then just click UPLOAD and the sensor will magically appear in Home Assistant:

<img title="ESPHome Home Assistant discovery" src="https://github.com/esphome/home-assistant-addon/raw/main/esphome/images/temperature-humidity.png" width="600px"></img>

[discord]: https://discord.gg/KhAMKrd
[repository]: https://github.com/esphome/esphome
[discord-shield]: https://img.shields.io/discord/429907082951524364.svg
[github-stars-shield]: https://img.shields.io/github/stars/esphome/esphome.svg?style=social&label=Star&maxAge=2592000
[dht22]: https://esphome.io/components/sensor/dht.html
[releases]: https://esphome.io/changelog/index.html
[logo]: https://github.com/esphome/home-assistant-addon/raw/main/esphome/logo.png
[website]: https://esphome.io/
