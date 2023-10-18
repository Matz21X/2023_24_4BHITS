# IPv6 config
#NWT 

```shell
# Konfigurationsdatei für MikroTik Router
# Erstellt am [Datum]

# Schnittstellen konfigurieren
/interface ethernet set [ find default-name=ether1 ] name=ether1
 /interface bridge add name=bridge1
 /interface bridge port add bridge=bridge1 interface=ether1
 /interface bridge port add bridge=bridge1 interface=ether2

# IPv6-Adressen zuweisen
 /interface ethernet set [ find default-name=ether1 ] dhcp6-client=yes
 /interface bridge settings set use-ip-firewall=yes
 /ipv6 address add address=fd00::1/64 interface=bridge1

# IPv6-Routing aktivieren
 /ipv6 settings set forward=yes

# Firewall-Regeln erstellen
 /ipv6 firewall filter add action=accept chain=input connection-state=established,related
 /ipv6 firewall filter add action=accept chain=input connection-state=invalid
 /ipv6 firewall filter add action=accept chain=input connection-state=new in-interface=bridge1
 /ipv6 firewall filter add action=accept chain=forward connection-state=established,related
 /ipv6 firewall filter add action=accept chain=forward connection-state=invalid
 /ipv6 firewall filter add action=accept chain=forward connection-state=new out-interface=bridge1

# Router-Ankündigungen aktivieren
 /ipv6 nd set [ find default=yes ] advertise-dns=yes

# DHCPv6-Server konfigurieren
 /ipv6 dhcp-server add name=dhcpv6-interface interface=bridge1 address-pool=pool1 disabled=no

# Adresspool erstellen
 /ipv6 dhcp-server pool add name=pool1 address=your_ipv6_prefix_from_ISP::100-::200

# DNS-Server-Informationen konfigurieren
 /ipv6 dhcp-server set [ find name=dhcpv6-interface ] add-arp=yes address-list="" advertise-dns=yes
/ipv6 dhcp-server config set [ find name=dhcpv6-interface ] name=server1 dns-server=your_dns_server_ipv6

# DHCPv6-Server aktivieren
 /ipv6 dhcp-server enable [ find name=dhcpv6-interface ]

```