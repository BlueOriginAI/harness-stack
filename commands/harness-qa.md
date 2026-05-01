# harness-qa

## 用途

对开发结果按计划做结构化验证，明确通过项、失败项、回归风险与验证盲区，并在失败时产出可直接回传给 `harness-apply` 的修复输入。

## 何时使用

- 已完成 `harness-apply`
- 需要跑测试或做基础验证
- 需要判断是否存在回归风险
- 需要决定这轮改动是回到 apply 还是进入 checkpoint

## 输入

- 计划
- 实现结果
- 项目测试命令
- 可选基础验证方式

## 输出

- 本轮目标
- 验证范围
- 已执行检查
- 通过项
- 失败项
- 未验证项
- 回归风险
- 缺失测试
- 建议下一步命令
- 是否建议进入 checkpoint
- 交给 `harness-apply` 的修复输入
- 交给 `harness-checkpoint` 的输入

## 关联

- `workflows/harness-qa.md`
- `templates/qa/harness-qa.md`
