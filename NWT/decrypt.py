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


shared_secret = 0xaab4069e14fb84a164ee3df77d6b6f51d8b99c000d1f0e5574d8145999e56da407330a6f7f1057d5f9f391133a929bbe803b59a8cb36c4d1714b34c7c8d12994a0378577c2ad4ca45de85d1649e129e2d5f292113f630005f173976ca4acda88c586fa44b70de95550d697dd249cf7cf16005baa16318a8e83f7af70b969d35fff29ef24a3ffbb7ee12a6b5af57f85036063850f6cd15cc96f7edb4bd605c158337f8e2d6e8f08405081da56be1ba947eb3515be569b8ebf14ddb1a6fce5b471
iv = "c34d973e3577f1eea278cffee34e378b"
ciphertext = "e3f70d2d183573a77f7a753ee4f742b305e9810fef24e4470bff847ef0abe261"

print(decrypt_flag(shared_secret, iv, ciphertext))
