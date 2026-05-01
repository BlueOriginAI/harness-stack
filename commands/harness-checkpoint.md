# harness-checkpoint

## 用途

对账计划、开发结果与 QA 结果，保存一个可恢复的阶段节点。

## 何时使用

- 已完成 `harness-qa`
- 需要总结本轮结果
- 需要为下次会话保留恢复点
- 需要明确下一步该从哪个命令继续

## 输入

- 计划
- 开发结果
- QA 结果

## 输出

- 本轮目标
- 实际完成
- 与计划差异
- 未完成项
- 遗留问题
- 风险状态
- 下一步建议
- 建议从哪个命令继续
- 建议先读文件
- 续接摘要

## 关联

- `workflows/harness-checkpoint.md`
- `templates/checkpoint/summary.md`
