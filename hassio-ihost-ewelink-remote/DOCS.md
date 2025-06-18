# eWeLink-Remote Gateway
## 1. Introduction
eWeLink-Remote Gateway add-on is an eWeLink-Remote Gateway gateway that supports adding eWeLink-Remote sub-devices and syncing sub-devices  to Home Assistant,such as  **[R5](https://sonoff.tech/product/smart-wall-switches/r5/),[R5W](https://sonoff.tech/product/smart-wall-switches/r5/),[S-Mate](https://sonoff.tech/product/diy-smart-switches/s-mate/),[S-Mate2](https://sonoff.tech/product/diy-smart-switches/s-mate/)**. You can select eWeLink-Remote Gateway sub-devices in Home Assistant Automations and trigger automations through single-click,double-click,and long-press events reported by eWeLink-Remote Gateway sub-devices.**[Learn more](https://sonoff.tech/news-and-events/what-is-ewelink-remote-control/)** about eWeLink-Remote.

## 2. Prerequisite
To use the eWeLink-Remote Gateway Add-on, make sure your Home Assistant setup meets the following conditions:
- The device running Home Assistant must have a functional Bluetooth module (if there is no Bluetooth module, you can configure a Bluetooth Dongle).
- Enable Bluetooth integration
- Bluetooth Passive Scanning must be enabled in Home Assistant.
    - To enable Bluetooth passive scanning: 
    Go to Bluetooth Integration > Configuration > Configure Bluetooth Options, check Passive Scanning, and click Submit. 

## 3. How to Install eWeLink-Remote Gateway Add-on?
### 3.1 Add eWeLink-Remote Gateway Add-on to Repositories
Skip this step and simply proceed to the Add-on Store to install the required add-on if you have already added the add-ons from this repository (e.g., iHost Hardware Control).
1. Via URL
- Navigate to Settings > Add-on Store> Click the three-dot menu (⋮) in the top right corner and select Repositories
- Enter the repository URL into the input box: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon
2. Via Button Clicking
- Click this buttonto add the add-on automatically    
[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)
### 3.2 Install eWeLink-Remote Gateway Add-on
1.    Search for eWeLink-Remote Gateway in the Add-ons Store.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/find.png)
2.    Click Install
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/install_Addon.png)
3.   Wait for the installation to complete
### 3.3 Start the eWeLink-Remote Gateway Add-on
After installation, click Start to launch the add-on. Wait until the service has fully started before proceeding.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/start.png)
## 4. Add devices via eWeLink-Remote Gateway Add-on
1.  Click "Web Interface" to enter the Add-on operation interface.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/open_web_ui1.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/open_web_ui.png)
**Note*:**
- Bluetooth must be enabled in Home Assistant to use the eWeLink-Remote Gateway Add-on. If there is no Bluetooth hardware module (configurable Bluetooth Dongle) or Bluetooth integration is not enabled, the Add-on will not work;
You can check the log to determine whether the Add-on failed to run because the Bluetooth integration is not enabled. 
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Log-image.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Log-Blue.png)
- Before clicking "Pair" to start adding eWeLink-Remote sub-devices, you need to configure and enable Bluetooth "[ passive scanning ](https://www.home-assistant.io/integrations/bluetooth/#passive-scanning)  " to detect and connect to eWeLink-Remote sub-devices. If it is not enabled in advance, a prompt page will appear. You can follow the prompt path (Go to Bluetooth Integration > Configuration > Configure Bluetooth Options, check Passive Scanning, and click Submit.) to enable it.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/passive_scanning.png)
2.  Click "Pair" to start adding devices. 
Countdown is 180 seconds. During the adding process, you can manually click "Quit xxs" to stop adding devices. Press any button of the sub-device during the countdown to complete the device addition. 
**Note*:**
- Supports adding multiple devices within 180 seconds
- The upper limit of adding light smart devices is 50
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Pair.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/add_device.png)
3.  Edit device list  
Click "Edit" to manage the added devices, select the corresponding device, and click "Delete" to confirm to delete the selected device
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Edit.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Del.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Del_1.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/device_deleted.png)
## 5. View devices in Home Assistant
1. View devices in Home Assistant
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/HA_device.png)
2. After the device is added successfully, you can configure scenes in Home Assistant as scene trigger conditions.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/Sence.png)
**Note*:**
- After the eWeLink-Remote sub-device is successfully configured in Home Assistant Automation, if the entity name is changed, the entity name will be displayed as "Unknown" in the automation configuration information, but it will not affect the automation scene triggering.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/UNknow.png)