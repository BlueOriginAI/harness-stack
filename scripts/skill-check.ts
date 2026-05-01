#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { discoverSkillTemplates } from './discover-skills';

const ROOT = path.resolve(__dirname, '..');
const MAX_BYTES = 25 * 1024;

function main(): void {
  const templates = discoverSkillTemplates(ROOT);
  let hasError = false;

  for (const entry of templates) {
    const filePath = path.join(ROOT, entry.output);
    if (!fs.existsSync(filePath)) {
      console.error(`missing generated file: ${entry.output}`);
      hasError = true;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('### 何时使用') && !content.includes('## 何时使用')) {
      console.error(`missing usage section: ${entry.output}`);
      hasError = true;
    }
    if (Buffer.byteLength(content, 'utf8') > MAX_BYTES) {
      console.error(`file too large: ${entry.output}`);
      hasError = true;
    }
  }

  if (hasError) process.exit(1);
  console.log('skill check passed');
}

main();
