# Home Assistant Add-on: SiliconLabs Zigbee/OpenThread Multiprotocol Add-on

Zigbee/OpenThread Multiprotocol container for Silicon Labs based radios 
such as SONOFF ZBDongle-E.

![Supports armv7 Architecture][armv7-shield]
![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]

## About

This add-on allows you to use Zigbee and OpenThread protocol simultaneous on a 
single Silicon Labs based radio. The radio needs the RCP Multi-PAN firmware 
installed to support multiple IEEE 802.15.4 Personal Area Networks (PAN). The 
addon is modified based on the Silicon Labs Multiprotocol Addon and has been 
successfully tested on the SONOFF ZBDongle-E.

[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

### NOTICE

1. Since the ZHA integration currently only supports EZSP v14, while the MultiPAN firmware 
is based on EZSP v16,it can only be used with Zigbee2MQTT (Z2M).
2. Before using this add-on, you must first flash the MultiPAN firmware via [SONOFF Dongle Flasher][sonoff-dongle-flasher] or [SONOFF Dongle Flasher Add-on](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/tree/master/hassio-ihost-sonoff-dongle-flasher).

## Known Issues

After enabling the **Silicon Labs Multiprotocol Add-on**, Zigbee2MQTT may report an `ASH_ERROR_TIMEOUTS` error on the first launch. 
Restarting Zigbee2MQTT typically resolves the issue. This has been reported to Silicon Labs and is currently under investigation.

[sonoff-dongle-flasher]: https://dongle.sonoff.tech/sonoff-dongle-flasher
