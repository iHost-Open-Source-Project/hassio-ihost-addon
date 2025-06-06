# eWeLink-Remote Add-on
## 1. Introduction
"eWeLink-Remote Control" is a remote control solution exclusive to SONOFF's devices, offering an enhanced alternative to traditional 433MHz RF control. It provides more reliable, longer-range, and easier control of your smart devices. eWeLink-Remote network includes an eWeLink-Remote gateway device and multiple sub-devices.[ See more >](https://sonoff.tech/news-and-events/what-is-ewelink-remote-control/)  
eWeLink-Remote Add-on supports using devices such as R5, R5W, S-Mate, and S-Mate2 acting as eWeLink-Remote gateways.  
## 2. Prerequisite
The hardware on which Home Assistant is installed needs to have a Bluetooth module, and the running Home Assistant has Bluetooth [ passive scanning ](https://www.home-assistant.io/integrations/bluetooth/#passive-scanning) enabled.
Enable Bluetooth passive scanning: Go to Bluetooth Integration > Configuration > Configure Bluetooth Options, check Passive Scanning, and click Submit. 
## 3. How to Install eWeLink-Remote Add-on?
### 3.1 Add eWeLink-Remote Add-on to Repositories
Skip this step and simply proceed to the Add-on Store to install the required add-on if you have already added the add-ons from this repository (e.g., iHost Hardware Control).
1. Via URL
- Navigate to Settings > Add-on Store> Click the three-dot menu (⋮) in the top right corner and select Repositories
- Enter the repository URL into the input box: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon
2. Via Button Clicking
- Click this button to add the add-on automatically 

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)
### 3.2 Install eWeLink-Remote Add-on
1.    Search for eWeLink-Remote in the Add-ons Store.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/find.png)
2.    Click Install
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/install_Addon.png)
3.   Wait for the installation to complete
### 3.3 Start the eWeLink-Remote Add-on
After installation, click Start to launch the add-on. Wait until the service has fully started before proceeding.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/start.png)
## 4. Add devices via eWeLink-Remote Add-on
1.  Click "Web Interface" to enter the Add-on operation interface.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/open_web_ui.png)
**Note*:**
- When using eWeLink-Remote Add-on, you need to ensure that the Bluetooth function of Home Assistant can be used normally (the Bluetooth module is normal), otherwise the prompt content in the picture will appear
- Before clicking "Pair" to start adding devices, you need to configure and enable Bluetooth "[ passive scanning ](https://www.home-assistant.io/integrations/bluetooth/#passive-scanning)  " to detect and connect to eWeLink-Remote devices. If it is not enabled in advance, a prompt page will appear. You can follow the prompt path (Go to Bluetooth Integration > Configuration > Configure Bluetooth Options, check Passive Scanning, and click Submit.) to enable it.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-ewelink-remote/images/no_blue.png)
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