# Skill Rules

`skills/*/SKILL.md.tmpl` 是 harness-stack 的核心 prompt 模板。

## 总体要求

1. 全部中文
2. 说明简洁
3. 结构稳定
4. 避免人格表演式长篇叙事

## 每个 skill 至少应包含

- 中文标题
- 中文描述
- 何时使用
- 输入要求
- 输出结构
- 边界说明

## 文风要求

- 直接、清楚、少废话
- 以可执行和可验证为主
- 不写成品牌人格表演腔
- 不写过长的哲学段落

## 第一版重点

- `harness-prd`
- `harness-eng`
- `harness-apply`
- `harness-qa`
- `harness-checkpoint`
- `harness-resume`

## 生成要求

- `SKILL.md` 由 `SKILL.md.tmpl` 生成
- 共享片段通过模板注入
- 不要手工让生成产物与模板长期漂移
