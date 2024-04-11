# Install

```
pnpm i
```

# Dev

```
pnpm dev
```

# Build

```
pnpm build
```

# Use

1. 打开浏览器扩展程序页面
2. 打开开发者模式
3. 点击「加载已解压的扩展程序」
4. 选择项目根目录下的 .output 目录 (mac shift + cmd + . 来显示隐藏文件)

# Shortcuts

- s: 复制 SESSID
- a: 复制 Access_Token
- d: 设置 SESSID

# Structure

```
 .
├──  assets - 静态资源
│  ├──  copy-s.svg
│  ├──  copy.svg
│  ├──  gitlab.svg
│  └──  react.svg
├──  config - 固定配置
│  └──  host.ts - 项目域名配置(需要扩展域名在这里修改即可)
├──  entrypoints - 入口文件
│  ├──  background.ts - 后台脚本
│  ├──  content.ts - 内容脚本
│  └──  popup - 弹出框
├──  package.json
├──  pnpm-lock.yaml
├──  public
│  ├──  icon
│  └──  wxt.svg
├──  README.md
├──  tsconfig.json
└──  wxt.config.ts - 项目配置
```
