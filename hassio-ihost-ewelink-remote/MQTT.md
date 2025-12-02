# **Home Assistant MQTT**
To enhance compatibility between Home Assistant and eWeLink-Remote devices (such as R5, S-MATE, and other BLE-based scene controllers), this section describes how the Add-on adopts Home Assistant’s official **MQTT Event Integration** and **MQTT Device Trigger Integration** to expose device events and channel actions to HA.

  
The following content explains the MQTT topic structure used by the Add-on, as well as the Event Entities, Trigger Entities, and the mechanism for reporting device availability.

# **MQTT Event Integration**
Each capability of the device—together with each physical channel of that capability—is represented as an **Event Entity** in Home Assistant.

Home Assistant documentation: [https://www.home-assistant.io/integrations/event.mqtt/](https://www.home-assistant.io/integrations/event.mqtt/)

## Entity Configuration
**Topic：** homeassistant/event/cube-ha-ewelink-remote-addon-{serialNumber}_{capability}_{channel}/config

**QoS**: 0  
**Retain**: true

+ Field descriptions:
+ **serialNumber**: The unique identifier of the device
+ **capability**: The functional capability of the device (currently only _multi-press_)
+ **channel**: The index of the channel，**The number of channels depends on the device model (e.g., 6 channels for the R5).**

Example configuration payload:

```json
{
  "availability_topic": "cube/ha-ewelink-remote-addon/device/{serialNumber}/{capability}/{channel}/availability",
  "availability_template": "{{ value_json.online }}",
  "payload_available": true,
  "payload_not_available": false,
  "state_topic": "cube/ha-ewelink-remote-addon/device/{serialNumber}/{capability}/{channel}/state",
  "value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
  "device": {
    "model": "{deviceModel}", // e.g., S-MATE OR R5
    "name": "{deviceModel}",
    "identifiers": "cube-ha-ewelink-remote-addon-{serialNumber}",
    "manufacturer": "SONOFF",
    "sw_version": "1.0.0"
  },
  "unique_id": "cube-ha-ewelink-remote-addon-{serialNumber}_{capability}_{channel}",
  "default_entity_id": "event.cube-ha-ewelink-remote-addon-{serialNumber}_{capability}_{channel}",
  "event_types": ["Single Click", "Double Click", "Long Click"],
  "platform": "event",
  "icon": "mdi:gesture-tap-button",
  "name": "{channelName}"
}

```

##  Entity online state  
**Topic：** cube/ha-ewelink-remote-addon/device/{serialNumber}/{capability}/{channel}/availability 

**QoS**: 0  
**Retain**: true

Example payload:

```json
{
  "online":true
}
```

Valid values: true/false

##  Entity state 
**Topic：** cube/ha-ewelink-remote-addon/device/{serialNumber}/{capability}/{channel}/state 

**QoS**: 0  
**Retain**: false

Example payload:

```json
{
  "press":"Single Click",
}
```

Valid values:

+ `"Single Click"`
+ `"Double Click"`
+ `"Long Click"`

## Complete Event Entity Example: SONOFF SwitchMan R5 Scene Controller
###  Channel 1 
####  entity 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1/config 

```json
{
	"availability_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/1/availability",
	"availability_template": "{{ value_json.online }}",
	"payload_available": true,
	"payload_not_available": false,
	"state_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/1/state",
	"value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	},
	"unique_id": "cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1",
	"default_entity_id": "event.cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1",
	"event_types": ["Single Click", "Double Click", "Long Click"],
	"platform": "event",
	"icon": "mdi:gesture-tap-button",
	"name": "Top Left"
}
```

####  entity online state 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1/config 

```json
{
  "online":true
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/1/state 

```json
{
  "press":"Single Click",
}
```

###  Channel 2 
####  entity 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2/config 

```json
{
	"availability_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/2/availability",
	"availability_template": "{{ value_json.online }}",
	"payload_available": true,
	"payload_not_available": false,
	"state_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/2/state",
	"value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	},
	"unique_id": "cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2",
	"default_entity_id": "event.cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2",
	"event_types": ["Single Click", "Double Click", "Long Click"],
	"platform": "event",
	"icon": "mdi:gesture-tap-button",
	"name": "Top Center"
}
```

####  entity online state 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2/config 

```json
{
  "online":true
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/2/state 

```json
{
  "press":"Single Click",
}
```

###  Channel 3 
####  entity 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3/config 

```json
{
	"availability_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/3/availability",
	"availability_template": "{{ value_json.online }}",
	"payload_available": true,
	"payload_not_available": false,
	"state_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/3/state",
	"value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	},
	"unique_id": "cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3",
	"default_entity_id": "event.cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3",
	"event_types": ["Single Click", "Double Click", "Long Click"],
	"platform": "event",
	"icon": "mdi:gesture-tap-button",
	"name": "Top Right"
}
```

####  entity online state 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3/config 

```json
{
  "online":true
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/3/state 

```json
{
  "press":"Single Click"
}
```

###  Channel 4 
####  entity 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4/config 

```json
{
	"availability_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/4/availability",
	"availability_template": "{{ value_json.online }}",
	"payload_available": true,
	"payload_not_available": false,
	"state_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/4/state",
	"value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	},
	"unique_id": "cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4",
	"default_entity_id": "event.cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4",
	"event_types": ["Single Click", "Double Click", "Long Click"],
	"platform": "event",
	"icon": "mdi:gesture-tap-button",
	"name": "Bottom Left"
}
```

####  entity online state 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4/config 

```json
{
  "online":true
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/4/state 

```json
{
  "press":"Single Click"
}
```

###  Channel 5 
####  entity 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5/config 

```json
{
	"availability_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/5/availability",
	"availability_template": "{{ value_json.online }}",
	"payload_available": true,
	"payload_not_available": false,
	"state_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/5/state",
	"value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	},
	"unique_id": "cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5",
	"default_entity_id": "event.cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5",
	"event_types": ["Single Click", "Double Click", "Long Click"],
	"platform": "event",
	"icon": "mdi:gesture-tap-button",
	"name": "Bottom Center"
}
```

####  entity online state 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5/config 

```json
{
  "online":tru
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/5/state 

```json
{
  "press":"Single Click"
}
```

###  Channel 6 
####  entity 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6/config 

```json
{
	"availability_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/6/availability",
	"availability_template": "{{ value_json.online }}",
	"payload_available": true,
	"payload_not_available": false,
	"state_topic": "cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/6/state",
	"value_template": "{\"event_type\": \"{{ value_json.press }}\"}",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	},
	"unique_id": "cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6",
	"default_entity_id": "event.cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6",
	"event_types": ["Single Click", "Double Click", "Long Click"],
	"platform": "event",
	"icon": "mdi:gesture-tap-button",
	"name": "Bottom Right"
}
```

####  entity online state 
 Topic：homeassistant/event/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6/config 

```json
{
  "online":true
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/7032d3f3/multi-press/6/state 

```json
{
  "press":"Single Click"
}
```

# MQTT Device Trigger Integration
In the previous section, each device capability channel was mapped to a Home Assistant **Event Entity**, providing visibility into the device’s event stream.  
In this section, we further convert each event’s **state value** into an actionable **Trigger Entity**, enabling it to be used directly in Home Assistant automations.

In other words: 

For every capability of the device and for every channel within that capability, each action state (e.g., _Single Click_, _Double Click_, _Long Click_) is exposed to Home Assistant as an individual **MQTT Device Trigger**.

Home Assistant documentation: [https://www.home-assistant.io/integrations/device_trigger.mqtt/](https://www.home-assistant.io/integrations/device_trigger.mqtt/)

##  Trigger Entity Configuration 
**Topic：** homeassistant/device_automation/cube-ha-ewelink-remote-addon-{serialNumber}_{capability}_{channel}/{state_value_key}/config 

**QoS**: 0  
**Retain**: true

+ **Field descriptions**
+ **serialNumber**: Unique identifier of the device
+ **capability**: Device capability (currently only `multi-press`)
+ **channel**: Channel index.  
The number of channels depends on the model (e.g., 6 channels for the R5).
+ **state_value_key**: Key representing the action type
    - Single Click → `singlePress`
    - Double Click → `doublePress`
    - Long Press → `longPress`

**Example configuration payload**

```json
{
  "platform": "device_automation",
  "automation_type": "trigger",
  "type": "{channelName}",
  "subtype": "Single Click",
  "payload": "Single Click",
  "topic": "cube/ha-ewelink-remote-addon/device/trigger/{serialNumber}/{capability}/{channel}/state",
  "device": {
    "model": "{deviceModel}",   // e.g., R5 or S-MATE
    "name": "{deviceModel}",    // Device name displayed in HA
    "identifiers": "cube-ha-ewelink-remote-addon-{serialNumber}",
    "manufacturer": "SONOFF",
    "sw_version": "1.0.0"
  }
}
```

##  Entity state 
The state of an MQTT Device Trigger is a **plain string payload**, not a JSON object.  


 Topic：cube/ha-ewelink-remote-addon/device/trigger/{serialNumber}/{capability}/{channel}/state 

**QoS**: 0  
**Retain**: false

```json
"Single Click"
```

**Valid payloads**

+ `"Single Click"`
+ `"Double Click"`
+ `"Long Click"`

These match the device’s physical interaction behavior for the corresponding channel.

##  Complete MQTT Trigger Example：SONOFF SwitchMan R5 Scene Controller 
Below is the full MQTT Device Trigger configuration for the SONOFF SwitchMan R5 Scene Controller.  
The R5 contains **six channels**, and each channel supports `Single Click`, `Double Click`, and `Long Click`.

###  Channel 1 
####  entity 
 singlePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1/singlePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Left",
	"subtype": "Single Click",
	"payload": "Single Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/1/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 doublePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1/doublePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Left",
	"subtype": "Double Click",
	"payload": "Double Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/1/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 longPress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_1/longPress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Left",
	"subtype": "Long Click",
	"payload": "Long Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/1/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/1/state 

```json
"Single Click"
```

###  Channel 2 
####  entity 
 singlePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2/singlePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Center",
	"subtype": "Single Click",
	"payload": "Single Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/2/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 doublePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2/doublePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Center",
	"subtype": "Double Click",
	"payload": "Double Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/2/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 longPress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_2/longPress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Center",
	"subtype": "Long Click",
	"payload": "Long Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/2/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/2/state 

```json
"Single Click"
```

###  Channel 3 
####  entity 
 singlePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3/singlePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Right",
	"subtype": "Single Click",
	"payload": "Single Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/3/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 doublePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3/doublePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Right",
	"subtype": "Double Click",
	"payload": "Double Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/3/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 longPress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_3/longPress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Top Right",
	"subtype": "Long Click",
	"payload": "Long Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/3/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

####  entity state 
 Topic： cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/3/state

```json
"Single Click"
```

###  Channel 4 
####  entity 
 singlePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4/singlePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Left",
	"subtype": "Single Click",
	"payload": "Single Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/4/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 doublePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4/doublePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Left",
	"subtype": "Double Click",
	"payload": "Double Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/4/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 longPress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_4/longPress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Left",
	"subtype": "Long Click",
	"payload": "Long Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/4/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

####  entity state 
 Topic： cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/4/state

```json
"Single Click"
```

###  Channel 5 
####  entity 
 singlePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5/singlePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Center",
	"subtype": "Single Click",
	"payload": "Single Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/5/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 doublePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5/doublePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Center",
	"subtype": "Double Click",
	"payload": "Double Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/5/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 longPress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_5/longPress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Center",
	"subtype": "Long Click",
	"payload": "Long Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/5/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

####  entity state 
 Topic： cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/5/state

```json
"Single Click"
```

###  Channel 6 
####  entity 
 singlePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6/singlePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Right",
	"subtype": "Single Click",
	"payload": "Single Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/6/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 doublePress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6/doublePress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Right",
	"subtype": "Double Click",
	"payload": "Double Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/6/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

 longPress Topic：homeassistant/device_automation/cube-ha-ewelink-remote-addon-7032d3f3_multi-press_6/longPress/config  

```json
{
	"platform": "device_automation",
	"automation_type": "trigger",
	"type": "Bottom Right",
	"subtype": "Long Click",
	"payload": "Long Click",
	"topic": "cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/6/state",
	"device": {
		"model": "R5",
		"name": "R5",
		"identifiers": "cube-ha-ewelink-remote-addon-7032d3f3",
		"manufacturer": "SONOFF",
		"sw_version": "1.0.0"
	}
}
```

####  entity state 
 Topic：cube/ha-ewelink-remote-addon/device/trigger/7032d3f3/multi-press/6/state 

```json
"Single Click"
```

