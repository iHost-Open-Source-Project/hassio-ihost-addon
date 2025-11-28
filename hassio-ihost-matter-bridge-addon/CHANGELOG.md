## 1.2.0 - 2025-11-28
### Added
#### Support for new devices and corresponding entities:
- Air Conditioner (Entity Type: Climate)
- CO Sensor (Entity Type: Sensor)
- CO2 Sensor (Entity Type: Sensor)
- PM2.5 Sensor (Entity Type: Sensor)
- Illumination Sensor (Entity Type: Sensor)
- Air Quality Sensor (Entity Type: Sensor)
- Gas Sensor (Entity Type: BinarySensor)
- Smoke Sensor (Entity Type: BinarySensor)
- Fan (Entity Type: Fan)

### Changed
#### Optimized device synchronization behavior after Fabric reset:
- Synchronized devices will now be automatically unsynced when the Fabric is cleared.
- When re-pairing with a new platform, users are required to reselect the entities they want to sync, avoiding redundant synchronization and enabling more flexible control.

## 1.1.1 - 2025-07-18
### Fix
- Fix motion mapping errors  
- Fix wireless button synchronization failure  
- Fix the issue where synchronized devices become unsynchronized after HA Core restart  
- Fix empty device list after WebSocket disconnection and reconnection  

## 1.1.0 - 2025-07-03

### Breaking Changes
- Devices previously synchronized using the old **device-level** method will no longer be valid.
- Any automations configured with those devices on third-party Matter platforms may stop functioning.  
  Users should reselect and resync entities to restore full functionality.

### Known Issues
- **Tunable White Bulb - Color Temperature Not Synced.**
   When the color temperature of a tunable white bulb is changed, the updated value is not properly reflected in the Apple Home app.

- **RGB Bulb - Color Changes Not Synced.**
   After changing the color of an RGB bulb, the updated color is not synchronized correctly to the Apple Home and Google Home apps.

- **Device Status Not Updated in Real-Time.**
   In Alexa and Google Home apps, device status doesn't update automatically when the device is controlled from other platforms. You need to manually refresh the device list or open the device details page to view the current status.

- **Brightness Percentage Offset for Lights.**
   In the SmartThings app, the brightness percentage displayed for lighting devices is consistently around 1% higher than the actual brightness level.

- **Curtain Position Percentage Reversed Across Platforms.**
   Curtain open-percentage is interpreted differently across platforms. For example, a curtain showing as 30% open in Alexa would appear as 70% open in Apple Home, SmartThings, and Google Home.

- **Devices Not Showing Up After Re-sync in SmartThings App.**
   If a previously synced device is removed and later re-synced, it may fail to appear immediately in the SmartThings app. Restarting the SmartThings Hub is necessary to resolve this issue.

### Added
- Introduced a UI toggle to enable or disable **Auto Sync**, allowing users to control whether newly added devices are automatically synchronized to the Matter Bridge.

### Changed
- Refactored the synchronization model from **device-level** to **entity-level**, enabling more granular control over which Home Assistant entities are exposed to the Matter Bridge.
- Automatic synchronization upon initial Fabric pairing has been removed. Users must now manually select and sync desired entities from the device list.


