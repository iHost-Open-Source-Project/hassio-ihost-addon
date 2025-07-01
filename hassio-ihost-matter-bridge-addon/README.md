# Matter Bridge for iHost

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg)

## About

Matter Bridge for iHost add-on exposes entities of Home Assistant devices as Matter-enabled devices, enabling them to be integrated with Matter platforms, such as Apple Home, Google Home, and Amazon Alexa.  
This add-on is based on iHost Matter Bridge and has passed Matter certification to ensure protocol compatibility and long-term availability.

At the same time, it is compatible with web and mobile terminals.

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


## Supported entities
-   Switch
-   Binary sensor
-   Light
-   Event 
-   Cover 
-   Climate

### ⚠️ Note

Due to differences in how the Matter standard is implemented across smart home platforms, **the same Matter device may appear and behave differently in each ecosystem**. This includes but is not limited to:

-   **Device name display**: Naming rules are defined by each Matter platform, so a single device may appear with different names across platforms.
-   **Device status not updated**: In  Alexa and Google Home App, after controlling a device from another platform, you need to manually refresh the device list (pull-to-refresh) or enter the device detail page to update its status.
-   **Device status display is inconsistent**: In  Smartthings App，the percentage value of the light brightness is always 1% higher than the actual brightness value. Curtain percentage display reverse
-   **Curtain percentage display reverse**:  Different platforms have different definitions of the opening and closing percentages of curtain-type devices. It is known that Alexa and Apple/Smartthings/Google have opposite directions. For example, Alexa displays a percentage of 30%, while Apple/Smartthings/Google displays a percentage of 70%.

![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/support-devices.png)
![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/readme-1.png)
![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/readme-1.png)