# Command Rules

`commands/*.md` 只负责命令入口与路由，不承载大段执行细节。

## 原则

1. 命令要薄
2. 一屏内可读完
3. 重点回答“什么时候用”“会加载什么”
4. 执行细节交给 `workflows/*.md`

## 建议结构

- 命令名
- 用途
- 何时使用
- 输入
- 输出
- 关联 workflow / template / reference

## 不要做的事

- 不要把完整流程塞进 command
- 不要把大量共享前言重复拷贝进每个 command
- 不要让 command 与 workflow 职责重叠
