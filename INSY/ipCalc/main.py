import ipaddress
import subprocess
import threading
import platform


def ping_ip(ip):
    try:
        if platform.system().lower() == "windows":
            output = subprocess.check_output(["ping", "-n", "1", ip], universal_newlines=True)
        else:
            output = subprocess.check_output(["ping", "-c", "1", ip], universal_newlines=True)

        if "1 packets transmitted, 1 received" in output:
            print(f"{ip} ist erreichbar")
        else:
            print(f"{ip} ist nicht erreichbar")
    except subprocess.CalledProcessError:
        print(f"{ip} ist nicht erreichbar")


def main(target_ip, subnet_mask):
    ip_network = ipaddress.IPv4Network(f"{target_ip}/{subnet_mask}", strict=False)
    print("yes")
    #threads = []
   #for ip in ip_network.hosts():
        #thread = threading.Thread(target=ping_ip, args=(ip,))
        #threads.append(thread)
        #thread.start()

    #for thread in threads:
        #thread.join()


if __name__ == "__main__":
    target_ip = input("Ziel-IP-Adresse eingeben: ")
    subnet_mask = input("Subnetzmaske eingeben (z.B. 24): ")

    main(target_ip, subnet_mask)
