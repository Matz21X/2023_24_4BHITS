import ipaddress
import subprocess as sp
import threading
import platform
import re

outputs = []
def ping_ip(ip):

    # Führt den ping befehl aus und speichert output in array
    if platform.system().lower() == "windows":
        output = sp.run(["ping", "-n", "1", ip], capture_output=True)
        outputs.append(output)
    else:
        output = sp.run(["ping", "-c", "1", ip], capture_output=True)
        outputs.append(output)
        print("popo")


def main(target_ip, subnet_mask):

    # Erstellung eines Threads für jeden Host ping
    ip_network = ipaddress.IPv4Network(f"{target_ip}/{subnet_mask}", strict=False)
    threads = []
    for ip in ip_network.hosts():
        thread = threading.Thread(target=ping_ip, args=(ip.__str__(),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()


if __name__ == "__main__":
    target_ip = input("Ziel-IP-Adresse eingeben: ")
    subnet_mask = input("Subnetzmaske eingeben (z.B. 24): ")

    main(target_ip, subnet_mask)
    ip_pattern = re.compile(r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b')
    online = []
    offline = []

    for element in outputs:
        if ("Pakete: Gesendet = 1, Empfangen = 1, Verloren = 0" in str(element)
                and "Zielhost nicht erreichbar" not in str(element)):
            match = ip_pattern.search(str(element))
            if match:
                online.append(match.group(0))
        else:
            match = ip_pattern.search(str(element))
            if match:
                offline.append(match.group(0))

    online.sort()
    print("--- ONLINE ---")
    for on_hosts in online:
        print(on_hosts)

    offline.sort()
    print("--- OFFLINE ---")
    for off_hosts in offline:
        print(off_hosts)
