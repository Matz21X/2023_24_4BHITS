DH hilft sich einen gemeinsamen Schlüssel über ein unsicheres Medium auszumachen 
(Key Exchange) Diffie-Hellman
One-Way-Functions



![[Kryptographie.drawio.svg]]


Öffentliche Parameter:
- p ... Primzahl
- g ... Element von {1, 2, 3, ..., p-1}


Alice:
a = K<sub>PrivA</sub> ∈ {2, 3, 4, ..., p-2}
A = K<sub>PubA</sub> ∈ {g<sup>a</sup> % p}
K<sub>AB</sub> ∈ B<sup>a</sup> mod p


Bob:
b = K<sub>PrivB</sub> ∈ {2, 3, ..., p-2}
B = K<sub>PubB</sub> ∈ {g<sup>b</sup> % p}
K<sub>AB</sub> ∈ A<sup>b</sup> mod p

Beweis:
B<sup>a</sup> = (g<sup>b</sup>)<sup>a</sup> ∈ g<sup>ab</sup> mod p
A<sup>b</sup> = (g<sup>a</sup>)<sup>b</sup> ∈ g<sup>ab</sup> mod p


[cryptohack.org]

#NWT 

