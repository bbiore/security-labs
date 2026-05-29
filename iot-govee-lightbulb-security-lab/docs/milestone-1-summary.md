# Milestone 1: Device Setup and Network Architecture Design

## Purpose

Milestone 1 established the foundation for the IoT security project by selecting the target device, setting up the test environment, documenting the network architecture, and reviewing vendor and community documentation.

## Target Device

The selected device was the **Govee H6008 Wi-Fi + Bluetooth RGBWW LED Smart Bulb**.

## Environment

The planned lab environment included:

- Govee H6008 smart bulb
- 2.4 GHz Wi-Fi access point
- Govee Home mobile app
- Linux analysis machine
- Govee Cloud REST API
- AWS IoT MQTT broker

## Key Architecture Finding

The project identified that the Govee H6008 does not support LAN-only Wi-Fi control. Wi-Fi commands are routed through Govee cloud infrastructure, even when the phone and bulb are on the same local network.

## Protocols Identified

| Protocol | Port | Purpose |
| --- | --- | --- |
| HTTPS/TLS | TCP 443 | Govee cloud API, registration, and state reporting |
| MQTT over TLS | TCP 8883 | AWS IoT event subscriptions and push updates |
| BLE | N/A | Initial pairing and proximity discovery |
| DNS | UDP 53 | Hostname resolution |

## Skills Practiced

- IoT device onboarding
- Controlled network planning
- 2.4 GHz Wi-Fi device setup
- Vendor documentation review
- Cloud-mediated IoT architecture analysis
- Network architecture diagramming

## Main Takeaway

Modern consumer IoT devices often rely on cloud-mediated command paths rather than direct local control. This changes how traffic must be captured and how the device's security posture should be evaluated.
