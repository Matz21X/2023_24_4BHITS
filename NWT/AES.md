AES
https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
https://github.com/pcaro90/Python-AES/blob/master/AES.py (i think) working python implementation
https://cryptohack.org/courses/symmetric THERE IS NO ERROR, it simply uses a column-major array. Just because the text is encode row-wise, that doesn't mean it can't be processed using column-major logic
https://cs.ru.nl/~joan/papers/JDA_VRI_Rijndael_2002.pdf
https://github.com/francisrstokes/githublog/blob/main/2022/6/15/rolling-your-own-crypto-aes.md

INPUT = STATE raw text in 256 bit blocks
4x4 matrix = 16 byte = 256 bits
the matrix is stored COLUMN-MAJOR order
=
[a00, a01, a02, a03
 a10, a11, a12, a13
 a20, a21, a22, a23
 a30, a31, a32, a33]

row-major 	 = a00, a01, a02, a03, a10, ...
column-major = a00, a10, a20, a30, a01, ...

there is ONE MAIN KEY:
128 bits = 10 rounds
192 bits = 12 rounds
256 bits = 14 rounds

each round has ONE ROUND KEY that is derived from the main key
1. derive round keys from main key using AES key schedule
2. addRoundKey: combine each byte of the state with the round key using XOR
3. a special set of instructions is executed every round:
	9, 11, 13 rounds (depending on key size):
	3.1. subBytes: substitute every byte with a pre-defined other byte that is unique from 0-255 = SBOX
	3.2. shiftRows: shift every byte in every row by x (where x = row) to the left
	3.3. mixColumns: combine each byte in every column with a sum (where sum/addition in AES means XOR) over the whole column
	3.4. addRoundKey (see Step 2.)
4. Final round (10, 12, 14):
	4.1. subBytes
	4.2. shiftRows
	4.3. addRoundKey

DECRYPTING uses reverse operations. This is possible since the algorithm at its core relies on simple shifts and XORs which can easily be reversed when the key is known.

#NWT

