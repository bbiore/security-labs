# Security Labs Portfolio

This repository collects a selection of hands‑on labs completed by **Nicholas Leoncito** during various information security courses. Each lab demonstrates practical skills in networking, cryptography, penetration testing, and malware analysis. The aim of this portfolio is to showcase technical experience and problem‑solving abilities for prospective employers.

## Contents

| Lab | Description | Skills Demonstrated |
| --- | --- | --- |
| [Lab 01 – Configuring a VPN with pfSense](#lab-01--configuring-a-vpn-with-pfsense) | Configures certificate authorities, server certificates, IPsec tunnels, pre‑shared keys, OpenVPN, and firewall rules on a pfSense firewall. | VPN configuration, certificate management, firewall rule tuning |
| [Lab 02 – Encryption and Hashing](#lab-02--encryption-and-hashing) | Uses GnuPG to generate public and private keys for two users, encrypts and decrypts messages, and demonstrates MD5 and SHA1 hashing with integrity checks. | Public‑key cryptography, hashing, command‑line Linux tools |
| [Lab 03 – Ethernet and ARP Analysis](#lab-03--ethernet-and-arp-analysis) | Inspects IP configuration, routing tables and ARP caches, captures ARP traffic with Wireshark and analyzes request‑reply behaviour. | Network analysis, packet capture, ARP protocol understanding |
| [Lab 04 – Penetration Testing a pfSense Firewall](#lab-04--penetration-testing-a-pfsense-firewall) | Performs a structured penetration test against a pfSense firewall, including configuration review, Nessus and OpenVAS scanning, black‑box testing with Nmap, and research on DMZ best practices. | Vulnerability assessment, penetration testing methodology, DMZ design |
| [Assignment 2 – Malware Analysis](#assignment-2--malware-analysis) | Identifies a packed ransomware sample on a thumb drive, extracts autorun persistence keys, discovers embedded file paths and URLs, and traces the associated Bitcoin wallet address. | Static malware analysis, registry and file path enumeration, indicator extraction |

## Lab 01 – Configuring a VPN with pfSense

**File:** `Leoncito_Wdf712_3423_L01.pdf`

In this lab Nicholas configured a pfSense firewall to provide secure remote access. The tasks included creating a certificate authority and server certificate, configuring IPsec VPN tunnels with appropriate phase 1 and phase 2 parameters, adding pre‑shared keys, and tuning firewall rules to permit VPN traffic. He also used the pfSense OpenVPN wizard to set up an OpenVPN service, defined client and tunnel settings, and verified firewall rules on the WAN and OpenVPN interfaces. Finally, he enabled the Mobility and Multihoming (MOBIKE) option and manually created firewall rules for IPsec. Through this exercise he gained practical experience in deploying VPN services and hardening firewall configurations.

## Lab 02 – Encryption and Hashing

**File:** `leoncito_wdf712_3423_lo2.pdf`

This lab focused on applied cryptography. Using GnuPG on a Linux system, Nicholas generated RSA key pairs for two users (Student and Instructor) and exchanged public keys to enable secure communication. He created MD5 and SHA1 hashes for a text file, saved the hashes to `.md5` and `.sha1` files, and demonstrated how modifying the file produced different hash values. When generating the keys he resolved an entropy shortage by running an entropy script and using the system to produce additional randomness. The lab also required research comparing RSA and ECDSA encryption, summarizing the trade‑offs between security and efficiency. These tasks reinforced concepts of confidentiality, integrity and authenticity in secure communications.

## Lab 03 – Ethernet and ARP Analysis

**File:** `Leoncito-IS3413_Lab-03.pdf`

In this network analysis lab Nicholas examined Ethernet and the Address Resolution Protocol (ARP). He began by using `ipconfig` and `netstat -r` to inspect IP settings and routing tables, then displayed the local ARP cache with `arp -a`. Capturing live traffic with Wireshark, he filtered for ARP packets and selected traffic between his computer’s ASRock network interface and his router. By analyzing request and reply messages he explained how ARP resolves IP addresses to MAC addresses without broadcasting to all devices. The lab concluded with reflections on limitations and the importance of precise network segmentation.

## Lab 04 – Penetration Testing a pfSense Firewall

**File:** `leoncito_wdf712_3423_L04.docx`

This extensive lab simulated a real‑world penetration test against a network protected by a pfSense firewall. Nicholas began with a configuration analysis of Virtual IPs, NAT rules and firewall rules, removing unnecessary exposures. He ran a Nessus vulnerability scan, tightened rules based on the findings, and confirmed the improvements with a follow‑up scan. He then conducted black‑box testing by scanning the firewall with Nmap and OpenVAS to identify open services from an attacker’s perspective. Finally, he researched DMZ best practices and recommended stronger segmentation and access control for public‑facing services. The report includes recommendations for ongoing hardening and demonstrates proficiency in both vulnerability assessment tools and secure network design.

## Assignment 2 – Malware Analysis

**File:** `Assignment2_wdf712_is4533.docx`

This assignment showcases basic static malware analysis skills. Nicholas inspected a collection of executables from a compromised thumb drive and used PEiD to identify `raaserver.exe` as a packed malware sample linked to the OnyxCrew ransomware family. After unpacking the executable he extracted its autorun persistence registry key, discovered the embedded Windows file path `c:\OnyxCrew\ransware\raserver\release` and located a hard‑coded URL pointing to a QR code with a Bitcoin payment address. By calculating the wallet’s approximate USD value he demonstrated an understanding of ransom demands. The assignment reflects familiarity with common malware packing indicators and techniques for extracting indicators of compromise.
