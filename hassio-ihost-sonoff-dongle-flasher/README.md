# SONOFF Dongle Flasher

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg) ![Supports aarch64 Architecture](https://img.shields.io/badge/aarch64-yes-green.svg) ![Supports amd64 Architecture](https://img.shields.io/badge/amd64-yes-green.svg)
 
## About

SONOFF Dongle Flasher supports online firmware flashing for the iHost MG21 chip and the SONOFF Dongle series (ZBDongle-P, ZBDongle-E, Dongle-M, Dongle-PMG24 and Dongle-LMG21).

## Prerequisites

Before using the add-on, please make sure the serial port is not in use (it is commonly occupied by services like Zigbee2MQTT or ZHA).
During the firmware flashing process, the add-on will attempt to connect to the device and automatically check whether the serial port is occupied.
If it is, the add-on will try to stop the conflicting service for you.
[Operation Guide >](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)


## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

## How to use

See “Documentation” for details on how to use the SONOFF Dongle Flasher add-on.