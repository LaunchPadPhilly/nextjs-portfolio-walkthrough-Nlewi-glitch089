#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env')
if (!fs.existsSync(envPath)) {
  console.log('.env not found — skipping validation')
  process.exit(0)
}

const content = fs.readFileSync(envPath, 'utf8')
const lines = content.split(/\r?\n/)

// Suspicious patterns that likely indicate accidental JS or other injected content
const checks = [
  { name: 'fetch call', re: /fetch\s*\(/i },
  { name: 'arrow function', re: /=>/ },
  { name: 'console usage', re: /console\./i },
  { name: 'function keyword', re: /\bfunction\b/ },
  { name: 'curly brace', re: /[{}]/ },
  { name: 'template literal backtick', re: /`/ },
]

const errors = []

lines.forEach((raw, idx) => {
  const line = raw.trim()
  if (!line || line.startsWith('#')) return
  // Accept normal KEY=VALUE lines; flag if any suspicious check matches
  for (const c of checks) {
    if (c.re.test(line)) {
      errors.push({ line: idx + 1, text: raw, why: c.name })
      break
    }
  }
})

if (errors.length) {
  console.error('\n.env validation failed — suspicious content found:')
  errors.forEach(e => {
    console.error(`  L${e.line}: (${e.why}) ${e.text}`)
  })
  console.error('\nRemove the accidental content from .env (or adjust the validator if this is a false positive).')
  process.exit(1)
}

console.log('.env looks ok')
process.exit(0)
