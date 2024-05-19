---
sidebar_label: '方法论&思维梳理'
sidebar_position: 2
---

# RE&PWN

## 逆向理论

:book:逆向的目的是什么？逆什么？要得到什么？

:book:逆向真的需要去逆向吗？

:book:不需要逆向的题怎么做？

:book:逆向题型有哪些？不同题型总体思路是什么？

:book:逆向题目附件是什么？他能转换为什么？有哪些形式？

## 分析基础

:cherry_blossom:IDA最关键的快捷键有哪些？作用是什么？

:cherry_blossom:一个题目拿到手的处理顺序是什么？利用misc思想能不能简化？

:white_flower:一个exe有哪两种状态？第二种状态发生了哪些变化？

## 算法逆向

:door:编码or加密？

:door:如何快速辨别一个编码？

:door:如何快速辨别一个加密算法？

:door:针对编码和加密算法分别可以延伸出哪些变换？

## 脱壳与花指令

:key:什么是花指令？junk

:key:花指令原理是什么？

:key:手动实现修补花指令。

:key:回到分析基础中的exe，去除花指令还能使用什么办法？



## 汇编基础

:star:ESP、EBP谁是栈顶谁是栈底

:star:这两个栈指针寄存器，谁会经常变？

:star:他为什么会经常变？不经常变的那一个有什么作用？

:star:call一个函数地址时候发生了哪些事情？

:star:main() ---> vuln() ----> gets() 你通过gets溢出，覆盖的是谁的返回地址，返回到哪里？

:star:push和pop用基本汇编指令怎么解释？

:star:ret指令用基本汇编指令怎么解释？leave ret呢？

:star:Intel汇编和Amd汇编区别是什么？

## IDA&GDB



