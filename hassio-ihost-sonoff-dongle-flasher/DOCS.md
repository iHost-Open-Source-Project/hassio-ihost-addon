# SONOFF Dongle Flasher For iHost

**_Note:_**

**_Please remain on this page and avoid rebooting or powering off your iHost during connection establishment and Zigbee NCP firmware flashing for the onboard iHost MG21 module. Interruptions may cause unexpected errors and may render the onboard MG21 Zigbee module unusable._**

## Preview

**_SONOFF Dongle Flasher for iHost_** add-on enables online flashing of Zigbee NCP firmware (currently available versions: V6.10.3, V7.4.1, V7.4.3, and V7.4.4) to iHost's onboard MG21 Zigbee module.

## Prerequisite

Home Assistant Operating System **MUST** be running on iHost via an SD card to use this add-on. **SONOFF Dongle Flasher for iHost** add-on is specifically designed for use with the "**HA over iHost**" project, allowing users to update the onboard MG21 Zigbee firmware. Learn [How to run Home Assistant Operating System on iHost?](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)

## How to Install _SONOFF Dongle Flasher for iHost_ Add-on?

### **Add SONOFF Dongle Flasher for iHost Add-on to Repositories**
**Skip** this step and simply proceed to the **Add-on Store** to install the required add-on if you have already added the add-ons from this repository (e.g. **iHost Hardware Control**).  

#### Via URL

- Navigate to **Settings** **>** **Add-on Store>** **Click the three-dot menu (⋮) in the top right corner and select Repositories**.
- Enter the repository URL into the input box: [https://github.com/iHost-Open-Source-Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)

#### Via Button Clicking

- Click the **Add Repository** button to add the add-on automatically.

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

#### Automatic Repository Detection

- If you have already added other add-ons from this repository (e.g., **iHost Hardware Control**), **skip** this step, and simply proceed to the **Add-ons Store** to install the required add-on.

### Install _SONOFF Dongle Flasher for iHost_ Add-on

1. Search for **SONOFF Dongle Flasher for iHost** in the Add-ons Store.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/find_addon.png)

2. Click **Install**.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/install_button.png)

3. Wait for the installation to complete.

## Start the _SONOFF Dongle Flasher For iHost_ Add-on

After installation, click **Start** to launch the add-on. Wait until the service has fully started before proceeding.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/start_button.png)

## Flashing Zigbee NCP Firmware to iHost MG21

1. Click **Open WEB UI > Connect**

Ensure the **Zigbee2MQTT** and **ZHA** are stopped, as flashing requires access to the serial port. If the add-on detects that the serial port is occupied by Zigbee2MQTT or ZHA, it will automatically stop the corresponding service.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/open_web_ui.png)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/connect.png)

Wait until the connection to iHost is successfully established.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/connect_loading.png)

2. Connection Failure

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/connect_failed.png)

Flashing firmware requires access to the serial port. During the flashing process, the add-on will automatically disable ZHA and Zigbee2MQTT. Please note that Zigbee devices will be unavailable until the flashing process is complete.  
If the connection fails, possible causes include:

- The serial port is occupied by another software (e.g. ZHA or Z2M).
- No response received from the device.

Suggested solutions:

- Check and close any application using the serial port, such as the Zigbee2MQTT or ZHA integration.
- Try power cycling the iHost.

3. Select Firmware Version ：

The latest firmware version is selected by default. Or you can click **Select firmware** to select a firmware version.

_Note\*:_

- _If you plan to roll back to the eWeLink CUBE system after running Home Assistant Operating System, you must first downgrade to **Zigbee 6.10.9** firmware. Otherwise, you may encounter data loss or compatibility issues._
- _For firmware updates directly to **version 7.4 or later**, configure Zigbee2MQTT to use the adapter - **ezsp**, on initial startup._
- _**Do not** start directly with the adapter: **ember**. Change driver to **ember** after successfully starting Zigbee2MQTT with the **ezsp** driver. **Otherwise, you may encounter the following critical issues:**_

- _Zigbee2MQTT may report an error message:_
  _"Current backup file is from an unsupported EZSP version."_
- _Skipping this step may lead to network restoration errors or even force reconfiguration of the entire Zigbee network._

_For more details, refer to the GitHub Discussions:_ [_How to upgrade/migrate ZBDongle-E from 6.x firmware to 7.4?_](https://github.com/Koenkk/zigbee2mqtt/discussions/22919)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/change_firmware.png)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/apply_image.png)

Click **Flash** to start flashing the firmware.
**Do not** power off or reboot iHost during process.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/flash_addon.png)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/continue_flash.png)  
Wait for the flashing process to complete.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/flashing.png)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-sonoff-dongle-flasher/images/flash_hint.png)

After the flashing process completes, you can restart the **ZHA** or **Zigbee2MQTT** services.

_Note\*:_

- _For firmware updates directly to **version 7.4 or later**, configure Zigbee2MQTT to use the adapter - **ezsp**, on initial startup._
- _**Do not** start directly with the adapter: **ember**. Change driver to **ember** after successfully starting Zigbee2MQTT with the **ezsp** driver. **Otherwise, you may encounter the following critical issues:**_

- _Zigbee2MQTT may report an error message:_
   _"Current backup file is from an unsupported EZSP version."_
- _Skipping this step may lead to network restoration errors or even force reconfiguration of the entire Zigbee network._

_For more details, refer to the GitHub Discussions:_ [_How to upgrade/migrate ZBDongle-E from 6.x firmware to 7.4?_](https://github.com/Koenkk/zigbee2mqtt/discussions/22919)
