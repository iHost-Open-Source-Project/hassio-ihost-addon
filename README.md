# Hassio iHost Addon

## iHost Hardware Control

In the HA over iHost project, the iHost Hardware Control Add-on is used to manage physical buttons and indicator lights on the device. It registers these components as entities in Home Assistant, allowing users to configure automation rules directly in HA for more flexible hardware interaction control.

# iHost Hardware Control Addon Installation Guide

## Prerequisites
1. **Mosquitto Broker Requirement**  
   The *iHost Hardware Control Addon* depends on the **Mosquitto broker add-on**.  
   → If not already installed:  
   - Install and launch the Mosquitto broker add-on first.

## Installation Steps

### 1. Add Repository
- Navigate to Home Assistant's **Add-on Store**.
- Click **"Repositories"**.
- Enter URL:  
  `https://github.com/iHost-Open-Source-Project/hassio-ihost-addon`  
  - Or click this button to add automatically:  
    [![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

### 2. Install Add-on
- Search for `"iHost Hardware Control"` in the add-on store.
- Click **"Install"**.

### 3. Configure MQTT Connection
- Open the add-on's **Configuration** tab.
- Enter your Mosquitto broker details:
  ```yaml
  server: "mqtt://your-broker-address"  # Replace with your broker URL
  username: "your_username"          # If authentication is enabled
  password: "your_password"
