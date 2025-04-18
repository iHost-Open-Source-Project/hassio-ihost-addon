# iHost Hardware Control  Add-on

#### Introduction 

iHost Hardware Control add-on registers buttons and indicators on the iHost as entities in Home Assistant, allowing users to configure automation rules for button and indicator entities directly in Home Assistant for more flexible control of hardware interactions.

#### Prerequisites 

- Booting and running Home Assistant on iHost via a pre-flashed microSD card is required to use the **iHost Hardware Control** add-on, as it enables iHost's button and indicator functions. See the [Operation Guide](https://github.com/iHost-Open-Source-Project/ha-operating-system?tab=readme-ov-file#readme) for more details. 

#### Install iHost Hardware Control Add-on

##### Add to Repository

1. Navigate to the Add-on Store > Click the More button in the upper right corner > Select Repository;
2. Enter the URL in the input box: [https://github.com/iHost-Open-Source- Project/hassio-ihost-addon](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon); 
3. Alternatively, click this button to add it automatically.

[![Add Repository](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

##### Install **iHost Hardware Control**  Add-on

1. Search for **iHost Hardware Control** in the Add-ons Store; 
2. Click **Install**;

![img](./hassio-ihost-hardware-control/images/install.png)

3. Wait for the installation to complete.

##### Start **iHost Hardware Control**  Add-on

Click the “start” button after the installation is complete and wait for the start to finish

Since the iHost Hardware Control add-on relies on MQTT, the Mosquitto broker add-on is automatically installed and started for you when you start the iHost Hardware Control add-on, you need to wait a few minutes to see the Mosquitto broker plugin in the add-ons list.

![img](./hassio-ihost-hardware-control/images/start.png)

![img](./hassio-ihost-hardware-control/images/addons.png)



##### Install MQTT integrations

Please go to Settings -> Devices & Services -> click the Add button for MQTT Integration and wait for the addition to complete.

![img](./hassio-ihost-hardware-control/images/mqtt.png)

![img](./hassio-ihost-hardware-control/images/config_mqtt.png)

#### Check iHost Buttons and Indicators in MQTT Integrations

After successfully installing and launching the **iHost Hardware Control** add-on as described above, you can see the buttons and indicators on iHost in the **MQTT** integration.
![img](./hassio-ihost-hardware-control/images/mqtt_devices.png)

##### iHost Buttons and Its Entities

There are 4 buttons on the top of the iHost: for power, pairing, mute, and security. A reset button in a small hole on the side of iHost, all these 5 buttons exist as a device named **iHost buttons**, with 5 **event** entities, as following: 

Note: iHost power button pressed and held for 10s will shut down from hardware.

![img](./hassio-ihost-hardware-control/images/ihost_buttons.png)

![img](./hassio-ihost-hardware-control/images/buttons_device.png)

##### iHost  Indicators and Its Entities

Each of the 4 buttons on the top of the iHost has a blue LED indicator. On the side of the iHost, there is a LED light strip. All the 5 indicators exist as a device named **iHost Indicators**, with 5 **Select** entities, as following:

![img](./hassio-ihost-hardware-control/images/ihost_indicators.png)

![img](./hassio-ihost-hardware-control/images/indicators_device.png)
