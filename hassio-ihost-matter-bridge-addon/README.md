# Matter Bridge for iHost

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg)

## About

Matter Bridge add-on exposes Home Assistant devices as Matter-enabled devices, enabling them to be integrated with Matter platforms, such as Apple Home, Google Home, and Amazon Alexa.
This add-on is based on iHost Matter Bridge and has passed Matter certification to ensure protocol compatibility and long-term availability.

## Prerequisites

- The Matter Bridge add-on is designed for the HA over iHost project ONLY, allowing users to expose Home Assistant devices as Matter devices and sync them to supported Matter platforms for control.
- The Home Assistant OS version must be 15.2.1 or higher.

## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

## How to use
See “[Documentation](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/blob/master/hassio-ihost-matter-bridge-addon/DOCS.md)” for details on how to use the SONOFF Dongle Flasher For iHost add-on.


## Supported devices
  - Switch
  - Plug
  - Light
  - Sensor
  - Button
  - curtain
  - Thermostat

### ⚠️ Note

Due to differences in how the Matter standard is implemented across smart home platforms, **the same Matter device may appear and behave differently in each ecosystem**. This includes but is not limited to:

* **Device display format**: Multi-channel devices are shown as a single card in Apple Home, but split into multiple cards in Google Home.
* **Device name display**: Naming rules are defined by each Matter platform, so a single device may appear with different names across platforms.
* **Device status synchronization**: In the Google Home App, after controlling a device from another platform, you need to manually refresh the device list (pull-to-refresh) or enter the device detail page to update its status.

![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/support-devices.jpg)
