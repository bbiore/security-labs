# Security Notes

## Sensitive Data Handling

This project intentionally avoids committing sensitive values such as:

- Govee API keys
- Full device identifiers tied to an account
- Account email addresses
- Raw packet captures that may expose network metadata
- Screenshots showing credentials or private network details

The original milestone work used real API requests against an owned Govee H6008 smart bulb. For portfolio publication, scripts have been rewritten to use environment variables.

## API Key Storage

Use environment variables instead of hardcoding credentials:

```bash
export GOVEE_API_KEY="your_api_key_here"
export GOVEE_DEVICE_ID="your_device_id_here"
export GOVEE_MODEL="H6008"
```

The scripts reference those variables at runtime.

## File Permissions

If a local script or shell profile stores sensitive values, restrict access:

```bash
chmod 700 scripts/*.sh
```

## Git Hygiene

Before committing changes, check for secrets:

```bash
grep -R "Govee-API-Key" .
grep -R "developer-api.govee.com" .
git status
```

Do not commit real API keys or private device identifiers.

## Project Findings

The security testing found that Govee API control relies on a static API key in the `Govee-API-Key` HTTP header. The key is protected in transit by TLS, but if the key is exposed, an attacker can repeatedly issue valid API requests until the key is revoked or changed.

Raw packet replay was not feasible because TLS protects sessions with fresh keys and sequence tracking. API-level replay was possible because the same valid request could be resent with the same static key and body.

## Defensive Recommendations

- Isolate smart devices on a guest network or IoT VLAN.
- Block IoT-to-LAN traffic by default.
- Allow only required outbound traffic such as HTTPS, DNS, and NTP.
- Store API keys outside source code.
- Regenerate exposed API keys immediately.
- Treat smart home cloud dependencies as availability risks.
