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
  - curtain
  - Thermostat

| **Device Type** | **Description**                 | **Matter Device Type**                             | **<font style="color:rgb(38, 38, 38);">HA Entity Type</font>** |
| --------------- | ------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Plug            | Single-channel Plug             | On/Off Plug-in Unit                                | <font style="color:rgb(38, 38, 38);">Switch </font>          |
|                 | Multi-channel Plug              | Bridge Node    On/Off Plug-in Unit                 | <font style="color:rgb(38, 38, 38);">Switch </font>          |
| Switch          | Single-channel Switch           | On/Off Plug-in Unit                                | <font style="color:rgb(38, 38, 38);">Switch </font>          |
|                 | Multi-channel Switch            | Bridge Node    On/Off Plug-in Unit                 | <font style="color:rgb(38, 38, 38);">Switch </font>          |
| Sensor          | Motion Sensor                   | Occupancy Sensor                                   | <font style="color:rgb(38, 38, 38);">Binary sensor</font>    |
|                 | Contact Sensor                  | Contact Sensor                                     | <font style="color:rgb(38, 38, 38);">Binary sensor</font>    |
|                 | Temperature and Humidity Sensor | Bridge Node   Temperature Sensor   Humidity Sensor | <font style="color:rgb(38, 38, 38);">Climate Sensor</font>   |
|                 | Temperature Sensor              | Temperature Sensor                                 | <font style="color:rgb(38, 38, 38);">Climate Sensor</font>   |
|                 | Air Quality and Humidity Sensor | Bridge Node   Temperature Sensor   Humidity Sensor | <font style="color:rgb(38, 38, 38);">Climate Sensor</font>   |
| Light           | Dimmable Light                  | Dimmable Light                                     | <font style="color:rgb(38, 38, 38);">Light</font>            |
|                 | Tunable White Light             | Color Temperature Light                            | <font style="color:rgb(38, 38, 38);">Light</font>            |
|                 | Tunable Color Light             | Color Temperature Light                            | <font style="color:rgb(38, 38, 38);">Light</font>            |
| Button          | Wireless Button                 | Generic Switch                                     | <font style="color:rgb(38, 38, 38);">EVENT </font>           |
|                 | Multi-channel Wireless Button   | Bridge Node   Generic Switch                       | <font style="color:rgb(38, 38, 38);">EVENT </font>           |
| Curtain         | Curtain                         | Window Covering                                    | <font style="color:rgb(38, 38, 38);">Cover </font>           |
| Thermostat      | Thermostat                      | Thermostat                                         | <font style="color:rgb(38, 38, 38);">Climate</font>          |
