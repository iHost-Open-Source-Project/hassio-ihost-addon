# SONOFF Dongle Flasher

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg) ![Supports aarch64 Architecture](https://img.shields.io/badge/aarch64-yes-green.svg) ![Supports amd64 Architecture](https://img.shields.io/badge/amd64-yes-green.svg)

## 1. Introduction
SONOFF Dongle Flasher supports online firmware flashing for the iHost MG21 chip and the SONOFF Dongle series (ZBDongle-P, ZBDongle-E, Dongle-M, Dongle-PMG24 and Dongle-LMG21).

## 2. Prerequisite
Before using the add-on, please make sure the serial port is not in use (it is commonly occupied by services like Zigbee2MQTT or ZHA).
During the firmware flashing process, the add-on will attempt to connect to the device and automatically check whether the serial port is occupied.
If it is, the add-on will try to stop the conflicting service for you.
[Operation Guide >](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)

## 3. How to Install SONOFF Dongle Flasher Add-on?
### 3.1 Add SONOFF Dongle Flasher Add-on to Repositories
Skip this step and simply proceed to the Add-on Store to install the required add-on if you have already added the add-ons from this repository (e.g., iHost Hardware Control).
1. Via URL
- Navigate to Settings > Add-on Store> Click the three-dot menu (⋮) in the top right corner and select Repositories
- Enter the repository URL into the input box: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon
2. Via Button Clicking
- Click this button to add the add-on automatically 

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)
### 3.2 Install SONOFF Dongle Flasher Add-on
1.    Search for SONOFF Dongle Flasher in the Add-ons Store.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/find.png)
2.    Click Install
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/install_button.png)
3.   Wait for the installation to complete
### 3.3 Start the SONOFF Dongle Flasher Add-on
After installation, click **Start**  to launch the add-on. Wait until the service has fully started before proceeding.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/start_button.png)
## 4. Use the **SONOFF Dongle Flasher Add-on** to flash Zigbee firmware

Open the web interface and click **"Connect"**. The tool will automatically scan for the iHost MG21 chip and connected Zigbee Dongles on the device running Home Assistant.
(Currently, only **SONOFF ZBDongle-P**, **SONOFF ZBDongle-E**, **SONOFF Dongle-M**, **SONOFF Dongle-PMG24** and **SONOFF Dongle-LMG21** are supported.)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_connect_button.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_connect_scan.png) 

> </font><font color="red">Note*</font> Before clicking **Connect**, please make sure that **Zigbee2MQTT** and **ZHA** are stopped.Flashing requires access to the serial port, and currently, the add-on will automatically check whether the iHost serial port is occupied by Zigbee2MQTT or ZHA when you click **Connect**.
> 
> If either service is running, the add-on will attempt to stop them automatically.
> 
> If Zigbee2MQTT or ZHA is not stopped beforehand, you may encounter device connection failures during the flashing process.*


### 4.1 Flashing Zigbee NCP Firmware to iHost Internal MG21 Chip
1. Select the MG21 chip of iHost and click **"Confirm"**.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_connect_scan_confirm_button.png)
2. Wait for the connection to be established.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_connect_scan_Waiting%20for%20success.png)
3. Next, select the Zigbee firmware version to flash.(Currently supported versions include: 6.10.9, 7.4.1, 7.4.3, 7.4.4, 8.0.2. This list is for reference only and may be updated over time.)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_Select%20Firmware.png)
4. Click **"Flash"** to start flashing the firmware.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_Flash.png)
5. Wait for the flashing process to complete.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_Flash_success.png)
></font><font color="red">Note*</font> If you plan to switch iHost back from Home Assistant to the CUBE system, please first flash the Zigbee firmware back to **version 6.10.9**.Otherwise, data loss or compatibility issues may occur.
>
> Or If you upgrade the firmware directly to **version 7.4 or above**, make sure to initially configure Zigbee2MQTT to use the **ezsp** adapter.Only after Zigbee2MQTT successfully starts with ezsp, you may reconfigure it to use the **ember** adapter.
>
> **Do not skip this process and directly use the ember adapter**, or you may encounter the following risks:* Starting Zigbee2MQTT with the ember adapter may trigger an error:*"The backup file was created from an unsupported EZSP version."*This may force you to reconfigure your entire Zigbee network.
> 
> **Details**: See the [GitHub discussion on v7.4+ firmware compatibility](https://github.com/Koenkk/zigbee2mqtt/discussions/22919).


![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_ewelink_cube.png)
### 4.2 Automatically Scan for SONOFF ZBDongle-P or ZBDongle-E and Flash Zigbee Firmware

<font color="blue">Before flashing, please insert the SONOFF ZBDongle-P or SONOFF ZBDongle-E into the USB port of the device running Home Assistant.</font>。
1. Open the web interface and click "Connect". It will automatically scan for the Zigbee dongle connected to the device running Home Assistant.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Auto_scan.png)
2. Select the dongle you want to flash and click **"Confirm"**.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Auto_confirm.png)
3. Select the Zigbee firmware version you want to flash.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Auto_Select%20Firmware.png)
4. Click **"Flash"** to start the firmware flashing process.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Auto_flash.png)
5. Wait for the flashing process to complete.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Auto_Flash%20complet.png)
### 4.3 Manually Locate SONOFF ZBDongle-P or ZBDongle-E and Flash Zigbee Firmware
<font color="blue">Before flashing, please insert the SONOFF ZBDongle-P or SONOFF ZBDongle-E into the USB port of the device running Home Assistant.</font>

1. If the dongle is not found during automatic scanning, you can click the **"Manually add device"** option on the scan page to locate it manually.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manually.png)

2. Select "Device Model" and "Baud Rate", enter the "Serial Port Path", and click "Confirm".
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manually_Information.png)
You can follow the prompt: **"Please go to Settings > System > Hardware > All Hardware"**, and find the **serial port path** of the hardware device you want to add.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manually_hint1.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manually_hint2.png)
3. Select the Zigbee firmware version you want to flash.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manual_Select%20Firmware.png)

4. Click **"Flash"** to begin flashing the firmware.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manual_flash.png)

5. Wait for the flashing to complete. (During the flashing process, please disable ZHA and Zigbee2MQTT. You can restart them after the flashing is complete.)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/Dongle_Manual_Flash%20complet.png)

> </font><font color="red">Note*</font> When manually flashing firmware to the ZBDongle-P, the progress may sometimes get stuck at 0%.
> 
> **Possible causes:**
> - Mismatched model: The selected device model is ZBDongle-E, but the device connected > to the specified serial port is ZBDongle-P.
> - As a result, the serial port is occupied and cannot be used for another attempt.
> 
> **Please try:**
> - Restart the Add-on to release the serial port.
> - Verify and select the correct de vice model matching your device (ZBDongle-P).
> - Flash the firmware again.

