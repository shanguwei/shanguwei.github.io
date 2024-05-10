---
sidebar_position: 1
---

# 前置环境

也可以选择采用现成的 pwn 虚拟机，无需自己配置。

Windows系统 + linux虚拟机 + docker engine

虚拟机软件：VMware
http://www.taodudu.cc/news/show-6333593.html?action=onClick

docker安装教程：

https://docs.docker.com/engine/install/debian/

## 以ubuntu为例：

1、更新apt软件列表并且安装https协议支撑：

```bash
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
RUN sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

2、像apt添加docker官方gpg秘钥：

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

3、设置docker下载仓库

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

# ！！！！！注意！！！！！

**所有环境推荐ubuntu！不推荐使用kali进行配置，如果是其他系统请直接跳过此步骤，此步骤为kali解决方案**

:book:使用kali系统需要调整一下docker预装配置文件的系统编号，防止无法拉取docker。

```bash
cat /proc/version
```

找到自己Debian版本，https://www.debian.org/releases/index.zh-cn.html查找对应的版本名称

```bash
vim /etc/apt/sources.list.d/docker.list
#替换kali rollin   bookworm
```

# ！！！！！此步骤为最后步骤！！！！！

```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

# Dockerhub换源

docker pull 命令卡顿，无法下载，就需要更换国内的镜像源

```
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
		{
  			"registry-mirrors": ["http://hub-mirror.c.163.com","https://registry.docker-cn.com","https://docker.mirrors.ustc.edu.cn"]
		}
EOF

systemctl daemon-reload
systemctl restart docker
```

## upload

docker search upload-labs

docker pull monstertsl/upload-labs

docker run --name upload-labs -p 81:80 --env HTTP_PROXY="http://172.27.6.57:8888" -d monstertsl/upload-labs  

## java

确保拥有三个版本的java，应对各种工具依赖版本不同的问题

## Python

目前所需版本为python2、python3.8、python3.11

可选择使用conda来管理python版本

# 解题工具

## Cyberchef-docker

https://github.com/mpepping/docker-cyberchef

直接安装指令：

```bash
docker run -d -p 8000:8000 mpepping/cyberchef
```

## Aperisolve-docker

https://github.com/Zeecka/AperiSolve

部署指令：

```bash
docker-compose build
docker-compose up
```

## Ciphey

https://github.com/Ciphey/Ciphey

自称对标cyberchef的一款自动化编码解密工具

安装指令：

```bash
python3 -m pip install ciphey --upgrade
```

## volatility

取证工具

https://github.com/volatilityfoundation/volatility

安装教程：

https://blog.csdn.net/qq_42880719/article/details/117304586?spm=1001.2014.3001.5502

## volpro

全自动取证工具，集成了volatility

https://github.com/Tokeii0/VolatilityPro

依赖python3.10以上版本

## stegsolve

图片隐写分析工具

https://github.com/Giotino/stegsolve/releases/tag/v1.4

## UsbKeyboard&Mouse_Hacker_Gui

自动化usb流量分析工具

https://github.com/Mumuzi7179/UsbKeyboard_Mouse_Hacker_Gui

免安装，直接python调用

## ARCHPR

http://www.downza.cn/soft/208982.html

压缩包爆破工具

## Wireshark

流量分析工具，针对个人习惯可以选择低版本解题

https://www.wireshark.org/
