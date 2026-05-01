# harness-resume workflow

## 目的

恢复当前 run 的最小上下文，并把用户路由回主链路中的正确命令。

## 输入

- 可选 run id
- 可选 checkpoint 文件
- 可选状态文件

## 步骤

1. 如果用户显式指定了 checkpoint 或 run id，优先使用用户提供的输入。
2. 否则先读取轻状态文件，确定当前 run、当前步骤和最近产物。
3. 如果当前 run 下存在 checkpoint，优先读取 checkpoint，因为它最接近续接入口。
4. 从 checkpoint 提取：下一步建议、建议从哪个命令继续、建议先读文件、续接摘要。
5. 如果没有 checkpoint，再根据最近阶段产物判断当前停留位置：
   - `apply` 有明显未完成项或阻塞，则继续 `harness-apply`
   - `qa` 明确建议进入 checkpoint，则继续 `harness-checkpoint`
   - `qa` 仍有失败项或大量未验证项，则回到 `harness-apply`
   - `eng` 尚未进入实现，则继续 `harness-eng` 或进入 `harness-apply`
   - `prd` 尚未进入工程评审，则继续 `harness-prd` 或进入 `harness-eng`
6. 输出一个建议下一命令，不把 `resume` 变成新的工作阶段。
7. 告诉用户继续前最应该先读哪些文件，并给出最小续接摘要。

## 输出

- 当前 run
- 当前停留步骤
- 建议下一命令
- 建议先读文件
- 续接摘要
