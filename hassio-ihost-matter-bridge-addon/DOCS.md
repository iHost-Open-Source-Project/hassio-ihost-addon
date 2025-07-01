# Matter Bridge for iHost

## Introduction

Matter Bridge for iHost add-on exposes entities of Home Assistant devices as Matter-enabled devices, enabling them to be integrated with Matter platforms, such as Apple Home, Google Home, and Amazon Alexa.  
This add-on is based on iHost Matter Bridge and has passed Matter certification to ensure protocol compatibility and long-term availability.

At the same time, it is compatible with web and mobile terminals.

## Prerequisite

The **Matter Bridge for iHost add-on** is designed for the **HA over iHost** project **ONLY**, allowing users to expose entities of Home Assistant devices as Matter devices and sync them to supported Matter platforms for control.

Therefore, this add-on is only functional when Home Assistant is running on iHost. Learn [<u>How to run Home Assistant Operating System on iHost?</u>](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme)

## How to Install Matter Bridge Add-on?

### Add Matter Bridge Add-on to Repositories

Skip this step and simply proceed to the Add-on Store to install the required add-on if you have already added the add-ons from this repository (e.g., iHost Hardware Control).

#### Via URL

-   Navigate to **Settings > Add-on Store> Click the three-dot menu (⋮) in the top right corner and select Repositories**.
-   Enter the repository URL into the input box: [<u>https://github.com/iHost-Open-Source-Project/hassio-ihost-addon</u>](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon)

#### Via Button Clicking

-   Click this button [![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon) to add the add-on automatically.

### Install Matter Bridge Add-on

1. Search for **Matter Bridge** in the Add-ons Store.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/search.png)

2. Click **Install**.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/install.png)

3. Wait for the installation to complete.

## Start the Matter Bridge Add-on

After installation, click **Start** to launch the add-on. Wait until the service has fully started before proceeding.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/start-addon.png)

## Use the Matter Bridge Add-on to sync Home Assistant devices to Matter Fabrics

1. Click **Open WEB UI** to access the Matter Bridge Pairing page.  
   Click **Start** to view the preparation for Matter Bridge pairing.  
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/start-1.png)  
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/start-2.png)  
   ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/start-3.png)
2. Follow the instructions to add Home Assistant as a Matter Bridge and sync its devices to the connected Matter Fabrics.

-   Click **Start Pairing**.
-   Scan the **QR code** or enter the **numeric setup code** using the app of any Matter-enabled Platform to pair the Matter Bridge, including:
    -   Apple Home App
    -   Amazon Alexa App
    -   Google Home App
    -   Samsung SmartThings
-   **Go to the device list** and **select the entity** you want to sync to the Matter platform, including:
    -   Switch
    -   Binary sensor
    -   Light
    -   Event 
    -   Cover 
    -   Climate

### ⚠️ Note

Due to differences in how the Matter standard is implemented across smart home platforms, **the same Matter device may appear and behave differently in each ecosystem**. This includes but is not limited to:

-   **Device name display**: Naming rules are defined by each Matter platform, so a single device may appear with different names across platforms.
-   **Device status not updated**: In  Alexa and Google Home App, after controlling a device from another platform, you need to manually refresh the device list (pull-to-refresh) or enter the device detail page to update its status.
-   **Device status display is inconsistent**: In  Smartthings App，the percentage value of the light brightness is always 1% higher than the actual brightness value. Curtain percentage display reverse
-   **Curtain percentage display reverse**:  Different platforms have different definitions of the opening and closing percentages of curtain-type devices. It is known that Alexa and Apple/Smartthings/Google have opposite directions. For example, Alexa displays a percentage of 30%, while Apple/Smartthings/Google displays a percentage of 70%.

![image](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/refs/heads/master/hassio-ihost-matter-bridge-addon/images/support-devices.png)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/qr-code.png)  
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/add-success.png)

## Manage Connected Fabric

After pairing the Matter Bridge, all the connected Matter Fabrics will be shown on the Pairing page.

-   Click to **remove** the connected Matter Fabric that accesses your Matter Bridge and its bridged devices.
-   Click **Remove All** on the right can remove all connected Matter Fabrics.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/remove-all.png)
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/remove-all-confirm.png)

## **<font style="color:#000000;">Manage entities that need to be synced to the Matter platform</font>**

Click **Device List** in the top right corner to access the list of supported and not-supported Home Assistant devices for syncing to Matter Fabrics.  

-   Click **Edit** next to the **Supported Devices** list
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/device-list-1.png)  


-   Select entities you want to sync, or uncheck them to remove from the connected Matter Fabrics.
-   Click **Save**.
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/device-list-2.png)  
![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-matter-bridge-addon/images/device-list-3.png)