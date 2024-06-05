---
sidebar_label: '方法论&思维梳理'
sidebar_position: 2
---

# Misc

## 速通思路

1、magic自动化解析出可处理字符

2、brute爆破所有常见加密



## 做题思路

```
45 46 45 46 32 45 32 46 46 45 46 32 46 45 46 46 32 46 46 46 32 45 46 46 46 32 46 46 45 45 46 45 32 45 46 46 46 32 46 46 46 32 46 45 46 46 32
#特征提取
32 45 46 “ ”
#培根加密、莫斯密码
```

### checkin

```
109 115 104 110 123 108 53 55 105 57 108 49 56 105 48 56 105 109 109 48 107 48 53 104 51 106 53 57 57 48 48 105 49 48 63 63 63 125 116 107 53 58 55 52 50 108 104 56 49 53 50 109 109 49 49 105 49 109 54 109 57 51 49 52 106 51 106 52 108 109 109 57 51 108
#和flag相关并且一一对应
flag{}
mshn{l57i9l18i08imm0k05h3j59900i10???}tk5:742lh8152mm11i1m6m9314j3j4lmm93l
#加密仅针对字母（数字），不针对字符
#f m l s
flag{e57b9e18b08bff0d05a3c59900b10???}md5:742ea8152ff11b1f6f9314c3c4eff93e
```

exp:

```python
import itertools
import hashlib

secret = "flag{e57b9e18b08bff0d05a3c59900b10"
md5_result = "742ea8152ff11b1f6f9314c3c4eff93e"
ct = "0123456789abcdefghijklmnopqrstuvwxyz"

for i in itertools.product(ct, repeat=3):
    key = secret + "".join(i) + "}"
    result = hashlib.md5(key.encode()).hexdigest()
    if result == md5_result:
        print(key)
```

### md5crack

已知手机号1709，只需爆破七位，判断是否与给出的sha256相等

## 做题工具

cyberchef-Magic 自动识别并解密编码