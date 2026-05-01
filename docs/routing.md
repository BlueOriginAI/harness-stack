# 路由规则

本文件定义 harness-stack 第一版的技能路由方式。

## 优先匹配

### harness-prd

适用场景：

- 用户希望挑战问题定义
- 用户希望先判断值不值得做、谁最痛
- 用户希望看清当前替代方案和最小切口
- 用户希望调整范围
- 用户希望先把草稿收敛到更清楚的方向

### harness-eng

适用场景：

- 用户希望评审技术方案
- 用户希望锁定架构与测试方案
- 用户希望明确这轮范围边界与不做什么
- 用户希望开始开发前做一次工程审查
- 用户希望先把实现任务拆成可执行清单

### harness-apply

适用场景：

- 用户已经有相对清楚的计划
- 用户要求按计划实现功能
- 用户希望进入开发执行
- 用户希望按 `harness-eng` 的任务清单推进实现
- 用户需要根据 QA 失败项继续修复

### harness-qa

适用场景：

- 用户希望验证改动
- 用户希望跑测试
- 用户希望确认是否有回归风险
- 用户希望确认这轮改动是否过关
- 用户希望判断下一步该回到 `harness-apply` 还是进入 `harness-checkpoint`

### harness-checkpoint

适用场景：

- 用户希望保存当前阶段进展
- 用户希望总结本轮完成情况
- 用户希望为下次会话保留恢复点

### harness-resume

适用场景：

- 用户希望继续上一轮工作
- 用户拿着 checkpoint 或状态文件回来续接
- 用户不确定现在该从哪个命令继续
- 用户希望先恢复最小上下文，再回到主链路

## 默认顺序

除非用户明确跳过，默认顺序应遵循：

`用户先写粗计划并交给 harness-prd -> harness-eng -> harness-apply -> harness-qa -> harness-checkpoint`

如果 `harness-qa` 出现失败项或高风险未验证项，默认应回到 `harness-apply` 修复，再重新进入 `harness-qa`。

跨会话恢复时，可先使用 `harness-resume`，再回到主链路中的对应命令。

## 第一版不路由到的能力

- investigate
- review
- ship
- browser qa
- deploy
