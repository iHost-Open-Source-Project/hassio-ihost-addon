# Home Assistant Add-on: Silicon Labs Multiprotocol

## Prerequisites
This addon is compatible with SONOFF dongles utilizing Silicon Labs chips, such as the
ZBDongle-E (EFR32MG21).Before using this add-on, you must first flash the MultiPAN firmware 
via [SONOFF Dongle Flasher][sonoff-dongle-flasher]. Another option is flashing firmware 
via [SONOFF Dongle Flasher Add-on][dongle-flasher-addon].

[![Open your Home Assistant instance and show the dashboard of an add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=81bc2df9_sonoff_dongle_flasher_for_ihost&repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)

## Installation

Follow these steps to get the add-on installed on your system:

1. Add eWeLink-Remote Gateway Add-on to Repositories
      - Go to the Add-on Store → Click the More button (⋮) in the upper-right corner → Select Repositories
        Paste the following URL:https://github.com/iHost-Open-Source-Project/hassio-ihost-addon
      - Or, simply click the button below to add it automatically:

      [![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FiHost-Open-Source-Project%2Fhassio-ihost-addon)
      
      ![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-silabs-multiprotocol/images/description-picture_1.png)

2. Install Silicon Labs Multiprotocol(Mod) Add-on
      - Search for Silicon Labs Multiprotocol(Mod) Add-on in the Add-ons Store.
      - Click "Install" button.  
      - Wait for the installation to complete

## How to use

The add-on needs a Silicon Labs based wireless module accessible through a 
serial port (like ZBDongle-E or most USB based wireless adapters).

Once the firmware is loaded follow the following steps:

1. Select the correct `device` in the add-on configuration tab and press `Save`.
2. Start the add-on.

**NOTE:** the Web frontend is only accessible when OpenThread is enabled (see below).

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-silabs-multiprotocol/images/description-picture_2.png)

### Zigbee

The ZHA integration currently only supports EZSP v14, whereas the MultiPAN firmware 
is built on EZSP v16, so it can only be used on Z2M.

To use Zigbee with Z2M configure the Integration as follows:

1. Remember/copy the hostname of the add-on (e.g. c617dadc-hassio-ihost-silabs-multiprotocol).
2. Open the Zigbee2MQTT add-on → Configuration page.
3. Configure the device's serial port path, baudrate, adapter type under serial.

      ```yaml
      adapter: ember
      port: tcp://c617dadc-hassio-ihost-silabs-multiprotocol:9999
      baudrate: 115200

      ```

4. click "SAVE" button. 
5. After completing the configuration,start the Zigbee2MQTT add-on. Wait for about two minutes,
 then you can click to enter the Web UI Console to add and manage devices.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-silabs-multiprotocol/images/description-picture_3.png)

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-silabs-multiprotocol/images/description-picture_4.png)
### OpenThread

At this point OpenThread support is experimental. This add-on makes your Home
Assistant installation an OpenThread Border Router (OTBR). A basic integration
for Home Assistant Core named `otbr` is currently in the making.

To use the OTBR enable it in the Configuration tab and restart the add-on. Home
Assistant should discover the OpenThread border router automatically and
configure it as necessary.

### Web interface (advanced)

There is also a web interface provided by the OTBR. However, the web
interface has caveats (e.g. forming a network does not generate an off-mesh
routable IPv6 prefix which causes changing IPv6 addressing on first add-on
restart). It is still possible to enable the web interface for debugging
purpose. Make sure to expose both the Web UI port and REST API port (the
latter needs to be on port 8081) on the host interface. To do so, click on
"Show disabled ports" and enter a port (e.g. 8080) in the OpenThread Web UI
and 8081 in the OpenThread REST API port field).

## Configuration

Add-on configuration:

| Configuration      | Description                                            |
|--------------------|--------------------------------------------------------|
| device (mandatory) | Serial service where the Silicon Labs radio is attached |
| baudrate           | Serial port baudrate (depends on firmware)   |
| flow_control       | If hardware flow control should be enabled (depends on firmware) |
| network_device     | Host and port where CPC daemon can find the Silicon Labs radio (takes precedence over device) |
| cpcd_trace         | Co-Processor Communication tracing (trace in log)      |
| otbr_enable        | Enable OpenThread BorderRouter                         |
| otbr_log_level     | Set the log level of the OpenThread BorderRouter Agent     |
| otbr_firewall      | Enable OpenThread Border Router firewall to block unnecessary traffic |

## Architecture

The add-on runs several service internally. This architecture diagram shows what
the add-on currently implements.

![](https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-addon/master/hassio-ihost-silabs-multiprotocol/images/architecture.png)

## Support

Got questions?

You have several options to get them answered:

- The [The SONOFF Dongle Website][discord].
- Join the [Reddit subreddit][reddit] in [/r/sonoffdongle][reddit]

In case you've found a bug, please [open an issue on our GitHub][issue].

[discord]: https://dongle.sonoff.tech
[reddit]: https://www.reddit.com/r/sonoffdongle
[issue]: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/issues
[sonoff-dongle-flasher]: https://dongle.sonoff.tech/sonoff-dongle-flasher
[dongle-flasher-addon]: https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/blob/master/hassio-ihost-sonoff-dongle-flasher/DOCS.md
