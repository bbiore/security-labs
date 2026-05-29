# Milestone 3: Reproducing Device Control from Linux

## Purpose

Milestone 3 reproduced legitimate control of the Govee H6008 smart bulb from a Linux machine without using the Govee Home mobile app.

## Method

The Govee Developer REST API was used to send commands from Linux with curl. The control endpoint accepted HTTP PUT requests containing JSON command payloads.

## Commands Tested

| Script | Action |
| --- | --- |
| `turn_on.sh` | Turn bulb on |
| `turn_off.sh` | Turn bulb off |
| `brightness_100.sh` | Set brightness to 100 percent |
| `brightness_50.sh` | Set brightness to 50 percent |
| `color_red.sh` | Change bulb color to red |
| `color_white.sh` | Change bulb color to white |

## Result

All tested commands returned successful API responses and the bulb visibly responded once it was powered and connected to the network.

## Important Observation

An API success response does not always guarantee the physical device executed the command. During testing, the API returned success when the bulb was powered off at the wall switch, but the bulb did not respond because it was offline.

## Skills Practiced

- Linux command-line API interaction
- curl request construction
- JSON payload formatting
- REST API testing
- Device ID and model targeting
- Owner-authorized IoT control testing

## Main Takeaway

The Govee H6008 can be controlled from Linux through the vendor API, but the command path still depends on Govee cloud infrastructure rather than direct LAN communication.
