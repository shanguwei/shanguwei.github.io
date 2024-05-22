---
sidebar_label: 'pwn工具及插件'
sidebar_position: 3
---

# 工具汇总

## Pwntools

```bash
pip3 install pwntools
```

## GDB

## Pwninit

[下载链接](https://github.com/io12/pwninit)

## glibc-all-in-one

[下载链接](https://github.com/matrix1001/glibc-all-in-one)

## clibc

[下载链接](https://github.com/tower111/pwn-change-libc)

```bash
git clone https://github.com/tower111/pwn-change-libc
cd pwn-change-libc
#将此项目下update_list文件第一行的python改为python3
python3 get_env.py
sudo ln -s <clibc的绝对路径> /usr/bin/clibc
```

使用方法：

```bash
#clibc 目标文件 目标版本
clibc pwn 2.21
```



## IDA

## pwndbg

[下载链接](https://github.com/pwndbg/pwndbg)

## sgtlibc

[下载链接](https://github.com/serfend/sgtlibc)

## pycdc

[源码](https://github.com/zrax/pycdc)

[编译版本](https://github.com/extremecoders-re/decompyle-builds)