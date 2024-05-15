---
sidebar_label: '调试学习'
sidebar_position: 4
---

# 调试学习

## 程序的编译

1.默认编译

```bash
gcc test.c
```

2.指定程序名称

```bash
gcc test.c -o shangu
```

3.生成预处理文件

```bash
gcc test.c -E -o shangu.i
```

选项“-E”,该选项的作用是让 gcc 在预处理结束后停止[编译过程](https://so.csdn.net/so/search?q=编译过程&spm=1001.2101.3001.7020)。
预处理时候编译器会把头文件展开，去掉注释，宏替换，条件编译

4.生成汇编文件

```bash
gcc shangu.i -S -o shangu.s
```

5.汇编为机器码

```bash
gcc shangu.s -c -o shangu.o
```

6.链接外部函数

```bash
gcc test.c
```

7.优化编译

```bash
gcc -O1 main.c -o main.out
```

使用编译优化级别1编译程序。级别为1~3，级别越大优化效果越好，但编译时间越长。

 **扫描程序–>语法分析–>语义分析–>源代码优化–>代码生成器–>目标代码优化；**

## 验证调试

:book:test1：

```c
#include<stdio.h>

int main(void){
    char buf[32];
    gets(buf);
    puts("yes");
}
```

:flags:task：

> 1、画出程序执行流

:book:test2:

```c
#include<stdio.h>
int callee(int a, int b, int c) {
    return a + b + c;
}

int backdoor(void)
{
    system("/bin/sh");
}

int caller(void) {
    int ret;

    ret = callee(1, 2, 3);
    ret += 4;
    return ret;
}

int main(void){
    caller();
    puts("yes");
}
```

:flags:task:

> 1、画出程序执行流
> 2、画出栈结构变化
> 3、劫持程序流

