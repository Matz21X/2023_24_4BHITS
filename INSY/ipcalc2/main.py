import ipaddress
import subprocess
import threading
import platform

outputs = []


def ping_ip(ip):
    try:
        if platform.system().lower() == "windows":
            result = subprocess.run(["ping", "-n", "1", ip], capture_output=True, text=True)
        else:
            result = subprocess.run(["ping", "-c", "1", ip], capture_output=True, text=True)

        # Überprüfen Sie das Ergebnis des Pings und fügen Sie es dem Array hinzu
        if "1 packets transmitted, 1 received" in result.stdout:
            outputs.append((ip, 1))  # 1 für erfolgreichen Ping
        else:
            outputs.append((ip, 0))  # 0 für nicht erfolgreichen Ping

    except subprocess.CalledProcessError as e:
        print(f"{ip} ist nicht erreichbar. Fehler: {e}")
        outputs.append((ip, 0))  # 0 für nicht erfolgreichen Ping

def main(target_ip, subnet_mask):
    ip_network = ipaddress.IPv4Network(f"{target_ip}/{subnet_mask}", strict=False)
    print("yes")
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

    main('10.0.0.1', '24')

    for result in outputs:
        ip, status = result
        if status == 1:
            print(f"{ip} ist erreichbar")
        else:
            print(f"{ip} ist nicht erreichbar")
