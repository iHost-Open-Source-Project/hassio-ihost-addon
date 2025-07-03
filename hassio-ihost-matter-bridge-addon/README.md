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

1. **Tunable White Bulb - Color Temperature Not Synced.**
   When the color temperature of a tunable white bulb is changed, the updated value is not properly reflected in the Apple Home app.

2. **RGB Bulb - Color Changes Not Synced.**
   After changing the color of an RGB bulb, the updated color is not synchronized correctly to the Apple Home and Google Home apps.

3. **Device Status Not Updated in Real-Time.**
   In Alexa and Google Home apps, device status doesn't update automatically when the device is controlled from other platforms. You need to manually refresh the device list or open the device details page to view the current status.

4. **Brightness Percentage Offset for Lights.**
   In the SmartThings app, the brightness percentage displayed for lighting devices is consistently around 1% higher than the actual brightness level.

5. **Curtain Position Percentage Reversed Across Platforms.**
   Curtain open-percentage is interpreted differently across platforms. For example, a curtain showing as 30% open in Alexa would appear as 70% open in Apple Home, SmartThings, and Google Home.

6. **Devices Not Showing Up After Re-sync in SmartThings App.**
   If a previously synced device is removed and later re-synced, it may fail to appear immediately in the SmartThings app. Restarting the SmartThings Hub is necessary to resolve this issue.

![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/support-devices.png)
![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/readme-1.png)
![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/readme-1.png)
