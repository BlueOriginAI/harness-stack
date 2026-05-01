# harness-stack

harness-stack 是一套面向中文开发者的轻量 AI 开发 skills。

它不追求把所有流程都做重，而是先把最核心的主链路做好：

`用户先写粗计划并交给 harness-prd -> harness-eng -> harness-apply -> harness-qa -> harness-checkpoint`

跨会话恢复时，可通过旁路入口 `harness-resume` 回到主链路中的对应命令。

## 第一版目标

第一版只做 5 个核心命令：

- `harness-prd`：问题定义 / 用户价值 / 范围收敛
- `harness-eng`：模块边界 / 流程 / 风险 / 测试收敛 / 可执行任务拆解
- `harness-apply`：按计划开发并记录偏差
- `harness-qa`：按范围验证通过项 / 失败项 / 风险盲区，必要时回传修复输入
- `harness-checkpoint`：对账结果并生成续接摘要

## 设计原则

- 中文优先：标题、描述、正文、输出模板全部中文
- 先评审再开发：先过 PRD 与工程评审，再进入实现
- 开发后必须验证：`harness-apply` 后必须经过 `harness-qa`
- 默认节约 token：前言极简，按需加载，上下文保持克制
- 模板驱动：skill 文档由模板生成，避免重复与漂移
- 行为统一：所有 skill 默认继承同一层母规则，约束假设管理、简单优先、克制改动与可验证输出

## 第一版不做

第一版先不做这些能力：

- 从 0 到 1 的计划起草入口
- investigate / 重型 debug skill
- 独立 code review skill
- ship / PR / 发布一条龙
- 浏览器 QA
- 多宿主支持
- 重状态文件系统

## 目录

- `docs/`：产品定位、工作流、路由与术语说明
- `rules/`：命令、workflow、skill 与 token 预算规则
- `commands/`：薄命令入口
- `workflows/`：厚流程实现
- `templates/`：共享片段与输出模板（含 prd / eng / apply / qa / checkpoint / resume）
- `skills/`：核心 skills 的模板与生成产物
- `scripts/`：skill 发现、生成与检查脚本
- `references/`：调研与对照资料，不属于 harness-stack 运行骨架

## 工作流

推荐使用方式：

1. 用户先写一个粗计划、需求草稿或设计草稿，并直接交给 `harness-prd`
2. 运行 `harness-prd`，通过问答和收敛产出本轮目标、最小切口、本轮范围、风险与交给 `harness-eng` 的输入
3. 再运行 `harness-eng`，产出实现范围、模块边界、范围边界、测试要求、实现任务清单与交给 `harness-apply` 的输入
4. 再运行 `harness-apply`，按任务推进开发，产出已完成项、偏差、未完成项与交给 `harness-qa` 的输入
5. 开发后运行 `harness-qa`，产出验证结果、风险判断；如果有失败项或高风险未验证项，则整理修复输入回传给 `harness-apply`，否则再交给 `harness-checkpoint`
6. 最后运行 `harness-checkpoint`，对账结果并生成续接摘要

更详细说明见 `docs/workflow.md`。

关于当前交接方式、是否采用文件化状态保存，以及未来最小状态文件示例，见 `docs/state-model.md`。

轻状态文件模板草案见 `templates/state/harness-state.md`。

跨会话续接时，可先使用 `harness-resume` 恢复最小上下文，再回到主链路中的对应命令。
