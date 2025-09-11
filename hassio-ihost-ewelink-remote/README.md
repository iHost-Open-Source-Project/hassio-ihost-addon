# eWeLink-Remote Gateway Add-on


![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg)
![Supports aarch64 Architecture](https://img.shields.io/badge/aarch64-yes-green.svg)
![Supports amd64 Architecture](https://img.shields.io/badge/amd64-yes-green.svg)


## About
eWeLink-Remote Gateway add-on is an eWeLink-Remote Gateway gateway that supports adding eWeLink-Remote sub-devices and syncing sub-devices  to Home Assistant,such as **[R5](https://sonoff.tech/product/smart-wall-switches/r5/),[R5W](https://sonoff.tech/product/smart-wall-switches/r5/),[S-Mate](https://sonoff.tech/product/diy-smart-switches/s-mate/),[S-Mate2](https://sonoff.tech/product/diy-smart-switches/s-mate/)**. You can select eWeLink-Remote sub-devices in Home Assistant Automations and trigger automations through single-click,double-click,and long-press events reported by eWeLink-Remote Gateway sub-devices.


## Prerequisite
A working Bluetooth, which can be the Bluetooth on the hardware running Home Assistant, a Bluetooth Dongle, or a Bluetooth proxy device 

### Non-Bluetooth Agent
- Go to Settings -> Select Devices and Services ->  Enable Bluetooth integration
- To enable Bluetooth passive scanning: Go to Bluetooth Integration > Configuration > Configure Bluetooth Options, check Passive Scanning, and click Submit.

### Using Bluetooth Agent
#### Install the ble_passthrough Custom Integration
- Installing HACS
- Open HACS → top-right menu → Custom repositories.
- Add the repository URL: https://github.com/iHost-Open-Source-Project/ble_passthrough. Select *Integration* as the category
- Search for BLE Passthrough in HACS and install it.
- After installation, add the following to your configuration.yaml
```yaml
ble_passthrough:
```
- Save the file and restart Home Assistant.

## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)
