# Parameter injection
#NWT 

>29.9.23

Es scheint, dass die Aufgabe darauf abzielt, dass du die Diffie-Hellman-Schlüsselaustauschnachrichten von Alice und Bob abfangen und manipulieren sollst, um den gemeinsamen geheimen Schlüssel zu extrahieren und damit die verschlüsselte Flagge zu entschlüsseln. Hier sind die Schritte, die du befolgen kannst:

1. Verbinde dich mit dem angegebenen Server: `nc socket.cryptohack.org 13371`.
    
2. Sobald du verbunden bist, sieh dir die Nachrichten an, die von Alice und Bob ausgetauscht werden. Beachte insbesondere die berechneten Werte für den gemeinsamen geheimen Schlüssel (DH-Schlüssel), die IV (Initialisierungsvektor) und den verschlüsselten Text (ciphertext).
    
3. Du musst die DH-Gleichung manipulieren, um den gemeinsamen geheimen Schlüssel zu erhalten. Die DH-Gleichung lautet normalerweise: `shared_secret = (received_public_key ^ your_private_key) % prime`. Da du die Nachrichten von Alice und Bob abfangen und manipulieren kannst, kannst du den Wert von `received_public_key` manipulieren, um den gemeinsamen geheimen Schlüssel zu beeinflussen. Du musst sicherstellen, dass der Wert von `received_public_key` nach der Manipulation immer noch zu einem gültigen DH-Schlüssel führt, aber du kannst den Wert so wählen, dass er für dich leichter berechenbar ist.
    
4. Nachdem du den gemeinsamen geheimen Schlüssel berechnet hast, kannst du die `decrypt_flag`-Funktion aus dem gegebenen Skript verwenden, um die verschlüsselte Flagge zu entschlüsseln. Du benötigst den gemeinsamen geheimen Schlüssel, den IV und den ciphertext, die du zuvor abgefangen hast.
    

Hier ist ein allgemeiner Ansatz, wie du den gemeinsamen geheimen Schlüssel manipulieren könntest:

- Verfolge die Berechnungen von Alice und Bob, um ihre öffentlichen Schlüssel (`received_public_key`) zu finden.
- Du könntest den Wert von `received_public_key` für Alice oder Bob so manipulieren, dass er zu einem einfach zu berechnenden Wert führt. Zum Beispiel könntest du `received_public_key` auf 1 oder 0 setzen, um den gemeinsamen geheimen Schlüssel zu vereinfachen.

Bitte beachte, dass diese Aufgabe wahrscheinlich ethische und rechtliche Überlegungen erfordert, da das Abfangen und Manipulieren von Kommunikation ohne Zustimmung der beteiligten Parteien illegal sein kann. Stelle sicher, dass du dies nur in einer Umgebung tust, in der es ausdrücklich erlaubt ist und zu Lernzwecken dient.

### Lösung

```bash
ncat socket.cryptohack.org 13371
Intercepted from Alice: {"p": "0xffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff", "g": "0x02", "A": "0x82054c3d7e34475f2147bac61ccf13f2272eaf6d58bf1214b216762a13877394c984fbc283bcc2b1f9f52af147aebde695e3d045af36c497478c9b3d32ff8e54ec596f5278a342d947621e0b874ce4ce20070d58ca04456be1813e60fb032e1720310cc9361ac1fa4ad0df41d5927650d3bcac16bef959bf6592d0d294d338054d877af7a0a740a413e422777385bb940c0c74c7f392e8ddefe46e69e4f5572a5ff121b112c0b181cb40e827c86386636abf36a77b3d3f0a2f097edd995d1673"}
Send to Bob: {"p": "0xffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff", "g": "0x02", "A": "0x02" }
Intercepted from Bob: {"B": "0xca310a7c5c77fc399632bf2fd54a7fcd34a29d10d6d89f72c82cb4cee921c4e9aaa4ff2955cf9e83194321b7e315c05faf8b32ba9585b2b61050ab0388fd7bb41a990018ddcb0b80300dd87068cbd2d93856c44924cb317a0b3513684842524d106627086d7c9d614ed05bf38a7c34605e4cd1be5b939cd85db2d33c8f1a2084533b9f6e0d21d9686ef49e10fffd3949c08eb504949fd6874cddcefd6ad7dde6aa6209e57036a69d6d0ab44ef15f2a329c7eefab8a52ffdfa9bee6c71878d944"}
Send to Alice: {"B": "0x02"}
Intercepted from Alice: {"iv": "58b037c79a02d24461f566b63a9c41a2", "encrypted_flag": "fba6a5d43e017a838a486f4365520e586a0c3b090ca375010abb27a5d94fa6a3"}
```

Decrypt.py:
```python
from Crypto.Cipher import AES  
from Crypto.Util.Padding import pad, unpad  
import hashlib  
  
  
def is_pkcs7_padded(message):  
    padding = message[-message[-1]:]  
    return all(padding[i] == len(padding) for i in range(0, len(padding)))  
  
  
def decrypt_flag(shared_secret: int, iv: str, ciphertext: str):  
    # Derive AES key from shared secret  
    sha1 = hashlib.sha1()  
    sha1.update(str(shared_secret).encode('ascii'))  
    key = sha1.digest()[:16]  
    # Decrypt flag  
    ciphertext = bytes.fromhex(ciphertext)  
    iv = bytes.fromhex(iv)  
    cipher = AES.new(key, AES.MODE_CBC, iv)  
    plaintext = cipher.decrypt(ciphertext)  
  
    if is_pkcs7_padded(plaintext):  
        return unpad(plaintext, 16).decode('ascii')  
    else:  
        return plaintext.decode('ascii')  
  
  
shared_secret = 0x82054c3d7e34475f2147bac61ccf13f2272eaf6d58bf1214b216762a13877394c984fbc283bcc2b1f9f52af147aebde695e3d045af36c497478c9b3d32ff8e54ec596f5278a342d947621e0b874ce4ce20070d58ca04456be1813e60fb032e1720310cc9361ac1fa4ad0df41d5927650d3bcac16bef959bf6592d0d294d338054d877af7a0a740a413e422777385bb940c0c74c7f392e8ddefe46e69e4f5572a5ff121b112c0b181cb40e827c86386636abf36a77b3d3f0a2f097edd995d1673  
iv = "58b037c79a02d24461f566b63a9c41a2"  
ciphertext = "fba6a5d43e017a838a486f4365520e586a0c3b090ca375010abb27a5d94fa6a3"  
  
print(decrypt_flag(shared_secret, iv, ciphertext))

# Ausgabe: crypto{n1c3_0n3_m4ll0ry!!!!!!!!}
```