/**
 * Safe-ish codemod for typeToken migration.
 * Only rewrites className="..." / className='...' that contain size(+weight).
 * Leaves cn()/cva/template strings for a second manual pass.
 *
 * Run: node scripts/migrate-type-tokens.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src")

const SKIP = new Set([
  "data/typography-tokens.ts",
  "data/typography-samples.ts",
  "data/typography-font-size-tokens.ts",
  "components/typography-font-size-table.tsx",
])

const COMBOS = [
  [/text-2xl\s+font-medium(?:\s+leading-8)?/, "text-2xl/medium"],
  [/text-lg\s+font-semibold(?:\s+leading-7)?/, "text-lg/semibold"],
  [/text-lg\s+font-medium/, "text-lg/medium"],
  [/text-base\s+font-semibold/, "text-base/semibold"],
  [/text-base\s+font-medium/, "text-base/medium"],
  [/text-xl\s+font-semibold/, "text-xl/semibold"],
  [/text-xl\s+font-medium/, "text-xl/medium"],
  [/text-xl\s+font-normal/, "text-xl/normal"],
  [/text-3xl\s+font-semibold/, "text-3xl/semibold"],
  [/text-4xl\s+font-extrabold/, "text-4xl/extrabold"],
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

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) walk(full, out)
    else if (/\.(tsx|ts)$/.test(name)) out.push(full)
  }
  return out
}

function parseClassList(content) {
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
    const re = new RegExp(`(?:^|\\s)${token}(?=\\s|$)`)
    if (re.test(rest)) {
      rest = rest.replace(re, " ").replace(/\s+/g, " ").trim()
      tokens.push(`text-${size}/normal`)
    }
  }

  return { rest, tokens: [...new Set(tokens)] }
}

function ensureImport(src, name, from) {
  const re = new RegExp(
    `import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*["']${from.replace("/", "\\/")}["']`,
  )
  if (re.test(src)) return src

  // Prefer after last import
  const imports = [...src.matchAll(/^import .+$/gm)]
  if (imports.length === 0) {
    return `import { ${name} } from "${from}"\n` + src
  }
  const last = imports[imports.length - 1]
  const idx = last.index + last[0].length
  return src.slice(0, idx) + `\nimport { ${name} } from "${from}"` + src.slice(idx)
}

function transform(src) {
  let usedTypeToken = false
  let usedCn = false

  let next = src.replace(/className=(")([^"]*)(")/g, (full, _q, content) => {
    if (!/text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|\[10px\])/.test(content)) return full
    const { rest, tokens } = parseClassList(content)
    if (tokens.length === 0) return full
    usedTypeToken = true
    const parts = tokens.map((id) => `typeToken(${JSON.stringify(id)})`)
    if (rest) parts.push(JSON.stringify(rest))
    if (parts.length > 1) usedCn = true
    const expr = parts.length === 1 ? parts[0] : `cn(${parts.join(", ")})`
    return `className={${expr}}`
  })

  // Also className='...'
  next = next.replace(/className=(')([^']*)(')/g, (full, _q, content) => {
    if (!/text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|\[10px\])/.test(content)) return full
    const { rest, tokens } = parseClassList(content)
    if (tokens.length === 0) return full
    usedTypeToken = true
    const parts = tokens.map((id) => `typeToken(${JSON.stringify(id)})`)
    if (rest) parts.push(JSON.stringify(rest))
    if (parts.length > 1) usedCn = true
    const expr = parts.length === 1 ? parts[0] : `cn(${parts.join(", ")})`
    return `className={${expr}}`
  })

  if (next === src) return { src, changed: false }

  if (usedTypeToken) next = ensureImport(next, "typeToken", "@/data/typography-tokens")
  if (usedCn) next = ensureImport(next, "cn", "@/lib/utils")

  return { src: next, changed: true }
}

let n = 0
for (const file of walk(root)) {
  const rel = path.relative(root, file).replaceAll("\\", "/")
  if (SKIP.has(rel)) continue
  const raw = fs.readFileSync(file, "utf8")
  const { src, changed } = transform(raw)
  if (!changed) continue
  fs.writeFileSync(file, src)
  console.log(rel)
  n++
}
console.log(`Updated ${n} files (className="..." pass).`)
