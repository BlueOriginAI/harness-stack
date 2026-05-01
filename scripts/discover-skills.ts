import * as fs from 'fs';
import * as path from 'path';

export type SkillTemplateEntry = {
  tmpl: string;
  output: string;
};

export function discoverSkillTemplates(root: string): SkillTemplateEntry[] {
  const skillsDir = path.join(root, 'skills');
  if (!fs.existsSync(skillsDir)) return [];

  const dirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  const results: SkillTemplateEntry[] = [];

  for (const dir of dirs) {
    const tmpl = path.join('skills', dir, 'SKILL.md.tmpl');
    const output = path.join('skills', dir, 'SKILL.md');
    if (fs.existsSync(path.join(root, tmpl))) {
      results.push({ tmpl, output });
    }
  }

  return results;
}
