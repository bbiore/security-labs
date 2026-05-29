# IoT Govee Lightbulb Security Lab

## Executive Summary

This project analyzes a **Govee H6008 Wi-Fi + Bluetooth smart bulb** as a consumer IoT security target. The main finding was that device control is **cloud-mediated**, not local: app commands travel to Govee cloud services over HTTPS and are then relayed to the bulb through AWS IoT/MQTT infrastructure.

The project combined packet capture, protocol analysis, Linux API testing, TLS inspection, replay testing, and defensive recommendations. The public version is sanitized and excludes private packet captures, credentials, API keys, and account-specific identifiers.

## Key Findings

| Finding | Evidence | Security Impact |
| --- | --- | --- |
| No direct LAN control was observed | App and bulb communication followed a cloud-mediated path using HTTPS and MQTT/TLS. | The device depends on external cloud infrastructure even when the controller and bulb are on the same local network. |
| TLS encrypted payloads, but metadata remained useful | Packet timing, destination IPs, ports, SNI values, and traffic bursts were still visible. | A network observer may infer device activity even without decrypting payload contents. |
| Linux could reproduce legitimate control through the vendor API | Owner-authorized API requests changed bulb state from a Linux terminal. | Shows how cloud APIs can become a control plane for IoT devices. |
| API authentication relied on a static API key | Requests used the `Govee-API-Key` header with no observed nonce, timestamp, or per-request signature. | A leaked key could allow repeated valid commands until revoked. |
| Raw packet replay was blocked, API-level replay succeeded | TLS prevented network-level replay, but repeated valid API requests were accepted. | Transport security worked, but request-level replay protection was limited. |
| BLE advertisements remained visible | BLE discovery continued after Wi-Fi pairing. | The device exposes a secondary local discovery surface. |

## Architecture Observed

```text
Govee Home App
   |
   | HTTPS / TLS 443
   v
Govee Cloud API
   |
   | MQTT over TLS 8883
   v
AWS IoT MQTT Broker
   |
   v
Govee H6008 Smart Bulb
```

Bluetooth Low Energy was used for initial pairing and local discovery behavior.

## Tools Used

| Tool | Purpose |
| --- | --- |
| Wireshark | Packet capture review and protocol analysis |
| tcpdump | Capture collection from Linux |
| curl | REST API testing from the command line |
| python3 -m json.tool | JSON response formatting |
| hcitool / gatttool | BLE discovery checks |
| Govee Developer API | Owner-authorized device control testing |

## Protocols and Services

| Protocol | Port | Purpose |
| --- | --- | --- |
| HTTPS/TLS | TCP 443 | App-to-cloud and API communication |
| MQTT over TLS | TCP 8883 | Cloud-to-device event and state messaging |
| DNS | UDP 53 or encrypted resolver path | Hostname resolution depending on network configuration |
| NTP | UDP 123 | Time synchronization for TLS/certificate validation |
| BLE | N/A | Pairing and nearby device discovery |

## Linux API Control, Sanitized Example

The original project used owner-authorized API requests from Linux. This public version keeps credentials out of the repository and shows the pattern with environment variables.

```bash
export GOVEE_API_KEY="redacted"
export GOVEE_DEVICE_ID="redacted"
export GOVEE_MODEL="H6008"
```

Representative request pattern:

```bash
curl -s -X PUT \
  -H "Govee-API-Key: ${GOVEE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"device":"'"${GOVEE_DEVICE_ID}"'","model":"'"${GOVEE_MODEL}"'","cmd":{"name":"turn","value":"on"}}' \
  https://developer-api.govee.com/v1/devices/control | python3 -m json.tool
```

## Security Analysis

### What worked well

- Application payloads were encrypted in transit.
- Raw TLS packet replay was not successful.
- The observed TLS configuration used a strong cipher suite.

### What remained risky

- The API key functioned as the primary control credential.
- No client-side way was available to add nonce, timestamp, or per-request signing.
- API-level replay was possible by resending the same valid request.
- Cloud dependency creates an availability risk.
- BLE advertisements continued to expose device presence nearby.

## Defensive Recommendations

| Recommendation | Reason |
| --- | --- |
| Place IoT devices on a guest network or dedicated VLAN | Limits lateral movement if a device or account is compromised. |
| Block IoT-to-main-LAN traffic | Prevents the bulb from reaching trusted endpoints. |
| Allow only required outbound traffic | Reduces unnecessary network exposure. |
| Store API keys outside source code | Prevents accidental credential leaks. |
| Treat the API key like a password | Possession of the key can permit device control. |
| Prefer local-control-capable devices for critical use cases | Reduces dependence on vendor cloud availability. |

## Suggested IoT Firewall Policy

| Rule | Direction | Protocol / Port | Destination | Purpose |
| --- | --- | --- | --- | --- |
| Allow HTTPS outbound | Outbound | TCP 443 | Internet | Govee cloud/API access |
| Allow DNS outbound | Outbound | UDP/TCP 53 or local resolver | Router/DNS | Name resolution |
| Allow NTP outbound | Outbound | UDP 123 | Internet or local NTP | Time sync |
| Block main LAN access | Outbound | Any | RFC1918 internal networks | Prevent lateral movement |
| Block unsolicited inbound | Inbound | Any | Bulb/IoT subnet | Prevent inbound access |
| Deny all other traffic | Both | Any | Any | Default-deny baseline |

## Portfolio Value

This project demonstrates the ability to turn encrypted network traffic into useful security findings. The strongest analyst skill shown here is not simply using Wireshark, but explaining what can still be learned when payloads are encrypted: metadata, timing, protocol roles, cloud dependencies, and defensive implications.

## Sanitization Notes

This repository does not include real API keys, device identifiers, private packet captures, screenshots containing account data, or raw artifacts from the live environment.