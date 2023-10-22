# IPv6
#NWT 

>29.9.23

IPv6, die sechste Version des Internetprotokolls, wurde entwickelt, um die zunehmende Knappheit von IPv4-Adressen zu bewältigen und die Anforderungen der wachsenden vernetzten Welt zu erfüllen. Im Gegensatz zu IPv4 bietet IPv6 einen erheblich größeren Adressraum, der praktisch unerschöpflich ist. Mit <span style="color:#00b050">128-Bit-Adressen (8 x 16-Bit Blöcken)</span> ermöglicht IPv6 die Identifizierung und Verbindung von Milliarden von Geräten und bietet verbesserte Sicherheit und Netzwerkleistung. Es gibt <span style="color:#00b050">keinen Broadcast</span>

Multicast: An ausgewählte Netzteilnehmer 
Broadcast: An alle Netzteilnehmer
Unicast: An einen Netzteilnehmer

Promiscuous-mode: Kein IP-Filtering

**Beispiel Adressen:
`fe80:0000:0000:0001:cafe:0000:000d:affe`
`fe80:0:0:1:cafe:0:d:affe`
`fe80::1:cafe:0:d:affe`

### Scopes

- Global unicast scope: 
```
2/0/0/0::/3
001|0 / 0000 / 0000 / 0000
```

- Link local scope:
```
//Ich erreiche damit alle Adressen die in meinem Layer 2 Segment (Ethernet)

f/e/8/0::/10
1111 / 1110 / 10|00 / 0000
```

- Unicast local scope:
	- `fc00::/7`
- Localhost:
	- `::1/124`
- Multicast scope:
	- `ff00::/8`
- DHCPv6 multicast address:
	- `ff05::1:3`


### EUI-64

Bildet die IPv6 Adresse aus der MAC-Adresse 

```
MAC: 84 : 14 : 4d : 05 : ad : a7
	 ^^ 		 ^^^
Bitflip(7,84)	ff:fe
	 ^^
1000 01'0'0
1234 56 7 8
	|
	V
1000 01'1'0 --> 86

IPv6 Adresse:
86 : 14 : 4d : ff : fe : 05 : ad : a7
fe80::8614:4dff:fe05:ada7/64
```

![[Pasted image 20230929151551.png]]

### NDP (Neighbour Discovery Protocol)

- Solicited-node address (multicast):
	- `ff02::1:ff/104` low order 24 bit eg. ling identifier