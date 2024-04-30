# 注意事项

主分支为master，请勿对gh-page分支做任何操作。
gh-page分支为github action配置自动编译自动上传到github page，如有特殊情况，点击Action按钮即可查看详细log。

# 前置环境

nodejs v20.11.0
npm 10.6.0

# 操作流程

```
#创建仓库
git init
#关联远程仓库，请自行配置github的ssh key
git remote add origin git@github.com:shanguwei/shanguwei.github.io.git
#拉取远程仓库
git pull origin master
#安装依赖
npm ci
#本地预览效果
npm run start
#本地编译
npm run build
#编译后查看
npm run serve
```

# 编辑文档

主要针对docs目录下的文件进行修改撰写，具体对应关系自己翻一番对照一下就明白了。

如果没有相关开发经验请勿针对其他配置文件修改。

# 上传更改

修改后先检查有无其他更新，是否需要合并

```
#添加修改后文件
git add .
#添加更新注释
git commit -m "更新内容"
#更新
git push origin master
```