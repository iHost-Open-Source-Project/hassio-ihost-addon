# eWeLink Smart Home

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg) ![Supports aarch64 Architecture](https://img.shields.io/badge/aarch64-yes-green.svg) ![Supports amd64 Architecture](https://img.shields.io/badge/amd64-yes-green.svg)

## About

**eWeLink Smart Home** is designed to replace the legacy [eWeLink Smart Home](https://github.com/CoolKit-Technologies/ha-addon). It allows you to integrate devices under your eWeLink account into **Home Assistant** via **MQTT**, enabling device control and automation directly within Home Assistant. Simply log in with your eWeLink account to sync your devices into Home Assistant.

The legacy [eWeLink Smart Home](https://github.com/CoolKit-Technologies/ha-addon) add-on will **no longer be maintained or updated**. Some of its entity implementations rely on deprecated approaches, and the new project provides more robust and future-proof device support.
If you are currently using the old add-on, don’t worry — the new add-on includes a **data migration feature**. After migration, your existing devices and automations in Home Assistant will continue to work as before. Please refer to **Step 5** for the migration process.

---

## Key Differences Between the New and Legacy eWeLink Smart Home Add-ons

1. The new add-on provides **more entities** for devices synced to Home Assistant, with implementations that better align with Home Assistant standards. It will continue to expand support for more devices and capabilities, including rapid support for new SONOFF products.
2. The new add-on **does not provide a UI for device control**. All control and automation are performed directly within Home Assistant.
3. The new add-on **no longer supports syncing Home Assistant devices back to the eWeLink cloud**, a feature that existed in the legacy add-on.

---

## Prerequisites

1. MQTT integration and the **MQTT Broker add-on** are installed and enabled in Home Assistant.
2. You have registered an **eWeLink account** and added devices via the eWeLink mobile app.
3. **If you are using the legacy eWeLink Smart Home add-on and wish to migrate its data**, please first upgrade it to **version 1.4.6**, then stop the legacy add-on. During migration, the system will automatically stop the legacy add-on if it is still running. Refer to **Step 5** for details.

## Installation
1. Go to the Add-on Store → Click the **More** button (⋮) in the upper-right corner → Select **Repositories**  
2. Paste the following URL:  
   [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)  
3. Or, simply click the button below to add it automatically:

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

## How to use

See “Documentation” for details on how to use the eWeLink Smart Home add-on.