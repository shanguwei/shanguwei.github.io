---
sidebar_label: '逆向进阶'
sidebar_position: 4
---

# 0-Preview

还记得，大概是在西安回北京的途中，差点没赶上高铁，喊了个滴滴加了五十多块钱走高速，雨天全程90码....

扯远了，与此同时，铜匠叔又发来了不定期的逆向罕见题目（全是内部赛网上找不到wp），这次是个安卓逆向，难度中等。

头一次做这种调试加so层的安卓题，给他划分到中等，安卓:older_man:当个乐子看就好

# 1-Ezapk

为了方便带:fire:看乐子，我还是把附件传上来，ezapk.apk

:book:基本分析流程，jeb打开直接看伪代码，瞅瞅软件大致脉络。

# 2-初步分析

## 2.1-主函数

![image-20230829205327624](http://image.shangu127.top/img/2023/ctf/image-20230829205327624.png)

主函数就做了个简单的前缀和后缀验证，之后的验证是check函数了，所以说之后调试构造的flag要格式正确要不然根本进不去（屁话）

## 2.2-check函数

![image-20230829210850972](http://image.shangu127.top/img/2023/ctf/image-20230829210850972.png)

值得留意的地方不少：
   一方面是getkey函数在so文件中，无法直接拿到key，需要我们动态调试下断点看变量
   第二是encode函数也在so里面，这里动调就没什么用了，需要去逆向

所以说从这里就可以得出结论，getkey这个函数在so里一定加了很多混淆，逆不出来，只能动调，encode刚好相反。

# 3-动态调试

推荐一个模拟器，还是k4:older_man:给我说的，甚至我的jeb都是k4:older_man:给的。：
![image-20230829211638450](http://image.shangu127.top/img/2023/ctf/image-20230829211638450.png)

软件叫genymotion，操作简单，自带root。不像我之前用的android studio自带的avd，没有root还需要刷Magisk。

如果真打算用as的自带的，推荐一个工具，github上的rootAVD，操作很简单，但是好像会因为默认shell进去不是root导致jeb附加以后看不到一些变量。

安装好以后按顺序执行一下下面两个指令：

```bash
adb root
adb shell
```

确保进去后默认是root：
![image-20230829212043589](http://image.shangu127.top/img/2023/ctf/image-20230829212043589.png)

继续调试：

首先构造一个fakeflag：

![image-20230829211932041](http://image.shangu127.top/img/2023/ctf/image-20230829211932041.png)

找到我们需要下断点的语句，`ctrl + b` 下断点：
![image-20230829212200950](http://image.shangu127.top/img/2023/ctf/image-20230829212200950.png)

之后点jeb上面的`Debuger-start`

![image-20230829212252557](http://image.shangu127.top/img/2023/ctf/image-20230829212252557.png)

直接attach，右上角的三个窗口分别为：断点、变量、线程
![image-20230829212401751](http://image.shangu127.top/img/2023/ctf/image-20230829212401751.png)

我们选变量，然后会发现此时程序并没有在我们下断点的地方停下来，对应着源代码的话，就是还缺个click动作，回到模拟器点一下确认，此时肯定是在断点停下来了。

:leaves:我的没停，我三岁的笔记本不堪重负，他闪退了。。。
断点下在这里才行，刚刚下的太远了，已经转成字节流不方便提取。此时key就在v1里面

![image-20230829213134388](http://image.shangu127.top/img/2023/ctf/image-20230829213134388.png)

断点下完以后，使用jeb上面的调试按钮，分别为：步入、步过、执行到光标处

![image-20230829213251912](http://image.shangu127.top/img/2023/ctf/image-20230829213251912.png)

同样，针对这个题如果你调试时候不小心跳过去了，不用重新打开软件重新附加，只需要点一下图中长得跟播放按钮差不多的那个，再回到模拟器再点击一次确定就行。

到这里实际上动调还没结束，我们还需要为encode函数的分析再收集收集信息，继续往下走看看我们传入的密文发生哪些变化：

![image-20230829213606660](http://image.shangu127.top/img/2023/ctf/image-20230829213606660.png)

执行到这里，此时p0的值是经过aes加密后的结果，但是仔细看当前停止的语句，还有一个encode还没有执行，说明这道题有两层加密，最早分析的时候只是到这里就停了，找了各种aes解密脚本都不行。

![image-20230829213819806](http://image.shangu127.top/img/2023/ctf/image-20230829213819806.png)

到这里才是我迷惑的地方，他这个加密会导致字符串变短，神奇的很，而且毫无规律，接下来就是静态分析的部分了。

# 4-静态分析

用压缩包格式打开apk，在lib目录下找到一个x64的so文件拖到ida去分析，因为我linux只有ida64没32的：

![image-20230829214154553](http://image.shangu127.top/img/2023/ctf/image-20230829214154553.png)

![image-20230829214232039](http://image.shangu127.top/img/2023/ctf/image-20230829214232039.png)

找到我们要分析的函数，进去直接f5分析就可以

```c
  v4 = env->functions->GetStringUTFChars(env, secret, 0LL);
  env->functions->ReleaseStringUTFChars(env, secret, v4);
  if ( *v4 )
  {
    for ( i = 0LL; strlen(v4) > i; ++i )
    {
      v8 = v4[i];
      if ( (unsigned int)(v8 - 123) > 0xFFFFFFE5 )
      {
        v6 = 97;
        v7 = -97;
      }
      else
      {
        if ( (unsigned int)(v8 - 91) < 0xFFFFFFE6 )
          continue;
        v6 = 65;
        v7 = -65;
      }
      v4[i] = v6
            + v7
            + v8
            + 17
            - 26 * ((20165 * ((char)(v7 + v8) + 17) < 0) + ((unsigned int)(20165 * ((char)(v7 + v8) + 17)) >> 19));
    }
  }
  v13 = 0LL;
  v12 = 0LL;
  v11 = 0LL;
  v10 = 0LL;
  v14 = 0;
  v10 = _mm_movelh_ps((__m128)*((unsigned __int64 *)v4 + 1), (__m128)*((unsigned __int64 *)v4 + 7));
  v11 = _mm_movelh_ps((__m128)*((unsigned __int64 *)v4 + 3), (__m128)*((unsigned __int64 *)v4 + 6));
  v12 = *((_OWORD *)v4 + 2);
  *(_QWORD *)&v13 = *((_QWORD *)v4 + 2);
  *((_QWORD *)&v13 + 1) = *(_QWORD *)v4;
  result = env->functions->NewStringUTF(env, &v10);
```

这个代码可以分为两部分，第一部分按位加密第二部分打乱字符串

## 4.1-按位加密

这个伪代码看起来是比较绕的，绕来绕去实际上实现的就是个凯撒加密：
![image-20230829214701681](http://image.shangu127.top/img/2023/ctf/image-20230829214701681.png)

首先就是这俩判断条件，这个十六进制数表示的是负数的-27和-26。

一般呢遇到这种情况，我都是先将他们用python实现出来，翻译成python版本，也方便看和调试。

```python
secret = "NOYKxeJRlz65XGjgTODxUvJIBdnY8NQZNQgnoK5Mxckh3fhvJjNFWoBM8wVCdfOz"
flag = []
for i in range(len(secret)):
    v8 = ord(secret[i])
    #V8 - 123 > -27
    if v8 > 96:
        v6 = 97
        v7 = -97
    else:
        #v8 -91 < -26
        if v8 < 65:
            flag.append(v8)
            continue
        v6 = 65
        v7 = -65
    #((20165 * ((char)(v7 + v8) + 17) < 0) + ((unsigned int)(20165 * ((char)(v7 + v8) + 17)) >> 19))
    flag.append(v6 + v7 + v8 + 17 - 26 * (20165 * ((v7 + v8 + 17) < 0) + (20165 * (v7 + v8 + 17)) >> 19))

print(flag)
for i in range(len(flag)):
    print(chr(flag[i]),end="")
```

这里的python版本实际上没有优化，只是照搬了一下c的伪代码，也方便看懂，这里再贴一个优化过的版本，回归本质：

```python
secret = ""
flag = []
for i in range(len(secret)):
    if secret[i].isdigit():
        flag.append(secret[i])
    elif secret[i].islower():
        if ord(secret[i]) + 17 > ord("z"):
            flag.append(chr(ord(secret[i]) + 17 - 26))
            continue
        flag.append(chr(ord(secret[i])+17))
    elif (ord(secret[i]) + 17) > ord("Z"):
        flag.append(chr(ord(secret[i]) + 17 - 26))
    else:
        flag.append(chr((ord(secret[i])+17) ))
print("".join(flag))
```

感觉并没有简单多少，主要是凯撒加密超过z以后需要重头遍历稍微麻烦

下面是gpt写的：

经过这三个脚本，想必肯定都能看明白这个encode函数第一部分实现的功能了吧。

## 4.2-排列字符

讲起来很方便理解，但是做的时候就是看不懂，这个代码实现的功能就是，首先定义了五个变量v10-v14，将字符串八个一组进行分组，刚好8组，然后按照新的顺序排列。

```
0 1 2 3 4 5 6 7
变为：
1 7 3 6 4 5 2 0 
```

所以我们需要编写的逆向脚本就只是凯撒一下，知道原理在线解密都行：

![image-20230829224001836](http://image.shangu127.top/img/2023/ctf/image-20230829224001836.png)

WXHTgnSAui65GPspCXMgDeSRKmwH8WZIWZpwxT5Vgltq3oqeSsWOFxKV8fELmoXi

手动处理一下顺序得到：
8fELmoXiWXHTgnSASsWOFxKVCXMgDeSRWZpwxT5Vgltq3oqeKmwH8WZIui65GPsp

然后就是在线解密aes：

![image-20230829224240491](http://image.shangu127.top/img/2023/ctf/image-20230829224240491.png)

![image-20230829224331784](http://image.shangu127.top/img/2023/ctf/image-20230829224331784.png)