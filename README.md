# Security Labs Portfolio

This portfolio highlights hands-on cybersecurity projects focused on malware analysis, IoT security, packet analysis, defensive recommendations, and technical investigation. The emphasis is on browser-readable writeups, clear findings, and analyst-style documentation rather than raw coursework uploads.

## Featured Projects

| Project | What It Demonstrates | Skills |
| --- | --- | --- |
| [IoT Govee Lightbulb Security Lab](iot-govee-lightbulb-security-lab/) | Analyzed a Govee H6008 Wi-Fi/BLE smart bulb, captured encrypted cloud traffic, reproduced owner-authorized control through the vendor API, tested replay behavior, and wrote practical network segmentation recommendations. | IoT security, Wireshark, tcpdump, TLS analysis, REST API testing, MQTT, BLE, API key handling, network segmentation |
| [Malware Memory Hunting Capstone](malware-memory-hunting-capstone/) | Investigated a simulated enterprise breach involving SQL injection, malware discovery, packed executables, reverse engineering, hash verification, and XOR-encrypted data recovery. | Malware triage, YARA, PEiD, UPX, Cutter, Bstrings, HashMyFiles, static analysis, reverse engineering, incident reconstruction |

## Coursework Archive

These older labs are retained as supporting evidence of fundamentals. They are intentionally secondary to the featured projects above.

| Lab | Summary | Skills |
| --- | --- | --- |
| Configuring a VPN with pfSense | Built VPN services and firewall rules using pfSense, including IPsec, OpenVPN, certificates, and rule tuning. | VPN configuration, certificates, firewall administration |
| Encryption and Hashing | Used GnuPG, RSA keys, MD5, and SHA1 to demonstrate confidentiality and integrity concepts. | Public-key cryptography, hashing, Linux CLI |
| Ethernet and ARP Analysis | Captured and analyzed ARP behavior while reviewing IP configuration, routing, and local network resolution. | Wireshark, packet analysis, ARP, routing basics |
| Penetration Testing a pfSense Firewall | Reviewed firewall configuration, ran vulnerability scans, performed black-box testing, and documented hardening recommendations. | Vulnerability assessment, Nmap, Nessus/OpenVAS, firewall review |
| Static Malware Analysis Assignment | Analyzed a packed ransomware-style sample, identified persistence indicators, extracted embedded strings, and documented IOCs. | Static malware analysis, string extraction, IOC development |

## Portfolio Notes

- Public writeups are sanitized and do not include raw malware, decrypted customer data, private packet captures, credentials, API keys, or sensitive screenshots.
- The strongest projects are written in Markdown so reviewers can evaluate them directly in the browser.
- Older coursework artifacts are preserved as background, but the featured projects should be treated as the primary portfolio evidence.