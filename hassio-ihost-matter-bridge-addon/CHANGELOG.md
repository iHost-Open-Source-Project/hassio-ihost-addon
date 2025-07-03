## 1.1.0 - 2025-07-03

### Added
- Introduced a UI toggle to enable or disable **Auto Sync**, allowing users to control whether newly added devices are automatically synchronized to the Matter Bridge.

### Changed
- Refactored the synchronization model from **device-level** to **entity-level**, enabling more granular control over which Home Assistant entities are exposed to the Matter Bridge.
- Automatic synchronization upon initial Fabric pairing has been removed. Users must now manually select and sync desired entities from the device list.

### Deprecated
- Devices previously synchronized using the old **device-level** method will no longer be valid.
- Any automations configured with those devices on third-party Matter platforms may stop functioning.  
  Users should reselect and resync entities to restore full functionality.
