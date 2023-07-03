# 棋盘密码

def encode(message, key):
    # 预处理输入字符串，将 "J" 和 "j" 转换为 "I" 和 "i"，其他字符不做处理
    # message = ''.join([c.replace('J', 'I').replace('j', 'i') for c in message])

    # 将每个字符的行列编号字符串拼接到一个列表中
    code_list = []
    for char in message:
        i, j = 0, 0
        while i < len(key) and char not in key[i]:
            i += 1
        if i < len(key):
            j = key[i].index(char)
            code_list.append(str(i) + str(j))
        else:
            print('Incorrect input!')
            return False

    # 将列表中的行列编号字符串拼接成一个密文字符串
    ciphertext = ''.join(code_list)
    return ciphertext


def decode(ciphertext, key):
    # 将每个字符的行列编号字符串拼接到一个列表中
    original_list = []
    splited = [ciphertext[i:i + 2] for i in range(0, len(ciphertext), 2)]
    for i in splited:
        i = int(i)
        original_list.append(key[i // 10][i % 10])

    # 将列表中的行列编号字符串拼接成一个明文字符串
    plaintext = ''.join(original_list)
    return plaintext


key = [
    ['A', 'B', 'C', 'D', 'E', '0', '1', '2', '3', '4'],
    ['F', 'G', 'H', 'I', 'K', '5', '6', '7', '8', '9'],
    ['L', 'M', 'N', 'O', 'P', '*', '/', '+', '-', '='],
    ['Q', 'R', 'S', 'T', 'U', '!', '@', '#', '$', '%'],
    ['V', 'W', 'X', 'Y', 'Z', '^', '&', '_', '[', ']'],
    ['a', 'b', 'c', 'd', 'e', '.', ',', ':', ';', '`'],
    ['f', 'g', 'h', 'i', 'k', '~', '|', '<', '>', ' '],
    ['l', 'm', 'n', 'o', 'p', '(', ')', '{', '}', '\\'],
    ['q', 'r', 's', 't', 'u', 'J', 'j', '\'', '\"', '！'],
    ['v', 'w', 'x', 'y', 'z', '《', '》', '，', '。', '？']
]

print('Mode\nEncode: any\nDecode: 1\nOut: 0')
while True:
    print('----- -----')
    check = input('Please choose mode\n>>>')

    if check == '1':
        print('Mode: Decode')
        try:
            plain_text = decode(input(">>>"), key)
            print("Plaintext:", plain_text)
        except:
            print('❌The input format is incorrect!')

    elif check != '0':
        print('Mode: Encode')
        cipher_text = encode(input(">>>"), key)
        if not cipher_text:
            print('❌The input format is incorrect!')
        else:
            print("Ciphertext:", cipher_text)

            plain_text = cipher_text
            print("Plaintext:", decode(plain_text, key))

    else:
        break

# cipher_text = encode('你好3064', key)
# print("Ciphertext:", cipher_text)
# plain_text = cipher_text
# print("Plaintext:", decode(plain_text, key))

# plain_text = decode(input("505152"), key)
# print("Plaintext:", plain_text)
