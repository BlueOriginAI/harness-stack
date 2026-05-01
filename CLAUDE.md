# CLAUDE.md

## 项目定位

本仓库用于构建一套中文优先、轻量、节约 token 的 harness code skills。

当前第一版核心命令：

- `harness-prd`
- `harness-eng`
- `harness-apply`
- `harness-qa`
- `harness-checkpoint`
- `harness-resume`

## 核心工作流

默认主链路：

`用户先写粗计划并交给 harness-prd -> harness-eng -> harness-apply -> harness-qa -> harness-checkpoint`

如果 `harness-qa` 出现失败项或高风险未验证项，应先把修复输入回传给 `harness-apply`，修复后再回到 `harness-qa`，而不是直接进入 `harness-checkpoint`。

含义：

- 用户先提供粗计划或需求草稿
- `harness-prd` 负责问题定义 / 用户价值 / 范围收敛，并产出交给 `harness-eng` 的输入
- `harness-eng` 负责模块边界 / 流程 / 风险 / 测试收敛 / 可执行任务拆解，并产出带范围边界与实现任务清单的输入交给 `harness-apply`
- `harness-apply` 负责按任务开发并记录偏差，并产出交给 `harness-qa` 的输入
- `harness-qa` 负责开发后按范围验证通过项 / 失败项 / 风险盲区，判断应回到 `harness-apply` 还是进入 `harness-checkpoint`，并在需要时整理修复输入
- `harness-checkpoint` 负责对账结果并生成续接摘要
- `harness-resume` 负责跨会话恢复最小上下文并路由回主链路

## 路由规则

当用户请求与以下场景匹配时，优先建议或调用对应 skill：

- 要求挑战问题、判断值不值得做、缩小或调整范围 -> `harness-prd`
- 要求评审技术方案、架构、测试方案、范围边界或实现任务拆解 -> `harness-eng`
- 要求按计划实现功能、按任务推进开发、根据 QA 修复失败项 -> `harness-apply`
- 要求验证改动、跑测试、检查回归、判断该回炉还是收尾 -> `harness-qa`
- 要求总结本轮进展、保存续接点 -> `harness-checkpoint`
- 要求继续上一轮工作、恢复上下文、判断从哪个命令继续 -> `harness-resume`

## 编写约束

- 所有 skill 的标题、描述、正文、输出模板都用中文
- 命令 id 保持 ASCII 英文，便于兼容宿主与文件路径
- `commands/` 保持薄，只负责入口与路由
- `workflows/` 承担主要流程逻辑
- `templates/` 负责共享片段与输出骨架
- `rules/agent-behavior.md` 负责所有 skill 共用的行为母规则
- `skills/*/SKILL.md` 由模板生成，不要手工漂移

## 第一版明确不做

- 计划起草入口
- investigate
- 独立 review
- ship / PR / deploy 工作流
- 浏览器 QA
- 多宿主支持
- 重状态系统
