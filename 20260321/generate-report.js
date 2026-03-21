const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, WidthType, ShadingType,
  Table, TableRow, TableCell, VerticalAlign,
  Header, Footer, PageNumber, LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

const BLUE = "1F4E79";
const LIGHT_BLUE = "D6E4F0";
const GRAY = "595959";
const RED = "C00000";
const GREEN = "375623";
const ORANGE = "C55A11";

const border = { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" };
const cellBorders = { top: border, bottom: border, left: border, right: border };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, bold: true, size: 32, color: BLUE, font: "Arial" })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true, size: 26, color: BLUE, font: "Arial" })]
  });
}

function heading3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 60 },
    children: [new TextRun({ text, bold: true, size: 24, color: GRAY, font: "Arial" })]
  });
}

function body(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...options })]
  });
}

function boldLabel(label, value) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text: label, bold: true, size: 22, font: "Arial" }),
      new TextRun({ text: value, size: 22, font: "Arial" })
    ]
  });
}

function conclusionPara(text, color) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [
      new TextRun({ text: "评估结论：", bold: true, size: 22, font: "Arial", color: GRAY }),
      new TextRun({ text, bold: true, size: 22, font: "Arial", color })
    ]
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" } },
    children: [new TextRun("")]
  });
}

function assetInfoTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    margins: { top: 80, bottom: 80, left: 160, right: 160 },
    rows: rows.map(([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders,
            width: { size: 2800, type: WidthType.DXA },
            shading: { fill: "EEF4FA", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: "Arial", color: GRAY })] })]
          }),
          new TableCell({
            borders: cellBorders,
            width: { size: 6560, type: WidthType.DXA },
            shading: { fill: "FAFAFA", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, font: "Arial" })] })]
          })
        ]
      })
    )
  });
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: BLUE, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: BLUE, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1296, bottom: 1440, left: 1296 } }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" } },
          children: [new TextRun({ text: "CRS 资产信息交换风险评估报告", size: 18, color: "888888", font: "Arial" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "第 ", size: 18, color: "888888", font: "Arial" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888", font: "Arial" }),
            new TextRun({ text: " 页，共 ", size: 18, color: "888888", font: "Arial" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "888888", font: "Arial" }),
            new TextRun({ text: " 页", size: 18, color: "888888", font: "Arial" })
          ]
        })]
      })
    },
    children: [
      // ===== 封面标题区 =====
      new Paragraph({ spacing: { before: 480, after: 120 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "CRS 资产信息交换风险评估报告", bold: true, size: 52, color: BLUE, font: "Arial" })]
      }),
      new Paragraph({ spacing: { before: 0, after: 80 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "CRS Financial Account Information Exchange Risk Assessment Report", size: 22, color: "888888", font: "Arial", italics: true })]
      }),
      new Paragraph({ spacing: { before: 60, after: 60 }, alignment: AlignmentType.CENTER,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE } },
        children: [new TextRun("")]
      }),
      new Paragraph({ spacing: { before: 120, after: 60 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "评估日期：2026年03月21日", size: 22, color: GRAY, font: "Arial" })]
      }),
      new Paragraph({ spacing: { before: 60, after: 60 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "覆盖资产类型：银行存款/金融账户、上市公司股票、保险（有现金价值保单）", size: 22, color: GRAY, font: "Arial" })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ===== 第一章 =====
      heading1("第一章  基本情况"),
      body("根据您提供的信息，您已确认为中国内地税务居民。本报告针对您持有的海外金融资产，在 CRS（共同申报准则）框架下评估信息是否可能被交换回中国内地税务机关。"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      body("本次评估基于您提供的信息和 CRS 通用规则，评估结论分为三类："),
      new Paragraph({
        spacing: { before: 60, after: 40 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "会被交换", bold: true, size: 22, color: RED, font: "Arial" }),
          new TextRun({ text: "：信息将通过 CRS 渠道传递至中国内地税务机关；", size: 22, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 40, after: 40 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "不会被交换", bold: true, size: 22, color: GREEN, font: "Arial" }),
          new TextRun({ text: "：基于当前信息，不在 CRS 交换范围内或所在地与中国内地尚未激活交换关系；", size: 22, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 40, after: 60 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "存在风险，建议进一步分析", bold: true, size: 22, color: ORANGE, font: "Arial" }),
          new TextRun({ text: "：信息不完整或情况较为复杂，无法做出明确判断。", size: 22, font: "Arial" })
        ]
      }),

      divider(),

      // ===== 第二章 =====
      heading1("第二章  资产风险分析"),

      // --- 资产一 ---
      heading2("2.1  银行存款 / 金融账户"),
      assetInfoTable([
        ["所在地", "美国"],
        ["账户类型", "个人账户"],
        ["账户余额范围", "300 万人民币以上"]
      ]),
      new Paragraph({ spacing: { before: 100, after: 40 }, children: [] }),
      conclusionPara("不会被交换", GREEN),
      heading3("理由说明"),
      body("该账户为您本人名下的个人银行账户，开设于美国。根据 CRS 成员国与激活状态数据，美国尚未加入 CRS 框架，美国采用自身的 FATCA（《海外账户税收合规法》）体系处理跨境税务信息，不通过 CRS 渠道向其他国家交换金融账户信息。因此，您在美国持有的这笔银行存款，不存在通过 CRS 机制交换回中国内地税务机关的风险。"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
        children: [
          new TextRun({ text: "⚠ 特别提示：", bold: true, size: 22, color: ORANGE, font: "Arial" }),
          new TextRun({ text: "虽然 CRS 不适用，FATCA 体系有其自身的信息申报机制，美国金融机构可能依据 FATCA 要求向美国税务机关（IRS）申报相关信息。建议就 FATCA 合规要求另行专项咨询，以确认是否存在其他申报义务。", size: 22, font: "Arial" })
        ]
      }),

      divider(),

      // --- 资产二 ---
      heading2("2.2  上市公司股票"),
      assetInfoTable([
        ["所在交易所", "香港联交所（港交所）"],
        ["所在地", "香港"],
        ["持有方式", "个人直接持有"]
      ]),
      new Paragraph({ spacing: { before: 100, after: 40 }, children: [] }),
      conclusionPara("会被交换", RED),
      heading3("理由说明"),
      body("您在香港联交所持有的上市公司股票为个人直接持有，相关账户（如香港券商账户）属于 CRS 下的金融账户。香港已与中国内地激活 CRS 信息自动交换关系，香港金融机构（含证券商）会定期将账户持有人信息（含账户余额、股息收入、资本利得等）申报给香港税务局，再由香港税务局交换给中国内地税务机关。因此，您持有香港上市公司股票的相关账户信息，会被交换回中国内地税务机关。"),

      divider(),

      // --- 资产三 ---
      heading2("2.3  保险（有现金价值保单）"),
      assetInfoTable([
        ["保险公司注册地", "香港"],
        ["保单类型", "终身寿险、年金险、储蓄型保险"],
        ["投保人", "您本人"],
        ["被保险人", "您的配偶"],
        ["受益人", "您的子女"],
        ["公司/信托参与", "无"]
      ]),
      new Paragraph({ spacing: { before: 100, after: 40 }, children: [] }),
      conclusionPara("会被交换", RED),
      heading3("理由说明"),
      body("该保单的投保人（保单持有人）为您本人，属于个人持有结构，未涉及公司或信托。终身寿险、年金险、储蓄型保险均具有现金价值，属于 CRS 框架下的金融账户范畴。保险公司注册在香港，而香港已与中国内地激活 CRS 信息交换关系，香港保险公司会将具有现金价值的保单信息（含保单现金价值）申报给香港税务局，再交换给中国内地税务机关。因此，该保单信息会被交换。"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({ text: "⚠ 特别提示：", bold: true, size: 22, color: ORANGE, font: "Arial" }),
          new TextRun({ text: "该保单的投保人（您本人）、被保险人（配偶）和受益人（子女）三方角色不同，CRS 下的信息申报以投保人/保单持有人为主要申报对象。建议确认被保险人（配偶）及受益人（子女）的税务居民身份，了解是否存在多重税务管辖地的申报义务。", size: 22, font: "Arial" })
        ]
      }),

      divider(),

      // ===== 第三章 =====
      new Paragraph({ children: [new PageBreak()] }),
      heading1("第三章  综合建议"),

      heading2("立即关注事项"),
      body("您持有的以下资产信息均会被交换回中国内地税务机关："),
      new Paragraph({
        spacing: { before: 60, after: 40 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "香港上市公司股票", bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: "：建议关注相关账户收入（股息、资本利得等）在中国内地的税务申报情况，必要时提前与专业税务顾问沟通。", size: 22, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 40, after: 60 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "香港保险保单", bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: "：建议了解保单现金价值增长部分的税务处理方式，以及是否需要主动申报相关收入。", size: 22, font: "Arial" })
        ]
      }),

      heading2("建议进一步核实事项"),
      new Paragraph({
        spacing: { before: 60, after: 40 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "美国银行账户（FATCA 合规）", bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: "：虽不存在 CRS 交换风险，但鉴于账户余额达 300 万人民币以上，建议专项咨询 FATCA 合规要求，确认是否存在美国税务机关层面的申报义务，以及该账户收入在中国内地的税务处理方式。", size: 22, font: "Arial" })
        ]
      }),
      new Paragraph({
        spacing: { before: 40, after: 60 },
        numbering: { reference: "bullets", level: 0 },
        children: [
          new TextRun({ text: "香港保单多方税务身份核实", bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: "：建议进一步确认被保险人（配偶）及受益人（子女）的税务居民身份，以便全面评估是否存在多个税务管辖地的申报义务。", size: 22, font: "Arial" })
        ]
      }),

      divider(),

      // ===== 第四章 =====
      heading1("第四章  重要声明"),
      body("本报告基于您提供的信息及 CRS 通用规则生成，不构成正式税务意见。CRS 规则在各参与国的具体执行中可能存在差异，具体信息交换情况以相关国家和地区税务机关的实际执行为准。"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      body("本次评估所用 CRS 成员国与激活状态数据版本日期为 2026-03-21，该数据存在时效性，建议定期核实最新状态。"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      body("如您的资产情况发生变化（如新增资产、架构调整、税务居民身份变化等），或需要针对特定资产进行详细的税务合规规划，建议咨询专业税务顾问。"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      body("本报告仅覆盖 CRS 框架下的信息交换风险，不涵盖 FATCA（美国《海外账户税收合规法》）、BEPS（税基侵蚀和利润转移）等其他国际税务合规要求，如有相关需求请另行专项咨询。"),

      divider(),

      new Paragraph({
        spacing: { before: 120, after: 60 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "— 报告结束 —", size: 20, color: "AAAAAA", font: "Arial", italics: true })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("CRS风险评估报告.docx", buffer);
  console.log("✅ 报告已生成：CRS风险评估报告.docx");
});
