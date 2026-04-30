# eWeLink Smart Home

## 1. Introduction

**eWeLink Smart Home** is designed to replace the legacy [eWeLink Smart Home](https://github.com/CoolKit-Technologies/ha-addon). It allows you to integrate devices under your eWeLink account into **Home Assistant** via **MQTT**, enabling device control and automation directly within Home Assistant. Simply log in with your eWeLink account to sync your devices into Home Assistant.

The legacy [eWeLink Smart Home](https://github.com/CoolKit-Technologies/ha-addon) add-on will **no longer be maintained or updated**. Some of its entity implementations rely on deprecated approaches, and the new project provides more robust and future-proof device support.
If you are currently using the old add-on, don’t worry — the new add-on includes a **data migration feature**. After migration, your existing devices and automations in Home Assistant will continue to work as before. Please refer to **Step 5** for the migration process.

---

## 2. Key Differences Between the New and Legacy eWeLink Smart Home Add-ons

1. The new add-on provides **more entities** for devices synced to Home Assistant, with implementations that better align with Home Assistant standards. It will continue to expand support for more devices and capabilities, including rapid support for new SONOFF products.
2. The new add-on **does not provide a UI for device control**. All control and automation are performed directly within Home Assistant.
3. The new add-on **no longer supports syncing Home Assistant devices back to the eWeLink cloud**, a feature that existed in the legacy add-on.

---

## 3. Prerequisites

1. MQTT integration and the **MQTT Broker add-on** are installed and enabled in Home Assistant.
2. You have registered an **eWeLink account** and added devices via the eWeLink mobile app.
3. **If you are using the legacy eWeLink Smart Home add-on and wish to migrate its data**, please first upgrade it to **version 1.4.6**, then stop the legacy add-on. During migration, the system will automatically stop the legacy add-on if it is still running. Refer to **Step 5** for details.

---

## 4. Installing the eWeLink Smart Home Add-on

### 4.1 Add the Repository

Skip this step and simply proceed to the Add-on Store to install the required add-on if you have already added the add-ons from this repository (e.g., iHost Hardware Control).

1. Via URL

-   Navigate to Settings > Add-on Store> Click the three-dot menu (⋮) in the top right corner and select Repositories
-   Enter the repository URL into the input box: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon

2. Via Button Clicking

-   Click this button to add the add-on automatically

    [![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

---

### 4.2 Install the Add-on

1. Search for **eWeLink Smart Home** in the Add-on Store
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/search-for-addon.png)
2. Click **Install**
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/install-add-on.png)
3. Wait for the installation to complete

---

### 4.3 About MQTT Configuration

We provide additional MQTT configuration options to accommodate users who rely on third-party MQTT brokers.
If you are not using a third-party MQTT broker, simply enable the add-on.
Once enabled, it will automatically start Home Assistant’s official Mosquitto broker and connect using the default credentials. No manual configuration is required. After successful startup, the add-on is ready to use.

---

### 4.4 Start the Add-on

After installation, click **Start** to launch the add-on. Please wait until the service has fully started before continuing.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/start-addon.png)

---

## 5. Migrating Data From the Legacy eWeLink Smart Home Add-on

> If you do not need to migrate data from the legacy add-on, you may skip this section and proceed to **Step 6**.

### 5.1 **Important**: Upgrade the Legacy Add-on to Version 1.4.6

Return to the legacy eWeLink Smart Home add-on and upgrade it to **version 1.4.6**.

**Conflict Detection**

To prevent data inconsistency, the legacy and new eWeLink Smart Home add-ons **cannot run simultaneously by default**.
After upgrading, you will see a configuration option called **Conflict Detection**, which is enabled by default.

-   If disabled, both add-ons can run at the same time, but data consistency is **not guaranteed**.
-   This configuration is **not recommended**.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/conflict-detection.png)

---

### 5.2 Log In to the New Add-on

Log in to the new eWeLink Smart Home add-on using the **same eWeLink account** as the legacy add-on.

1. Account login
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/login.png)
2. QR code login
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/qr-code-login.png)

---

### 5.3 Start Data Migration

After logging in, the system will automatically detect whether the same devices exist under both the new and legacy add-ons. If matching devices are found, you will be prompted to migrate data.

You may choose to migrate immediately or defer until the next login.

#### 5.3.1 Start Migration

Click **Migrate Now** to begin.
During migration:

-   Keep Home Assistant and the new add-on running.
-   Do not interrupt or close the process.
-   Home Assistant Core will be restarted once during migration.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/migrate-now.png)

#### 5.3.2 Stop the Legacy Add-on

To ensure data integrity, the system will automatically stop the legacy add-on.

If stopping fails (for example, if the legacy add-on is running in a standalone container), manually stop it and then return to the new add-on page and click **Stopped, Continue Migration**.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/stopping-addon.png)

#### 5.3.3 Migration in Progress

Once the legacy add-on has stopped successfully, data migration will begin automatically.
Home Assistant Core will restart once, typically taking **2–3 minutes**.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/migrate-data.png)

#### 5.3.4 Migration Completed

After a successful migration, devices previously added to Home Assistant via the legacy add-on will appear as **synced** in the new add-on.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/migrate-complete.png)

#### 5.3.5 Cancel Migration

You may cancel migration at any time before it begins. After cancellation, logging out and back in will trigger the migration prompt again.

#### 5.3.6 Unexpected Exit

If you exit the new add-on UI or restart the add-on during migration, the migration process will **continue uninterrupted**.

---

### 5.4 Skip Migration

If you choose not to migrate, devices previously added via the legacy add-on will not be synced.
When syncing devices in the new add-on, **new devices and entities** will be created in Home Assistant.

---

## 6. Syncing Devices to Home Assistant

### 6.1 Log In to Your eWeLink Account

1. Account login
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/login.png)
2. QR code login
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/qr-code-login.png)

---

### 6.2 Device List

1. Devices are divided into **LAN devices** and **cloud devices**, distinguished by the icon in the top-right corner of each device card.
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/lan-and-cloud.png)
2. If a device supports both LAN and cloud control, **LAN control is prioritized**, and the LAN icon will be shown.
3. **Refresh device list**:
    - LAN devices refresh automatically every **30 seconds**
    - Cloud devices require manual refresh via the account menu in the top-right corner
      ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/refresh-device-list.png)
4. **Unsupported devices** may appear in the list and will be gradually supported in future releases.

---

### 6.3 Sync Individual Devices

If you choose not to migrate legacy data, or if no legacy data exists, you can sync devices individually by clicking **Sync** on the device card.

## ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/sync-one-device.png)

### 6.4 Sync All Devices

You may also click **Sync All** in the top-right corner to add all supported devices under your account to Home Assistant.

## ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-ewelink-smart-home/images/sync-all.png)

## 7. Viewing Synced Devices in Home Assistant

Devices synced to Home Assistant can be viewed under the **MQTT integration**.

---

## 8. Logging Out of the eWeLink Account

You can log out from the add-on UI via the account menu in the top-right corner.
After logging out:

-   Cloud devices will become unavailable in Home Assistant
-   LAN devices will remain controllable unless you switch accounts

---

## 9. Switching eWeLink Accounts

If you switch to a different eWeLink account, **all devices synced to Home Assistant will become unavailable**.

---

## 10. Supported Devices

The supported device list is as follows:

### Plug
#### Single-channel plug
| Device Protocol | Model                                                                                                                                                                                                                                | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Wi-Fi           | BASIC<br>BASICR2<br>BASICR3<br>RFR2<br>MINIR2<br>RE5V1C<br>S26 Series<br>S55 Series<br>S31 Lite                                                                                                                                      | LAN&Cloud                                                                                                                                                       | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                                          |
| Wi-Fi           | pow<br>PSF-P76-R3(6)                                                                                                                                                                                                                 | Cloud                                                                                                                                                           | Switch<br>Power<br>Network indicator<br>Power-on behavior<br>RSSI                                                                 |
| Wi-Fi           | Micro                                                                                                                                                                                                                                | LAN&Cloud                                                                                                                                                       | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                                          |
| Wi-Fi           | AM430E-SW1<br>AM430EV5-B01-GL                                                                                                                                                                                                        | Cloud                                                                                                                                                           | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                                          |
| Wi-Fi           | CKA-DM4-GL(SW1C-MW)                                                                                                                                                                                                                  | Cloud                                                                                                                                                           | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                                          |
| Wi-Fi           | BASICR4<br>MINIR4<br>MINIR4M<br>S40TPB Lite<br>S40TPA Lite<br>CK-BL602-4SW-HS(138)<br>BL1-S04-01(138)<br>CK-BL602-4SW-HS(138)<br>SN-BL602-S40-01(138)<br>CK-BL602-4SW-AY(138)<br>SN-ESP32D0-MINIR4-01(138)<br>CK-ESP32C3-SW-MT2(138) | LAN&Cloud                                                                                                                                                       | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                                          |
| Zigbee          | S26R2ZB<br>S31 Lite zb<br>BASICZBR3<br>TRETAKT plug smart (IKEA)<br>E2204 (IKEA)                                                                                                                                                     | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | Switch<br>RSSI                                                                                                                    |
| Zigbee          | S40ZB Lite<br>SN-CC2652P-SW-01(7005)                                                                                                                                                                                                 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>RSSI                                                                                                                    |
| Zigbee          | KX-SPLUG-ZB<br>CK-TLSR8258-MSW-03(7020)<br>CK-TL8656F512-BL0937(7020)<br>CK-TLSR8258-MSW-02(7020)<br>CK-TL8656F512-Z123PL0O-01(7020)<br>CK-BL702-SWP-01(7020)                                                                        | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Network indicator<br>Power-on behavior<br>Inching settings<br>Voltage<br>Current<br>Power<br>Energy consumption<br>RSSI |
| Zigbee          | S60ZBTPF<br>S60ZBTPG<br>BASIC-ZB1GSP<br>S61SZBTPB                                                                                                                                                                                    | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Network indicator<br>Power-on behavior<br>Inching settings<br>Voltage<br>Current<br>Power<br>Energy consumption<br>RSSI |
| Wi-Fi           | GSB-MSW-01(1C)                                                                                                                                                                                                                       | LAN&Cloud                                                                                                                                                       | Switch<br>Power-on behavior<br>Inching settings                                                                                   |


#### Multi-channel plug
| Device Protocol | Model                                                                                                              | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Wi-Fi           | SONOFF DualR2                                                                                                      | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                               |
| Wi-Fi           | PSF-B03-GL<br>CKAM3                                                                                                | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>Inching settings<br>RSSI                                                                           |
| Wi-Fi           | SONOFF 4CHR3<br>SONOFF 4CHPROR3                                                                                    | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                               |
| Wi-Fi           | CKA-DM4-GL(SW2C-MW)                                                                                                | Cloud                                                                                                                                                           | Channel control<br>Network indicator<br>RSSI                                                                                               |
| Wi-Fi           | CKA-DM4-GL(SW3C-MW)                                                                                                | Cloud                                                                                                                                                           | Channel control<br>Network indicator<br>RSSI                                                                                               |
| Wi-Fi           | BL1-S04-01<br>CK-BL602-4SW-TYSTD<br>CK-BL602-4SW-HS<br>CK-BL602-4SW-HS-03                                          | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                               |
| Zigbee          | CK-BL702-SWP-01(7021)<br>CK-TL8656F512-Z123PL0O-02(7021)<br>CK-TLSR8258-MSW-02(7021)<br>CK-TL8656F512-BL0937(7021) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Network indicator<br>Power-on behavior<br>Inching settings<br>Voltage<br>Current<br>Power<br>Energy consumption<br>RSSI |
| Zigbee          | CK-BL702-SWP-01(7022)<br>CK-TL8656F512-Z123PL0O-03(7022)<br>CK-TLSR8258-MSW-02(7022)<br>CK-TL8656F512-BL0937(7022) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Network indicator<br>Power-on behavior<br>Inching settings<br>Voltage<br>Current<br>Power<br>Energy consumption<br>RSSI |


### Switch
#### Single-channel switch
| Device Protocol | Model                                                                                                                                                                                                                       | Access Method                                                                                                                                                 | Synchronization Capability to HA                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Wi-Fi           | TX1C                                                                                                                                                                                                                        | LAN&Cloud                                                                                                                                                     | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                |
| Wi-Fi           | SV                                                                                                                                                                                                                          | LAN&Cloud                                                                                                                                                     | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                |
| Wi-Fi           | PSA-BHA-GL(15)                                                                                                                                                                                                              | LAN&Cloud                                                                                                                                                     | Switch<br>Temperature<br>Humidity<br>Network indicator<br>Power-on behavior<br>RSSI                     |
| Wi-Fi           | THR316<br>THR316D<br>THR320<br>THR320D                                                                                                                                                                                      | LAN&Cloud                                                                                                                                                     | Switch<br>Temperature<br>Humidity<br>Network indicator<br>Power-on behavior<br>RSSI                     |
| Wi-Fi           | M5-1C<br>M5-1C-80W<br>M5-1C-86W<br>M5-1C-120W<br>ESP32D0-MSW-T5(160)<br>SN-ESP32D0-M5HK-01(160)                                                                                                                             | LAN&Cloud                                                                                                                                                     | Switch<br>Network indicator<br>Power-on behavior<br>RSSI                                                |
| Zigbee          | ZBMINI<br>ZB-SW01<br>SWITCH-ZED01<br>SWITCH-ZR02                                                                                                                                                                            | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>RSSI                                                                                          |
| Zigbee          | ZBMINI-L<br>ZBMINIL2                                                                                                                                                                                                        | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>RSSI                                                                                          |
| Wi-Fi           | E32-MNG-00(128)<br>SPM-Main                                                                                                                                                                                                 | LAN&Cloud                                                                                                                                                     | Network indicator<br>RSSI                                                                               |
| Wi-Fi           | E32-MSW-NX(133)<br>NSPanel                                                                                                                                                                                                  | Cloud                                                                                                                                                         | Switch<br>Inching settings<br>Power-on behavior<br>Temperature<br>Humidity                              |
| Wi-Fi           | CK-BL602-4SW-HS-02(191)<br>LN-2S-GW(191)                                                                                                                                                                                    | LAN&Cloud                                                                                                                                                     | Switch<br>Inching settings<br>Power-on behavior<br>Network indicator                                    |
| Wi-Fi           | T5-1C-86<br>T5-1C-80<br>T5-1C-120<br>CK-ESP32D0-T5-01(209)                                                                                                                                                                  | LAN&Cloud                                                                                                                                                     | Switch<br>Inching settings<br>Power-on behavior<br>Network indicator<br>Mode                            |
| Wi-Fi           | CK-BL602-TC-01(216)                                                                                                                                                                                                         | Cloud                                                                                                                                                         | Switch<br>Illuminance                                                                                   |
| Wi-Fi           | CK-BL602-PCSW-01(225)                                                                                                                                                                                                       | LAN&Cloud                                                                                                                                                     | Switch<br>Power-on behavior<br>Network indicator                                                        |
| Wi-Fi           | MINI-RBS<br>MINI-RBS-MS                                                                                                                                                                                                     | Cloud                                                                                                                                                         | Switch<br>Open, close, pause<br>Motor reverse<br>Percentage control<br>Network indicator<br>Switch mode |
| Wi-Fi           | NON-OTA-GL(264)                                                                                                                                                                                                             | Cloud                                                                                                                                                         | Switch                                                                                                  |
| Wi-Fi           | BASIC-1GS<br>BASIC-1GS-TEST                                                                                                                                                                                                 | LAN&Cloud                                                                                                                                                     | Switch<br>Power-on behavior<br>Inching settings<br>Network indicator                                    |
| Zigbee          | ZBMINIR2<br>ZBMINIR2-ZS<br>ZBMicro<br>SWITCH-ZR03-1<br>CK-BL702-MSW-01(7010)<br>CK-BL702-MSW-01(7010)-1<br>CK-TLSR8258-MSW-01(7010)<br>CK-BL702L-Z102SW00-1(7010)<br>CK-TLSR8656-MSW-01(7010)<br>CK-TLSR8656-MSW-01(7010)-1 | LAN&Cloud                                                                                                                                                     | Switch<br>Network indicator<br>Power-on behavior<br>Inching settings<br>RSSI                            |


#### Multi-channel switch
| Device Protocol                                           | Model                                                                                                                                                                                 | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Wi-Fi                                                     | TX2C<br>CKA-DM4-GL                                                                                                                                                                    | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                    |
| Wi-Fi                                                     | TX3C<br>CKA-DM4-GL(SW3C)                                                                                                                                                              | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                    |
| Wi-Fi                                                     | PSF-B04-GL                                                                                                                                                                            | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                    |
| Wi-Fi                                                     | M5-3C<br>M5-3C-80W<br>M5-3C-86W<br>M5-3C-120W<br>M5-3C-120<br>SN-ESP32D0-M5HK-01<br>ESP32D0-MSW-T5                                                                                    | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                    |
| Wi-Fi                                                     | M5-2C<br>M5-2C-80W<br>M5-2C-86W<br>M5-2C-120W                                                                                                                                         | LAN&Cloud                                                                                                                                                       | Channel control<br>Network indicator<br>RSSI                                                                                    |
| Wi-Fi                                                     | DUALR3                                                                                                                                                                                | LAN&Cloud                                                                                                                                                       | Switch<br>Curren<br>Voltage<br>Real power<br>Reactive power<br>Apparent power<br>Network indicator<br>Power-on behavior<br>RSSI |
| Zigbee                                                    | ZB-SW02                                                                                                                                                                               | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN),<br>while devices under ZBBridge-U are controlled via the cloud.)    | Channel control<br>RSSI                                                                                                         |
| Zigbee                                                    | ZB-SW03                                                                                                                                                                               | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN),<br>while devices under ZBBridge-U are controlled via the cloud.)    | Channel control<br>RSSI                                                                                                         |
| Wi-Fi |<br> T5-2C-86<br>T5-2C-80<br>CK-ESP32D0-T5-01(210) | LAN&Cloud                                                                                                                                                                             | Switch<br>Channel control<br>Inching settings<br>Power-on behavior<br>Network indicator<br>Mode                                                                 |                                                                                                                                 |
| Wi-Fi                                                     | T5-3C-86<br>T5-3C-120<br>T5-3C-80<br>CK-ESP32D0-T5-01(211)                                                                                                                            | LAN&Cloud                                                                                                                                                       | Switch<br>Channel control<br>Inching settings<br>Power-on behavior<br>Network indicator<br>Mode                                 |
| Wi-Fi                                                     | T5-4C-86<br>T5-4C-120<br>T5-4C-80<br>CK-ESP32D0-T5-01(212)                                                                                                                            | LAN&Cloud                                                                                                                                                       | Switch<br>Channel control<br>Inching settings<br>Power-on behavior<br>Network indicator<br>Mode                                 |
| Wi-Fi                                                     | MINI-2GS                                                                                                                                                                              | LAN&Cloud                                                                                                                                                       | Switch<br>Power-on behavior<br>Inching settings<br>Network indicator<br>Relay separate mode                                     |
| Zigbee                                                    | CK-BL702-MSW-01(7011)<br>CK-BL702-MSW-01(7011)-1<br>CK-TLSR8258-MSW-01(7011)<br>CK-BL702L-Z102SW00-2(7011)<br>SWITCH-ZR03-2<br>CK-TLSR8656-MSW-01(7011)<br>CK-TLSR8656-MSW-01(7011)-1 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Network indicator<br>Switch status indicator<br>Power-on behavior<br>Inching settings<br>RSSI                |
| Zigbee                                                    | SWITCH-ZR03-3<br>CK-BL702-MSW-01(7012)<br>CK-BL702-MSW-01(7012)-1<br>CK-TLSR8258-MSW-01(7012)<br>CK-BL702L-Z102SW00-3(7012)<br>CK-TLSR8656-MSW-01(7012)<br>CK-TLSR8656-MSW-01(7012)-1 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Network indicator<br>Power-on behavior<br>Inching settings<br>RSSI                                           |
| Zigbee                                                    | SWITCH-ZR03-4<br>CK-TLSR8656-MSW-01(7013)-1<br>CK-TLSR8656-MSW-01(7013)<br>CK-BL702-MSW-01(7013)-1<br>CK-BL702-MSW-01(7013)                                                           | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Network indicator<br>Power-on behavior<br>Inching settings<br>RSSI                                           |
| Zigbee                                                    | ZBM5-2C-120<br>ZBM5-2C-120W<br>ZBM5-2C-80/86<br>ZBM5-2C-80W<br>ZBM5-2C-86W<br>MINI-ZB2GS-L                                                                                            | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Mode<br>Network indicator<br>Power-on behavior<br>Relay separate mode<br>Wiring status<br>RSSI               |
| Zigbee                                                    | ZBM5-3C-120<br>ZBM5-3C-120W<br>ZBM5-3C-80/86<br>ZBM5-3C-80W<br>ZBM5-3C-86W                                                                                                            | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Mode<br>Network indicator<br>Power-on behavior<br>Relay separate mode<br>Wiring status<br>RSSI               |
| Zigbee                                                    | MINI-ZB2GS                                                                                                                                                                            | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Power-on behavior<br>Inching settings<br>Network indicator<br>Relay separate mode<br>Switch mode<br>RSSI     |


#### Dimming switch
| Device Protocol | Model                      | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                           |
| --------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Wi-Fi           | MINI-DIM<br>MINI-DIM-TEST  | LAN&Cloud                                                                                                                                                       | Switch<br>Power-on behavior<br>Inching settings<br>Network indicator<br>External switch mode<br>Voltage<br>Brightness<br>Motor calibration |
| Zigbee          | CK-BL702-Z102LG17-01(7024) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Brightness<br>Network indicator<br>Switch status indicator<br>Power-on behavior<br/>RSSI                                         |
| Zigbee          | CK-BL702-Z102LG17-01(7025) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Brightness<br>Network indicator<br>Switch status indicator<br>Power-on behavior                                         |
| Zigbee          | CK-BL702-Z102LG17-01(7026) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Channel control<br>Brightness<br>Network indicator<br>Switch status indicator<br>Power-on behavior                                         |
| Zigbee          | MINI-ZBDIM                 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Network indicator<br>Power -on behavior<br>Brightness<br>External switch mode<br>Current<br>Voltage<br>Inching Settings          |


### Light
#### Dimming light
| Device Protocol | Model                                                                                                                                                                               | Access Method                                                                                                                                                   | Synchronization Capability to HA                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Wi-Fi           | D1                                                                                                                                                                                  | LAN&Cloud                                                                                                                                                       | Light on/off<br>Brightness<br>Power-on behavior<br>RSSI                      |
| Wi-Fi           | B02-BL<br>BL1-ALL-LED(135)<br>B02-BL-A60<br>CK-BL602-5PWM-01(135)<br>CK-BL602C40-MEB-02(135)                                                                                        | LAN&Cloud                                                                                                                                                       | Light on/off<br>Brightness<br>Color temperature<br>                          |
| Zigbee          | CK-BL702-AL-01(7008_Z102LG01-1)<br>CK-BL702-AL-01(7008_Z102LG01-2)<br>CK-TLSR8258-L2P-01(7008)<br>CK-TLSR8258-Z123LG19XJ-01(7008)<br>CK-BL702-AL-02(7008)<br>CK-BL702-AL-02(7008)-1 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Light on/off<br>Brightness<br>Color temperature<br>Power-on behavior<br>RSSI |


#### Color temperature light
| Device Protocol | Model                                                                                                     | Access Method                                                                                                                                                | Synchronization Capability to HA                        |
| --------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Wi-Fi           | B02-F-A19<br>B02-F-A60<br>B02-F-ST64<br>B02-B-A60<br>ALT-DB2-GL<br>ALT-L2I-GL<br>ALT-L02-GL<br>WTW-705-GL | LAN&Cloud                                                                                                                                                    | Light on/off<br>Brightness<br>Color temperature<br>RSSI |
| Zigbee          | ZB-CT01<br>EWL-Z102LG01<br>EWL-Z102LG01-1<br>EWL-Z202LG01-1<br>EWL-Z202LG01-2                             | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN),<br>while devices under ZBBridge-U are controlled via the cloud.) | Light on/off<br>Brightness<br>Color temperature<br>RSSI |
| Wi-Fi           | 86LA-1CUI<br>LA-1CUI<br>PSF-BLA-GL(57-PWM1C)<br>SONOFF W1<br>B3                                           | Cloud                                                                                                                                                        | Light on/off<br>Brightness<br>RSSI<br>                  |


#### Colored lights
| Device Protocol | Model                                                                                                                                                                 | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Wi-Fi           | B1<br>B1_R2<br>CKDK-001                                                                                                                                               | Cloud                                                                                                                                                           | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Mode<br>RSSI              |
| Wi-Fi           | L1<br>PSF-BTA-GL(59)                                                                                                                                                  | Cloud                                                                                                                                                           | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Mode<br>RSSI              |
| Wi-Fi           | L2-2M<br>L2-5M<br>L2-C<br>L2 Lite-5M-EU<br>L2 Lite-5M-US<br>L3-5M                                                                                                     | Cloud                                                                                                                                                           | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Mode<br>RSSI              |
| Wi-Fi           | B05                                                                                                                                                                   | LAN&Cloud                                                                                                                                                       | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Mode<br>RSSI              |
| Wi-Fi           | L3-5M-P                                                                                                                                                               | Cloud                                                                                                                                                           | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Mode<br>RSSI              |
| Zigbee          | ZB-CL01<br>EWL-Z102LG04<br>EWL-Z102LG03-1<br>EWL-Z102LG04-1<br>EWL-Z202LG04-1                                                                                         | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Mode<br>RSSI              |
| Wi-Fi           | BL1-ALL-LED(136)<br>B05-BL<br>CK-BL602-5PWM-01(136)<br>CK-BL602-IIC-ABC-03(136)<br>LN-882-PWM(136)<br>LN-882-GL(136)                                                  | LAN&Cloud                                                                                                                                                       | Light on/off<br>Brightness<br>Color temperature<br>Mode                                   |
| Zigbee          | CK-BL702-AL-01(7009_Z102LG03-1)<br>CK-BL702-AL-01(7009_Z102LG03-2)<br>CK-BL702-AL-01(7009_Z102LG04-1)<br>CK-BL702-AL-01(7009_Z102LG04-2)<br>CK-TLSR8258-L5PI-01(7009) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Light on/off<br>Brightness<br>Color temperature<br>Color RGB<br>Power-on behavior<br>RSSI |


### Power Statistics Switch
#### Power Statistics Switch
| Device Protocol  | Model                                                                                                                                                | Access Method | Synchronization Capability to HA                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Wi-Fi            | SPM-4Relay                                                                                                                                           | LAN&Cloud     | Channel control<br>Curren<br>Voltage<br>Real Power<br>Reactive Power<br>Apparent Power<br>Power-on behavior<br>RSSI |
| Wi-Fi            | S40TPB<br>S40TPA                                                                                                                                     | LAN&Cloud     | Channel control<br>Current<br>Voltage<br>Power<br>RSSI                                                              |
| Wi-Fi            | POWR316D<br>POWR320D<br>POWR316<br>POWCTS60TPF<br>S60TPG<br>SN-ESP32D0-POWR3-01<br>CK-ESP32D0-POWCT-01                                               | LAN&Cloud     | Switch<br>Current<br>Voltage<br>Power<br>Network indicator<br>Power-on behavior<br>RSSI                             |
| Wi-Fi            | POWR3<br>S31<br>CKCP-002<br>PSC-B67-GL<br>PSF-X67<br>PSF-P76-R3(32)                                                                                  | LAN&Cloud     | Switch<br>Current<br>Voltage<br>Power<br>Network indicator<br>Power-on behavior<br>RSSI                             |
| Wi-Fi            | CK-BL602-DLQ-01(226)<br>CK-BL602-W102SW18-01(226)                                                                                                    | LAN&Cloud     | Switch<br>Power-on behavior<br>Inching settings<br>Network indicator<br>Current<br>Voltage<br>Power                 |
| Wi-Fi            | CK-BL602-SWP1-02(262)                                                                                                                                | LAN&Cloud     | Switch<br>Power-on behavior<br>Inching settings<br>Network indicator<br>Current<br>Voltage<br>Power                 |
| Matter&Bluetooth | S61STPF<br>S41STPB<br>WS01TPF-E<br>WS01TPE-E<br>CK-BK7238-W205PL00-01(276)<br>S61STPF-PM-O<br>BASIC-1GSP<br>S60TPF-M<br>CK-BK7238-W205PL00-1BSD(276) | LAN&Cloud     | Switch<br>Power-on behavior<br>Inching settings<br>Network indicator<br>Current<br>Voltage<br>Power                 |


### Curtain
#### Curtain
| Device Protocol | Model                                                                                              | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wi-Fi           | PSF-BTA-GL(11)                                                                                     | Cloud                                                                                                                                                           | Open, close, pause<br>Network indicator<br>RSSI                                                                                                                                 |
| Wi-Fi           | DUALR3                                                                                             | LAN&Cloud                                                                                                                                                       | Open, close, pause<br>Network indicator<br>RSSI                                                                                                                                 |
| Wi-Fi           | E32-2SW-P0(165)<br>DUALR3 Lite                                                                     | LAN&Cloud                                                                                                                                                       | Channel control<br>Open, close, pause<br>Mode<br>Network indicator<br>Power-on behavior<br>Inching settings<br>Energy consumption                                               |
| Zigbee          | NON-OTA-GL(1514)                                                                                   | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Motor calibration<br>Open, close, pause<br>Percentage control<br>Motor reverse<br>Battery                                                                             |
| Zigbee          | ZBCurtain<br>ZB_Curtain<br>ZBU-CURT-7006<br>CK-BL702-Z302SW00-01(7006)-2<br>SN-BL702-ZNCL-01(7006) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Open, close, pause<br>Curtain position percentage<br>Motor reverse<br>Motor calibration<br>Motor control                                                                        |
| Zigbee          | SNZB-06P<br>CK-BL702-MWS-01(7016)<br>CK-BL702-MWS-02(7016)                                         | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Mode<br>Curtain position percentage<br>Motor reverse<br>Motor calibration                                                                                             |
| Zigbee          | MYJC24Z-H<br>CK-MG22-Z310EE07MY4-01(7023)                                                          | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Run mode<br>Network indicator<br>Inching settings<br>Temperature<br>Humidity<br>Battery<br>Curtain position percentage<br>Motor reverse<br>Speed level<br>Illuminance |
| Zigbee          | MINI-ZBRBS-ZS<br>MINI-ZBRBS                                                                        | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Switch<br>Mode<br>Curtain position percentage<br>Motor reverse<br>Motor calibration                                                                                             |


### Sensor
#### Temperature & Humidity Sensor
| Device Protocol | Model                                                                                         | Access Method                                                                                                                                                   | Synchronization Capability to HA                                           |
| --------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Zigbee          | SNZB-02<br>TH01                                                                               | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | Temperature<br>Humidity<br>Battery<br>RSSI                                 |
| Wi-Fi           | Ck-BK7238-W105SE10-01(242)<br>CK-BK7238-W105SE10-01-HB(242)<br>CK-BK7238-W105SE10-01-HYL(242) | Cloud                                                                                                                                                           | Temperature<br>Humidity<br>Battery<br>RSSI                                 |
| Zigbee          | CKZB-02P<br>SN-CC2652P-ZB02(7001)<br>CK-TLSR8656-SS5-01(7001)                                 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Temperature<br>Humidity<br>Battery<br>RSSI                                 |
| Zigbee          | SNZB-02D                                                                                      | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Temperature<br>Humidity<br>Battery<br>RSSI                                 |
| Zigbee          | SNZB-02WD<br>SNZB-02LD<br>ZBU-TEMP-7033                                                       | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Temperature<br>Humidity<br>Battery<br>RSSI                                 |
| Zigbee          | SNZB-02DR2                                                                                    | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Temperature and humidity comfort status<br>Temperature<br>Humidity<br>RSSI |


#### Wireless Button
| Device Protocol | Model                     | Access Method                                                                                                                                                   | Synchronization Capability to HA                          |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Zigbee          | SNZB-01<br>SNZB-01P       | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | press event<br>Battery<br>RSSI                            |
| Wi-Fi           | R5<br>NON-OTA-GL(174)     | Cloud                                                                                                                                                           | Multi-button press events<br>RSSI<br>Battery              |
| Wi-Fi           | NON-OTA-GL(265)           | Cloud                                                                                                                                                           | press event<br>Battery<br>RSSI                            |
| Zigbee          | zigbee_ON_OFF_SWITCH_1000 | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | press event<br>Battery<br>RSSI                            |
| Zigbee          | NON-OTA-GL(1001)          | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | press event<br>Battery<br>RSSI                            |
| Zigbee          | NON-OTA-GL(1002)          | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Multi-button press events<br>Battery<br>RSSI              |
| Zigbee          | NON-OTA-GL(1003)          | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Multi-button press events<br>Battery<br>RSSI              |
| Zigbee          | NON-OTA-GL(1004)          | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Multi-button press events<br>Battery<br>RSSI              |
| Zigbee          | NON-OTA-GL(1006)          | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Multi-button press events<br>Battery<br>RSSI              |
| Zigbee          | SNZB-01P                  | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Single press, double press, long press<br>Battery<br>RSSI |
| Zigbee          | SNZB-01M                  | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Battery<br>Multi-button press events<br>RSSI              |


#### Motion Sensor
| Device Protocol | Model                                                                                    | Access Method                                                                                                                                                   | Synchronization Capability to HA                       |
| --------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Zigbee          | MS01<br>SNZB-03                                                                          | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | Motion detect<br>Battery<br>RSSI                       |
| Zigbee          | SNZB-03P<br>SN-CC2652P-ZB03(7002)<br>CK-TLSR8656-SS5-01(7002)<br>CK-TLSR8656-LO-01(7002) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Motion detect<br>Illumination level<br>Battery<br>RSSI |
| Zigbee          | SNZB-06P<br>CK-BL702-MWS-01(7016)<br>CK-BL702-MWS-02(7016)                               | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Motion detect<br>Illumination level<br>RSSI<br>Battery |


#### Contact Sensor
| Device Protocol | Model                                                                                                  | Access Method                                                                                                                                                   | Synchronization Capability to HA                              |
| --------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Wi-Fi           | DW2-Wi-Fi<br>OPL-DMA                                                                                   | Cloud                                                                                                                                                           | Lock<br>Battery<br>RSSI                                       |
| Zigbee          | DS01<br>SNZB-04<br>                                                                                    | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | Lock<br>Battery<br>RSSI                                       |
| Wi-Fi           | DW2-Wi-Fi-L<br>CK-BK7238-W105SE0X-01(154)<br>CK-BK7238-W105SE0X-01-HB(154)                             | Cloud                                                                                                                                                           | Open/close detection<br>Tamper  Detection<br> Battery<br>RSSI |
| Zigbee          | SNZB-04P<br>SNZB-04PR2<br>SN-CC2652P-ZB04(7003)<br>CK-TLSR8656-SS5-01(7003)<br>CK-TLSR8656-LO-01(7003) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Open/close detection<br>Battery<br>RSSI                       |


#### Water Leak Sensor
| Device Protocol | Model                                                                                             | Access Method                                                                                                                                                   | Synchronization Capability to HA  |
| --------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Zigbee          | SNZB-05P                                                                                          | LAN or Cloud<br>(Devices under ZBBridge-P are controlled over the local area network (LAN)),<br>while devices under ZBBridge-U are controlled via the cloud.)   | Leak detection<br>Battery<br>RSSI |
| Zigbee          | SNZB-05P<br>CK-TLSR8656-SS5-01(7019)<br>CK-TLSR8656-LO-01(7019)<br>CK-TLSR8656-Z23SE11HW-01(7019) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Battery<br>Leak detection<br>RSSI |


#### Smoke Detector
| Device Protocol | Model               | Access Method                                                                                                                                                   | Synchronization Capability to HA                  |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Zigbee          | ZIGBEE_SMOKE_SENSOR | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Smoke detection<br>Smoke value<br>Battery<br>RSSI |


#### Air Quality Sensor
| Device Protocol | Model                                                                                  | Access Method | Synchronization Capability to HA                                                                                           |
| --------------- | -------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Wi-Fi           | AQMPM<br>AQMCO2<br>SAWF-08P-MS<br>SAWF-08P<br>SAWF-07P-MS<br>SAWF-07P<br>SAWF-08P-TEST | Cloud         | Audible Alarm Settings<br>Temperature<br>Humidity<br>Indicator light<br>PM2.5<br>PM10<br>CO2<br>Threshold Settings<br>RSSI |


### Thermostat
#### Thermostat
| Device Protocol | Model           | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                                                                                                                                                                                                                        |
| --------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wi-Fi           | NON-OTA-GL(272) | Cloud                                                                                                                                                           | Target temperature<br>Current temperature<br>Current operating status<br>Battery<br>RSSI                                                                                                                                                                                                                                                |
| Zigbee          | TRVZB           | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Open window detection<br>Child lock<br>Target temperature<br>Valve opening percentage<br>Smart thermostat mode<br>Current operating status<br>Schedule mode<br>Boost mode<br>Fault status<br>Screen rotation<br>Current temperature<br>Temperature control precision<br>Temperature calibration<br>Operating voltage<br>Battery<br>RSSI |


### Smart Water Valve
#### Smart Water Valve
| Device Protocol | Model             | Access Method                                                                                                                                                   | Synchronization Capability to HA                                                                                                                       |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zigbee          | SWV-BSP<br>SWV-NH | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Valve control<br>Battery<br>Leak detection<br>Water shortage alarm<br>Fault alarm<br>Cyclic timed irrigation<br>Cyclic quantitative irrigation<br>RSSI |


### Repeater
#### Repeater
| Device Protocol | Model                                                                                      | Access Method                                                                                                                                                   | Synchronization Capability to HA |
| --------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Zigbee          | NSPanelP-Router<br>NON-OTA-GL(7018)<br>CK-MG22-ROUTER-01(7018)<br>CK-BL702-ROUTER-01(7018) | LAN or Cloud<br> (Devices under ZBBridge-P are controlled over the local area network (LAN)),<br> while devices under ZBBridge-U are controlled via the cloud.) | Battery<br>RSSI                  |


### Others
#### Others
| Device Protocol | Model             | Access Method | Synchronization Capability to HA                     |
| --------------- | ----------------- | ------------- | ---------------------------------------------------- |
| Wi-Fi           | iFan04<br>PSF-BFB | LAN&Cloud     | Fan<br>Mode<br>Light<br>RSSI                         |
| Wi-Fi           | T2EU1C-RF         | LAN&Cloud     | Button control<br>Report button-triggered events     |
| Wi-Fi           | T2EU2C-RF         | LAN&Cloud     | Button control<br>Report button-triggered events     |
| Wi-Fi           | T2EU3C-RF         | LAN&Cloud     | Button control<br>Report button-triggered events     |
| Wi-Fi           | T2EU4C-RF         | LAN&Cloud     | Button control<br>Report button-triggered events     |
| Wi-Fi           | RFR2              | LAN&Cloud     | Open, close, pause<br>Report button-triggered events |
| Wi-Fi           | DW2-RF<br>PIR3-RF | LAN&Cloud     | Reporting alarm incidents                            |
| GSM             | GSB-MSW-01(1C)    | LAN&Cloud     | Switch<br>Inching settings<br>Power-on behavior      |
