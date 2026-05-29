# Security Labs Portfolio

Entry-level cybersecurity analyst portfolio focused on SOC-relevant investigation, malware triage, IoT traffic analysis, and evidence-based reporting.

## Featured Projects

### [IoT Govee Lightbulb Security Lab](iot-govee-lightbulb-security-lab/)

Analyzed a Govee H6008 smart bulb using packet capture, API testing, and network traffic review to identify practical IoT security concerns.

- Captured and reviewed Wi-Fi/cloud traffic with Wireshark and tcpdump.
- Reproduced owner-authorized device control through vendor API behavior.
- Documented segmentation and exposure-reduction recommendations for home/SMB environments.

### [Malware Memory Hunting Capstone](malware-memory-hunting-capstone/)

Investigated a simulated enterprise compromise involving SQL injection, malicious executables, packed malware, reverse engineering, and encrypted data recovery.

- Identified SQL injection activity using a YARA search for `%201=@@version--`.
- Located suspicious executables including `winmedia.exe` and UPX-packed `winpress.exe`.
- Used string extraction, hashing, unpacking, and Cutter analysis to recover embedded indicators and reconstruct attacker behavior.

## Coursework Archive

Older coursework labs are retained in `/archive` for reference only, including VPN configuration, encryption and hashing, ARP analysis, and pfSense penetration testing.

## Skills & Tools

Wireshark, tcpdump, curl, YARA, Bstrings, Cutter, UPX, PEiD, HashMyFiles, PowerShell, packet analysis, static malware triage, IOC development, API testing, and incident documentation.
