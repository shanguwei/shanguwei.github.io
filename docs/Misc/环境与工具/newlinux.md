# 0_preview

# 基础环境

## 换源

换源最好在进行所有操作之前进行，推荐使用清华大学镜像站有详细的教程，我这里写一个Ubuntu22.04的速通版本：
:star:使用gedit打开apt配置文件：

```bash
sudo gedit /etc/apt/sources.list
```

:star:将下列内容替换掉原文件内容：

```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
```

![image-20231219202336138](http://image.shangu127.top/img/2024/03/image-20231219202336138.png)

ctrl + s 保存后执行更新指令更新软件列表：

```
sudo apt update
```

很多人都有疑问`apt`和`apt-get`哪个好，有什么区别，这里简述一下：

> apt是替代apt-get的新产品，能够看作 apt-get 和 apt-cache 指令的子集, 能够为包处理供给必要的指令选项。
> apt-get 虽然没被弃用，但作为普通用户，仍是应该首要运用 apt。
> apt功能更多，细节更好，比如加入了鲜艳的颜色
> 下面为执行apt list的结果：

![image-20231219203248265](http://image.shangu127.top/img/2024/03/image-20231219203248265.png)

## 基础依赖包

curl：

```bash
sudo apt install curl
```

git:

:star2:卸载Ubuntu自带的低版本git，更新git官方仓库并安装：

```bash
sudo apt purge git
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

gcc:

```bash
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt update
sudo apt install gcc
```

net-tools:

```
sudo apt install net-tools
```



## 搜狗输入法

我最早用的是这个，如果有更好的跳过自行解决即可。
:star:安装fcitx（小企鹅输入法）,卸载自带的ibus

```bash
sudo apt install fcitx
sudo apt purge ibus
```

提到小企鹅输入法，有一段比较有意思的故事：

> Yuking创建了Fcitx项目，服务于Linux中文社区。
> 因云帆论坛有人批评Fcitx代码写的很差，作者于2007年7月10日决定终止本项目。
> 不过2008年9月开始作者又加入离开后爱好者建立的Google Code项目并频繁更新。
> 他发文谈到无法忘记fcitx。 除了原作者之外，还有一些爱好者共同维护Fcitx。

:star:前往官网下载linux系统的deb安装包：https://shurufa.sogou.com/
之后执行如下指令安装依赖包：

```
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install libgsettings-qt1
```

:star:切换到下载下来的安装包目录安装输入法：

```
cd ~/Downloads/
sudo dpkg -i sogoupinyin_4.2.1.145_amd64.deb
```

> `dpkg` 是“Debian Packager ”的简写，他和apt是并列关系。
> 我们先在这里挖个坑:hole:后面写一篇这些包管理器的关系，以及打包一个程序。

目前只需要记住下面这几个指令即可：

```bash
-i	安装软件包
-r	删除软件包
-l	显示已安装软件包列表
-L	显示于软件包关联的文件
-c	显示软件包内文件列表
```

:star2:配置搜狗输入法

配置开机自启并重启电脑：

```bash
sudo cp /usr/share/applications/fcitx.desktop /etc/xdg/autostart/
sudo reboot
```

登录后在右上角可以看到一个新的键盘标志，点击配置（config）需要添加一下搜狗输入法：
![image-20231220141012394](http://image.shangu127.top/img/2024/03/image-20231220141012394.png)

![image-20231222164211629](http://image.shangu127.top/img/2024/03/image-20231222164211629.png)

## oh-my-zsh （终端）

打开终端的快捷键是 `Ctrl + Shift + T`首先要确定你的电脑有zsh：

```bash
cat /etc/shells
```

![image-20231220164537507](http://image.shangu127.top/img/2024/03/image-20231220164537507.png)

没有的话，执行下面的指令安装：

```bash
sudo apt install zsh
chsh -s /bin/zsh
```

之后重启电脑，再打开终端就会发现变成了一个更丑的终端，所以说就需要Oh-My-Zsh来管理和配置zsh：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

![image-20231220165251452](http://image.shangu127.top/img/2024/03/image-20231220165251452.png)

具体的配置这里再挖一个坑:hole:
如果你修改过里面的内容记得`source`一下才会刷新，或者重启终端：

```
source ~/.zshrc
```

## Tabby（Terminus）

原本的Terminus：

> Terminator 是一个跨平台的终端仿真器，提供了多标签页和分屏功能，允许用户在单个窗口中同时运行多个命令行界面。它允许用户更加灵活地管理和组织终端会话，但它本身并不影响你使用的 shell 或命令行工具。

下载deb安装包，然后执行命令安装

```
https://github.com/Eugeny/tabby
#安装依赖
sudo apt update
sudo apt install gconf2 gconf-service
#如果安装依赖报错，就执行
sudo apt --fix-broken install
#安装tabby
sudo dpkg -i tabby-1.0.205-linux-x64.deb
```

![image-20231221181751417](http://image.shangu127.top/img/2024/03/image-20231221181751417.png)

将系统默认终端窗口改为Tabby：

```bash
#查询Tabby位置
whereis tabby
#根据返回结果设置路径
gsettings set org.gnome.desktop.default-applications.terminal exec /usr/bin/tabby
gsettings set org.gnome.desktop.default-applications.terminal exec-arg "-x"
#如果要恢复默认终端
gsettings reset org.gnome.desktop.default-applications.terminal exec
gsettings reset org.gnome.desktop.default-applications.terminal exec-arg
```

此时`ctrl + alt + T`打开的就是Tabby了。
但是右键 `Open In Terminal`还是会打开自带的默认终端，需要再做更改：
目前有两种解决方案，一种是不对系统进行更改，只做一个简单的跳转，他们称这种方式很 “hacky”：

右键打开原本的终端，然后选择：

![image-20231222172108595](http://image.shangu127.top/img/2024/03/image-20231222172108595.png)

![image-20231222172045871](http://image.shangu127.top/img/2024/03/image-20231222172045871.png)

这样就完成了终端跳转，很明显，只是每次启动默认执行一条命令。
效果如下，的确很 “hacky”：
![image-20231222172226085](http://image.shangu127.top/img/2024/03/image-20231222172226085.png)

以前的终端并不会消失，继续看第二种方法：

:white_check_mark:下载安装次deb包：

```
https://github.com/bassmanitram/actions-for-nautilus/tree/main/dist
#安装依赖
sudo apt install python3-nautilus python3-gi procps libjs-jquery
sudo dpkg -i actions-for-nautilus_1.6.1_all.deb
```

然后再应用列表打开这个软件，会跳转到浏览器访问本地端口进行配置：

```
Open in Tabby
tabby
```

```
cat /usr/bin/tabby                                                                                                 
#!/bin/sh
/opt/Tabby/tabby
```

之后在应用里面打开`Actions For Nautilus configuration`进行如下配置：

![image-20231224143027241](http://image.shangu127.top/img/2024/03/image-20231224143027241.png)

这个配置暂时搁置，还原回默认终端，由于tabby还不是很好用，等他更新吧。

## Zoxide

一个替代cd指令的工具可以记录常用目录，大大节省切换目录浪费的时间。

```
curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash
```

然后打开zshrc将下面代码添加到最后一行：

```
eval "$(zoxide init zsh)"
```



## Guake

一个下拉终端，alt+f2的替代品，可以有效的降低使用Ubuntu时产生的终端数量。

> alt + f2打开的启动窗口无法识别.zshrc的配置，他是基于/usr/bin以及~/.profile的，所以我们配置的别名无法再alt+f2启动。
>
> 可以写环境变量来实现，也可以使用guake来替换他。

```bash
https://guake.readthedocs.io/en/latest/user/installing.html#system-wide-installation
sudo add-apt-repository ppa:linuxuprising/guake
sudo apt install guake
```

按f12就弹出终端，按完就隐藏。右键给终端重命名。

## Python+Anaconda

所需环境大概为python2.7 + python3.8 + python3.10。使用conda完成版本控制。

:star:Ubuntu没有预装python2，需要安装一下：

```bash
sudo apt install python2
#pip2
sudo curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py
sudo python2 get-pip.py
#pip3
sudo apt install python3-pip
#将pip执行pip3，因为很少用python2
sudo mv /usr/bin/pip /usr/bin/pip.bak
sudo ln -s /usr/bin/pip3 /usr/bin/pip
```

:star:安装anaconda：

```bash
sudo apt install wget
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2023.09-0-Linux-x86_64.sh
chmod +x Anaconda3-2023.09-0-Linux-x86_64.sh
./Anaconda3-2023.09-0-Linux-x86_64.sh
```

用:arrow_down:按键来翻页，要输入两个yes，最后这个yes的作用是他帮你在`.zshrc`里面配置环境变量

![image-20231220170809965](http://image.shangu127.top/img/2024/03/image-20231220170809965.png)

![image-20231220170936937](http://image.shangu127.top/img/2024/03/image-20231220170936937.png)

每次对.zshrc配置后都要刷新一下，或者直接把终端关了开新的：

```
source ~/.zshrc
```

现在还需要把每次开终端默认进入（base）环境给他关掉：

```bash
conda config --set auto_activate_base false
```

### Anaconda换源：

:triangular_flag_on_post:由于更新过快难以同步，清华源不同步`pytorch-nightly`, `pytorch-nightly-cpu`, `ignite-nightly`这三个包

```
gedit ~/.condarc
```

```bash
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  deepmodeling: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/
```

之后刷新缓存即可：

```bash
conda clean -i
```

具体用法如下：

```bash
#这里对ai学习环境pytorch进行安装演示
#查询所有conda环境
conda env list
#新建环境，制定python版本为3.12
conda create --name SAM python=3.12
#激活进入环境
conda activate SAM
#安装pytorch
conda install pytorch torchvision torchaudio cpuonly -c pytorch
#退出环境
conda deactivate
```

![image-20231220175459997](http://image.shangu127.top/img/2024/03/image-20231220175459997.png)

## pip换源

```bash
sudo pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## Go语言环境

前往官网下载新的安装包：https://golang.google.cn/dl/

```bash
tar -xvf goxxxx.tar.gz
sudo mv go /usr/local
```

:fire_engine:配置环境变量：

```bash
gedit ~/.zshrc
export GOROOT=/usr/local/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
export GOPATH=/home/shangu/env/go
export GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
```

:tractor:开启gomod：

```bash
go env -w GO111MODULE=on
```



## Java +update-alternatives

update-alternative为Ubuntu自带的环境管理工具，可以用来管理多个版本的环境变量，使用指令来切换。

这里演示一下三个java环境的搭建，分别是java8 jdk11 jdk17
:coffee:首先在[官网](https://www.oracle.com/java/technologies/downloads)下载三个版本的压缩包，解压到一起：
![image-20231220180250863](http://image.shangu127.top/img/2024/03/image-20231220180250863.png)

然后使用`update-alternatives`将他们加入到环境中：

```bash
sudo update-alternatives --install /usr/bin/java java /home/shangu/env/java/jdk11/bin/java 1
sudo update-alternatives --install /usr/bin/javac javac /home/shangu/env/java/jdk11/bin/javac 1
sudo update-alternatives --install /usr/bin/java java /home/shangu/env/java/jdk1.8/bin/java 2
sudo update-alternatives --install /usr/bin/javac javac /home/shangu/env/java/jdk1.8/bin/javac 2
sudo update-alternatives --install /usr/bin/java java /home/shangu/env/java/jdk17/bin/java 3
sudo update-alternatives --install /usr/bin/javac javac /home/shangu/env/java/jdk17/bin/javac 3
```

:coffee:要切换对应环境的话执行下面命令然后直接输入对应编号：

```bash
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

![image-20231220181006066](http://image.shangu127.top/img/2024/03/image-20231220181006066.png)

## Docker

虽然docker官方现在力推docker desktop，但是:older_man:感觉那玩意儿十分鸡肋，还是docker命令行版好用。
:wastebasket:首先卸载老版本docker：

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

:whale2:添加源和安装docker：

```
sudo apt update
sudo apt install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
#添加仓库，下面几行为一条指令
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
#更新apt列表
sudo apt update
#安装docker
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

这几条指令没有回显是正常情况

![image-20231224144727504](http://image.shangu127.top/img/2024/03/image-20231224144727504.png)

:field_hockey:解决一下普通用户无法使用docker：

![image-20231224150331544](http://image.shangu127.top/img/2024/03/image-20231224150331544.png)

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
sudo systemctl restart docker
#如何重启服务还是不行，那就重启电脑
```

### qemu

看自己是否需要用到。
:star:检查cpu是否支持虚拟化，返回值大于0就说明支持虚拟化：

```bash
sudo apt install cpu-checker
#查看cpu是否支持
egrep -c '(vmx|svm)' /proc/cpuinfo
#查看是否支持KVM虚拟机
kvm-ok
```

![image-20231226181519013](http://image.shangu127.top/img/2024/03/image-20231226181519013.png)

:star:安装qemu/kvm

```bash
sudo apt update
```



### WPS

老套路，官网下载然后dpkg安装
https://www.wps.cn/product/wpslinux

![image-20231225153031548](http://image.shangu127.top/img/2024/03/image-20231225153031548.png)

# Ubuntu美化

## 添加字体

wps会报错提示缺少windows系统某些字体

## 开机引导页面配置

### 原神启动！



## 更换主题

:white_flower:安装gnome-tweaks

```bash
sudo apt install gnome-tweaks chrome-gnome-shell
```

:cherry_blossom:浏览器安装gnome-shell：
https://chromewebstore.google.com/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep?hl=en-US&utm_source=ext_sidebar

将其添加到chrome扩展，出现这个页面说明正常安装：
![image-20231225154831521](http://image.shangu127.top/img/2024/03/image-20231225154831521.png)

:blossom:必装组件：

上图的第一条User Theme，点进去，页面右边的off按钮点一下就行
![image-20231225155232193](http://image.shangu127.top/img/2024/03/image-20231225155232193.png)

![image-20231225155145828](http://image.shangu127.top/img/2024/03/image-20231225155145828.png)

在管理页面里将Ubuntu Dock关掉，否则会出现两个dock，并且有极大概率卡死：
![image-20231225175404237](http://image.shangu127.top/img/2024/03/image-20231225175404237.png)

```
#卸载系统自带dock
sudo apt remove gnome-shell-extension-ubuntu-dock
#如需恢复，要重新安装
sudo apt install gnome-shell-extension-ubuntu-dock
```

目前我遇到的bug是当锁屏一段时间后重新开启电脑，dock栏就只剩下一个按钮并且只要按了，就会卡死，可以使用下面方式暂时解决：

```
arl + f2 输入r
```

:white_flower:挑选喜欢的主题：https://www.pling.com/browse?cat=366&ord=latest

![image-20231225175738519](http://image.shangu127.top/img/2024/03/image-20231225175738519.png)
我这里还是延续上次用的主题把，新的:older_man:用不惯，拉嗓子。
![image-20231225175918610](http://image.shangu127.top/img/2024/03/image-20231225175918610.png)

点进来以后是相关信息，图标主题什么的，我们直接去github看教程，对应的主题标题下都有github链接：
https://github.com/vinceliuice/WhiteSur-gtk-theme

```bash
git clone https://github.com/vinceliuice/WhiteSur-gtk-theme.git --depth=1
./install.sh -t all
sudo ./tweaks.sh -g
```

> - `-g, --gdm`: 安装特定的 GDM 主题（登录管理器主题），可以选择不同的缩放比例。
> - `-o, --opacity`: 设置 GDM 主题的透明度变体。
> - `-c, --color`: 设置 GDM 和 Dash to Dock 主题的颜色变体。
> - `-t, --theme`: 设置 GDM 主题的强调色。
> - `-N, --no-darken`: 不使 GDM 主题背景图变暗。
> - `-n, --no-blur`: 不使 GDM 主题背景图模糊。
> - `-b, --background`: 设置 GDM 主题的背景图像。
> - `-p, --panel-opacity`: 设置 GDM（GNOME Shell）主题面板透明度。
> - `-P, --panel-size`: 设置 Gnome shell 面板高度尺寸。
> - `-i, --icon`: 设置 GDM（GNOME Shell）'Activities' 图标。
> - `--nord, --nordcolor`: 安装 Nord ColorScheme 主题。

![image-20231225181724474](http://image.shangu127.top/img/2024/03/image-20231225181724474.png)

到这一步并不会改变主题，只是把主题装到了你的电脑里，咱先把东西都装完再进行下一步。

:fire:配置图标主题：

```bash
git clone https://github.com/vinceliuice/WhiteSur-icon-theme.git
./install.sh -t all
```

:apple:配置鼠标指针：

```bash
git clone https://github.com/vinceliuice/McMojave-cursors.git         
cd McMojave-cursors
./install.sh
```

:christmas_tree:配置背景及锁屏：

```bash
git clone https://github.com/vinceliuice/WhiteSur-wallpapers.git
sudo ./install-gnome-backgrounds.sh
```

![image-20231225181409776](http://image.shangu127.top/img/2024/03/image-20231225181409776.png)

:confetti_ball:开启主题：

打开终端输入下面指令进入配置页面：

```bash
gnome-tweaks
```

根据自己喜好去调主题即可：
![image-20240104151754662](http://image.shangu127.top/img/2024/03/image-20240104151754662.png)

:apple:最终效果图：



## 农历

插件网址：https://extensions.gnome.org/extension/675/lunar-calendar/
首先访问红框里的依赖包：
![image-20240104151449832](http://image.shangu127.top/img/2024/03/image-20240104151449832.png)

下载以后直接执行install.sh自动安装依赖，然后再安装插件

![image-20240104151157790](http://image.shangu127.top/img/2024/03/image-20240104151157790.png)

安装后点击配置按钮进行如下设置：
![image-20240104151712586](http://image.shangu127.top/img/2024/03/image-20240104151712586.png)

![image-20240104151643140](http://image.shangu127.top/img/2024/03/image-20240104151643140.png)



### 硬件信息检测

Ubuntu有时候想知道各种硬件占用情况，可以使用这个gnome插件
https://github.com/hardpixel/systemd-manager

```bash
sudo apt install gir1.2-gtop-2.0 gir1.2-nm-1.0 gir1.2-clutter-1.0 gnome-system-monitor
```

![image-20240105145534632](http://image.shangu127.top/img/2024/03/image-20240105145534632.png)

初次安装完成后会报错，alt + f2然后输入r并且回车。

![image-20240105151055523](http://image.shangu127.top/img/2024/03/image-20240105151055523.png)

很怪异的感觉，很突兀，并且十分不简洁大体，右键设置可以隐藏这些东西：

![image-20240105151143853](http://image.shangu127.top/img/2024/03/image-20240105151143853.png)

把display的:white_check_mark:去掉就行,最终只留一个图标在那方便悬停查看就行：
![Screenshot from 2024-01-05 15-15-40](http://image.shangu127.top/img/2024/03/Screenshot from 2024-01-05 15-15-40.png)

### 服务管理器

有些时候我并不希望数据库以及docker开机自启，就可以使用这个工具来管理这些服务：https://extensions.gnome.org/extension/4174/systemd-manager/
不过这玩意儿好像作用不大，还是关了吧，有需要的可以整一下。
![Screenshot from 2024-01-05 15-24-53](http://image.shangu127.top/img/2024/03/Screenshot from 2024-01-05 15-24-53.png)

## GRUB启动引导

可以自己改一个原神启动！：

```bash
git clone https://github.com/voidlhf/StarRailGrubThemes.git
```

在theme中挑选自己喜欢的一个：

```bash
sudo cp -r Huohuo /usr/share/grub/themes
```

首先配置grub：

```bash
sudo gedit /etc/default/grub
```

![image-20240105182226705](http://image.shangu127.top/img/2024/03/image-20240105182226705.png)

参考我的图片进行配置，注释掉了两个配置

## 截图工具-flameshot

推荐使用`flameshot`这个工具，但是需要将Ubuntu22.04新的桌面协议换成x11

> Ubuntu22.04采用了新的桌面协议`wayland`。*Wayland* 是 X11 的现代替代品，几十年来 X11 一直是 Linux 上的默认窗口系统。 Wayland 是一种通信协议，定义 X Window 显示服务器和客户端应用程序之间的消息传递。
> 当然新事物出现肯定会伴随着各种bug和软件不兼容，但是以后肯定还是`wayland`的天下，处于这个新旧交替的时间段，我们最好还是切回X11。

:star:把配置文件里的这句注释取消掉：

```bash
sudo gedit /etc/gdm3/custom.conf
```

![image-20231220104710440](http://image.shangu127.top/img/2024/03/image-20231220104710440.png)

:star:安装依赖环境：

```bash
# Compile-time
apt install g++ cmake build-essential qtbase5-dev qttools5-dev-tools libqt5svg5-dev qttools5-dev

# Run-time
apt install libqt5dbus5 libqt5network5 libqt5core5a libqt5widgets5 libqt5gui5 libqt5svg5

# Optional
apt install git openssl ca-certificates
```

:star2:安装flameshot：

```bash
cd ~/Downloads
sudo dpkg -i flameshot-12.1.0-1.debian-10.amd64.deb
```

:star:配置快捷键：
Setting -- > Keyboard -- > View and Customize Shortcuts -- > Custom Shortcuts -- > 

![image-20231220125328195](http://image.shangu127.top/img/2024/03/image-20231220125328195.png)

之后按f1就是截图了。

## 文本编辑器

## Typora（Markdown）

:pencil:添加typora官方源：

```bash
wget -qO - https://typoraio.cn/linux/public-key.asc | sudo tee /etc/apt/trusted.gpg.d/typora.asc
sudo add-apt-repository 'deb https://typoraio.cn/linux ./'
suod apt update
sudo apt install typora
```

之后就可以在终端直接使用typora wp.md来新建一个Markdown文档了，只不过再配置主题之前，我们的Markdown文档并没有相应图标（右边是我手动改的效果）：
![image-20231220141404109](http://image.shangu127.top/img/2024/03/image-20231220141404109.png)

typora是收费的，我记得89块钱永久，需要的可以买一个。

## Proxychains-代理工具

我们直接从github下载，一些小的更新并没有发布release：

```bash
git clone https://github.com/rofl0r/proxychains-ng.git
cd proxychains-ng
./configure --prefix=/usr --sysconfdir=/etc
make
sudo make install
sudo make install-config
```

配置proxychains：

```bash
sudo gedit /etc/proxychains.conf
socks5 127.0.0.1 7890
```

![image-20231226154228509](http://image.shangu127.top/img/2024/03/image-20231226154228509.png)

之后使用proxychains4 后面加的所有指令都会走7890端口的转发。

```bash
proxychains firefox
```

## Sublime（代码）

付费软件可以免费使用：

```bash
https://download.sublimetext.com/sublime-text_build-4169_amd64.deb
```

或者是自己去github看看有没有人发布的patcher可以用。

```bash
sudo dpkg -i sublime-text_build-4152_amd64.deb
```

之后就可以使用`subl`这条指令来启动sublime，以下是他自带的语言支持：
工具 -- > 编译系统，但是里面的配置是默认的，比如python就是去调用python3这条指令，如果你电脑没有那就无法执行。
并且里面的配置是最基本的并没有精细的配置。

### 汉化

:package:安装包管理器：

`ctrl + Shift + p`输入`install package`然后点击第一项，等待一分钟：
![image-20231222111807932](http://image.shangu127.top/img/2024/03/image-20231222111807932.png)

之后会弹出安装成功的提示。
再重复上述操作，等待几秒钟，就会发现窗口已经变成搜索栏了，输入Chinese，选择第一项。
![image-20231222112345907](http://image.shangu127.top/img/2024/03/image-20231222112345907.png)

### c语言支持

终端 -- > 编译系统 -- > 新建编译系统 -- > 粘贴配置文件，重命名为自定义名称

这是网上找的优化版本，调整了对scanf情况下终端的处理：

```json
{
    "cmd": ["g++ ${file} -o ${file_base_name}"], 
    "file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:? (.*)$",
    "working_dir": "${file_path}",
    "selector": "source.c, source.c++",
    "shell": true,
    "variants":
    [
        {
            "name": "Run",
            //"cmd": ["${file_path}/${file_base_name}"]
            "shell_cmd": "gcc \"${file}\" -o \"${file_path}/${file_base_name}\" -Wformat=2 && \"${file_path}/${file_base_name}\""
        },
        {
            "name": "RunInShell",
            // "cmd": ["gnome-terminal -- bash -c '${file_path}/${file_base_name};read' "]
            "cmd": ["gnome-terminal -- bash -c \"gcc ${file} -o ${file_path}/${file_base_name} -lm -Wall; ./${file_base_name};read \""]
            // "cmd": ["gnome-terminal -- bash -c \"g++ ${file} -o ${file_base_name} -lm -Wall; ./${file_base_name}; exec bash\""]
        }
    ]
}
```

### 自动目录

在编码过程中经常会出现需要写绝对路径的情况，这时候就需要自带补全功能里：

`ctrl + Shift + p`输入`install package`然后等待几秒，出现搜索框后输入`AutoFileName`
![image-20231222152425341](http://image.shangu127.top/img/2024/03/image-20231222152425341.png)

效果如下：
![image-20231222152625645](http://image.shangu127.top/img/2024/03/image-20231222152625645.png)

### 括号匹配高亮

安装操作如上：
搜索Bracket Highlighter即可，接下来在弹出的配置文档内粘贴下列内容：



效果如下：
![image-20231222154547805](http://image.shangu127.top/img/2024/03/image-20231222154547805.png)

### 自动补全

## Vscode

https://code.visualstudio.com/docs/?dv=linux64_deb

```bash
sudo dpkg -i code_1.85.1-1702462158_amd64.deb
```



## AndroidStudio（安卓开发环境）

安卓开发环境并不能用Sublime完全替代，且不提SDK版本工具管理，最基本的调试就很麻烦，所以还是要装一个安卓环境的。

:crossed_fingers:下载[AndroidStudio](https://developer.android.google.cn/studio?hl=zh-cn)：

找地方解压：

```bash
tar -zxvf android-studio-2022.3.1.21-linux.tar.gz
cp -r android-studio /home/shangu/tools/Android
```

:ok_hand:初始化配置：

```bash
cd /home/shangu/tools/Android/android-studio/bin/
./studio.sh
```

启动后直接一路店next即可，如果需要代理可以配置成本地的或者直接开全局代理：
![image-20231225233231525](http://image.shangu127.top/img/2024/03/image-20231225233231525.png)

这个页面留意一下，因为安卓实际上也是linux系统，所以我们直接可以利用linux的虚拟化去调试，而不需要装模拟器：
https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio&hl=zh-cn#vm-linux

默认SDK会下载到/home/Android/SDK，可以迁移到别的地方，改SDK目录即可

:fire:配置启动指令，推荐配置成别名，比环境变量方便：

```bash
gedit ~/.zshrc
alias as="/home/shangu/tools/Android/android-studio/bin/studio.sh"
```

## DBeaver

面向开发人员、SQL程序员、数据库管理员和分析师的免费多平台数据库工具。支持任何具有JDBC驱动程序的数据库（基本上意味着-任何数据库）

:ballot_box:官网下载直接安装：https://dbeaver.io/download/

```bash
sudo dpkg -i dbeaver-ce_23.3.1_amd64.deb
```



## 谷歌浏览器Chrome

:earth_africa:官网下载deb安装包：https://www.google.cn/intl/en_uk/chrome/

```
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

谷歌会弹出一个提示：Make Chrome faster

Memory Saver frees up memory from inactive tabs so it can be used by activate tabs and other apps

## R3PLAY(YesPlayMusic)

Linux下的全平台音乐软件，支持多音源，可视化界面。
软件使用AppImage打包，所以需要安装FUSE：

```bash
sudo add-apt-repository universe
sudo apt install libfuse2
```

:star:配置别名以及加入程序图标：

为了方便启动，在zshrc里面配置别名，

1、首先找个目录新建一个文件夹，将appimage放进去
2、启动他，然后去切换到/tmp目录下，Ctrl + H 显示隐藏文件，找到R3PlAY的文件夹：
![image-20231221130057870](http://image.shangu127.top/img/2024/03/image-20231221130057870.png)

3、将里面的desktop.desktop以及desktop.png复制出来放到我们自建的目录里，修改图标路径。
如果这一步复制不了可以采用xxd转16进制，然后自己保存一份。

```
[Desktop Entry]
Name=R3PLAY
Exec=/home/shangu/tools/other/R3PLAY/R3PLAY.AppImage
Type=Application
Icon=/home/shangu/tools/other/R3PLAY/desktop.png
StartupWMClass=R3PLAY
StartupNotify=true
Categories=Music;
```

4、将上述内容覆盖到desktop文件，然后将其复制到/usr/share/applications目录下：

```bash
sudo cp ./desktop.desktop /usr/share/applications
```

至于添加别名，直接修改~/.zshrc即可：

```bash
gedit ~/.zshrc
#R3PLAY
alias R3PLAY="/home/shangu/tools/other/R3PLAY/R3PLAY.AppImage &"
#以下内容保存.zshrc后执行
source ~/.zshrc
```

之后在终端执行R3PLAY指令就是去开启这个播放器。

## YesPlayMusic

是R3PLAY的旧版本，但是其版号已经更新至4.7功能和稳定性比R3PLAY强。
github下载deb安装包即可：https://github.com/qier222/YesPlayMusic/releases/tag/v0.4.7

## OBS

录屏软件：https://obsproject.com/download#linux

```
sudo add-apt-repository ppa:obsproject/obs-studio
sudo apt update
sudo apt install ffmpeg obs-studio
```



## uTools（插件工具集）

https://www.u.tools/

本人暂时没用过，用过很早期的windows版本，不过我一直秉持着linux操作本来就很便捷流畅，无需插件加持，插件反而会让linux失去灵魂的理念。
希望这个工具能带给我惊喜。

```bash
sudo dpkg -i utools_4.4.1_amd64.deb
```

果然，这工具让我的linux系统变得非常别扭且及其突兀：

![image-20231220182731079](http://image.shangu127.top/img/2024/03/image-20231220182731079.png)

![image-20231220182802145](http://image.shangu127.top/img/2024/03/image-20231220182802145.png)

## FinalShell

连服务器用的，有可视化服务，方便拖文件
http://www.hostbuf.com/

```bash
sudo dpkg -i finalshell_linux_x64.deb
```

## Remmina

连接远程windows桌面，这玩意Ubuntu自带，可以更新一下。

```bash
sudo apt-add-repository ppa:remmina-ppa-team/remmina-next
sudo apt update
sudo apt install remmina remmina-plugin-rdp remmina-plugin-secret
```

## 钉钉

直接官网下载：
https://page.dingtalk.com/wow/z/dingtalk/simple/ddhomedownload#/

```bash
sudo dpkg -i com.alibabainc.dingtalk_7.1.0.31120_amd64.deb
```

## QQ

:older_man:原本是非常拒绝qq官网给的Linux版本的，因为:older_man:当时最早用Ubuntu时下载过，现在都无法忘记那仿佛回到十几年前的ui给:older_man:带来的震撼。
不过刚发现他们2023.12.18日更新了新版，让:older_man:再看看如何：

![image-20231222165241476](http://image.shangu127.top/img/2024/03/image-20231222165241476.png)

震撼到:older_man:嘞，不过是另一种震撼，这下qq就好用了。

直接官网下载：
https://im.qq.com/linuxqq/index.shtml
有AppImage打包的，也有deb安装包，推荐deb的。AppImage要加入到一些指令和图标很麻烦：

```bash
sudo dpkg -i linuxqq_3.2.3-19689_amd64.deb
```

那我们继续去看看微信。

## 微信

微信还是没有发布Linux版本，只能用deepwine来实现

:eight_spoked_asterisk:添加仓库：

```bash
wget -O- https://deepin-wine.i-m.dev/setup.sh | sh
```

![image-20240104172528008](http://image.shangu127.top/img/2024/03/image-20240104172528008.png)
:kick_scooter:安装微信：

```bash
sudo apt-get install com.qq.weixin.deepin
```

重新登入一下系统，图标就出现了。

:earth_americas:目前已知问题

> 无法直接点击打开文件，会跳转到浏览器地址，原因是deep-wine的虚拟化路径导致无法被文件系统识别。

所有的聊天文件都在`/home/shangu/Documents/WeChat Files`下，文件也在`/home/shangu/Documents/WeChat Files/wxid_35r5lw20rbgm21/FileStorage/File`目前来看是默认接受并存放。

## 腾讯会议

官网直接下载：https://meeting.tencent.com/download/

![image-20231224135336279](http://image.shangu127.top/img/2024/03/image-20231224135336279.png)

```
sudo dpkg -i TencentMeeting_0300000000_3.19.0.401_x86_64_default.publish.deb
```

## 百度网盘

:older_man:充了会员，:older_man:肯定要装，要不然就亏了。
官网下载deb安装包：https://pan.baidu.com/download#linux

```bash
sudo dpkg -i baidunetdisk_4.17.7_amd64.deb
```



## STEAM

经常有人惊讶于Linux能打游戏，实际上:older_man:也很惊讶。
但仔细一想，就产生了下面的直达灵魂的问题：

> 什么人会去将Linux作为主系统？
> 如果Linux连游戏都打不了？那能叫自由吗？
> :older_man::door:喜欢自由，freedom，什么是freedom。就是想干啥干啥！

:monkey:访问官网，直接下载对应版本，会自动识别系统：

![image-20240104152516475](http://image.shangu127.top/img/2024/03/image-20240104152516475.png)

:banana:安装steam：

```bash
sudo dpkg -i steam_latest.deb
```

:ferris_wheel:Freedom:

![Screenshot from 2024-01-04 15-30-45](http://image.shangu127.top/img/2024/03/Screenshot from 2024-01-04 15-30-45.png)

# CTF

## Misc

### Volatility-取证

推荐看[官方](https://github.com/volatilityfoundation/volatility)github的说明，我们还是采用别名的方式来调用，省去安装步骤

:star:前置环境，容易报错，所以一条一条安装：

```
pip2 install yara
sudo apt install python2-dev
pip2 install pycrypto
pip2 install distorm3
pip2 install openpyxl
```

:bookmark:下载项目文件：

```bash
git clone https://github.com/volatilityfoundation/volatility.git
```

:book:配置别名:

```bash
gedit ~/.zshrc
#vol2
alias vol2="python2 /home/shangu/tools/Misc/volatility/vol.py"
```

:wrench:解决报错，我感觉这个报错100%触发：
![image-20231226160101297](http://image.shangu127.top/img/2024/03/image-20231226160101297.png)

很明显是yara的报错，加一个软连接即可。（来自[套宝](https://blog.csdn.net/qq_42880719/article/details/117304586?spm=1001.2014.3001.5502)的解决办法）

```bash
sudo ln -s /home/shangu/.local/lib/python2.7/site-packages/usr/lib/libyara.so /usr/lib/libyara.so
```

![image-20231226160515729](http://image.shangu127.top/img/2024/03/image-20231226160515729.png)

很明显我们的vol2已经安装好了，并且没有执行那个setup.py，这里简述一下原理：

> setup.py实现的功能是将程序软连接到/usr/bin或/opt目录内，这样就可以通过终端直接调用，但是我们的alias直接作用于终端，并且有更高自由度。同样的道理所以怎么使用都行。

### volatility3

同样的操作流程，这是针对python3的版本，相较而言，:older_man:更喜欢vol2，因为3的语法抽象的:one::b:，整个工具透露出一股克系的美:octopus:。在使用过程中会让:older_man:san值狂掉。用克总的话就是：

> :older_man:的大脑细胞疯狂蠕动，他们仿佛拥有了分化的意识一般，有着独属于他们的想法，想要变成数以万计的:older_man:，从而变成:older_man::door:

但是不得不说，这工具的确也很常用，再挖个坑，以后等:older_man:容纳了这款工具就写一篇详细的使用指南。

:smile:拉取项目：

```bash
git clone https://github.com/volatilityfoundation/volatility3.git
cd volatility
```

:deciduous_tree:安装：

```bash
#安装依赖
sudo apt install build-essential python3-dev libssl-dev libffi-dev libxml2 libxml2-dev libxslt1-dev zlib1g-dev
pip3 install -r requirements.txt
```

![image-20231226163621416](http://image.shangu127.top/img/2024/03/image-20231226163621416.png)

:fire_engine:配置别名：

```bash
gedit ~/.zshrc
#vol3
alias vol3="python3 /home/shangu/tools/Misc/volatility3/vol.py"
```

## Wireshark

:star:添加官方库

```bash
sudo add-apt-repository ppa:wireshark-dev/stable
sudo apt update
```

:star:查询是否更新

```bash
sudo apt list |grep wireshark
```

:star2:安装wireshark

```bash
sudo apt install wireshark
```

遇到这张图就勾选yes，如果没有遇到就手动执行下面指令：

```bash
sudo dpkg-reconfigure wireshark-common
```

![image-20240104144316453](http://image.shangu127.top/img/2024/03/image-20240104144316453.png)

## IDA-free

经过三个月的使用经历来看，idafree勉强满足linux下的逆向和pwn需求。
直接在官网下载linux版本即可：https://hex-rays.com//ida-free/#download
![image-20240104145027166](http://image.shangu127.top/img/2024/03/image-20240104145027166.png)

:star:安装步骤

同意后一路forward即可：
![image-20240104145110074](http://image.shangu127.top/img/2024/03/image-20240104145110074.png)

选择安装目录时候可以自定义。
:star2:配置别名：

```bash
gedit ~/.zshrc
alias ida="/home/shangu/tools/Binary/idafree-8.3/ida64"
```

idafree8.3使用的云反编译器，所以对网络有一定要求，会自动识别32还是64，直接拖进去分析就行。

## Binwalk

:book:印象里binwalk好像是通过apt装的来着，但是:older_man:发现他的官方手册竟然是用python装，那就按照官方来把：

```bash
wget https://github.com/ReFirmLabs/binwalk/archive/master.zip
unzip master.zip
cd binwalk-master && sudo python setup.py uninstall && sudo python setup.py install
```

:shower:安装拓展包：

```bash
sudo ./deps.sh
```

执行这个脚本并输入y确定后，会安装所有的binwalk拓展包和依赖项，具体请翻阅目录下的`INSTALL.md`

这里可能会报一个错，长这个样子：
![image-20240104163011346](http://image.shangu127.top/img/2024/03/image-20240104163011346.png)

解决方法如下：

```bash
git clone --quiet --depth 1 --branch "master" https://github.com/devttys0/sasquatch
cd sasquatch
wget https://github.com/devttys0/sasquatch/pull/51.patch && patch -p1 <51.patch
sudo ./build.sh
```

:shamrock:安装ida插件

在前面咱们已经安装了idafree，所以这里可以进行配置：

```bash
python setup.py idainstall --idadir=/home/shangu/tools/Binary/idafree-8.3
```

## Burpsuite

安装自己去微信搜一搜，很多公众号发。这边只写一个别名：

```bash
alias bp="sh /home/shangu/tools/Web/BurpSuite/BurpSuiteLoader.sh &"
```

## AntSword

https://github.com/AntSwordProject/AntSword-Loader?tab=readme-ov-file

下载linux版本的加载器就行，然后再解压出来的目录里新建一个目录来存放源码。

配置别名：

```bash
alias AntSword="/home/shangu/tools/Web/AntSword/AntSword &"
```

## msfconsole

web的工具，kali自带但是ubuntu没有，我这里就写一个：
:christmas_tree:指令安装

```bash
#以下内容为一整条指令，直接全部复制即可
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && \
  chmod 755 msfinstall && \
  ./msfinstall
```

:fire:官方deb包安装：https://apt.metasploit.com/

在页面翻到最下面选择对应版本下载：

![image-20240104160959503](http://image.shangu127.top/img/2024/03/image-20240104160959503.png)

```bash
sudo dpkg -i metasploit-framework_6.3.48+20231220112607\~1rapid7-1_amd64.deb
```

使用msfupdate指令就可以更新版本，前提是进入msf的控制台。

## Vulhub

漏洞复现库，不多说直接上手：

```bash
wget https://github.com/vulhub/vulhub/archive/master.zip -O vulhub-master.zip
unzip vulhub-master.zip
```

## gdb家族

我这里仅使用pwndbg。

```bash
git clone https://github.com/pwndbg/pwndbg
cd pwndbg
./setup.sh
```

## gimp

取证会经常用到的图片工具：https://www.gimp.org/downloads/

```bash
sudo apt install gimp
```

:hatching_chick:汉化，按照我的教程来的话系统应该是全英文的，这是为了防止各种bug，并且不会出现很突兀的中文，所以gimp跟随系统语言是英文，需要做一些设置：

```bash
#安装中文语言包
sudo apt install language-pack-gnome-zh-hans -y
#全盘查找gimp配置文件路径
find / -name "gimprc"
#修改配置文件
sudo gedit /etc/gimp/2.0/gimprc
#新增以下内容
(language "zh_CN")
```

![image-20240116155248157](http://image.shangu127.top/img/2024/03/image-20240116155248157.png)

## ImageMask

linux下的图像处理工具，

```bash
sudo apt install imagemagick
```

比如压缩图片尺寸为一半：

```bash
convert input.jpg -resize 50% output.jpg
```



## Aperisolve

一款用在ctf-misc中的图像一把嗦工具，奇怪的是这工具极其的卡

```bash
#做好工具分类
cd /home/shangu/tools/Misc
git clone https://github.com/Zeecka/AperiSolve.git
cd AperiSolve
```

:wrench:修改dockerfile加速构建，dockerfile中有很多没有换源的东西导致很慢：

一共有backend和web两个目录下dockerfile修要改。根据dockerfile的镜像来确定换哪个源：

```bash
#backend和web都进行换源
FROM debian:bullseye-slim
#添加源
RUN sed -i 's#http://deb.debian.org/#http://mirrors.tuna.tsinghua.edu.cn/#' /etc/apt/sources.list
#这条指令加在python安装之后
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

:kick_scooter:构建镜像并启动容器：

```bash
docker compose build
docker compose up
```

可能会报错，不用在意，重新跑一遍就行有时候网络问题timeout而已。

:car:配置别名：
每次启动都docker compose up很麻烦，直接配置一个启动容器的别名即可：

```bash
#查询容器id
docker ps -a
#根据容器id编写alias
gedit ~/.zshrc
alias aperisolve="docker start 53070111bf83 f39565b0fc12 4d9353cb9658 && xdg-open http://127.0.0.1:5000 &"
```

:wrench:解决卡顿问题：
换了小新pro16还卡，我就意识到可能不是配置问题了，才想起来去看看都请求了啥东西，最好发现是个字体

![image-20240105115629369](http://image.shangu127.top/img/2024/03/image-20240105115629369.png)

![image-20240105115739037](http://image.shangu127.top/img/2024/03/image-20240105115739037.png)

他从这个网站请求了字体的css，我们想办法替换一下即可。

将远程css下载下来，放到web文件夹下，修改style.css文件：

![image-20240105135949643](http://image.shangu127.top/img/2024/03/image-20240105135949643.png)

## CyberChef

docker版本，用着最舒服，搭配别名快捷起动：

```bash
#拉取镜像并启动容器
docker run -d -p 8000:8000 mpepping/cyberchef
#查询容器id
docker ps -a
#别名
gedit ~/.zshrc
alias cyberchef="docker start 22e12b22f2fe && xdg-open http://127.0.0.1:8000 &"
```

## Ciphey

对标cyberchef的一款产品，**某些时候**的确比cyberchef好用。

```
python3 -m pip install ciphey --upgrade
```

:bee:用法：

```bash
ciphey -t "密文"
ciphey -f "文件"
```

## Uncompyle6

逆向用的pyc反编译工具

```bash
sudo pip3 install uncompyle6
```

## Pycdc

逆向用的pyc反编译工具，应对uncompyle6无法反编译python3.9以上版本的情况：
可以直接下载打包好的版本：https://github.com/extremecoders-re/decompyle-builds
也可以像我这样编译一下，刚好测试一下本地环境是否正常：

```bash
git clone https://github.com/zrax/pycdc.git
cd pycdc
cmake CMakeLists.txt
make
sudo make install
```

## Pwninit

自动化patchpwn文件并且生产模板：https://github.com/io12/pwninit

直接下载发布的版本，咱们这里只写一下配置模板和别名：

```bash
gedit ~/.zshrc
alias pwninit="/home/shangu/tools/Binary/pwninit/pwninit  --template-path /home/shangu/tools/Binary/pwninit/temp.py"
```

## glibc-all-in-one

```bash
git clone https://github.com/matrix1001/glibc-all-in-one.git
cd glibc-all-in-one
./update_list
```

我写了个自动下载所有libc的脚本，保存为downloadall执行即可：

```bash
#!/bin/bash

if [ ! -f "list" ]; then
    echo "文件不存在"
    exit 1
fi
while IFS= read -r line; do
    #proxychains4 ./download "$line"
    ./download "$line"
done < "list"
```

## sgtlibc

libcsearcher的替代品，并且自带一些题目和exp模板：

```bash
git clone https://github.com/serfend/sgtlibc.git
pip install sgtlibc
```



## patchelf

可以直接下载github的发布版，然后放到对应目录下即可，我这里演示编译安装。

```bash
git clone https://github.com/NixOS/patchelf.git
cd patchelf
sudo apt install autoconf automake libtool
./bootstrap.sh
./configure
make
make check
sudo make install
```

## Memprocs

做windows取证用的工具，可以搭配上Tokeii新写的取证工具 [LovelyMem](https://github.com/Tokeii0/LovelyMem) 使用。
:bike:安装前置环境：

```bash
sudo apt install libusb-1.0-0 libfuse2 lz4
sudo apt install make gcc pkg-config libusb-1.0-0-dev libfuse2 libfuse-dev lz4 liblz4-dev
sudo pip3 install memprocfs
```

:book:选择目录进行编译：

```bash
mkdir ~/tools/MemProcfs
cd ~/tools/MemProcfs
git clone https://github.com/ufrisk/LeechCore
git clone https://github.com/ufrisk/MemProcFS
cd LeechCore/leechcore
make
cd ../../MemProcFS/vmm
make
cd ../memprocfs
make
cd ../files
```

:fire:好像有点多余这些操作，直接从github下载release版本即可
https://github.com/ufrisk/MemProcFS/releases

:shoe:配置别名：

```bash
gedit ~/.zshrc
alias memprocfs="/home/shangu/tools/Misc/MemProcfs/MemProcFS/files/memprocfs"
```

## LovelyMem

全新版本的半自动化取证工具

```bash
git clone https://github.com/Tokeii0/LovelyMem.git
cd LovelyMem
sudo pip3 install -r requirements.txt
python main.py
```

:tiger:由于我是linux系统，要改一下config.py的配置，由于我们已经配置过别名所以可以直接这样：

![image-20240110123039630](http://image.shangu127.top/img/2024/03/image-20240110123039630.png)

:wrench:有可能会出现下面报错：
![image-20240110123541062](http://image.shangu127.top/img/2024/03/image-20240110123541062.png)

经典的缺啥装啥就行：

```bash
sudo apt install libxcb-cursor0
```

# GitHacker

```
# install
python3 -m pip install -i https://pypi.org/simple/ GitHacker
# print help info
githacker --help
# quick start
githacker --url http://127.0.0.1/.git/ --output-folder result
# brute for the name of branchs / tags
githacker --brute --url http://127.0.0.1/.git/ --output-folder result
# exploit multiple websites, one site per line
githacker --brute --url-file websites.txt --output-folder result
```

## zsteg

Misc图片隐写用的，针对lsb各通道数据提取

```
git clone https://github.com/zed-0xff/zsteg.git
cd zsteg
sudo gem install
```

## stegsolve



# Hexo博客搭建

这里我写一个简易版本，早在三年前我曾经写过一篇很详细的：https://shangu127.top/2021/01/28/5/

## 配置Nodejs

官网下载nodejs左侧的稳定版：https://nodejs.org/en/download/
找个目录解压一下

```bash
#创建软连接
sudo ln -s /home/shangu/env/nodejs/bin/node /usr/local/bin/node
sudo ln -s /home/shangu/env/nodejs/bin/npm /usr/local/bin/npm
#测试是否成功
node -v
```

:book:配置环境变量：

```bash
sudo gedit /etc/profile
#加入以下内容
export NODE_HOME=/home/shangu/env/nodejs/bin/
export PATH=$PATH:$NODE_HOME:/usr/local/bin/
#刷新环境变量
source /etc/profile
```

:watermelon:设置国内源：

```bash
npm config set registry https://registry.npmmirror.com
```

## 安装Hexo

```bash
npm install hexo-cli -g
#配置一下hexo的软连接，也可以直接配环境变量
sudo ln -s /home/shangu/env/nodejs/lib/node_modules/hexo-cli/bin/hexo /usr/local/bin/hexo
```

找个地方作为博客文件夹：

```
mkdir blog
cd blog
hexo init
```

![image-20240112161415822](http://image.shangu127.top/img/2024/03/image-20240112161415822.png)

:tokyo_tower:测试，执行下面指令后访问本机的4000端口：

```bash
hexo g
hexo s
```

![image-20240112161610995](http://image.shangu127.top/img/2024/03/image-20240112161610995.png)

:white_flower:更换主题，这里以butterfly为例：

```bash
#切换到blog目录下
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
npm install hexo-renderer-pug hexo-renderer-stylus
#编辑themes/butterfly目录下的_config.yml
theme: butterfly
```

:wrench:各种优化插件：

```bash
#图片懒加载
npm install hexo-lazyload-image --save
#修改_config.yml
lazyload:
  enable: true
  loadingImg: /img/loading.gif
```



# Ubuntu22.04 (wayland)

remmina(远程windows桌面)

~~utools（工具集）~~

~~flameshot（截图）~~

~~typora（markdown）~~

sublime（代码）

alias （别名）

finalshell （连服务器）

dbeaver（连数据库）

Komorebi （动态桌面）

tmux 

alt + f2 （不会产生终端）

!! （取上一条指令）

ffmpeg （处理视频）

grep可以直接用

stardict （翻译）

umi-ocr (ocr需要手动打包)

~~python~~

~~anconda~~

~~java~~

~~update-alternative~~

~~谷歌浏览器~~



