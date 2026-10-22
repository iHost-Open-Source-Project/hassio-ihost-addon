# Relay-pair covers with OFF confirmation

Use a native MQTT `cover` when the device already provides one. DUALR3 in
motor mode and four independent 4CH channels are different configurations;
do not change firmware or wiring just to apply this example.

For an installation which deliberately exposes two switches per motor,
these examples add a standard Home Assistant Template cover and cover
group, with a parameterised command script and an OFF-only watchdog.
They work with eWeLink MQTT switch entities; they do not modify the app,
MQTT discovery or the device firmware. Home Assistant 2026.10 or newer.

## Requirements

- Correctly installed motor-rated hardware with independent direction
  interlocking, end limits and a device-side maximum runtime. A script is
  not an electrical safety interlock. HA state acknowledgement does not
  prove that a physical contact opened or a motor stopped.
- Two **distinct** switch entities which reliably report ON/OFF. Only one
  controller/watchdog may own each pair; never overlap relay pairs.
- Route every HA direction/Stop command through this controller. Remove
  independent relay-writing automations after reviewing their schedules.
  The optional blocked-actors list is a migration guard, not a mutex.
- Configure timings for the motor specification. The example's 40 seconds
  is illustrative, not a recommended setting for all motors.

## Install

1. Copy `confirmed-relay-cover.yaml` to
   `/config/blueprints/script/ewelink/confirmed-relay-cover.yaml`.
2. Copy `relay-cover-watchdog.yaml` to
   `/config/blueprints/automation/ewelink/relay-cover-watchdog.yaml`.
3. Adapt `package.example.yaml` as a HA package. Replace the example relay
   IDs, script/cover names, unique IDs and both runtime inputs. Add one
   controller, watchdog and cover for each physical pair.
4. Run HA configuration validation before loading. Review startup behaviour:
   the watchdog requests OFF on startup and on invalid relay feedback.
5. Use `cover.open_cover`, `cover.close_cover`, `cover.stop_cover` and a
   standard cover group. No custom frontend or integration is required.

The cover exposes direction inferred from relay feedback and an unknown
idle position. There is no percentage position or assumed end position.
Add actual end-stop/position feedback separately if it is available.

## Behaviour

Every new script request cancels its previous run (`mode: restart`), asks
both relays to turn OFF individually, and requires explicit OFF feedback
from both. Stop ends there. A direction request additionally validates the
pair/timings, waits the configured reversal pause, checks other actors and
checks OFF again before energising just one direction.

Missing, unknown or unavailable feedback cannot satisfy OFF confirmation.
An opposite relay reporting anything except OFF, a selected relay becoming
unavailable, or a new OFF report ends movement early. The wait budget counts
from the ON request. After the wait the script requests both OFF and checks
the result. Refusals/unconfirmed OFF are visible as script trace errors.

The companion watches state changes, HA startup and a 5-second tick. It
cancels the controller and requests both OFF when both directions report
ON, either relay is unavailable or an ON state exceeds the configured limit.
Its time check can be up to one tick late. Delayed reports, service latency,
HA shutdown/reload or network loss prevent a hard real-time guarantee.
Manual Stop through the controller remains available while a run is active.

This is an example for review, not a promise of safety on every motor.
Turning off a disconnected switch cannot confirm or force a physical stop.
Review the hardware-specific limits before enabling it.

## Rollback

Stop the cover, confirm both relays OFF, disable the companion automation,
then remove only the package and its two blueprint files. Validate and
reload the affected HA sections. Preserve the previous controller/config
before installation; do not run both relay writers at once.

## Validation

See the contribution description for the exact HA import/schema/runtime
checks and remaining physical-device limits. Temporary production test
files and home-specific fixtures are not part of this example.

This example was prepared with AI assistance, using synthetic entity names.
It is distributed under the repository's existing MIT license.

References: [Template cover](https://www.home-assistant.io/integrations/template/#cover),
[Cover groups](https://www.home-assistant.io/integrations/group/#cover-groups),
[Script modes](https://www.home-assistant.io/docs/scripts/).
