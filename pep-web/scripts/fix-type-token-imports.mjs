/**
 * Fix multi-line imports broken by migrate-type-tokens ensureImport.
 * Handles CRLF and LF.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src")

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) walk(full, out)
    else if (/\.(tsx|ts)$/.test(name)) out.push(full)
  }
  return out
}

let n = 0
for (const file of walk(root)) {
  let src = fs.readFileSync(file, "utf8")
  const original = src
  const nl = src.includes("\r\n") ? "\r\n" : "\n"

  // Normalize to \n for processing
  let text = src.replace(/\r\n/g, "\n")

  let needsType = /typeToken\(/.test(text)
  let needsCn = /\bcn\(/.test(text)

  // Repeatedly pull injected imports out of `import { ... } from "..."` blocks
  const injectRe =
    /import \{\n(?:import \{ typeToken \} from "@\/data\/typography-tokens"\n)?(?:import \{ cn \} from "@\/lib\/utils"\n)+/g

  // Simpler line-based fix
  const lines = text.split("\n")
  const out = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === "import {") {
      // Look ahead for injected imports
      let j = i + 1
      const injected = []
      while (
        j < lines.length &&
        (lines[j].trim() === 'import { typeToken } from "@/data/typography-tokens"' ||
          lines[j].trim() === 'import { cn } from "@/lib/utils"')
      ) {
        injected.push(lines[j].trim())
        j++
      }
      if (injected.length > 0) {
        if (injected.some((l) => l.includes("typeToken"))) needsType = true
        if (injected.some((l) => l.includes("{ cn }"))) needsCn = true
        out.push("import {")
        i = j
        continue
      }
    }
    out.push(line)
    i++
  }

  text = out.join("\n")

  // Remove duplicate top-level typeToken/cn imports; we'll re-add once if needed
  const hasType = /import\s*\{[^}]*\btypeToken\b[^}]*\}\s*from\s*["']@\/data\/typography-tokens["']/.test(
    text,
  )
  const hasCn = /import\s*\{[^}]*\bcn\b[^}]*\}\s*from\s*["']@\/lib\/utils["']/.test(text)

  // Strip standalone duplicates first then add clean ones
  // (keep existing good imports)

  const toAdd = []
  if (needsType && !hasType) toAdd.push('import { typeToken } from "@/data/typography-tokens"')
  if (needsCn && !hasCn) toAdd.push('import { cn } from "@/lib/utils"')

  if (toAdd.length) {
    const ls = text.split("\n")
    let last = -1
    let depth = 0
    let inImp = false
    for (let k = 0; k < ls.length; k++) {
      const t = ls[k].trim()
      if (t.startsWith("import ")) {
        inImp = true
        depth = 0
        last = k
      }
      if (inImp) {
        for (const ch of ls[k]) {
          if (ch === "{") depth++
          if (ch === "}") depth--
        }
        if (/from\s+["']/.test(ls[k]) && depth <= 0) {
          last = k
          inImp = false
        }
      }
    }
    if (last >= 0) ls.splice(last + 1, 0, ...toAdd)
    else ls.unshift(...toAdd)
    text = ls.join("\n")
  }

  text = text.replace(
    /(import \{ typeToken \} from "@\/data\/typography-tokens"\n)+/g,
    'import { typeToken } from "@/data/typography-tokens"\n',
  )
  text = text.replace(
    /(import \{ cn \} from "@\/lib\/utils"\n)+/g,
    'import { cn } from "@/lib/utils"\n',
  )

  // Restore original line endings
  if (nl === "\r\n") text = text.replace(/\n/g, "\r\n")

  if (text !== original) {
    fs.writeFileSync(file, text)
    console.log(path.relative(root, file).replaceAll("\\", "/"))
    n++
  }
}
console.log(`Fixed ${n} files.`)
