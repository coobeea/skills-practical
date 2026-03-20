# CRS信息披露诊断 - 报告模板

## 报告整体结构

报告采用Markdown格式，包含以下六个部分：
1. 诊断概要
2. 资产总览
3. 各资产信息披露义务判定
4. CRS信息交换风险评估
5. 合规建议
6. 参考依据

---

## 第一部分：诊断概要

```
# CRS信息披露诊断报告

## 一、诊断概要

| 项目 | 内容 |
|-----|------|
| 账套名称 | {account_name} |
| 诊断时间 | {diagnosis_time} |
| 涉及资产类型 | {asset_types_list} |
| 总体风险等级 | {overall_risk_level} |

---
```

**填充规则**：
- `{account_name}`：用户提供的账套名称
- `{diagnosis_time}`：生成报告的时间，格式为"YYYY年MM月DD日"
- `{asset_types_list}`：用户选择的资产类型，用顿号分隔
- `{overall_risk_level}`：取各资产最高风险等级，使用风险标识

---

## 第二部分：资产总览

```
## 二、资产总览

| 资产类型 | 是否涉及 | 风险等级 |
|---------|---------|---------|
| 境外银行存款 | {bank_involved} | {bank_risk} |
| 境外证券投资 | {sec_involved} | {sec_risk} |
| 离岸公司 | {company_involved} | {company_risk} |
| 境外保单 | {insurance_involved} | {insurance_risk} |
| 离岸信托 | {trust_involved} | {trust_risk} |

---
```

**填充规则**：
- `{xxx_involved}`：用户是否选择该资产类型，"是"或"否"
- `{xxx_risk}`：该资产的风险等级，使用风险标识（🔴/🟡/🟢），未涉及显示"-"

---

## 第三部分：各资产信息披露义务判定

### 3.1 境外银行存款模板

```
## 三、各资产信息披露义务判定

### 3.1 境外银行存款

#### 基本信息
| 项目 | 您的回答 |
|-----|---------|
| 开户地区 | {bank_country} |
| 持有人类型 | {bank_holder_type} |
| 税收居民身份 | {bank_is_china_resident} |
| 账户类型 | {bank_account_type} |
| 账户余额范围 | {bank_balance_range} |
| 特殊账户类型 | {bank_special_type} |

#### CRS信息披露义务判定

**判定结果**：{bank_crs_obligation}

**判定依据**：
{bank_judgment_reason}

#### 信息交换预期

{bank_exchange_expectation}

#### 合规建议

{bank_compliance_advice}

---
```

**判定结果填充规则**：
- 高风险：`✅ 有披露义务 🔴`
- 中风险：`⚠️ 可能有披露义务 🟡`
- 低风险：`❌ 无披露义务 🟢`

**判定依据生成规则**：
结合用户的具体回答，说明判定逻辑。例如：
- "您的账户在{bank_country}开立，该地区是CRS参与国/地区。作为中国税收居民，您的账户信息将通过CRS机制自动交换至中国税务机关。"
- "您的账户在美国开立，美国不参与CRS（使用FATCA机制），因此不会通过CRS交换信息。"

**信息交换预期生成规则**：
根据开户地区说明信息交换时间表。例如：
- "香港与中国大陆的CRS信息交换通常在每年9月进行，涵盖上一年度的账户信息。"
- "新加坡与中国的信息交换通常在每年年末进行。"

### 3.2 境外证券投资模板

```
### 3.2 境外证券投资

#### 基本信息
| 项目 | 您的回答 |
|-----|---------|
| 开户地区 | {sec_country} |
| 持有人类型 | {sec_holder_type} |
| 公司/信托详情 | {sec_entity_detail} |
| 税收居民身份 | {sec_is_china_resident} |
| 投资产品类型 | {sec_product_types} |

#### CRS信息披露义务判定

**判定结果**：{sec_crs_obligation}

**判定依据**：
{sec_judgment_reason}

#### 信息交换预期

{sec_exchange_expectation}

#### 特别提示

{sec_special_notice}

---
```

### 3.3 离岸公司模板

```
### 3.3 离岸公司

#### 基本信息
| 项目 | 您的回答 |
|-----|---------|
| 注册地区 | {company_country} |
| 是否金融机构 | {company_is_fi} |
| 经营性质 | {company_business_nature} |
| 主动收入占比 | {company_active_ratio} |
| 股权及控制权 | {company_ownership} |
| 您的税收居民身份 | {company_is_china_resident} |
| 其他控制人 | {company_other_controllers} |
| 是否有境外账户 | {company_has_foreign_account} |

#### CRS分类判定

**判定结果**：{company_nfe_classification}

**判定依据**：
{company_nfe_reason}

#### CRS信息披露义务判定

**判定结果**：{company_crs_obligation}

**判定依据**：
{company_judgment_reason}

#### 信息交换预期

{company_exchange_expectation}

#### 合规建议

{company_compliance_advice}

---
```

**CRS分类判定填充规则**：
- 金融机构：`金融机构（FI）- 有主动申报义务`
- 积极NFE：`积极非金融实体（Active NFE）- 无需穿透`
- 消极NFE：`消极非金融实体（Passive NFE）- 需穿透至控制人`

### 3.4 境外保单模板

```
### 3.4 境外保单

#### 基本信息
| 项目 | 您的回答 |
|-----|---------|
| 保险公司所在地 | {insurance_country} |
| 保单性质 | {insurance_has_cash_value} |
| 持有人 | {insurance_holder} |
| 持有人税收居民身份 | {insurance_holder_resident} |
| 被保险人 | {insurance_insured} |
| 受益人 | {insurance_beneficiary} |
| 受益人税收居民身份 | {insurance_beneficiary_resident} |

#### CRS信息披露义务判定

**持有人层面**：{insurance_holder_obligation}

**受益人层面**：{insurance_beneficiary_obligation}

**综合判定**：{insurance_crs_obligation}

**判定依据**：
{insurance_judgment_reason}

#### 合规建议

{insurance_compliance_advice}

---
```

### 3.5 离岸信托模板

```
### 3.5 离岸信托

#### 基本信息
| 项目 | 您的回答 |
|-----|---------|
| 信托设立地 | {trust_country} |
| 您的角色 | {trust_roles} |
| 您的税收居民身份 | {trust_is_china_resident} |
| 信托活动类型 | {trust_activity_type} |
| 是否有境外账户 | {trust_has_foreign_account} |

#### 委托人角色信息（如适用）
| 项目 | 您的回答 |
|-----|---------|
| 注入资产类型 | {trust_assets} |
| 保留权力 | {trust_retained_power} |

#### 受益人角色信息（如适用）
| 项目 | 您的回答 |
|-----|---------|
| 受益人类型 | {trust_beneficiary_type} |
| 是否已获分配 | {trust_beneficiary_distribution} |

#### 保护人角色信息（如适用）
| 项目 | 您的回答 |
|-----|---------|
| 保护人权力 | {trust_protector_power} |

#### CRS分类判定

**判定结果**：{trust_crs_classification}

**判定依据**：
{trust_classification_reason}

#### 各角色CRS信息披露义务判定

**委托人层面**：{trust_settlor_obligation}
**受益人层面**：{trust_beneficiary_obligation}
**保护人层面**：{trust_protector_obligation}

**综合判定**：{trust_crs_obligation}

**判定依据**：
{trust_judgment_reason}

#### 合规建议

{trust_compliance_advice}

---
```

### 3.6 未涉及资产模板

```
### 3.x {asset_type_name}

未涉及此类资产。

---
```

---

## 第四部分：CRS信息交换风险评估

```
## 四、CRS信息交换风险评估

### 总体风险等级

{overall_risk_display}

### 关键风险点

{key_risk_points_list}

### 风险说明

{risk_explanation}

---
```

**总体风险显示格式**：

高风险：
```
🔴 高风险

您的境外资产中存在明确的CRS信息披露义务。相关信息已经或即将通过CRS机制交换至中国税务机关。
```

中风险：
```
🟡 中风险

您的境外资产中可能存在CRS信息披露义务，但存在不确定因素需要进一步核实。
```

低风险：
```
🟢 低风险

您的境外资产暂无明显的CRS信息披露义务。
```

**关键风险点列表格式**：
```
1. **{risk_point_name}**：{risk_point_description}
2. **{risk_point_name}**：{risk_point_description}
...
```

---

## 第五部分：合规建议

```
## 五、合规建议

### 立即行动（1个月内）

{immediate_actions}

### 短期行动（3-6个月内）

{short_term_actions}

### 长期规划（6-12个月）

{long_term_actions}

---
```

**合规建议生成规则**：

根据风险等级生成不同的建议：

**高风险情况**：
```
### 立即行动（1个月内）
1. 核实各账户的准确余额和持有状态
2. 确认自身及相关人员的税收居民身份
3. 咨询专业税务顾问，评估潜在税务风险

### 短期行动（3-6个月内）
1. 审视境外资产结构，评估是否需要调整
2. 准备相关证明文件，以备税务机关查询
3. 评估历史年度的税务申报是否完整

### 长期规划（6-12个月）
1. 建立境外资产的定期监控机制
2. 优化资产持有结构，平衡税务合规与资产保护
3. 关注CRS规则和中国税法的最新动态
```

**中风险情况**：
```
### 立即行动（1个月内）
1. 明确自身及相关人员的税收居民身份
2. 核实不确定的信息点

### 短期行动（3-6个月内）
1. 咨询税务顾问，厘清具体的披露义务
2. 完善相关文件和记录

### 长期规划（6-12个月）
1. 持续关注CRS规则的更新
2. 定期评估境外资产的合规状态
```

**低风险情况**：
```
### 建议事项
1. 定期确认资产所在地的CRS参与状态（部分国家可能加入CRS）
2. 如税收居民身份发生变化，及时评估影响
3. 保留相关证明文件，以备不时之需
```

---

## 第六部分：参考依据

```
## 六、参考依据

### CRS相关

- OECD《共同申报准则》（Common Reporting Standard）
- 中国国家税务总局《非居民金融账户涉税信息尽职调查管理办法》
- 中国与各国/地区签署的税收情报交换协议

### 中国税法相关

- 《中华人民共和国个人所得税法》
- 《中华人民共和国个人所得税法实施条例》
- 国家税务总局关于境外所得申报的相关公告

### 重要声明

本报告仅基于您提供的信息进行初步风险评估，不构成正式的法律或税务意见。具体的合规义务和应对策略，建议咨询专业的税务顾问或律师。

---

*报告生成时间：{report_generation_time}*
```

---

## 动态内容生成规则总结

### 判定依据生成
- 结合用户的具体回答
- 引用适用的CRS规则
- 说明逻辑推理过程
- 使用通俗语言

### 合规建议生成
- 针对用户的具体情况
- 按时间优先级排序
- 给出可操作的具体行动
- 高风险情况强调咨询专业人士

### 风险标识使用
- 🔴 高风险
- 🟡 中风险
- 🟢 低风险
- ✅ 有披露义务
- ⚠️ 可能有披露义务
- ❌ 无披露义务
