# Hassio iHost Add-ons

## About
This repository contains a set of Home Assistant add-ons developed specifically for **SONOFF iHost**.

## Requirements
To use these add-ons, the following requirements must be met:

* Home Assistant must be running on **iHost**, installed from a **pre-flashed microSD card**.
  👉 For setup instructions, please refer to the [Operation Guide](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)

* The **Home Assistant OS version must be 15.2.1 or higher**.


## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

## 🔄 Updating Repository

If you can only see part of the add-ons after adding this repository, it might be due to outdated local cache.  
To refresh:

1. Go to the Add-on Store  
2. Click the **More** button (⋮) in the upper-right corner  
3. Click **Check for updates**

This will force Home Assistant to reload the latest add-on list from all configured repositories.

## Available Add-ons

### iHost Hardware Control

This add-on exposes iHost's hardware (buttons, RGB indicators, LED strips) as entities in Home Assistant, enabling flexible automations and hardware integration.

[Documentation →](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/blob/master/hassio-ihost-hardware-control/DOCS.md)

---

### SONOFF Dongle Flasher for iHost

Flash and upgrade the built-in MG21 Zigbee coordinator firmware directly from Home Assistant.  
Supports switching between Zigbee and Thread firmware via a simple web interface.

[Documentation →](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/blob/master/hassio-ihost-sonoff-dongle-flasher/DOCS.md)

---
### Node-RED

This add-on is a standalone packaged version of Node-RED, exclusively designed to support the linux/arm/v7 architecture. It has been packaged by SONOFF, specifically tailored for iHost users

[Documentation →](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/blob/master/hassio-ihost-node-red/README.md)

---

## License

All add-ons in this repository are released under the [MIT License](./LICENSE).

---

## Maintainers

Maintained by the [iHost Open Source Project](https://github.com/iHost-Open-Source-Project).
