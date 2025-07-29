# Changelog  

## 0.2.3  
### Fixed  
- Fixed add-on malfunction caused by accessing Home Assistant through the HTTPS protocol.

## 0.2.2  
### Fixed  
- Fix the issue where the automation associated with eWeLink-Remote Sub-device is mistakenly triggered after restarting the MQTT Broker.

## 0.2.1  
### Fixed  
- Fixed an issue where the plugin stopped working due to a misjudgment that Bluetooth integration did not exist because the WebSocket long connection interface response timed out.
- Fixed an issue where device or entity names could not be synchronized due to a failure to call the device and entity list interface.

## 0.2.0  
### Added  
- Add-on adds support for x64 architecture  
### Changed  
- Optimizes the default name display of the eWeLink-Remote sub-device entity  
- After the eWeLink-Remote sub-device entity name is changed, the entity name associated in the automation will change accordingly (after the entity name is changed, the automation can run normally but the UI display will change to Unknown trigger. After re-saving, the UI display can return to normal)