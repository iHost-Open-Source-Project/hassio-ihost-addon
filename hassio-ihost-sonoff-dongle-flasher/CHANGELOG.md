# Changelog

## 1.3.5

### Changed

- Build the published SONOFF 1.3.4 application locally on Home Assistant Alpine 3.24 for amd64/aarch64 and the latest available ARMv7 base, Alpine 3.22.
- Update esptool to 5.6.0 and rebuild the pinned Node.js dependencies for the new runtime.
- Bundle the original firmware catalogue and SONOFF's newer third-party firmware for offline use, verifying third-party binaries with SHA-256 and size checks.

### Added

- Add Zigbee coordinator/router 8.2.2.0 and OpenThread 2.7.2.0 for ZBDongle-E, Dongle-PMG24, Dongle-LMG21 and Dongle-M.
- Offer Zigbee 9.1.2 and OpenThread 3.1.2 prereleases as beta choices without removing existing firmware.
- Show baud rate and flow control beside the selected firmware and repeat the settings before flashing and after success. Integration settings must be changed manually after flashing; missing source metadata is shown as unspecified.

### Fixed

- Actively query USB Silicon Labs dongles for OpenThread and Zigbee versions across supported baud rates before attempting reset-based detection.
- Arm startup detection before GPIO or RTS reset, retain bootloader recovery and legacy detection paths, and return identities found at the final fallback baud rate.
- Accept official and community OpenThread version strings with three or four numeric components, retaining checksum validation for complete and fragmented replies.
- Permit compatible EZSP 19 version queries while retaining minimum-protocol, stack-type and response validation.
- Reject access to a serial device owned by the core OpenThread Border Router app, including by-id aliases, before probing, resetting or changing services. Do not stop OTBR automatically.
- Sort four-component firmware versions numerically so OpenThread 2.7.2.0 appears above 2.4.4 and receives the correct latest-version indicator.

## 1.3.4

### Added

-   Added support for **SONOFF Dongle-MZG23**.

## 1.3.3

### Fixed

-   Force Dongle-E and Dongle-LMG21 flashed with Router firmware into pairing mode when it is powered on.
-   Fixed an issue where certain dongles identified as running unknown firmware could not have a firmware selected for flashing.

## 1.3.2

### Fixed

-   Fixed an issue where certain dongles could not be properly recognized during scanning.

## 1.3.1

### Added

-   Force Dongle-PMG24 flashed with Router firmware into pairing mode when it is powered on.

## 1.3.0

### Added

-   Added support for **SONOFF Dongle-PZG23**.

## 1.2.3

### Fixed

-   Fixed the issue where firmware information for certain dongles could not be properly recognized.

## 1.2.2

### Fixed

-   Fixed the issue where firmware version could not be sorted correctly.

## 1.2.1

### Added

-   Add support for **SONOFF Dongle-LMG21**.

## 1.2.0

### Added

-   Added support for **SONOFF Dongle-M** and **Dongle-PMG24**.

### Changed

-   Added a progress bar display during the **Step 1: Connect** process.

## 1.1.1

### Fixed

-   Fixed add-on malfunction caused by accessing Home Assistant through the HTTPS protocol.

## 1.1.0

### Added

-   Supports more architectures (armv7, aarch64, amd64).
-   Supports flashing SONOFF ZBDongle series (ZBDongle-E, ZBDongle-P). \*Note：The ZBDongle-E for the CH9102 chip is currently not supported.
-   Supports flashing OpenThread, MultiPAN, and custom uploaded firmware.
