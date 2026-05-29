# IoT Govee Lightbulb Security Lab

## Overview

This project is a hands-on IoT security lab focused on the **Govee H6008 Wi-Fi + Bluetooth RGBWW LED Smart Bulb**. The goal was to analyze how a consumer smart lightbulb communicates, reproduce legitimate device control from Linux, test security assumptions, and document practical defensive recommendations.

The lab was completed for **IS-4543: Cyber Attack and Defend** and organized into five milestones:

1. Device setup and network architecture design
2. Network traffic capture and protocol identification
3. Reproducing device control from Linux
4. Security analysis and validation testing
5. Defensive recommendations and final documentation

## Skills Demonstrated

- IoT device setup and controlled test network design
- Wireshark and tcpdump packet capture analysis
- TLS, HTTPS, DNS, MQTT, and BLE traffic analysis
- REST API interaction from Linux using curl
- API authentication review and replay testing
- IoT network segmentation and firewall recommendations
- Secure handling of API keys and sensitive configuration values

## Target Device

| Attribute | Value |
| --- | --- |
| Device | Govee H6008 Smart Bulb |
| Type | Wi-Fi + Bluetooth RGBWW LED bulb |
| Wi-Fi | 2.4 GHz only |
| Bluetooth | Bluetooth Low Energy |
| Cloud Backend | Govee Cloud and AWS IoT MQTT |
| Primary App | Govee Home |

## Lab Architecture

The project used a Govee H6008 bulb, a mobile device running the Govee Home app, a Wi-Fi access point, and a Linux analysis machine running tools such as Wireshark, tcpdump, curl, hcitool, and gatttool.

The final architecture showed that control traffic is cloud-mediated rather than LAN-local:

```text
Govee Home App -> Govee Cloud API over HTTPS 443 -> AWS IoT MQTT Broker -> Govee H6008 Bulb over MQTT/TLS 8883
```

Bluetooth Low Energy was also used for initial pairing and device discovery.

## Key Findings

### 1. The bulb does not use direct LAN control

No direct local control path was observed between the Govee Home app and the bulb. Commands were sent through Govee's cloud infrastructure even when the phone, Linux machine, and bulb were on the same network.

### 2. Traffic is encrypted, but metadata is still useful

Application payloads were protected by TLS, but metadata such as destination IPs, ports, timing, packet counts, and TLS SNI values still provided useful evidence about how the device communicates.

### 3. The Govee Developer API can control the bulb from Linux

Linux curl scripts successfully reproduced legitimate control actions, including:

- Turn bulb on
- Turn bulb off
- Set brightness to 50 percent
- Set brightness to 100 percent
- Change color to red
- Change color to white

### 4. API authentication relies heavily on a static key

The Govee Developer API uses an API key passed in the `Govee-API-Key` HTTP header. Testing found no per-request signing, nonce, timestamp, or observed expiration during the project.

### 5. Network-level replay was not successful, but API-level replay was possible

Raw TLS packet replay was not feasible because TLS uses per-session keys and sequence tracking. However, resending the same valid API request with the same API key and body succeeded repeatedly.

### 6. BLE advertisements remain visible

The bulb continued advertising over Bluetooth Low Energy after Wi-Fi pairing, which creates a secondary discovery surface outside normal Wi-Fi monitoring.

## Repository Contents

```text
iot-govee-lightbulb-security-lab/
├── README.md
├── SECURITY_NOTES.md
├── .gitignore
├── docs/
│   ├── milestone-1-summary.md
│   ├── milestone-2-summary.md
│   ├── milestone-3-summary.md
│   ├── milestone-4-summary.md
│   └── milestone-5-summary.md
└── scripts/
    ├── get_devices.sh
    ├── turn_on.sh
    ├── turn_off.sh
    ├── brightness_50.sh
    ├── brightness_100.sh
    ├── color_red.sh
    └── color_white.sh
```

## Safe Usage

The original API key and personal account data are intentionally not included. The scripts use environment variables instead:

```bash
export GOVEE_API_KEY="your_api_key_here"
export GOVEE_DEVICE_ID="your_device_id_here"
export GOVEE_MODEL="H6008"
```

Then run a command such as:

```bash
./scripts/turn_on.sh
```

## Defensive Recommendations

Recommended mitigations from the final milestone include:

- Put IoT devices on a separate guest network or VLAN
- Block IoT devices from reaching the main LAN
- Allow only required outbound traffic such as HTTPS, DNS, and NTP
- Treat the Govee API key like a password
- Store API keys in environment variables instead of source code
- Never commit real API keys, device identifiers, packet captures with secrets, or screenshots exposing credentials

## Notes

This project is for defensive education, IoT security research, and portfolio demonstration. The included scripts reproduce legitimate owner-authorized control through the vendor API and do not contain credentials.