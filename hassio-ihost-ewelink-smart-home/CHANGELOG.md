# Changelog

This add-on is designed to replace the legacy **eWeLink Smart Home** add-on, enabling devices under your eWeLink account to be synchronized with **Home Assistant** and controlled via either the local network or the cloud. The legacy eWeLink Smart Home add-on will no longer be maintained or updated, as some of its entity implementations rely on deprecated methods. The new project delivers more robust, future-oriented device support.

## 1.0.4

### Added

- Introduced a Button entity for the following device models:
  POW / POWR3 / S31 / THR316 / THR316D / THR320 / THR320D / S40TPB / S40TPA / POWR316D / POWR320D / POWR316 / POWCT / S60TPF / S60TP.
  Pressing the button initiates a temporary active reporting cycle (default interval: 60 seconds), during which the device periodically pushes state updates to Home Assistant. The specific reported states depend on the device model.

## 1.0.3

### Fixed

- Fixed an issue where eWeLink accounts could be automatically logged out under certain conditions.

## 1.0.2

### Changed

- Improved the reconnection mechanism after a network outage.
- Improved the online/offline handling for certain devices.

### Fixed

- Fixed an issue where devices could not be synchronized if an RF Bridge had no sub-devices.

## 1.0.1

### Fixed

- Fixed an issue where the configured third-party MQTT broker could not be used properly.

## 1.0.0

### Added

1. Supports synchronizing devices from your eWeLink account to Home Assistant, with control available via LAN or cloud. [Click to view the list of supported devices](https://github.com/iHost-Open-Source-Project/hassio-ihost-addon/blob/master/hassio-ihost-ewelink-smart-home/DOCS.md).
2. Supports migrating devices already synchronized to Home Assistant from the legacy eWeLink Smart Home add-on to the new one, while preserving existing automations.
3. Supports one-click synchronization of all devices.
4. Supports refreshing the device list with a single click to retrieve the latest devices.
