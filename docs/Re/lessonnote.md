---
sidebar_label: '笔记'
sidebar_position: 5
---

# IDA快捷键

界面转换 -空格

字符串 - shift + f12

调用关系- x

反编译- f5

**注释 - /**

**重命名 - n**

改变数值格式 - 右键或者r

提取数据 - shift + e

将汇编代码转换为数据格式 - d

将数据解析为汇编代码 - c

指定函数入口点 - p

# 逆向做题思路

1、执行程序，掌握程序执行逻辑

2、shift + f12 找到关键字符串，双击找到地址

3、找到是谁调用了这个字符串，点击变量名，按x查看调用关系

4、找到关键函数后，f5反编译，阅读伪代码

5、根据伪代码及调试，确定程序逻辑和flag验证机制

6、分析程序如何才能满足校验，根据校验顺序逆推逻辑

分析结果：

flag的每一位与key的每一位异或，结果就是result

7、整合已知数据，判断已知数据与flag的关系，编写脚本解题

1100 flag

1011 key

0111 result



1011 key

0111 result

1100 flag

![image-20240520112707401](http://image.shangu127.top/img/2024/03/image-20240520112707401.png)

# main

![image-20240520144512283](http://image.shangu127.top/img/2024/03/image-20240520144512283.png)

create_key:
![image-20240520144538138](http://image.shangu127.top/img/2024/03/image-20240520144538138.png)

flag_enc[k] = flag_enc[k] ^ key[(s[v5] + key[v5])]

```python
import base64
import pdb

def rc4(key, data):
    # 初始化 S 盒
    sbox = list(range(256))
    j = 0
    pdb.set_trace()
    for i in range(256):
        j = (j + sbox[i] + key[i % len(key)]) % 256
        sbox[i], sbox[j] = sbox[j], sbox[i]

    # 加密或解密
    i = j = 0
    result = bytearray()
    for byte in data:
        i = (i + 1) % 256
        j = (j + sbox[i]) % 256
        sbox[i], sbox[j] = sbox[j], sbox[i]
        k = sbox[(sbox[i] + sbox[j]) % 256]
        result.append((byte ^ k) % 256)

    return bytes(result)


# 测试
# key = b'\x01#Eg\x89\xAB\xCD\xEF'
key = base64.b64decode("ASNFZ4mrze8=")
plaintext = base64.b64decode(
    "EvijgGsuaQp0JLcyU/x6neh7my7v8wtFYwE1t3aMy9nGi4wqqK1nCVwPUtSdJ8PQxZHA6r8N52waahoSt7gYuUbDW5BFe5TmX0/wZnjM6b4LlIQPM66XiEVO0nYRjpn8ytXmJ1d0AZgKzX8NosWrogWihtMOOo66zEOgvDAce0IC3KSqBomXr4HAigv3bP4wlxfqeU9IWw==")
encrypted = rc4(key, plaintext)
decrypted = rc4(key, encrypted)

print("Plaintext:", plaintext)
print("Encrypted:", encrypted)
print("Decrypted:", decrypted)

```

# re2

![image-20240520170351988](http://image.shangu127.top/img/2024/03/image-20240520170351988.png)

```python
secret = "dmcfyb31c43143:c74`d07d`70`2ggfgc748d|"

for i in range(len(secret)):
    if i % 2:
        print(chr(ord(secret[i]) ^ 1),end="")
    else:
        print(chr(ord(secret[i]) ^ 2), end="")
```

# ezre

key = crypt1(key1,key)

secret = crypt2(flag,key)

# some_enc

```python
import base64
table = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0987654321/+'
table2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

tmp = 'mTyqm7wjODkrNLcWl0eqO8K8gc1BPk1GNLgUpI'
tmp2 = ''
for i in tmp:
    index = table.index(i)
    tmp2 += table2[index]

print(base64.b64decode(tmp2+'=='))
```

# junk

调用不存在地址报错 --->  汇编解析失误 ---> 按d查看汇编源数据 ---> 分析花指令位置 ---> 将花指令改为空指令nop(edit-patch program - change byte 8e改90) ---> 按c将数据重新汇编 ---> 给ida指定函数入口点，在主函数开头按p

```python
f = open("junk.exe","rb")
data = f.read()
f.close()
rpdata = 'E858C745EC00'.decode('hex')
result = '9058C745EC00'.decode('hex')
data = data.replace(rpdata,result)
f = open("without_junk.exe","wb")
f.write(data)
f.close()
```

# welpp

处理python打包类exe逆向题目，首先解包，然后进行反编译。

首先根据ida中字符串的大量python库确定为python打包exe，使用工具目录下的pyinstxtractor.py解包

```bash
python pyinstxtractor.py welpp.exe
```

解包结果可以发现程序入口点是出题.pyc，接着使用pycdc、uncompyle6、decompyle3来反编译pyc文件：

```bash
pycdc 出题.pyc
```

![image-20240521111658540](http://image.shangu127.top/img/2024/03/image-20240521111658540.png)

```python
import base64, string
from ctypes import *
import sys

def encrypt(text):
    data_xor_iv = bytearray()
    sbox = []
    j = 0
    x = y = k = 0
    key = "1234"
    for i in range(256):
        sbox.append(i)

    for i in range(256):
        j = j + sbox[i] + ord(key[i % len(key)]) & 255
        sbox[i] = sbox[j]
        sbox[j] = sbox[i]

    for idx in text:
        x = x + 1 & 255
        y = y + sbox[x] & 255
        sbox[x] = sbox[y]
        sbox[y] = sbox[x]
        k = sbox[sbox[x] + sbox[y] & 255]
        data_xor_iv.append(idx ^ k ^ 17)

    return data_xor_iv


# if __name__ == "__main__":
#     print("Please input your key and flag:")
#     key11 = int(input("keys:"))
#     str1 = str(input("flag:"))
#     if len(str1) != 42:
#         print("length error!")
#         sys.exit()
#     lis1 = list(str1)
#     lis2 = [ord(lis1[i]) for i in range(len(lis1))]
#     for i in range(len(lis2)):
#         lis2[i] = lis2[i] ^ key11   #crypt1 = input_flag[i] ^ ???

#     crypt1 = bytes(lis2)
#     crypt2 = bytes(encrypt(crypt1)) # crypt = rc4(1234,crypt1)
#     base2 = base64.b64encode(crypt2).decode()
#     if base2 == "wM/Cya0b08LMlZeW2g5SEcKWjuyRlx3Og5yMgLsR6pLCwLTQkIfHHJHe":
#         print("ok,you get the flag!") #result = base64(crypt2)
#     else:
#         print("error!")
#crypt2 = base64_decode(result)
#crypt1 = rc4_decode(crypt2) #rc4 = rc4decode
#flag = crypt1 ^ ???
#flag{xxxxxxxxxxx}
crypt2 = base64.b64decode(b"wM/Cya0b08LMlZeW2g5SEcKWjuyRlx3Og5yMgLsR6pLCwLTQkIfHHJHe")
print(crypt2)
crypt1 = str(encrypt(crypt2))
print(crypt1)
for i in range(len(crypt1)):
    print(chr(ord(crypt1[i]) ^ 22),end="")
```



# 解题思路

看到线索，直接停止分析，进行爆破或者跑脚本，不成功了再回头分析