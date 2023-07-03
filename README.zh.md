# 🔒波利比奥斯方阵密码 Pro

[English](README.md) | 中文

波利比奥斯方阵密码（Polybius square cipher），也称棋盘密码，优点是简单易懂，但缺点是加密强度较低，容易被破解。
因此，棋盘密码通常被用于一些简单的加密场景，而不适用于对安全性要求较高的情况。

为了提升其加密强度，笔者进行了如下改良：
1. 🏁密钥加强，将原来5×5的方阵提升为9×9
2. 🔐插空处理，向加密后的密码中插入新的随机数字进行干扰，避免相同明文被词频分析破解
3. 🌗移位加密，在头部添加一位0~9的随机数字，尾部添加加密密文长度的数字和及一位校验码
4. ↩️逆向打乱，将新生成的密码用密钥反向解密，得到乱码

## 特点
1. 相同的明文输出的`密文不同`
2. 加密后立即解密，便于核对明文
3. 纯字符串替换解释，计算量小，精确度高
4. 输出的密文复杂程度高，长度大约为明文的两倍
5. 密钥可以`自定义`且种类多，相同的字符有81!种组合方式
6. 输入明文长度最多可达1000+字符（更多调参即可，但不推荐）

## 开始

### 网站

( ￣︶￣ )✓ 它仍在建设中，您可以期待一下qwq

### 安装
1. 克隆存储库
```shell
Git clone https://github.com/wzyskq/polybius_square_pro.git
```
2. pip 以下载模块
```python
pip install polybius-square-pro
```

## 使用

**clone:**

- 普通加密
    1. 双击 " Polybius Squire Pro.py "
    2. 选择模式：

       - 加密（Encode）：输入 'encode'
       - 解密（Decode）：输入 'decode'
       - 退出（Out）：输入 '0'

       默认为加密模式
    3. 输入明文（Plaintext）或密文（Ciphertext）
    
- 批量加密

    1. 在当前目录下创建一个`demo.md`文件，将要加密的内容单独换行，并在该行前添加`->`并空格，然后输入明文
    2. 双击 " Polybius Squire Pro with Files.py "，`demo.md` 自动加密文件并将程序后缀改为`.exe`
    3. 若需要再次批量加密，请更改 " Polybius Squire Pro with Files.exe " 后缀，或双击 "rename.py"

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

## 许可证

在 MIT 许可证下分发。有关详细信息，请参阅`许可证`。
