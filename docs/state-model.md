# 状态模型

## 一句话

harness-stack 当前采用的是**结构化文档交接模型**，不是 **PAUL 式文件化持久状态模型**。

## 当前到底有什么

当前主链路：

`手写粗计划 -> harness-prd -> harness-eng -> harness-apply -> harness-qa -> harness-checkpoint`

每一步都会产出结构化结果，并把结果整理成可直接交给下一步的输入。

这意味着当前已经有：

- 阶段划分
- 结构化输出模板
- 明确的 handoff 字段
- checkpoint 续接摘要

对应文件：

- `docs/workflow.md`
- `docs/terminology.md`
- `templates/plan/prd-review.md`
- `templates/plan/eng-review.md`
- `templates/qa/harness-qa.md`
- `templates/checkpoint/summary.md`

## 当前没有什么

当前没有实现 PAUL 那种基于文件的持续工作状态保存机制。

具体缺少：

1. 固定状态目录
   - 例如专门保存运行状态和历史产物的位置
2. 单一状态源
   - 例如一个总状态文件，明确当前停在哪一步、下一步做什么
3. 会话交接文件
   - 例如跨会话恢复用的 handoff 文件
4. 恢复协议
   - 例如“继续工作时先读哪个文件，再决定从哪个命令恢复”
5. 文件生命周期
   - 例如哪些文件长期保留，哪些文件消费后归档

所以当前系统更像：

**每一步写出一份结构化 markdown，供下一步或下次会话继续使用。**

而不是：

**系统把当前状态写入固定文件，并按文件状态恢复继续工作。**

## PAUL 借鉴到了什么

当前 harness-stack 借鉴到的是 PAUL 的：

- thin command / thick workflow 组织方式
- 计划、执行、收尾的闭环意识
- summary-first 的上下文收敛思路

但没有借鉴到 PAUL 的：

- `.paul/STATE.md` 这类单一状态源
- `HANDOFF*.md` 这类会话交接文件
- resume 时按文件状态判断唯一下一步动作的机制

## 为什么第一版不做重状态系统

第一版目标是把主链路跑顺，而不是先搭一套状态编排平台。

如果一开始就引入完整状态目录、恢复协议、归档规则、阶段索引，会明显抬高：

- 使用成本
- 维护成本
- 文档复杂度
- prompt 长度

所以第一版只保留：

- 结构化交接
- 续接摘要
- 下一步建议

不引入：

- roadmap / milestone / phase 体系
- 重型状态目录
- 自动 resume 路由

## 如果以后要轻量借鉴 PAUL，最小方案是什么

建议只补两层，不要整套搬过来。

### 1. 单一轻状态文件

例如：

`state/harness-state.md`

只记录：

- 当前链路位置：`prd / eng / apply / qa / checkpoint`
- 上一次产出文件
- 下一步建议命令
- 当前阻塞 / 风险
- 最近更新时间

### 2. 阶段产物目录

例如：

`state/runs/<id>/`

保存：

- `prd.md`
- `eng.md`
- `apply.md`
- `qa.md`
- `checkpoint.md`

这样可以得到：

- 文件化续接
- 下次会话可恢复
- 下一步动作更明确

同时避免引入：

- roadmap / milestone / phase 编排
- 复杂 archive 规则
- 大量元数据

## 最小目录示例

如果以后要补，推荐先从下面这个最小结构开始：

```text
state/
├── harness-state.md
└── runs/
    └── 2026-04-16-demo/
        ├── prd.md
        ├── eng.md
        ├── apply.md
        ├── qa.md
        └── checkpoint.md
```

这里的原则是：

- `harness-state.md` 负责说明**现在在哪**、**下一步做什么**
- `runs/<id>/` 负责保存**这一轮每一步的结果**
- 不引入额外索引、manifest、archive 目录，先保持最小可读

## `harness-state.md` 最小示例

现在已经提供一份正式模板草案：

- `templates/state/harness-state.md`

它对应的真实运行文件位置应是：

- `state/harness-state.md`

模板内容示意如下：

```md
# harness state

## 当前链路位置

- 当前步骤：`qa`
- 当前 run：`2026-04-16-demo`
- 最近更新时间：`2026-04-16 21:30`

## 最近产物

- PRD：`state/runs/2026-04-16-demo/prd.md`
- ENG：`state/runs/2026-04-16-demo/eng.md`
- APPLY：`state/runs/2026-04-16-demo/apply.md`
- QA：`state/runs/2026-04-16-demo/qa.md`
- CHECKPOINT：`state/runs/2026-04-16-demo/checkpoint.md`

## 下一步建议

- 建议命令：`harness-checkpoint`
- 原因：QA 已完成，下一步应对账结果并生成续接摘要

## 当前风险 / 阻塞

- 风险：`导出流程` 只做了正常路径验证，失败路径覆盖不足
- 阻塞：无
```

这个文件只回答四个问题：

1. 现在在哪一步
2. 这一轮的文件在哪
3. 下一步建议做什么
4. 当前有没有风险或阻塞

## `runs/<id>/` 里的文件应该长什么样

建议直接复用现有模板字段，不另造一套 schema。

更准确地说，是 **`state/runs/<id>/` 下的真实运行文件，其内容结构参考 `templates/` 里的对应模板**。

例如：

- `state/runs/<id>/prd.md` 的内容结构参考 `templates/plan/prd-review.md`
- `state/runs/<id>/eng.md` 的内容结构参考 `templates/plan/eng-review.md`
- `state/runs/<id>/apply.md` 的内容结构参考 `templates/apply/harness-apply.md`
- `state/runs/<id>/qa.md` 的内容结构参考 `templates/qa/harness-qa.md`
- `state/runs/<id>/checkpoint.md` 的内容结构参考 `templates/checkpoint/summary.md`

也就是说：

- `templates/` 放的是模板
- `state/` 放的才是实际运行状态和阶段产物

因此 `runs/<id>/` 下的五个阶段文件可以直接沿用现有模板字段，但真实内容不应写回 `templates/` 目录。

## 为什么这个方案够用

这个最小方案已经能解决最常见的三个问题：

1. **跨会话时不知道停在哪**
   - 看 `state/harness-state.md`
2. **不知道上一轮每一步产出了什么**
   - 看 `state/runs/<id>/`
3. **不知道下一步该从哪个命令继续**
   - 看 `harness-state.md` 里的“下一步建议”

同时它还避免了第一版最不想要的复杂度：

- 没有 milestone / roadmap / phase
- 没有复杂状态迁移
- 没有额外元数据系统
- 没有重型恢复协议

## 当前建议

第一版继续保持现在这条路：

- 先把结构化 handoff 跑顺
- 先把 checkpoint 做好
- 暂不引入重状态系统

如果后面真的频繁出现“跨会话恢复困难”“不知道该从哪个命令继续”“阶段结果容易丢”，再补最小状态文件方案。

## 如果补一个轻量 resume，应该怎么理解

`harness-resume` 更适合作为**跨会话续接入口**，而不是主链路新阶段。

它的职责应是：

- 优先读取最近 checkpoint
- 必要时读取轻状态文件
- 判断当前 run 停在哪一步
- 推荐下一条 harness 命令
- 告诉用户继续前最应该先读哪些文件

也就是说，resume 应该只补“恢复入口”，不把 harness-stack 演化成 PAUL 式重状态平台。
