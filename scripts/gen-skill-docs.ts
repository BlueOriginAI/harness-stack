#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { discoverSkillTemplates } from './discover-skills';

const ROOT = path.resolve(__dirname, '..');
const SHARED_PREAMBLE = path.join(ROOT, 'templates', 'shared', 'preamble.md.tmpl');

function read(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content);
}

function render(content: string): string {
  return content.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function main(): void {
  const preamble = read(SHARED_PREAMBLE);
  const templates = discoverSkillTemplates(ROOT);

  for (const entry of templates) {
    const tmplPath = path.join(ROOT, entry.tmpl);
    const outPath = path.join(ROOT, entry.output);
    const source = read(tmplPath);
    const merged = source.replace('{{PREAMBLE}}', preamble);
    write(outPath, render(merged));
    console.log(`generated ${entry.output}`);
  }
}

main();
