"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1603],{9427:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>o});var c=s(4848),r=s(8453);const t={sidebar_label:"\u8c03\u8bd5\u5b66\u4e60",sidebar_position:4},a="\u8c03\u8bd5\u5b66\u4e60",i={id:"Pwn/gdb",title:"\u8c03\u8bd5\u5b66\u4e60",description:"\u7a0b\u5e8f\u7684\u7f16\u8bd1",source:"@site/docs/Pwn/gdb.md",sourceDirName:"Pwn",slug:"/Pwn/gdb",permalink:"/docs/Pwn/gdb",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Pwn/gdb.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_label:"\u8c03\u8bd5\u5b66\u4e60",sidebar_position:4},sidebar:"pwnSidebar",previous:{title:"pwn\u5de5\u5177\u53ca\u63d2\u4ef6",permalink:"/docs/Pwn/hello"},next:{title:"\u7ec3\u4e60\u9898",permalink:"/docs/Pwn/task"}},l={},o=[{value:"\u7a0b\u5e8f\u7684\u7f16\u8bd1",id:"\u7a0b\u5e8f\u7684\u7f16\u8bd1",level:2},{value:"\u4fdd\u62a4\u673a\u5236",id:"\u4fdd\u62a4\u673a\u5236",level:3},{value:"\u9a8c\u8bc1\u8c03\u8bd5",id:"\u9a8c\u8bc1\u8c03\u8bd5",level:2}];function d(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.h1,{id:"\u8c03\u8bd5\u5b66\u4e60",children:"\u8c03\u8bd5\u5b66\u4e60"}),"\n",(0,c.jsx)(e.h2,{id:"\u7a0b\u5e8f\u7684\u7f16\u8bd1",children:"\u7a0b\u5e8f\u7684\u7f16\u8bd1"}),"\n",(0,c.jsx)(e.p,{children:"1.\u9ed8\u8ba4\u7f16\u8bd1"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc test.c\n"})}),"\n",(0,c.jsx)(e.p,{children:"2.\u6307\u5b9a\u7a0b\u5e8f\u540d\u79f0"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc test.c -o shangu\n"})}),"\n",(0,c.jsx)(e.p,{children:"3.\u751f\u6210\u9884\u5904\u7406\u6587\u4ef6"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc test.c -E -o shangu.i\n"})}),"\n",(0,c.jsxs)(e.p,{children:["\u9009\u9879\u201c-E\u201d,\u8be5\u9009\u9879\u7684\u4f5c\u7528\u662f\u8ba9 gcc \u5728\u9884\u5904\u7406\u7ed3\u675f\u540e\u505c\u6b62",(0,c.jsx)(e.a,{href:"https://so.csdn.net/so/search?q=%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B&spm=1001.2101.3001.7020",children:"\u7f16\u8bd1\u8fc7\u7a0b"}),"\u3002\n\u9884\u5904\u7406\u65f6\u5019\u7f16\u8bd1\u5668\u4f1a\u628a\u5934\u6587\u4ef6\u5c55\u5f00\uff0c\u53bb\u6389\u6ce8\u91ca\uff0c\u5b8f\u66ff\u6362\uff0c\u6761\u4ef6\u7f16\u8bd1"]}),"\n",(0,c.jsx)(e.p,{children:"4.\u751f\u6210\u6c47\u7f16\u6587\u4ef6"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc shangu.i -S -o shangu.s\n"})}),"\n",(0,c.jsx)(e.p,{children:"5.\u6c47\u7f16\u4e3a\u673a\u5668\u7801"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc shangu.s -c -o shangu.o\n"})}),"\n",(0,c.jsx)(e.p,{children:"6.\u94fe\u63a5\u5916\u90e8\u51fd\u6570"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc test.c\n"})}),"\n",(0,c.jsx)(e.p,{children:"7.\u4f18\u5316\u7f16\u8bd1"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc -O1 main.c -o main.out\n"})}),"\n",(0,c.jsx)(e.p,{children:"\u4f7f\u7528\u7f16\u8bd1\u4f18\u5316\u7ea7\u522b1\u7f16\u8bd1\u7a0b\u5e8f\u3002\u7ea7\u522b\u4e3a1~3\uff0c\u7ea7\u522b\u8d8a\u5927\u4f18\u5316\u6548\u679c\u8d8a\u597d\uff0c\u4f46\u7f16\u8bd1\u65f6\u95f4\u8d8a\u957f\u3002"}),"\n",(0,c.jsx)(e.p,{children:(0,c.jsx)(e.strong,{children:"\u626b\u63cf\u7a0b\u5e8f\u2013>\u8bed\u6cd5\u5206\u6790\u2013>\u8bed\u4e49\u5206\u6790\u2013>\u6e90\u4ee3\u7801\u4f18\u5316\u2013>\u4ee3\u7801\u751f\u6210\u5668\u2013>\u76ee\u6807\u4ee3\u7801\u4f18\u5316\uff1b"})}),"\n",(0,c.jsx)(e.h3,{id:"\u4fdd\u62a4\u673a\u5236",children:"\u4fdd\u62a4\u673a\u5236"}),"\n",(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsx)(e.p,{children:"NX\uff1a-z execstack / -z noexecstack (\u5173\u95ed / \u5f00\u542f) \u4e0d\u8ba9\u6267\u884c\u6808\u4e0a\u7684\u6570\u636e\uff0c\u4e8e\u662fJMP\nESP\u5c31\u4e0d\u80fd\u7528\u4e86\nCanary\uff1a-fno-stack-protector /-fstack-protector /\n-fstack-protector-all (\u5173\u95ed / \u5f00\u542f / \u5168\u5f00\u542f) \u6808\u91cc\u63d2\u5165cookie\u4fe1\u606f\nPIE\uff1a-no-pie / -pie (\u5173\u95ed / \u5f00\u542f) \u5730\u5740\u968f\u673a\u5316\uff0c\u53e6\u5916\u6253\u5f00\u540e\u4f1a\u6709get_pc_thunk\nRELRO\uff1a-z norelro / -z lazy / -z now (\u5173\u95ed / \u90e8\u5206\u5f00\u542f / \u5b8c\u5168\u5f00\u542f) \u5bf9GOT\u8868\u5177\u6709\u5199\u6743\u9650"}),"\n"]}),"\n",(0,c.jsx)(e.p,{children:"\u4e3a\u4e86\u65b9\u4fbf\u8c03\u8bd5\u5b66\u4e60\uff0c\u5173\u95ed\u5927\u90e8\u5206\u4fdd\u62a4\u673a\u5236\uff1a"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"gcc 1.c -no-pie -z execstack -fno-stack-protector -o task1\n"})}),"\n",(0,c.jsx)(e.p,{children:"\u6b63\u5e38\u7a7a\u95f40x50 + \u586b\u5145rbp 0x8 + \u6076\u610f\u6307\u4ee4\u6216\u5730\u5740"}),"\n",(0,c.jsx)(e.p,{children:"payload = b's'*0x58 + backdoor_address"}),"\n",(0,c.jsx)(e.h2,{id:"\u9a8c\u8bc1\u8c03\u8bd5",children:"\u9a8c\u8bc1\u8c03\u8bd5"}),"\n",(0,c.jsxs)(e.p,{children:[":book",":test1","\uff1a"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include<stdio.h>\n\nint main(void){\n    char buf[32];\n    gets(buf);\n    puts("yes");\n}\n'})}),"\n",(0,c.jsxs)(e.p,{children:[":flags",":task","\uff1a"]}),"\n",(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsx)(e.p,{children:"1\u3001\u753b\u51fa\u7a0b\u5e8f\u6267\u884c\u6d41"}),"\n"]}),"\n",(0,c.jsx)(e.p,{children:":book:test2:"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include<stdio.h>\nint callee(int a, int b, int c) {\n    return a + b + c;\n}\n\nint backdoor(void)\n{\n    system("/bin/sh");\n}\n\nint caller(void) {\n    int ret;\n\n    ret = callee(1, 2, 3);\n    ret += 4;\n    return ret;\n}\n\nint main(void){\n    caller();\n    puts("yes");\n}\n'})}),"\n",(0,c.jsxs)(e.p,{children:["\ud83c\udf8f","task:"]}),"\n",(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsx)(e.p,{children:"1\u3001\u753b\u51fa\u7a0b\u5e8f\u6267\u884c\u6d41\n2\u3001\u753b\u51fa\u6808\u7ed3\u6784\u53d8\u5316\n3\u3001\u52ab\u6301\u7a0b\u5e8f\u6d41"}),"\n"]}),"\n",(0,c.jsx)(e.h1,{id:"\u8c03\u8bd5\u6b65\u9aa4",children:"\u8c03\u8bd5\u6b65\u9aa4"}),"\n",(0,c.jsx)(e.p,{children:"\u5f00\u542f\u53ef\u6267\u884c\u6743\u9650\uff1a"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-bash",children:"chmod +x pwn\ngdb pwn\nb main\nr\nb *0x8049219\n"})})]})}function h(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(d,{...n})}):d(n)}},8453:(n,e,s)=>{s.d(e,{R:()=>a,x:()=>i});var c=s(6540);const r={},t=c.createContext(r);function a(n){const e=c.useContext(t);return c.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:a(n.components),c.createElement(t.Provider,{value:e},n.children)}}}]);