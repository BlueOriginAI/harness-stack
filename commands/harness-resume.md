# harness-resume

## 用途

基于最近 checkpoint 和轻状态信息，恢复当前 run 的最小上下文，并推荐下一条 harness 命令。

## 何时使用

- 用户希望继续上一轮工作
- 用户拿着 checkpoint 或状态文件回来续接
- 用户不确定现在该从哪个命令继续
- 用户希望先恢复最小上下文，再回到主链路

## 输入

- 可选 run id
- 可选 checkpoint 文件
- 可选状态文件

## 输出

- 当前 run
- 当前停留步骤
- 建议下一命令
- 建议先读文件
- 续接摘要

## 关联

- `workflows/harness-resume.md`
- `docs/state-model.md`
