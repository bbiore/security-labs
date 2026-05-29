# Milestone 5: Defensive Recommendations and Final Documentation

## Purpose

Milestone 5 finalized the project by reviewing findings from the previous milestones and developing practical defensive recommendations for deploying the Govee H6008 more securely.

## Main Findings Reviewed

- The Govee Developer API uses a static API key.
- No per-request signing, nonce, timestamp, or observed key expiration was found.
- API-level replay was possible by resending the same valid request.
- TLS 1.2 was negotiated with a strong cipher suite.
- All control commands route through Govee's cloud infrastructure.
- User-side mitigation is limited, so network placement and credential handling matter.

## Recommended Mitigations

| Finding | Risk | Recommended Mitigation |
| --- | --- | --- |
| Static API key | Medium | Treat the key as a password and store it outside source code. |
| API-level replay | Medium | Protect the API key because replay protection cannot be added client-side. |
| Broad device access with one key | Medium | Isolate the bulb on a dedicated IoT segment. |
| TLS 1.2 instead of TLS 1.3 | Low | Document as a vendor-side limitation. |
| Cloud-only control | Low availability concern | Use local-control-capable devices for critical lighting needs. |

## Suggested Firewall Rules

| Rule | Direction | Protocol / Port | Purpose |
| --- | --- | --- | --- |
| Allow HTTPS outbound | Outbound | TCP 443 | Allows access to Govee cloud services. |
| Allow DNS outbound | Outbound | UDP 53 | Allows hostname resolution. |
| Allow NTP outbound | Outbound | UDP 123 | Allows clock synchronization. |
| Block main LAN access | Outbound | Any | Prevents lateral movement to trusted systems. |
| Block unsolicited inbound | Inbound | Any | Prevents direct inbound access to the bulb. |
| Default deny | Outbound | Any | Blocks unnecessary traffic. |

## API Key Handling Practices

- Store API keys as environment variables.
- Restrict permissions on scripts that reference sensitive values.
- Never commit real API keys to GitHub.
- Regenerate exposed keys immediately.
- Periodically verify account devices and unexpected behavior.

## Skills Practiced

- Defensive control mapping
- IoT network segmentation planning
- API key risk management
- Firewall rule design
- Final technical documentation

## Main Takeaway

For consumer IoT devices, the most practical user-controlled defense is segmentation. Even when the device's cloud API design cannot be changed, isolating the device can limit the damage caused by compromised credentials or unexpected behavior.
