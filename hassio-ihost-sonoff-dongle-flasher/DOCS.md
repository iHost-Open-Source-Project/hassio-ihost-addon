# SONOFF Dongle Flasher

![Supports armv7 Architecture](https://img.shields.io/badge/armv7-yes-green.svg) ![Supports aarch64 Architecture](https://img.shields.io/badge/aarch64-yes-green.svg) ![Supports amd64 Architecture](https://img.shields.io/badge/amd64-yes-green.svg)

## 1. Introduction

SONOFF Dongle Flasher supports online firmware flashing for the iHost MG21 chip and the SONOFF Dongle series (ZBDongle-P, ZBDongle-E, Dongle-M, Dongle-PMG24, Dongle-LMG21, Dongle-PZG23 and Dongle-MZG23).

In addition to the SONOFF Dongle Flasher app, we also provide a [container version](https://hub.docker.com/r/ewelink/sonoff-dongle-flasher).

### Updated firmware catalogue

The application is reused from the published SONOFF 1.3.4 image; its flashing logic is unchanged. The base is Home Assistant Alpine 3.24 for amd64/aarch64 and 3.22 for armv7. Home Assistant no longer publishes newer ARMv7 base images.

The build combines the [original firmware catalogue](https://github.com/iHost-Open-Source-Project/hassio-ihost-sonoff-dongle-flasher/tree/136ab2fe736a1e5e9c880c2334d2c95adf1e2f25/firmware-build) with [SONOFF's third-party firmware catalogue](https://github.com/SONOFF-Technologies/sonoff-dongle-series-open-source-firmware/tree/aa9dafc12db5f7eee01593f083d679d7d1ef31f0). Firmware is downloaded at build time and served only on loopback at runtime. Third-party binaries are verified against the catalogue's SHA-256 hashes and sizes. No firmware is flashed automatically.

| Device | Stable Zigbee coordinator | Stable OpenThread | Beta Zigbee / OpenThread |
| --- | --- | --- | --- |
| ZBDongle-E | 8.2.2.0, 115200 baud | 2.7.2.0, 921600 baud | 9.1.2, 115200 / 3.1.2, 460800 |
| Dongle-PMG24 | 8.2.2.0, 460800 baud | 2.7.2.0, 460800 baud | 9.1.2, 460800 / 3.1.2, 460800 |
| Dongle-LMG21 | 8.2.2.0, 115200 baud | 2.7.2.0, 460800 baud | 9.1.2, 115200 / 3.1.2, 460800 |
| Dongle-M | 8.2.2.0, 115200 baud | 2.7.2.0, 115200 baud | 9.1.2, 460800 / 3.1.2, 460800 |

Stable firmware comes from [v2025.6.2-update1](https://github.com/Nerivec/silabs-firmware-builder/releases/tag/v2025.6.2-update1). Beta firmware comes from [v2026.6.2-pre1](https://github.com/Nerivec/silabs-firmware-builder/releases/tag/v2026.6.2-pre1); it is not a stable release. Zigbee router firmware is also included, at 115200 baud. The listed coordinator and Thread builds use software flow control, except Dongle-M beta builds, which use no flow control. Beta router builds also use no flow control. None uses hardware RTS/CTS.

Back up your Zigbee network before flashing. Stop ZHA, Zigbee2MQTT or OTBR first, and update the consumer's baud rate after flashing if it changes. Confirm that the consumer supports the selected firmware; downgrading or changing protocols may require restoring a network backup or pairing devices again. Existing firmware choices and the iHost CUBE reset firmware are retained, but this does not guarantee that a downgrade preserves network state.

Installation builds the add-on locally and needs internet access; subsequent catalogue access and firmware downloads use the bundled files. The add-on slug and configuration paths are unchanged.

### Reading and applying serial settings

After a firmware is selected, the upgrade target displays its baud rate and flow control. The firmware choice lists remain compact. The final confirmation and success dialogs repeat the target settings. If the source does not specify flow control, the page says so rather than assuming a value. Custom uploads require the firmware vendor's instructions.

For example, the official PMG24 Zigbee 8.0.2 firmware uses 115200 baud, while the included PMG24 Zigbee 9.1.2 coordinator build uses 460800 baud with software flow control:

1. Back up your Zigbee network and stop the integration using the adapter.
2. Flash the target firmware. Do not apply the new integration settings while the old firmware is still installed.
3. Stop the flasher after flashing completes.
4. In ZHA, open **Settings > Devices & services > ZHA > Configure > Change the current adapter's settings**. Set the serial speed and flow control for the newly installed firmware. For Zigbee2MQTT or OTBR, update the equivalent serial settings.
5. Reconnect the integration. Do not erase the network or re-pair devices to resolve a serial connection error.

The flasher does not update integration settings automatically. Firmware versions with four numeric components, such as OpenThread 2.7.2.0, are ordered numerically alongside three-component versions such as 2.4.4.

### Firmware provenance and identification limits

The original SONOFF catalogue currently provides official Zigbee 8.0.2 firmware for ZBDongle-E and Dongle-PMG24. The newer binaries are downloaded directly from SONOFF's `sonoff-dongle-series-open-source-firmware` repository, which mirrors Nerivec's board-specific builds. The add-on does not compile the Silicon Labs SDK or run a separate Nerivec service.

The `beta` catalogue flag describes Nerivec's `v2026.6.2-pre1` firmware build release, not Silicon Labs' Zigbee 9.1.2 stack release. Restricting the catalogue to SONOFF's original official builds would remove the newer 9.1.2 choices.

The firmware probe negotiates the NCP's EZSP protocol without the old coordinator-only upper limit of 18. Zigbee 9.1.2 uses EZSP 19; its version-query and bootloader-launch command layouts remain compatible with the bundled codec. The minimum protocol, Zigbee stack type and response validation remain enforced. Compatible newer responses are attempted, but this is not a claim of full coordinator support for every future protocol. Flashing still uses the separate Gecko bootloader protocol.

USB ZBDongle-E, Dongle-LMG21 and Dongle-PMG24 identification first requests OpenThread and Zigbee versions at the requested baud rate and the supported 115200, 230400, 460800 and 921600 rates. Successful active identification does not need a hardware reset or startup banner. Official `SL-OPENTHREAD/` and community `OPENTHREAD/` version strings are recognized, including fragmented replies, only after checksum validation. If active queries do not identify the firmware, startup detection is armed before the board-specific reset; the retained upstream path then identifies MultiPAN, router and older NCP firmware and reads its version. Bootloader recovery and iHost GPIO-specific paths remain available.

Before probing or resetting a port, the app checks whether the core OpenThread Border Router app is running on that same device, including a by-id alias. A matching owner produces the serial-port-in-use error; a different Zigbee dongle is not blocked. Stop OTBR manually before connecting the flasher to its adapter. The flasher does not stop or reconfigure OTBR automatically. A completed identification progress bar is not proof that firmware was recognized.

The inherited, pinned application dependencies still report npm audit findings, including a critical finding. This update does not remediate those application dependencies. The inherited application can also write HA authentication tokens to its logs; do not publish unredacted logs. Keep the interface behind Home Assistant ingress; do not expose port 8324 to untrusted networks.

## 2. Prerequisite

Before using the app, please make sure the serial port is not in use (it is commonly occupied by services like Zigbee2MQTT or ZHA).
During the firmware flashing process, the app will attempt to connect to the device and automatically check whether the serial port is occupied.
If it is, the app will try to stop the conflicting service for you.
[Operation Guide >](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)

## 3. How to Install SONOFF Dongle Flasher App?

### 3.1 Add SONOFF Dongle Flasher App to Repositories

Skip this step and simply proceed to the App Store to install the required app if you have already added the apps from this repository (e.g., iHost Hardware Control).

1. Via URL

-   Navigate to Settings > App Store> Click the three-dot menu (⋮) in the top right corner and select Repositories
-   Enter the repository URL into the input box: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon

2. Via Button Clicking

-   Click this button to add the app automatically

[![Open your Home Assistant instance and show the add app repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

### 3.2 Install SONOFF Dongle Flasher App

1.  Search for SONOFF Dongle Flasher in the App Store.
    ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/find.png)
2.  Click Install
    ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/install_button.png)
3.  Wait for the installation to complete

### 3.3 Start the SONOFF Dongle Flasher App

After installation, click **Start** to launch the app. Wait until the service has fully started before proceeding.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/start_button.png)

## 4. Use the **SONOFF Dongle Flasher App** to flash Zigbee firmware

Open the web interface and click **"Connect"**. The tool will automatically scan for the iHost MG21 chip and connected Zigbee Dongles on the device running Home Assistant.
(Currently, only **SONOFF ZBDongle-P**, **SONOFF ZBDongle-E**, **SONOFF Dongle-M**, **SONOFF Dongle-PMG24**, **SONOFF Dongle-LMG21**, **SONOFF Dongle-PZG23** and **SONOFF Dongle-MZG23** are supported.)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_connect_button.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/MG21_connect_scan.png)

> </font><font color="red">Note\*</font> Before clicking **Connect**, please make sure that **Zigbee2MQTT** and **ZHA** are stopped.Flashing requires access to the serial port, and currently, the app will automatically check whether the iHost serial port is occupied by Zigbee2MQTT or ZHA when you click **Connect**.
>
> If either service is running, the app will attempt to stop them automatically.
>
> If Zigbee2MQTT or ZHA is not stopped beforehand, you may encounter device connection failures during the flashing process.\*

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
    > </font><font color="red">Note\*</font> If you plan to switch iHost back from Home Assistant to the CUBE system, please first flash the Zigbee firmware back to **version 6.10.9**.Otherwise, data loss or compatibility issues may occur.
    >
    > Or If you upgrade the firmware directly to **version 7.4 or above**, make sure to initially configure Zigbee2MQTT to use the **ezsp** adapter.Only after Zigbee2MQTT successfully starts with ezsp, you may reconfigure it to use the **ember** adapter.
    >
    > **Do not skip this process and directly use the ember adapter**, or you may encounter the following risks:_ Starting Zigbee2MQTT with the ember adapter may trigger an error:_"The backup file was created from an unsupported EZSP version."\*This may force you to reconfigure your entire Zigbee network.
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

> </font><font color="red">Note\*</font> When manually flashing firmware to the ZBDongle-P, the progress may sometimes get stuck at 0%.
>
> **Possible causes:**
>
> -   Mismatched model: The selected device model is ZBDongle-E, but the device connected > to the specified serial port is ZBDongle-P.
> -   As a result, the serial port is occupied and cannot be used for another attempt.
>
> **Please try:**
>
> -   Restart the App to release the serial port.
> -   Verify and select the correct de vice model matching your device (ZBDongle-P).
> -   Flash the firmware again.
