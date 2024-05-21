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

# password

1、首先执行确定是带参逆向，直接shift + f12在字符串串口搜索Bad确定函数位置

2、观察发现src参数为int格式小端存储，所以点击他按r转换为字符格式，手动逆序即为flag

3、也可手动提取密码库进行爆破：

此处存在存储位置和调用位置的不同，需要在存储字符串的地方按shift e

![image-20240521145450402](http://image.shangu127.top/img/2024/03/image-20240521145450402.png)

之后在cyberchef中转换格式保存：
![image-20240521145606296](http://image.shangu127.top/img/2024/03/image-20240521145606296.png)

```python
import os
from subprocess import *
import re 

str1=\
"""
   ; "123456"
.data:0000000000603088                 dq offset aPassword     ; "password"
.data:0000000000603090                 dq offset a12345678     ; "12345678"
.data:0000000000603098                 dq offset aQwerty       ; "qwerty"
.data:00000000006030A0                 dq offset a123456789    ; "123456789"
.data:00000000006030A8                 dq offset a12345        ; "12345"
.data:00000000006030B0                 dq offset a1234         ; "1234"
.data:00000000006030B8                 dq offset a111111       ; "111111"
.data:00000000006030C0                 dq offset a1234567      ; "1234567"
.data:00000000006030C8                 dq offset aDragon       ; "dragon"
.data:00000000006030D0                 dq offset a123123       ; "123123"
.data:00000000006030D8                 dq offset aBaseball     ; "baseball"
.data:00000000006030E0                 dq offset aAbc123       ; "abc123"
.data:00000000006030E8                 dq offset aFootball     ; "football"
.data:00000000006030F0                 dq offset aMonkey       ; "monkey"
.data:00000000006030F8                 dq offset aLetmein      ; "letmein"
.data:0000000000603100                 dq offset a696969       ; "696969"
.data:0000000000603108                 dq offset aShadow       ; "shadow"
.data:0000000000603110                 dq offset aMaster       ; "master"
.data:0000000000603118                 dq offset a666666       ; "666666"
.data:0000000000603120                 dq offset aQwertyuiop   ; "qwertyuiop"
.data:0000000000603128                 dq offset a123321       ; "123321"
.data:0000000000603130                 dq offset aMustang      ; "mustang"
.data:0000000000603138                 dq offset a1234567890   ; "1234567890"
.data:0000000000603140                 dq offset aMichael      ; "michael"
.data:0000000000603148                 dq offset a654321       ; "654321"
.data:0000000000603150                 dq offset aPussy        ; "pussy"
.data:0000000000603158                 dq offset aSuperman     ; "superman"
.data:0000000000603160                 dq offset a1qaz2wsx     ; "1qaz2wsx"
.data:0000000000603168                 dq offset a7777777      ; "7777777"
.data:0000000000603170                 dq offset aFuckyou      ; "fuckyou"
.data:0000000000603178                 dq offset a121212       ; "121212"
.data:0000000000603180                 dq offset a000000       ; "000000"
.data:0000000000603188                 dq offset aQazwsx       ; "qazwsx"
.data:0000000000603190                 dq offset a123qwe       ; "123qwe"
.data:0000000000603198                 dq offset aKiller       ; "killer"
.data:00000000006031A0                 dq offset aTrustno1     ; "trustno1"
.data:00000000006031A8                 dq offset aJordan       ; "jordan"
.data:00000000006031B0                 dq offset aJennifer     ; "jennifer"
.data:00000000006031B8                 dq offset aZxcvbnm      ; "zxcvbnm"
.data:00000000006031C0                 dq offset aAsdfgh       ; "asdfgh"
.data:00000000006031C8                 dq offset aHunter       ; "hunter"
.data:00000000006031D0                 dq offset aBuster       ; "buster"
.data:00000000006031D8                 dq offset aSoccer       ; "soccer"
.data:00000000006031E0                 dq offset aHarley       ; "harley"
.data:00000000006031E8                 dq offset aBatman       ; "batman"
.data:00000000006031F0                 dq offset aAndrew       ; "andrew"
.data:00000000006031F8                 dq offset aTigger       ; "tigger"
.data:0000000000603200                 dq offset aSunshine     ; "sunshine"
.data:0000000000603208                 dq offset aIloveyou     ; "iloveyou"
.data:0000000000603210                 dq offset aFuckme       ; "fuckme"
.data:0000000000603218                 dq offset a2000         ; "2000"
.data:0000000000603220                 dq offset aCharlie      ; "charlie"
.data:0000000000603228                 dq offset aRobert       ; "robert"
.data:0000000000603230                 dq offset aThomas       ; "thomas"
.data:0000000000603238                 dq offset aHockey       ; "hockey"
.data:0000000000603240                 dq offset aRanger       ; "ranger"
.data:0000000000603248                 dq offset aDaniel       ; "daniel"
.data:0000000000603250                 dq offset aStarwars     ; "starwars"
.data:0000000000603258                 dq offset aKlaster      ; "klaster"
.data:0000000000603260                 dq offset a112233       ; "112233"
.data:0000000000603268                 dq offset aGeorge       ; "george"
.data:0000000000603270                 dq offset aAsshole      ; "asshole"
.data:0000000000603278                 dq offset aComputer     ; "computer"
.data:0000000000603280                 dq offset aMichelle     ; "michelle"
.data:0000000000603288                 dq offset aJessica      ; "jessica"
.data:0000000000603290                 dq offset aPepper       ; "pepper"
.data:0000000000603298                 dq offset a1111         ; "1111"
.data:00000000006032A0                 dq offset aZxcvbn       ; "zxcvbn"
.data:00000000006032A8                 dq offset a555555       ; "555555"
.data:00000000006032B0                 dq offset a11111111     ; "11111111"
.data:00000000006032B8                 dq offset a131313       ; "131313"
.data:00000000006032C0                 dq offset aFreedom      ; "freedom"
.data:00000000006032C8                 dq offset a777777       ; "777777"
.data:00000000006032D0                 dq offset aPass         ; "pass"
.data:00000000006032D8                 dq offset aFuck         ; "fuck"
.data:00000000006032E0                 dq offset aMaggie       ; "maggie"
.data:00000000006032E8                 dq offset a159753       ; "159753"
.data:00000000006032F0                 dq offset aAaaaaa       ; "aaaaaa"
.data:00000000006032F8                 dq offset aGinger       ; "ginger"
.data:0000000000603300                 dq offset aPrincess     ; "princess"
.data:0000000000603308                 dq offset aJoshua       ; "joshua"
.data:0000000000603310                 dq offset aCheese       ; "cheese"
.data:0000000000603318                 dq offset aAmanda       ; "amanda"
.data:0000000000603320                 dq offset aSummer       ; "summer"
.data:0000000000603328                 dq offset aLove         ; "love"
.data:0000000000603330                 dq offset aAshley       ; "ashley"
.data:0000000000603338                 dq offset a6969         ; "6969"
.data:0000000000603340                 dq offset aNicole       ; "nicole"
.data:0000000000603348                 dq offset aChelsea      ; "chelsea"
.data:0000000000603350                 dq offset aBiteme       ; "biteme"
.data:0000000000603358                 dq offset aMatthew      ; "matthew"
.data:0000000000603360                 dq offset aAccess       ; "access"
.data:0000000000603368                 dq offset aYankees      ; "yankees"
.data:0000000000603370                 dq offset a987654321    ; "987654321"
.data:0000000000603378                 dq offset aDallas       ; "dallas"
.data:0000000000603380                 dq offset aAustin       ; "austin"
.data:0000000000603388                 dq offset aThunder      ; "thunder"
.data:0000000000603390                 dq offset aTaylor       ; "taylor"
.data:0000000000603398                 dq offset aMatrix       ; "matrix"
.data:00000000006033A0                 dq offset aWilliam      ; "william"
.data:00000000006033A8                 dq offset aCorvette     ; "corvette"
.data:00000000006033B0                 dq offset aHello        ; "hello"
.data:00000000006033B8                 dq offset aMartin       ; "martin"
.data:00000000006033C0                 dq offset aHeather      ; "heather"
.data:00000000006033C8                 dq offset aSecret       ; "secret"
.data:00000000006033D0                 dq offset aFucker       ; "fucker"
.data:00000000006033D8                 dq offset aMerlin       ; "merlin"
.data:00000000006033E0                 dq offset aDiamond      ; "diamond"
.data:00000000006033E8                 dq offset a1234qwer     ; "1234qwer"
.data:00000000006033F0                 dq offset aGfhjkm       ; "gfhjkm"
.data:00000000006033F8                 dq offset aHammer       ; "hammer"
.data:0000000000603400                 dq offset aSilver       ; "silver"
.data:0000000000603408                 dq offset a222222       ; "222222"
.data:0000000000603410                 dq offset a88888888     ; "88888888"
.data:0000000000603418                 dq offset aAnthony      ; "anthony"
.data:0000000000603420                 dq offset aJustin       ; "justin"
.data:0000000000603428                 dq offset aTest         ; "test"
.data:0000000000603430                 dq offset aBailey       ; "bailey"
.data:0000000000603438                 dq offset aQ1w2e3r4t5   ; "q1w2e3r4t5"
.data:0000000000603440                 dq offset aPatrick      ; "patrick"
.data:0000000000603448                 dq offset aInternet     ; "internet"
.data:0000000000603450                 dq offset aScooter      ; "scooter"
.data:0000000000603458                 dq offset aOrange       ; "orange"
.data:0000000000603460                 dq offset a11111        ; "11111"
.data:0000000000603468                 dq offset aGolfer       ; "golfer"
.data:0000000000603470                 dq offset aCookie       ; "cookie"
.data:0000000000603478                 dq offset aRichard      ; "richard"
.data:0000000000603480                 dq offset aSamantha     ; "samantha"
.data:0000000000603488                 dq offset aBigdog       ; "bigdog"
.data:0000000000603490                 dq offset aGuitar       ; "guitar"
.data:0000000000603498                 dq offset aJackson      ; "jackson"
.data:00000000006034A0                 dq offset aWhatever     ; "whatever"
.data:00000000006034A8                 dq offset aMickey       ; "mickey"
.data:00000000006034B0                 dq offset aChicken      ; "chicken"
.data:00000000006034B8                 dq offset aSparky       ; "sparky"
.data:00000000006034C0                 dq offset aSnoopy       ; "snoopy"
.data:00000000006034C8                 dq offset aMaverick     ; "maverick"
.data:00000000006034D0                 dq offset aPhoenix      ; "phoenix"
.data:00000000006034D8                 dq offset aCamaro       ; "camaro"
.data:00000000006034E0                 dq offset aSexy         ; "sexy"
.data:00000000006034E8                 dq offset aPeanut       ; "peanut"
.data:00000000006034F0                 dq offset aMorgan       ; "morgan"
.data:00000000006034F8                 dq offset aWelcome      ; "welcome"
.data:0000000000603500                 dq offset aFalcon       ; "falcon"
.data:0000000000603508                 dq offset aCowboy       ; "cowboy"
.data:0000000000603510                 dq offset aFerrari      ; "ferrari"
.data:0000000000603518                 dq offset aSamsung      ; "samsung"
.data:0000000000603520                 dq offset aAndrea       ; "andrea"
.data:0000000000603528                 dq offset aSmokey       ; "smokey"
.data:0000000000603530                 dq offset aSteelers     ; "steelers"
.data:0000000000603538                 dq offset aJoseph       ; "joseph"
.data:0000000000603540                 dq offset aMercedes     ; "mercedes"
.data:0000000000603548                 dq offset aDakota       ; "dakota"
.data:0000000000603550                 dq offset aArsenal      ; "arsenal"
.data:0000000000603558                 dq offset aEagles       ; "eagles"
.data:0000000000603560                 dq offset aMelissa      ; "melissa"
.data:0000000000603568                 dq offset aBoomer       ; "boomer"
.data:0000000000603570                 dq offset aBooboo       ; "booboo"
.data:0000000000603578                 dq offset aSpider       ; "spider"
.data:0000000000603580                 dq offset aNascar       ; "nascar"
.data:0000000000603588                 dq offset aMonster      ; "monster"
.data:0000000000603590                 dq offset aTigers       ; "tigers"
.data:0000000000603598                 dq offset aYellow       ; "yellow"
.data:00000000006035A0                 dq offset aXxxxxx       ; "xxxxxx"
.data:00000000006035A8                 dq offset a123123123    ; "123123123"
.data:00000000006035B0                 dq offset aGateway      ; "gateway"
.data:00000000006035B8                 dq offset aMarina       ; "marina"
.data:00000000006035C0                 dq offset aDiablo       ; "diablo"
.data:00000000006035C8                 dq offset aBulldog      ; "bulldog"
.data:00000000006035D0                 dq offset aQwer1234     ; "qwer1234"
.data:00000000006035D8                 dq offset aCompaq       ; "compaq"
.data:00000000006035E0                 dq offset aPurple       ; "purple"
.data:00000000006035E8                 dq offset aHardcore     ; "hardcore"
.data:00000000006035F0                 dq offset aBanana       ; "banana"
.data:00000000006035F8                 dq offset aJunior       ; "junior"
.data:0000000000603600                 dq offset aHannah       ; "hannah"
.data:0000000000603608                 dq offset a123654       ; "123654"
.data:0000000000603610                 dq offset aPorsche      ; "porsche"
.data:0000000000603618                 dq offset aLakers       ; "lakers"
.data:0000000000603620                 dq offset aIceman       ; "iceman"
.data:0000000000603628                 dq offset aMoney        ; "money"
.data:0000000000603630                 dq offset aCowboys      ; "cowboys"
.data:0000000000603638                 dq offset a987654       ; "987654"
.data:0000000000603640                 dq offset aLondon       ; "london"
.data:0000000000603648                 dq offset aTennis       ; "tennis"
.data:0000000000603650                 dq offset a999999       ; "999999"
.data:0000000000603658                 dq offset aNcc1701      ; "ncc1701"
.data:0000000000603660                 dq offset aCoffee       ; "coffee"
.data:0000000000603668                 dq offset aScooby       ; "scooby"
.data:0000000000603670                 dq offset a0000         ; "0000"
.data:0000000000603678                 dq offset aMiller       ; "miller"
.data:0000000000603680                 dq offset aBoston       ; "boston"
.data:0000000000603688                 dq offset aQ1w2e3r4     ; "q1w2e3r4"
.data:0000000000603690                 dq offset aFuckoff      ; "fuckoff"
.data:0000000000603698                 dq offset aBrandon      ; "brandon"
.data:00000000006036A0                 dq offset aYamaha       ; "yamaha"
.data:00000000006036A8                 dq offset aChester      ; "chester"
.data:00000000006036B0                 dq offset aMother       ; "mother"
.data:00000000006036B8                 dq offset aForever      ; "forever"
.data:00000000006036C0                 dq offset aJohnny       ; "johnny"
.data:00000000006036C8                 dq offset aEdward       ; "edward"
.data:00000000006036D0                 dq offset a333333       ; "333333"
.data:00000000006036D8                 dq offset aOliver       ; "oliver"
.data:00000000006036E0                 dq offset aRedsox       ; "redsox"
.data:00000000006036E8                 dq offset aPlayer       ; "player"
.data:00000000006036F0                 dq offset aNikita       ; "nikita"
.data:00000000006036F8                 dq offset aKnight       ; "knight"
.data:0000000000603700                 dq offset aFender       ; "fender"
.data:0000000000603708                 dq offset aBarney       ; "barney"
.data:0000000000603710                 dq offset aMidnight     ; "midnight"
.data:0000000000603718                 dq offset aPlease       ; "please"
.data:0000000000603720                 dq offset aBrandy       ; "brandy"
.data:0000000000603728                 dq offset aChicago      ; "chicago"
.data:0000000000603730                 dq offset aBadboy       ; "badboy"
.data:0000000000603738                 dq offset aIwantu       ; "iwantu"
.data:0000000000603740                 dq offset aSlayer       ; "slayer"
.data:0000000000603748                 dq offset aRangers      ; "rangers"
.data:0000000000603750                 dq offset aCharles      ; "charles"
.data:0000000000603758                 dq offset aAngel        ; "angel"
.data:0000000000603760                 dq offset aFlower       ; "flower"
.data:0000000000603768                 dq offset aBigdaddy     ; "bigdaddy"
.data:0000000000603770                 dq offset aRabbit       ; "rabbit"
.data:0000000000603778                 dq offset aWizard       ; "wizard"
.data:0000000000603780                 dq offset aBigdick      ; "bigdick"
.data:0000000000603788                 dq offset aJasper       ; "jasper"
.data:0000000000603790                 dq offset aEnter        ; "enter"
.data:0000000000603798                 dq offset aRachel       ; "rachel"
.data:00000000006037A0                 dq offset aChris        ; "chris"
.data:00000000006037A8                 dq offset aSteven       ; "steven"
.data:00000000006037B0                 dq offset aWinner       ; "winner"
.data:00000000006037B8                 dq offset aAdidas       ; "adidas"
.data:00000000006037C0                 dq offset aVictoria     ; "victoria"
.data:00000000006037C8                 dq offset aNatasha      ; "natasha"
.data:00000000006037D0                 dq offset a1q2w3e4r     ; "1q2w3e4r"
.data:00000000006037D8                 dq offset aJasmine      ; "jasmine"
.data:00000000006037E0                 dq offset aWinter       ; "winter"
.data:00000000006037E8                 dq offset aPrince       ; "prince"
.data:00000000006037F0                 dq offset aPanties      ; "panties"
.data:00000000006037F8                 dq offset aMarine       ; "marine"
.data:0000000000603800                 dq offset aGhbdtn       ; "ghbdtn"
.data:0000000000603808                 dq offset aFishing      ; "fishing"
.data:0000000000603810                 dq offset aCocacola     ; "cocacola"
.data:0000000000603818                 dq offset aCasper       ; "casper"
.data:0000000000603820                 dq offset aJames        ; "james"
.data:0000000000603828                 dq offset a232323       ; "232323"
.data:0000000000603830                 dq offset aRaiders      ; "raiders"
.data:0000000000603838                 dq offset a888888       ; "888888"
.data:0000000000603840                 dq offset aMarlboro     ; "marlboro"
.data:0000000000603848                 dq offset aGandalf      ; "gandalf"
.data:0000000000603850                 dq offset aAsdfasdf     ; "asdfasdf"
.data:0000000000603858                 dq offset aCrystal      ; "crystal"
.data:0000000000603860                 dq offset a87654321     ; "87654321"
.data:0000000000603868                 dq offset a12344321     ; "12344321"
.data:0000000000603870                 dq offset aSexsex       ; "sexsex"
.data:0000000000603878                 dq offset aGolden       ; "golden"
.data:0000000000603880                 dq offset aBlowme       ; "blowme"
.data:0000000000603888                 dq offset aBigtits      ; "bigtits"
.data:0000000000603890                 dq offset a8675309      ; "8675309"
.data:0000000000603898                 dq offset aPanther      ; "panther"
.data:00000000006038A0                 dq offset aLauren       ; "lauren"
.data:00000000006038A8                 dq offset aAngela       ; "angela"
.data:00000000006038B0                 dq offset aBitch        ; "bitch"
.data:00000000006038B8                 dq offset aSpanky       ; "spanky"
.data:00000000006038C0                 dq offset aThx1138      ; "thx1138"
.data:00000000006038C8                 dq offset aAngels       ; "angels"
.data:00000000006038D0                 dq offset aMadison      ; "madison"
.data:00000000006038D8                 dq offset aWinston      ; "winston"
.data:00000000006038E0                 dq offset aShannon      ; "shannon"
.data:00000000006038E8                 dq offset aMike         ; "mike"
.data:00000000006038F0                 dq offset aToyota       ; "toyota"
.data:00000000006038F8                 dq offset aBlowjob      ; "blowjob"
.data:0000000000603900                 dq offset aJordan23     ; "jordan23"
.data:0000000000603908                 dq offset aCanada       ; "canada"
.data:0000000000603910                 dq offset aSophie       ; "sophie"
.data:0000000000603918                 dq offset aPassword_0   ; "Password"
.data:0000000000603920                 dq offset aApples       ; "apples"
.data:0000000000603928                 dq offset aDick         ; "dick"
.data:0000000000603930                 dq offset aTiger        ; "tiger"
.data:0000000000603938                 dq offset aRazz         ; "razz"
.data:0000000000603940                 dq offset a123abc       ; "123abc"
.data:0000000000603948                 dq offset aPokemon      ; "pokemon"
.data:0000000000603950                 dq offset aQazxsw       ; "qazxsw"
.data:0000000000603958                 dq offset a55555        ; "55555"
.data:0000000000603960                 dq offset aQwaszx       ; "qwaszx"
.data:0000000000603968                 dq offset aMuffin       ; "muffin"
.data:0000000000603970                 dq offset aJohnson      ; "johnson"
.data:0000000000603978                 dq offset aMurphy       ; "murphy"
.data:0000000000603980                 dq offset aCooper       ; "cooper"
.data:0000000000603988                 dq offset aJonathan     ; "jonathan"
.data:0000000000603990                 dq offset aLiverpoo     ; "liverpoo"
.data:0000000000603998                 dq offset aDavid        ; "david"
.data:00000000006039A0                 dq offset aDanielle     ; "danielle"
.data:00000000006039A8                 dq offset a159357       ; "159357"
.data:00000000006039B0                 dq offset aJackie       ; "jackie"
.data:00000000006039B8                 dq offset a1990         ; "1990"
.data:00000000006039C0                 dq offset a123456a      ; "123456a"
.data:00000000006039C8                 dq offset a789456       ; "789456"
.data:00000000006039D0                 dq offset aTurtle       ; "turtle"
.data:00000000006039D8                 dq offset aHorny        ; "horny"
.data:00000000006039E0                 dq offset aAbcd1234     ; "abcd1234"
.data:00000000006039E8                 dq offset aScorpion     ; "scorpion"
.data:00000000006039F0                 dq offset aQazwsxedc    ; "qazwsxedc"
.data:00000000006039F8                 dq offset a101010       ; "101010"
.data:0000000000603A00                 dq offset aButter       ; "butter"
.data:0000000000603A08                 dq offset aCarlos       ; "carlos"
.data:0000000000603A10                 dq offset aPassword1    ; "password1"
.data:0000000000603A18                 dq offset aDennis       ; "dennis"
.data:0000000000603A20                 dq offset aSlipknot     ; "slipknot"
.data:0000000000603A28                 dq offset aQwerty123    ; "qwerty123"
.data:0000000000603A30                 dq offset aBooger       ; "booger"
.data:0000000000603A38                 dq offset aAsdf         ; "asdf"
.data:0000000000603A40                 dq offset a1991         ; "1991"
.data:0000000000603A48                 dq offset aBlack        ; "black"
.data:0000000000603A50                 dq offset aStartrek     ; "startrek"
.data:0000000000603A58                 dq offset a12341234     ; "12341234"
.data:0000000000603A60                 dq offset aCameron      ; "cameron"
.data:0000000000603A68                 dq offset aNewyork      ; "newyork"
.data:0000000000603A70                 dq offset aRainbow      ; "rainbow"
.data:0000000000603A78                 dq offset aNathan       ; "nathan"
.data:0000000000603A80                 dq offset aJohn         ; "john"
.data:0000000000603A88                 dq offset a1992         ; "1992"
.data:0000000000603A90                 dq offset aRocket       ; "rocket"
.data:0000000000603A98                 dq offset aViking       ; "viking"
.data:0000000000603AA0                 dq offset aRedskins     ; "redskins"
.data:0000000000603AA8                 dq offset aButthead     ; "butthead"
.data:0000000000603AB0                 dq offset aAsdfghjkl    ; "asdfghjkl"
.data:0000000000603AB8                 dq offset a1212         ; "1212"
.data:0000000000603AC0                 dq offset aSierra       ; "sierra"
.data:0000000000603AC8                 dq offset aPeaches      ; "peaches"
.data:0000000000603AD0                 dq offset aGemini       ; "gemini"
.data:0000000000603AD8                 dq offset aDoctor       ; "doctor"
.data:0000000000603AE0                 dq offset aWilson       ; "wilson"
.data:0000000000603AE8                 dq offset aSandra       ; "sandra"
.data:0000000000603AF0                 dq offset aHelpme       ; "helpme"
.data:0000000000603AF8                 dq offset aQwertyui     ; "qwertyui"
.data:0000000000603B00                 dq offset aVictor       ; "victor"
.data:0000000000603B08                 dq offset aFlorida      ; "florida"
.data:0000000000603B10                 dq offset aDolphin      ; "dolphin"
.data:0000000000603B18                 dq offset aPookie       ; "pookie"
.data:0000000000603B20                 dq offset aCaptain      ; "captain"
.data:0000000000603B28                 dq offset aTucker       ; "tucker"
.data:0000000000603B30                 dq offset aBlue         ; "blue"
.data:0000000000603B38                 dq offset aLiverpool    ; "liverpool"
.data:0000000000603B40                 dq offset aTheman       ; "theman"
.data:0000000000603B48                 dq offset aBandit       ; "bandit"
.data:0000000000603B50                 dq offset aDolphins     ; "dolphins"
.data:0000000000603B58                 dq offset aMaddog       ; "maddog"
.data:0000000000603B60                 dq offset aPackers      ; "packers"
.data:0000000000603B68                 dq offset aJaguar       ; "jaguar"
.data:0000000000603B70                 dq offset aLovers       ; "lovers"
.data:0000000000603B78                 dq offset aNicholas     ; "nicholas"
.data:0000000000603B80                 dq offset aUnited       ; "united"
.data:0000000000603B88                 dq offset aTiffany      ; "tiffany"
.data:0000000000603B90                 dq offset aMaxwell      ; "maxwell"
.data:0000000000603B98                 dq offset aZzzzzz       ; "zzzzzz"
.data:0000000000603BA0                 dq offset aNirvana      ; "nirvana"
.data:0000000000603BA8                 dq offset aJeremy       ; "jeremy"
.data:0000000000603BB0                 dq offset aSuckit       ; "suckit"
.data:0000000000603BB8                 dq offset aStupid       ; "stupid"
.data:0000000000603BC0                 dq offset aPorn         ; "porn"
.data:0000000000603BC8                 dq offset aMonica       ; "monica"
.data:0000000000603BD0                 dq offset aElephant     ; "elephant"
.data:0000000000603BD8                 dq offset aGiants       ; "giants"
.data:0000000000603BE0                 dq offset aJackass      ; "jackass"
.data:0000000000603BE8                 dq offset aHotdog       ; "hotdog"
.data:0000000000603BF0                 dq offset aRosebud      ; "rosebud"
.data:0000000000603BF8                 dq offset aSuccess      ; "success"
.data:0000000000603C00                 dq offset aDebbie       ; "debbie"
.data:0000000000603C08                 dq offset aMountain     ; "mountain"
.data:0000000000603C10                 dq offset a444444       ; "444444"
.data:0000000000603C18                 dq offset aXxxxxxxx     ; "xxxxxxxx"
.data:0000000000603C20                 dq offset aWarrior      ; "warrior"
.data:0000000000603C28                 dq offset a1q2w3e4r5t   ; "1q2w3e4r5t"
.data:0000000000603C30                 dq offset aQ1w2e3       ; "q1w2e3"
.data:0000000000603C38                 dq offset a123456q      ; "123456q"
.data:0000000000603C40                 dq offset aAlbert       ; "albert"
.data:0000000000603C48                 dq offset aMetallic     ; "metallic"
.data:0000000000603C50                 dq offset aLucky        ; "lucky"
.data:0000000000603C58                 dq offset aAzerty       ; "azerty"
.data:0000000000603C60                 dq offset a7777         ; "7777"
.data:0000000000603C68                 dq offset aShithead     ; "shithead"
.data:0000000000603C70                 dq offset aAlex         ; "alex"
.data:0000000000603C78                 dq offset aBond007      ; "bond007"
.data:0000000000603C80                 dq offset aAlexis       ; "alexis"
.data:0000000000603C88                 dq offset a1111111      ; "1111111"
.data:0000000000603C90                 dq offset aSamson       ; "samson"
.data:0000000000603C98                 dq offset a5150         ; "5150"
.data:0000000000603CA0                 dq offset aWillie       ; "willie"
.data:0000000000603CA8                 dq offset aScorpio      ; "scorpio"
.data:0000000000603CB0                 dq offset aBonnie       ; "bonnie"
.data:0000000000603CB8                 dq offset aGators       ; "gators"
.data:0000000000603CC0                 dq offset aBenjamin     ; "benjamin"
.data:0000000000603CC8                 dq offset aVoodoo       ; "voodoo"
.data:0000000000603CD0                 dq offset aDriver       ; "driver"
.data:0000000000603CD8                 dq offset aDexter       ; "dexter"
.data:0000000000603CE0                 dq offset a2112         ; "2112"
.data:0000000000603CE8                 dq offset aJason        ; "jason"
.data:0000000000603CF0                 dq offset aCalvin       ; "calvin"
.data:0000000000603CF8                 dq offset aFreddy       ; "freddy"
.data:0000000000603D00                 dq offset a212121       ; "212121"
.data:0000000000603D08                 dq offset aCreative     ; "creative"
.data:0000000000603D10                 dq offset a12345a       ; "12345a"
.data:0000000000603D18                 dq offset aSydney       ; "sydney"
.data:0000000000603D20                 dq offset aRush2112     ; "rush2112"
.data:0000000000603D28                 dq offset a1989         ; "1989"
.data:0000000000603D30                 dq offset aAsdfghjk     ; "asdfghjk"
.data:0000000000603D38                 dq offset aRed123       ; "red123"
.data:0000000000603D40                 dq offset aBubba        ; "bubba"
.data:0000000000603D48                 dq offset a4815162342   ; "4815162342"
.data:0000000000603D50                 dq offset aPassw0rd     ; "passw0rd"
.data:0000000000603D58                 dq offset aTrouble      ; "trouble"
.data:0000000000603D60                 dq offset aGunner       ; "gunner"
.data:0000000000603D68                 dq offset aHappy        ; "happy"
.data:0000000000603D70                 dq offset aFucking      ; "fucking"
.data:0000000000603D78                 dq offset aGordon       ; "gordon"
.data:0000000000603D80                 dq offset aLegend       ; "legend"
.data:0000000000603D88                 dq offset aJessie       ; "jessie"
.data:0000000000603D90                 dq offset aStella       ; "stella"
.data:0000000000603D98                 dq offset aQwert        ; "qwert"
.data:0000000000603DA0                 dq offset aEminem       ; "eminem"
.data:0000000000603DA8                 dq offset aArthur       ; "arthur"
.data:0000000000603DB0                 dq offset aApple        ; "apple"
.data:0000000000603DB8                 dq offset aNissan       ; "nissan"
.data:0000000000603DC0                 dq offset aBullshit     ; "bullshit"
.data:0000000000603DC8                 dq offset aBear         ; "bear"
.data:0000000000603DD0                 dq offset aAmerica      ; "america"
.data:0000000000603DD8                 dq offset a1qazxsw2     ; "1qazxsw2"
.data:0000000000603DE0                 dq offset aNothing      ; "nothing"
.data:0000000000603DE8                 dq offset aParker       ; "parker"
.data:0000000000603DF0                 dq offset a4444         ; "4444"
.data:0000000000603DF8                 dq offset aRebecca      ; "rebecca"
.data:0000000000603E00                 dq offset aQweqwe       ; "qweqwe"
.data:0000000000603E08                 dq offset aGarfield     ; "garfield"
.data:0000000000603E10                 dq offset a01012011     ; "01012011"
.data:0000000000603E18                 dq offset aBeavis       ; "beavis"
.data:0000000000603E20                 dq offset a69696969     ; "69696969"
.data:0000000000603E28                 dq offset aJack         ; "jack"
.data:0000000000603E30                 dq offset aAsdasd       ; "asdasd"
.data:0000000000603E38                 dq offset aDecember     ; "december"
.data:0000000000603E40                 dq offset a2222         ; "2222"
.data:0000000000603E48                 dq offset a102030       ; "102030"
.data:0000000000603E50                 dq offset a252525       ; "252525"
.data:0000000000603E58                 dq offset a11223344     ; "11223344"
.data:0000000000603E60                 dq offset aMagic        ; "magic"
.data:0000000000603E68                 dq offset aApollo       ; "apollo"
.data:0000000000603E70                 dq offset aSkippy       ; "skippy"
.data:0000000000603E78                 dq offset a315475       ; "315475"
.data:0000000000603E80                 dq offset aGirls        ; "girls"
.data:0000000000603E88                 dq offset aKitten       ; "kitten"
.data:0000000000603E90                 dq offset aGolf         ; "golf"
.data:0000000000603E98                 dq offset aCopper       ; "copper"
.data:0000000000603EA0                 dq offset aBraves       ; "braves"
.data:0000000000603EA8                 dq offset aShelby       ; "shelby"
.data:0000000000603EB0                 dq offset aGodzilla     ; "godzilla"
.data:0000000000603EB8                 dq offset aBeaver       ; "beaver"
.data:0000000000603EC0                 dq offset aFred         ; "fred"
.data:0000000000603EC8                 dq offset aTomcat       ; "tomcat"
.data:0000000000603ED0                 dq offset aAugust       ; "august"
.data:0000000000603ED8                 dq offset aBuddy        ; "buddy"
.data:0000000000603EE0                 dq offset aAirborne     ; "airborne"
.data:0000000000603EE8                 dq offset a1993         ; "1993"
.data:0000000000603EF0                 dq offset a1988         ; "1988"
.data:0000000000603EF8                 dq offset aLifehack     ; "lifehack"
.data:0000000000603F00                 dq offset aQqqqqq       ; "qqqqqq"
.data:0000000000603F08                 dq offset aBrooklyn     ; "brooklyn"
.data:0000000000603F10                 dq offset aAnimal       ; "animal"
.data:0000000000603F18                 dq offset aPlatinum     ; "platinum"
.data:0000000000603F20                 dq offset aPhantom      ; "phantom"
.data:0000000000603F28                 dq offset aOnline       ; "online"
.data:0000000000603F30                 dq offset aXavier       ; "xavier"
.data:0000000000603F38                 dq offset aDarkness     ; "darkness"
.data:0000000000603F40                 dq offset aBlink182     ; "blink182"
.data:0000000000603F48                 dq offset aPower        ; "power"
.data:0000000000603F50                 dq offset aFish         ; "fish"
.data:0000000000603F58                 dq offset aGreen        ; "green"
.data:0000000000603F60                 dq offset a789456123    ; "789456123"
.data:0000000000603F68                 dq offset aVoyager      ; "voyager"
.data:0000000000603F70                 dq offset aPolice       ; "police"
.data:0000000000603F78                 dq offset aTravis       ; "travis"
.data:0000000000603F80                 dq offset a12qwaszx     ; "12qwaszx"
.data:0000000000603F88                 dq offset aHeaven       ; "heaven"
.data:0000000000603F90                 dq offset aSnowball     ; "snowball"
.data:0000000000603F98                 dq offset aLover        ; "lover"
.data:0000000000603FA0                 dq offset aAbcdef       ; "abcdef"
.data:0000000000603FA8                 dq offset a00000        ; "00000"
.data:0000000000603FB0                 dq offset aPakistan     ; "pakistan"
.data:0000000000603FB8                 dq offset a007007       ; "007007"
.data:0000000000603FC0                 dq offset aWalter       ; "walter"
.data:0000000000603FC8                 dq offset aPlayboy      ; "playboy"
.data:0000000000603FD0                 dq offset aBlazer       ; "blazer"
.data:0000000000603FD8                 dq offset aCricket      ; "cricket"
.data:0000000000603FE0                 dq offset aSniper       ; "sniper"
.data:0000000000603FE8                 dq offset aHooters      ; "hooters"
.data:0000000000603FF0                 dq offset aDonkey       ; "donkey"
.data:0000000000603FF8                 dq offset aWillow       ; "willow"
.data:0000000000604000                 dq offset aLoveme       ; "loveme"
.data:0000000000604008                 dq offset aSaturn       ; "saturn"
.data:0000000000604010                 dq offset aTherock      ; "therock"
.data:0000000000604018                 dq offset aRedwings     ; "redwings"
.data:0000000000604020                 dq offset aBigboy       ; "bigboy"
.data:0000000000604028                 dq offset aPumpkin      ; "pumpkin"
.data:0000000000604030                 dq offset aTrinity      ; "trinity"
.data:0000000000604038                 dq offset aWilliams     ; "williams"
.data:0000000000604040                 dq offset aTits         ; "tits"
.data:0000000000604048                 dq offset aNintendo     ; "nintendo"
.data:0000000000604050                 dq offset aDigital      ; "digital"
.data:0000000000604058                 dq offset aDestiny      ; "destiny"
.data:0000000000604060                 dq offset aTopgun       ; "topgun"
.data:0000000000604068                 dq offset aRunner       ; "runner"
.data:0000000000604070                 dq offset aMarvin       ; "marvin"
.data:0000000000604078                 dq offset aGuinness     ; "guinness"
.data:0000000000604080                 dq offset aChance       ; "chance"
.data:0000000000604088                 dq offset aBubbles      ; "bubbles"
.data:0000000000604090                 dq offset aTesting      ; "testing"
.data:0000000000604098                 dq offset aFire         ; "fire"
.data:00000000006040A0                 dq offset aNovember     ; "november"
.data:00000000006040A8                 dq offset aMinecraft    ; "minecraft"
.data:00000000006040B0                 dq offset aAsdf1234     ; "asdf1234"
.data:00000000006040B8                 dq offset aLasvegas     ; "lasvegas"
.data:00000000006040C0                 dq offset aSergey       ; "sergey"
.data:00000000006040C8                 dq offset aBroncos      ; "broncos"
.data:00000000006040D0                 dq offset aCartman      ; "cartman"
.data:00000000006040D8                 dq offset aPrivate      ; "private"
.data:00000000006040E0                 dq offset aCeltic       ; "celtic"
.data:00000000006040E8                 dq offset aBirdie       ; "birdie"
.data:00000000006040F0                 dq offset aLittle       ; "little"
.data:00000000006040F8                 dq offset aCassie       ; "cassie"
.data:0000000000604100                 dq offset aBabygirl     ; "babygirl"
.data:0000000000604108                 dq offset aDonald       ; "donald"
.data:0000000000604110                 dq offset aBeatles      ; "beatles"
.data:0000000000604118                 dq offset a1313         ; "1313"
.data:0000000000604120                 dq offset aDickhead     ; "dickhead"
.data:0000000000604128                 dq offset aFamily       ; "family"
.data:0000000000604130                 dq offset a12121212     ; "12121212"
.data:0000000000604138                 dq offset aSchool       ; "school"
.data:0000000000604140                 dq offset aLouise       ; "louise"
.data:0000000000604148                 dq offset aGabriel      ; "gabriel"
.data:0000000000604150                 dq offset aEclipse      ; "eclipse"
.data:0000000000604158                 dq offset aFluffy       ; "fluffy"
.data:0000000000604160                 dq offset a147258369    ; "147258369"
.data:0000000000604168                 dq offset aLol123       ; "lol123"
.data:0000000000604170                 dq offset aExplorer     ; "explorer"
.data:0000000000604178                 dq offset aBeer         ; "beer"
.data:0000000000604180                 dq offset aNelson       ; "nelson"
.data:0000000000604188                 dq offset aFlyers       ; "flyers"
.data:0000000000604190                 dq offset aSpencer      ; "spencer"
.data:0000000000604198                 dq offset aScott        ; "scott"
.data:00000000006041A0                 dq offset aLovely       ; "lovely"
.data:00000000006041A8                 dq offset aGibson       ; "gibson"
.data:00000000006041B0                 dq offset aDoggie       ; "doggie"
.data:00000000006041B8                 dq offset aCherry       ; "cherry"
.data:00000000006041C0                 dq offset aAndrey       ; "andrey"
.data:00000000006041C8                 dq offset aSnickers     ; "snickers"
.data:00000000006041D0                 dq offset aBuffalo      ; "buffalo"
.data:00000000006041D8                 dq offset aPantera      ; "pantera"
.data:00000000006041E0                 dq offset aMetallica    ; "metallica"
.data:00000000006041E8                 dq offset aMember       ; "member"
.data:00000000006041F0                 dq offset aCarter       ; "carter"
.data:00000000006041F8                 dq offset aQwertyu      ; "qwertyu"
.data:0000000000604200                 dq offset aPeter        ; "peter"
.data:0000000000604208                 dq offset aAlexande     ; "alexande"
.data:0000000000604210                 dq offset aSteve        ; "steve"
.data:0000000000604218                 dq offset aBronco       ; "bronco"
.data:0000000000604220                 dq offset aParadise     ; "paradise"
.data:0000000000604228                 dq offset aGoober       ; "goober"
.data:0000000000604230                 dq offset a5555         ; "5555"
.data:0000000000604238                 dq offset aSamuel       ; "samuel"
.data:0000000000604240                 dq offset aMontana      ; "montana"
.data:0000000000604248                 dq offset aMexico       ; "mexico"
.data:0000000000604250                 dq offset aDreams       ; "dreams"
.data:0000000000604258                 dq offset aMichigan     ; "michigan"
.data:0000000000604260                 dq offset aCock         ; "cock"
.data:0000000000604268                 dq offset aCarolina     ; "carolina"
.data:0000000000604270                 dq offset aYankee       ; "yankee"
.data:0000000000604278                 dq offset aFriends      ; "friends"
.data:0000000000604280                 dq offset aMagnum       ; "magnum"
.data:0000000000604288                 dq offset aSurfer       ; "surfer"
.data:0000000000604290                 dq offset aPoopoo       ; "poopoo"
.data:0000000000604298                 dq offset aMaximus      ; "maximus"
.data:00000000006042A0                 dq offset aGenius       ; "genius"
.data:00000000006042A8                 dq offset aCool         ; "cool"
.data:00000000006042B0                 dq offset aVampire      ; "vampire"
.data:00000000006042B8                 dq offset aLacrosse     ; "lacrosse"
.data:00000000006042C0                 dq offset aAsd123       ; "asd123"
.data:00000000006042C8                 dq offset aAaaa         ; "aaaa"
.data:00000000006042D0                 dq offset aChristin     ; "christin"
.data:00000000006042D8                 dq offset aKimberly     ; "kimberly"
.data:00000000006042E0                 dq offset aSpeedy       ; "speedy"
.data:00000000006042E8                 dq offset aSharon       ; "sharon"
.data:00000000006042F0                 dq offset aCarmen       ; "carmen"
.data:00000000006042F8                 dq offset a111222       ; "111222"
.data:0000000000604300                 dq offset aKristina     ; "kristina"
.data:0000000000604308                 dq offset aSammy        ; "sammy"
.data:0000000000604310                 dq offset aRacing       ; "racing"
.data:0000000000604318                 dq offset aOu812        ; "ou812"
.data:0000000000604320                 dq offset aSabrina      ; "sabrina"
.data:0000000000604328                 dq offset aHorses       ; "horses"
.data:0000000000604330                 dq offset a0987654321   ; "0987654321"
.data:0000000000604338                 dq offset aQwerty1      ; "qwerty1"
.data:0000000000604340                 dq offset aPimpin       ; "pimpin"
.data:0000000000604348                 dq offset aBaby         ; "baby"
.data:0000000000604350                 dq offset aStalker      ; "stalker"
.data:0000000000604358                 dq offset aEnigma       ; "enigma"
.data:0000000000604360                 dq offset a147147       ; "147147"
.data:0000000000604368                 dq offset aStar         ; "star"
.data:0000000000604370                 dq offset aPoohbear     ; "poohbear"
.data:0000000000604378                 dq offset aBoobies      ; "boobies"
.data:0000000000604380                 dq offset a147258       ; "147258"
.data:0000000000604388                 dq offset aSimple       ; "simple"
.data:0000000000604390                 dq offset aBollocks     ; "bollocks"
.data:0000000000604398                 dq offset a12345q       ; "12345q"
.data:00000000006043A0                 dq offset aMarcus       ; "marcus"
.data:00000000006043A8                 dq offset aBrian        ; "brian"
.data:00000000006043B0                 dq offset a1987         ; "1987"
.data:00000000006043B8                 dq offset aQweasdzxc    ; "qweasdzxc"
.data:00000000006043C0                 dq offset aDrowssap     ; "drowssap"
.data:00000000006043C8                 dq offset aHahaha       ; "hahaha"
.data:00000000006043D0                 dq offset aCaroline     ; "caroline"
.data:00000000006043D8                 dq offset aBarbara      ; "barbara"
.data:00000000006043E0                 dq offset aDave         ; "dave"
.data:00000000006043E8                 dq offset aViper        ; "viper"
.data:00000000006043F0                 dq offset aDrummer      ; "drummer"
.data:00000000006043F8                 dq offset aAction       ; "action"
.data:0000000000604400                 dq offset aEinstein     ; "einstein"
.data:0000000000604408                 dq offset aBitches      ; "bitches"
.data:0000000000604410                 dq offset aGenesis      ; "genesis"
.data:0000000000604418                 dq offset aHello1       ; "hello1"
.data:0000000000604420                 dq offset aScotty       ; "scotty"
.data:0000000000604428                 dq offset aFriend       ; "friend"
.data:0000000000604430                 dq offset aForest       ; "forest"
.data:0000000000604438                 dq offset a010203       ; "010203"
.data:0000000000604440                 dq offset aHotrod       ; "hotrod"
.data:0000000000604448                 dq offset aGoogle       ; "google"
.data:0000000000604450                 dq offset aVanessa      ; "vanessa"
.data:0000000000604458                 dq offset aSpitfire     ; "spitfire"
.data:0000000000604460                 dq offset aBadger       ; "badger"
.data:0000000000604468                 dq offset aMaryjane     ; "maryjane"
.data:0000000000604470                 dq offset aFriday       ; "friday"
.data:0000000000604478                 dq offset aAlaska       ; "alaska"
.data:0000000000604480                 dq offset a1232323q     ; "1232323q"
.data:0000000000604488                 dq offset aTester       ; "tester"
.data:0000000000604490                 dq offset aJester       ; "jester"
.data:0000000000604498                 dq offset aJake         ; "jake"
.data:00000000006044A0                 dq offset aChampion     ; "champion"
.data:00000000006044A8                 dq offset aBilly        ; "billy"
.data:00000000006044B0                 dq offset a147852       ; "147852"
.data:00000000006044B8                 dq offset aRock         ; "rock"
.data:00000000006044C0                 dq offset aHawaii       ; "hawaii"
.data:00000000006044C8                 dq offset aBadass       ; "badass"
.data:00000000006044D0                 dq offset aChevy        ; "chevy"
.data:00000000006044D8                 dq offset a420420       ; "420420"
.data:00000000006044E0                 dq offset aWalker       ; "walker"
.data:00000000006044E8                 dq offset aStephen      ; "stephen"
.data:00000000006044F0                 dq offset aEagle1       ; "eagle1"
.data:00000000006044F8                 dq offset aBill         ; "bill"
.data:0000000000604500                 dq offset a1986         ; "1986"
.data:0000000000604508                 dq offset aOctober      ; "october"
.data:0000000000604510                 dq offset aGregory      ; "gregory"
.data:0000000000604518                 dq offset aSvetlana     ; "svetlana"
.data:0000000000604520                 dq offset aPamela       ; "pamela"
.data:0000000000604528                 dq offset a1984         ; "1984"
.data:0000000000604530                 dq offset aMusic        ; "music"
.data:0000000000604538                 dq offset aShorty       ; "shorty"
.data:0000000000604540                 dq offset aWestside     ; "westside"
.data:0000000000604548                 dq offset aStanley      ; "stanley"
.data:0000000000604550                 dq offset aDiesel       ; "diesel"
.data:0000000000604558                 dq offset aCourtney     ; "courtney"
.data:0000000000604560                 dq offset a242424       ; "242424"
.data:0000000000604568                 dq offset aKevin        ; "kevin"
.data:0000000000604570                 dq offset aPorno        ; "porno"
.data:0000000000604578                 dq offset aHitman       ; "hitman"
.data:0000000000604580                 dq offset aBoobs        ; "boobs"
.data:0000000000604588                 dq offset aMark         ; "mark"
.data:0000000000604590                 dq offset a12345qwert   ; "12345qwert"
.data:0000000000604598                 dq offset aReddog       ; "reddog"
.data:00000000006045A0                 dq offset aFrank        ; "frank"
.data:00000000006045A8                 dq offset aQwe123       ; "qwe123"
.data:00000000006045B0                 dq offset aPopcorn      ; "popcorn"
.data:00000000006045B8                 dq offset aPatricia     ; "patricia"
.data:00000000006045C0                 dq offset aAaaaaaaa     ; "aaaaaaaa"
.data:00000000006045C8                 dq offset a1969         ; "1969"
.data:00000000006045D0                 dq offset aTeresa       ; "teresa"
.data:00000000006045D8                 dq offset aMozart       ; "mozart"
.data:00000000006045E0                 dq offset aBuddha       ; "buddha"
.data:00000000006045E8                 dq offset aAnderson     ; "anderson"
.data:00000000006045F0                 dq offset aPaul         ; "paul"
.data:00000000006045F8                 dq offset aMelanie      ; "melanie"
.data:0000000000604600                 dq offset aAbcdefg      ; "abcdefg"
.data:0000000000604608                 dq offset aSecurity     ; "security"
.data:0000000000604610                 dq offset aLucky1       ; "lucky1"
.data:0000000000604618                 dq offset aLizard       ; "lizard"
.data:0000000000604620                 dq offset aDenise       ; "denise"
.data:0000000000604628                 dq offset a3333         ; "3333"
.data:0000000000604630                 dq offset aA12345       ; "a12345"
.data:0000000000604638                 dq offset a123789       ; "123789"
.data:0000000000604640                 dq offset aRuslan       ; "ruslan"
.data:0000000000604648                 dq offset aStargate     ; "stargate"
.data:0000000000604650                 dq offset aSimpsons     ; "simpsons"
.data:0000000000604658                 dq offset aScarface     ; "scarface"
.data:0000000000604660                 dq offset aEagle        ; "eagle"
.data:0000000000604668                 dq offset a123456789a   ; "123456789a"
.data:0000000000604670                 dq offset aThumper      ; "thumper"
.data:0000000000604678                 dq offset aOlivia       ; "olivia"
.data:0000000000604680                 dq offset aNaruto       ; "naruto"
.data:0000000000604688                 dq offset a1234554321   ; "1234554321"
.data:0000000000604690                 dq offset aGeneral      ; "general"
.data:0000000000604698                 dq offset aCherokee     ; "cherokee"
.data:00000000006046A0                 dq offset aA123456      ; "a123456"
.data:00000000006046A8                 dq offset aVincent      ; "vincent"
.data:00000000006046B0                 dq offset aUsuckballz1  ; "Usuckballz1"
.data:00000000006046B8                 dq offset aSpooky       ; "spooky"
.data:00000000006046C0                 dq offset aQweasd       ; "qweasd"
.data:00000000006046C8                 dq offset aCumshot      ; "cumshot"
.data:00000000006046D0                 dq offset aFree         ; "free"
.data:00000000006046D8                 dq offset aFrankie      ; "frankie"
.data:00000000006046E0                 dq offset aDouglas      ; "douglas"
.data:00000000006046E8                 dq offset aDeath        ; "death"
.data:00000000006046F0                 dq offset a1980         ; "1980"
.data:00000000006046F8                 dq offset aLoveyou      ; "loveyou"
.data:0000000000604700                 dq offset aKitty        ; "kitty"
.data:0000000000604708                 dq offset aKelly        ; "kelly"
.data:0000000000604710                 dq offset aVeronica     ; "veronica"
.data:0000000000604718                 dq offset aSuzuki       ; "suzuki"
.data:0000000000604720                 dq offset aSemperfi     ; "semperfi"
.data:0000000000604728                 dq offset aPenguin      ; "penguin"
.data:0000000000604730                 dq offset aMercury      ; "mercury"
.data:0000000000604738                 dq offset aLiberty      ; "liberty"
.data:0000000000604740                 dq offset aSpirit       ; "spirit"
.data:0000000000604748                 dq offset aScotland     ; "scotland"
.data:0000000000604750                 dq offset aNatalie      ; "natalie"
.data:0000000000604758                 dq offset aMarley       ; "marley"
.data:0000000000604760                 dq offset aVikings      ; "vikings"
.data:0000000000604768                 dq offset aSystem       ; "system"
.data:0000000000604770                 dq offset aSucker       ; "sucker"
.data:0000000000604778                 dq offset aKing         ; "king"
.data:0000000000604780                 dq offset aAllison      ; "allison"
.data:0000000000604788                 dq offset aMarshall     ; "marshall"
.data:0000000000604790                 dq offset a1979         ; "1979"
.data:0000000000604798                 dq offset a098765       ; "098765"
.data:00000000006047A0                 dq offset aQwerty12     ; "qwerty12"
.data:00000000006047A8                 dq offset aHummer       ; "hummer"
.data:00000000006047B0                 dq offset aAdrian       ; "adrian"
.data:00000000006047B8                 dq offset a1985         ; "1985"
.data:00000000006047C0                 dq offset aVfhbyf       ; "vfhbyf"
.data:00000000006047C8                 dq offset aSandman      ; "sandman"
.data:00000000006047D0                 dq offset aRocky        ; "rocky"
.data:00000000006047D8                 dq offset aLeslie       ; "leslie"
.data:00000000006047E0                 dq offset aAntonio      ; "antonio"
.data:00000000006047E8                 dq offset a98765432     ; "98765432"
.data:00000000006047F0                 dq offset a4321         ; "4321"
.data:00000000006047F8                 dq offset aSoftball     ; "softball"
.data:0000000000604800                 dq offset aPassion      ; "passion"
.data:0000000000604808                 dq offset aMnbvcxz      ; "mnbvcxz"
.data:0000000000604810                 dq offset aBastard      ; "bastard"
.data:0000000000604818                 dq offset aPassport     ; "passport"
.data:0000000000604820                 dq offset aHorney       ; "horney"
.data:0000000000604828                 dq offset aRascal       ; "rascal"
.data:0000000000604830                 dq offset aHoward       ; "howard"
.data:0000000000604838                 dq offset aFranklin     ; "franklin"
.data:0000000000604840                 dq offset aBigred       ; "bigred"
.data:0000000000604848                 dq offset aAssman       ; "assman"
.data:0000000000604850                 dq offset aAlexander    ; "alexander"
.data:0000000000604858                 dq offset aHomer        ; "homer"
.data:0000000000604860                 dq offset aRedrum       ; "redrum"
.data:0000000000604868                 dq offset aJupiter      ; "jupiter"
.data:0000000000604870                 dq offset aClaudia      ; "claudia"
.data:0000000000604878                 dq offset a55555555     ; "55555555"
.data:0000000000604880                 dq offset a141414       ; "141414"
.data:0000000000604888                 dq offset aZaq12wsx     ; "zaq12wsx"
.data:0000000000604890                 dq offset aShit         ; "shit"
.data:0000000000604898                 dq offset aPatches      ; "patches"
.data:00000000006048A0                 dq offset aNigger       ; "nigger"
.data:00000000006048A8                 dq offset aCunt         ; "cunt"
.data:00000000006048B0                 dq offset aRaider       ; "raider"
.data:00000000006048B8                 dq offset aInfinity     ; "infinity"
.data:00000000006048C0                 dq offset aAndre        ; "andre"
.data:00000000006048C8                 dq offset a54321        ; "54321"
.data:00000000006048D0                 dq offset aGalore       ; "galore"
.data:00000000006048D8                 dq offset aCollege      ; "college"
.data:00000000006048E0                 dq offset aRussia       ; "russia"
.data:00000000006048E8                 dq offset aKawasaki     ; "kawasaki"
.data:00000000006048F0                 dq offset aBishop       ; "bishop"
.data:00000000006048F8                 dq offset a77777777     ; "77777777"
.data:0000000000604900                 dq offset aVladimir     ; "vladimir"
.data:0000000000604908                 dq offset aMoney1       ; "money1"
.data:0000000000604910                 dq offset aFreeuser     ; "freeuser"
.data:0000000000604918                 dq offset aWildcats     ; "wildcats"
.data:0000000000604920                 dq offset aFrancis      ; "francis"
.data:0000000000604928                 dq offset aDisney       ; "disney"
.data:0000000000604930                 dq offset aBudlight     ; "budlight"
.data:0000000000604938                 dq offset aBrittany     ; "brittany"
.data:0000000000604940                 dq offset a1994         ; "1994"
.data:0000000000604948                 dq offset a00000000     ; "00000000"
.data:0000000000604950                 dq offset aSweet        ; "sweet"
.data:0000000000604958                 dq offset aOksana       ; "oksana"
.data:0000000000604960                 dq offset aHonda        ; "honda"
.data:0000000000604968                 dq offset aDomino       ; "domino"
.data:0000000000604970                 dq offset aBulldogs     ; "bulldogs"
.data:0000000000604978                 dq offset aBrutus       ; "brutus"
.data:0000000000604980                 dq offset aSwordfis     ; "swordfis"
.data:0000000000604988                 dq offset aNorman       ; "norman"
.data:0000000000604990                 dq offset aMonday       ; "monday"
.data:0000000000604998                 dq offset aJimmy        ; "jimmy"
.data:00000000006049A0                 dq offset aIronman      ; "ironman"
.data:00000000006049A8                 dq offset aFord         ; "ford"
.data:00000000006049B0                 dq offset aFantasy      ; "fantasy"
.data:00000000006049B8                 dq offset a9999         ; "9999"
.data:00000000006049C0                 dq offset a7654321      ; "7654321"
.data:00000000006049C8                 dq offset aPassword_1   ; "PASSWORD"
.data:00000000006049D0                 dq offset aHentai       ; "hentai"
.data:00000000006049D8                 dq offset aDuncan       ; "duncan"
.data:00000000006049E0                 dq offset aCougar       ; "cougar"
.data:00000000006049E8                 dq offset a1977         ; "1977"
.data:00000000006049F0                 dq offset aJeffrey      ; "jeffrey"
.data:00000000006049F8                 dq offset aHouse        ; "house"
.data:0000000000604A00                 dq offset aDancer       ; "dancer"
.data:0000000000604A08                 dq offset aBrooke       ; "brooke"
.data:0000000000604A10                 dq offset aTimothy      ; "timothy"
.data:0000000000604A18                 dq offset aSuper        ; "super"
.data:0000000000604A20                 dq offset aMarines      ; "marines"
.data:0000000000604A28                 dq offset aJustice      ; "justice"
.data:0000000000604A30                 dq offset aDigger       ; "digger"
.data:0000000000604A38                 dq offset aConnor       ; "connor"
.data:0000000000604A40                 dq offset aPatriots     ; "patriots"
.data:0000000000604A48                 dq offset aKarina       ; "karina"
.data:0000000000604A50                 dq offset a202020       ; "202020"
.data:0000000000604A58                 dq offset aMolly        ; "molly"
.data:0000000000604A60                 dq offset aEverton      ; "everton"
.data:0000000000604A68                 dq offset aTinker       ; "tinker"
.data:0000000000604A70                 dq offset aAlicia       ; "alicia"
.data:0000000000604A78                 dq offset aRasdzv3      ; "rasdzv3"
.data:0000000000604A80                 dq offset aPoop         ; "poop"
.data:0000000000604A88                 dq offset aPearljam     ; "pearljam"
.data:0000000000604A90                 dq offset aStinky       ; "stinky"
.data:0000000000604A98                 dq offset aNaughty      ; "naughty"
.data:0000000000604AA0                 dq offset aColorado     ; "colorado"
.data:0000000000604AA8                 dq offset a123123a      ; "123123a"
.data:0000000000604AB0                 dq offset aWater        ; "water"
.data:0000000000604AB8                 dq offset aTest123      ; "test123"
.data:0000000000604AC0                 dq offset aNcc1701d     ; "ncc1701d"
.data:0000000000604AC8                 dq offset aMotorola     ; "motorola"
.data:0000000000604AD0                 dq offset aIreland      ; "ireland"
.data:0000000000604AD8                 dq offset aAsdfg        ; "asdfg"
.data:0000000000604AE0                 dq offset aSlut         ; "slut"
.data:0000000000604AE8                 dq offset aMatt         ; "matt"
.data:0000000000604AF0                 dq offset aHouston      ; "houston"
.data:0000000000604AF8                 dq offset aBoogie       ; "boogie"
.data:0000000000604B00                 dq offset aZombie       ; "zombie"
.data:0000000000604B08                 dq offset aAccord       ; "accord"
.data:0000000000604B10                 dq offset aVision       ; "vision"
.data:0000000000604B18                 dq offset aBradley      ; "bradley"
.data:0000000000604B20                 dq offset aReggie       ; "reggie"
.data:0000000000604B28                 dq offset aKermit       ; "kermit"
.data:0000000000604B30                 dq offset aFroggy       ; "froggy"
.data:0000000000604B38                 dq offset aDucati       ; "ducati"
.data:0000000000604B40                 dq offset aAvalon       ; "avalon"
.data:0000000000604B48                 dq offset a6666         ; "6666"
.data:0000000000604B50                 dq offset a9379992      ; "9379992"
.data:0000000000604B58                 dq offset aSarah        ; "sarah"
.data:0000000000604B60                 dq offset aSaints       ; "saints"
.data:0000000000604B68                 dq offset aLogitech     ; "logitech"
.data:0000000000604B70                 dq offset aChopper      ; "chopper"
.data:0000000000604B78                 dq offset a852456       ; "852456"
.data:0000000000604B80                 dq offset aSimpson      ; "simpson"
.data:0000000000604B88                 dq offset aMadonna      ; "madonna"
.data:0000000000604B90                 dq offset aJuventus     ; "juventus"
.data:0000000000604B98                 dq offset aClaire       ; "claire"
.data:0000000000604BA0                 dq offset a159951       ; "159951"
.data:0000000000604BA8                 dq offset aZachary      ; "zachary"
.data:0000000000604BB0                 dq offset aYfnfif       ; "yfnfif"
.data:0000000000604BB8                 dq offset aWolverin     ; "wolverin"
.data:0000000000604BC0                 dq offset aWarcraft     ; "warcraft"
.data:0000000000604BC8                 dq offset aHello123     ; "hello123"
.data:0000000000604BD0                 dq offset aExtreme      ; "extreme"
.data:0000000000604BD8                 dq offset aPenis        ; "penis"
.data:0000000000604BE0                 dq offset aPeekaboo     ; "peekaboo"
.data:0000000000604BE8                 dq offset aFireman      ; "fireman"
.data:0000000000604BF0                 dq offset aEugene       ; "eugene"
.data:0000000000604BF8                 dq offset aBrenda       ; "brenda"
.data:0000000000604C00                 dq offset a123654789    ; "123654789"
.data:0000000000604C08                 dq offset aRussell      ; "russell"
.data:0000000000604C10                 dq offset aPanthers     ; "panthers"
.data:0000000000604C18                 dq offset aGeorgia      ; "georgia"
.data:0000000000604C20                 dq offset aSmith        ; "smith"
.data:0000000000604C28                 dq offset aSkyline      ; "skyline"
.data:0000000000604C30                 dq offset aJesus        ; "jesus"
.data:0000000000604C38                 dq offset aElizabet     ; "elizabet"
.data:0000000000604C40                 dq offset aSpiderma     ; "spiderma"
.data:0000000000604C48                 dq offset aSmooth       ; "smooth"
.data:0000000000604C50                 dq offset aPirate       ; "pirate"
.data:0000000000604C58                 dq offset aEmpire       ; "empire"
.data:0000000000604C60                 dq offset aBullet       ; "bullet"
.data:0000000000604C68                 dq offset a8888         ; "8888"
.data:0000000000604C70                 dq offset aVirginia     ; "virginia"
.data:0000000000604C78                 dq offset aValentin     ; "valentin"
.data:0000000000604C80                 dq offset aPsycho       ; "psycho"
.data:0000000000604C88                 dq offset aPredator     ; "predator"
.data:0000000000604C90                 dq offset aArizona      ; "arizona"
.data:0000000000604C98                 dq offset a134679       ; "134679"
.data:0000000000604CA0                 dq offset aMitchell     ; "mitchell"
.data:0000000000604CA8                 dq offset aAlyssa       ; "alyssa"
.data:0000000000604CB0                 dq offset aVegeta       ; "vegeta"
.data:0000000000604CB8                 dq offset aTitanic      ; "titanic"
.data:0000000000604CC0                 dq offset aChrist       ; "christ"
.data:0000000000604CC8                 dq offset aGoblue       ; "goblue"
.data:0000000000604CD0                 dq offset aFylhtq       ; "fylhtq"
.data:0000000000604CD8                 dq offset aWolf         ; "wolf"
.data:0000000000604CE0                 dq offset aMmmmmm       ; "mmmmmm"
.data:0000000000604CE8                 dq offset aKirill       ; "kirill"
.data:0000000000604CF0                 dq offset aIndian       ; "indian"
.data:0000000000604CF8                 dq offset aHiphop       ; "hiphop"
.data:0000000000604D00                 dq offset aBaxter       ; "baxter"
.data:0000000000604D08                 dq offset aAwesome      ; "awesome"
.data:0000000000604D10                 dq offset aPeople       ; "people"
.data:0000000000604D18                 dq offset aDanger       ; "danger"
.data:0000000000604D20                 dq offset aRoland       ; "roland"
.data:0000000000604D28                 dq offset aMookie       ; "mookie"
.data:0000000000604D30                 dq offset a741852963    ; "741852963"
.data:0000000000604D38                 dq offset a1111111111   ; "1111111111"
.data:0000000000604D40                 dq offset aDreamer      ; "dreamer"
.data:0000000000604D48                 dq offset aBambam       ; "bambam"
.data:0000000000604D50                 dq offset aArnold       ; "arnold"
.data:0000000000604D58                 dq offset a1981         ; "1981"
.data:0000000000604D60                 dq offset aSkipper      ; "skipper"
.data:0000000000604D68                 dq offset aSerega       ; "serega"
.data:0000000000604D70                 dq offset aRolltide     ; "rolltide"
.data:0000000000604D78                 dq offset aElvis        ; "elvis"
.data:0000000000604D80                 dq offset aChangeme     ; "changeme"
.data:0000000000604D88                 dq offset aSimon        ; "simon"
.data:0000000000604D90                 dq offset a1q2w3e       ; "1q2w3e"
.data:0000000000604D98                 dq offset aLovelove     ; "lovelove"
.data:0000000000604DA0                 dq offset aFktrcfylh    ; "fktrcfylh"
.data:0000000000604DA8                 dq offset aDenver       ; "denver"
.data:0000000000604DB0                 dq offset aTommy        ; "tommy"
.data:0000000000604DB8                 dq offset aMine         ; "mine"
.data:0000000000604DC0                 dq offset aLoverboy     ; "loverboy"
.data:0000000000604DC8                 dq offset aHobbes       ; "hobbes"
.data:0000000000604DD0                 dq offset aHappy1       ; "happy1"
.data:0000000000604DD8                 dq offset aAlison       ; "alison"
.data:0000000000604DE0                 dq offset aNemesis      ; "nemesis"
.data:0000000000604DE8                 dq offset aChevelle     ; "chevelle"
.data:0000000000604DF0                 dq offset aCardinal     ; "cardinal"
.data:0000000000604DF8                 dq offset aBurton       ; "burton"
.data:0000000000604E00                 dq offset aWanker       ; "wanker"
.data:0000000000604E08                 dq offset aPicard       ; "picard"
.data:0000000000604E10                 dq offset a151515       ; "151515"
.data:0000000000604E18                 dq offset aTweety       ; "tweety"
.data:0000000000604E20                 dq offset aMichael1     ; "michael1"
.data:0000000000604E28                 dq offset a147852369    ; "147852369"
.data:0000000000604E30                 dq offset a12312        ; "12312"
.data:0000000000604E38                 dq offset aXxxx         ; "xxxx"
.data:0000000000604E40                 dq offset aWindows      ; "windows"
.data:0000000000604E48                 dq offset aTurkey       ; "turkey"
.data:0000000000604E50                 dq offset a456789       ; "456789"
.data:0000000000604E58                 dq offset a1974         ; "1974"
.data:0000000000604E60                 dq offset aVfrcbv       ; "vfrcbv"
.data:0000000000604E68                 dq offset aSublime      ; "sublime"
.data:0000000000604E70                 dq offset a1975         ; "1975"
.data:0000000000604E78                 dq offset aGalina       ; "galina"
.data:0000000000604E80                 dq offset aBobby        ; "bobby"
.data:0000000000604E88                 dq offset aNewport      ; "newport"
.data:0000000000604E90                 dq offset aManutd       ; "manutd"
.data:0000000000604E98                 dq offset aDaddy        ; "daddy"
.data:0000000000604EA0                 dq offset aAmerican     ; "american"
.data:0000000000604EA8                 dq offset aAlexandr     ; "alexandr"
.data:0000000000604EB0                 dq offset a1966         ; "1966"
.data:0000000000604EB8                 dq offset aVictory      ; "victory"
.data:0000000000604EC0                 dq offset aRooster      ; "rooster"
.data:0000000000604EC8                 dq offset aQqq111       ; "qqq111"
.data:0000000000604ED0                 dq offset aMadmax       ; "madmax"
.data:0000000000604ED8                 dq offset aElectric     ; "electric"
.data:0000000000604EE0                 dq offset aBigcock      ; "bigcock"
.data:0000000000604EE8                 dq offset aA1b2c3       ; "a1b2c3"
.data:0000000000604EF0                 dq offset aWolfpack     ; "wolfpack"
.data:0000000000604EF8                 dq offset aSpring       ; "spring"
.data:0000000000604F00                 dq offset aPhpbb        ; "phpbb"
.data:0000000000604F08                 dq offset aLalala       ; "lalala"
.data:0000000000604F10                 dq offset aSuckme       ; "suckme"
.data:0000000000604F18                 dq offset aSpiderman    ; "spiderman"
.data:0000000000604F20                 dq offset aEric         ; "eric"
.data:0000000000604F28                 dq offset aDarkside     ; "darkside"
.data:0000000000604F30                 dq offset aClassic      ; "classic"
.data:0000000000604F38                 dq offset aRaptor       ; "raptor"
.data:0000000000604F40                 dq offset a123456789q   ; "123456789q"
.data:0000000000604F48                 dq offset aHendrix      ; "hendrix"
.data:0000000000604F50                 dq offset a1982         ; "1982"
.data:0000000000604F58                 dq offset aWombat       ; "wombat"
.data:0000000000604F60                 dq offset aAvatar       ; "avatar"
.data:0000000000604F68                 dq offset aAlpha        ; "alpha"
.data:0000000000604F70                 dq offset aZxc123       ; "zxc123"
.data:0000000000604F78                 dq offset aCrazy        ; "crazy"
.data:0000000000604F80                 dq offset aHard         ; "hard"
.data:0000000000604F88                 dq offset aEngland      ; "england"
.data:0000000000604F90                 dq offset aBrazil       ; "brazil"
.data:0000000000604F98                 dq offset a1978         ; "1978"
.data:0000000000604FA0                 dq offset a01011980     ; "01011980"
.data:0000000000604FA8                 dq offset aWildcat      ; "wildcat"
.data:0000000000604FB0                 dq offset aPolina       ; "polina"
.data:0000000000604FB8                 dq offset aFreepass     ; "freepass"
.data:0000000000604FB8 _data           ends
"""
passdic=re.findall('; "(.+?)"',str1)

# for password in passdic:
#     cmd=f'./re {password}'
#     p1=Popen(cmd,shell=True,stdout=PIPE,stderr=STDOUT)
#     try:
#         out1=str(p1.stdout.read(),'utf-8')
#     except:
#         out1=str(p1.stdout.read(),'gbk')

#     if 'Bad' in out1:
#         continue
#     elif 'Bad' not in out1:
#         print(password)
#         break
passlist = open("download.txt",'r').readlines()
for password in passlist:
   password = password.replace("\n","")
   cmd=f'./re {password}'
   p1=Popen(cmd,shell=True,stdout=PIPE,stderr=STDOUT)
   try:
     out1=str(p1.stdout.read(),'utf-8')
   except:
     out1=str(p1.stdout.read(),'gbk')

   if 'Bad' in out1:
     continue
   elif 'Bad' not in out1:
     print(password)
     break
```



# 解题思路

看到线索，直接停止分析，进行爆破或者跑脚本，不成功了再回头分析