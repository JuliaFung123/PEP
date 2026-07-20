/**
 * Safe re-apply: only className="..." on listed files.
 */
import fs from "node:fs"

const files = [
  "src/pages/InputTypePage.tsx",
  "src/components/filter-group-dialog-fields.tsx",
  "src/components/main-menu-rows.tsx",
  "src/components/ui/calendar.tsx",
  "src/components/ui/progress.tsx",
  "src/pages/OrdersAdminPage.tsx",
  "src/pages/PageHeaderBlockPage.tsx",
]

const COMBOS = [
  [/text-2xl\s+font-medium(?:\s+leading-8)?/, "text-2xl/medium"],
  [/text-lg\s+font-semibold(?:\s+leading-7)?/, "text-lg/semibold"],
  [/text-lg\s+font-medium/, "text-lg/medium"],
  [/text-base\s+font-semibold/, "text-base/semibold"],
  [/text-base\s+font-medium/, "text-base/medium"],
  [/text-xl\s+font-semibold/, "text-xl/semibold"],
  [/text-xl\s+font-medium/, "text-xl/medium"],
  [/text-sm\s+font-semibold/, "text-sm/semibold"],
  [/text-sm\s+font-medium/, "text-sm/medium"],
  [/text-sm\s+font-normal/, "text-sm/normal"],
  [/text-sm\s+font-bold/, "text-sm/bold"],
  [/text-xs\s+font-semibold/, "text-xs/semibold"],
  [/text-xs\s+font-medium/, "text-xs/medium"],
  [/text-xs\s+font-normal/, "text-xs/normal"],
  [/text-xs\s+font-bold/, "text-xs/bold"],
  [/text-xs\s+font-light/, "text-xs/light"],
  [/text-\[10px\](?:\s+font-normal)?(?:\s+leading-\[[^\]]+\])?/, "text-10/normal"],
]
const SIZES = ["4xl", "3xl", "2xl", "xl", "lg", "base", "sm", "xs"]

function parse(content) {
  let rest = content.replace(/\s+/g, " ").trim()
  const tokens = []
  for (const [re, id] of COMBOS) {
    if (re.test(rest)) {
      rest = rest.replace(re, " ").replace(/\s+/g, " ").trim()
      tokens.push(id)
    }
  }
  for (const size of SIZES) {
    const token = `text-${size}`
    const rx = new RegExp(`(?:^|\\s)${token}(?=\\s|$)`)
    if (rx.test(rest)) {
      rest = rest.replace(rx, " ").replace(/\s+/g, " ").trim()
      tokens.push(`text-${size}/normal`)
    }
  }
  return { rest, tokens: [...new Set(tokens)] }
}

function ensure(src, name, from) {
  if (new RegExp(`import\\s*\\{[^}]*\\b${name}\\b`).test(src)) return src
  const lines = src.split("\n")
  let last = -1
  let depth = 0
  let inImp = false
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim()
    if (t.startsWith("import ")) {
      inImp = true
      depth = 0
      last = i
    }
    if (inImp) {
      for (const ch of lines[i]) {
        if (ch === "{") depth++
        if (ch === "}") depth--
      }
      if (/from\s+["']/.test(lines[i]) && depth <= 0) {
        last = i
        inImp = false
      }
    }
  }
  const line = `import { ${name} } from "${from}"`
  if (last >= 0) lines.splice(last + 1, 0, line)
  else lines.unshift(line)
  return lines.join("\n")
}

for (const rel of files) {
  if (!fs.existsSync(rel)) {
    console.log("missing", rel)
    continue
  }
  let src = fs.readFileSync(rel, "utf8")
  const orig = src
  let usedT = false
  let usedC = false
  src = src.replace(/className=(")([^"]*)(")/g, (full, _q, content) => {
    if (!/text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|\[10px\])/.test(content)) return full
    const { rest, tokens } = parse(content)
    if (!tokens.length) return full
    usedT = true
    const parts = tokens.map((id) => `typeToken(${JSON.stringify(id)})`)
    if (rest) parts.push(JSON.stringify(rest))
    if (parts.length > 1) usedC = true
    const expr = parts.length === 1 ? parts[0] : `cn(${parts.join(", ")})`
    return `className={${expr}}`
  })
  if (src === orig) {
    console.log("skip", rel)
    continue
  }
  if (usedT) src = ensure(src, "typeToken", "@/data/typography-tokens")
  if (usedC) src = ensure(src, "cn", "@/lib/utils")
  fs.writeFileSync(rel, src)
  console.log("ok", rel)
}
