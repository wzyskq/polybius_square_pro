# 🔒Polybius square cipher Pro

English | [简体中文](README.zh.md)

### About The Project

Polybius square cipher, also known as chess-board cipher, has the advantage of being simple to understand, but the disadvantage is that the encryption strength is low and it is easy to crack.

Therefore, chessboard ciphers are usually used for some simple encryption scenarios, and are not suitable for situations with high security requirements.

In order to improve its encryption strength, the author made the following improvements: 
1. 🏁Key strengthening, the original 5×5 square matrix to 9×9

2. 🔐Insert new random numbers into the encrypted password for interference to prevent the same plaintext from being cracked by word frequency analysis. 

3. 🌗Shift encryption, add a random digit from 0 to 9 to the head, and add a number of encrypted ciphertext length and a check code to the tail.

4. ↩️Reverse scrambles, decrypts the newly generated password with the key in reverse order to obtain garbled code

## ✨Feature

1. The same plaintext output **ciphertext is different**

2. Decrypt the text immediately after encryption for easy verification

3. Pure string replacement interpretation, small calculation and high accuracy

4. The output ciphertext is highly complex and about twice as long as the plaintext

5. The key can be **customized** and there are many kinds of the same character 81! Combination mode

6. Input plaintext length up to 1000+ characters (more parameters can be used, but not recommended)

## ✈️Getting started

### Website

An on-line version has been released [Try it  now ✓](https://wzyskq.github.io/polybius_square_pro/)

### Installation
1. Clone the repo

```shell
git clone https://github.com/wzyskq/polybius_square_pro.git
```
2. pip to get the module
```python
pip install polybius-square-pro
```
## 🎉Usage

**clone:**

- Normal encryption
    1. Double click the `Polybius Squire Pro.py`
    2. Select a mode：

        - Encode: Input `encode`
        - Decode: Input `decode`
        - Out: Input `0`

        The default mode is encryption

    3. Input plaintext or ciphertext

- Bulk encryption
    1. Create a `demo.md` file in the current directory, wrap the content to be encrypted separately, add `->` and a space before the line, and enter the plaintext
    2. Double-click `Polybius Squire Pro with Files.py`, `demo.md` automatically encrypts files and change the program suffix to `.exe`
    3. If you need to bulk encrypt again, change the `Polybius Squire Pro with Files.exe` suffix, or double-click `rename.py`

**pip:**

```python
import polybius_square_pro as psp

inputwords = '...'  # The word you want to encode.

ciphertext = psp.Core.encode(inputwords)
print(ciphertext)

plaintext = psp.Core.decode(ciphertext)
print(plaintext)

# Check
print(inputwords == plaintext)  # True
```



## License

Distributed under the MIT License. See `LICENSE` for more information.

