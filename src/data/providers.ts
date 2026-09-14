import fs from 'fs';
import path from 'path';

export function getProviders() {
  const providersDir = path.join(process.cwd(), 'src/data/providers');
  const files = fs.readdirSync(providersDir).filter(file => file.endsWith('.json'));
  
  const providers = files.map(file => {
    const content = fs.readFileSync(path.join(providersDir, file), 'utf-8');
    return JSON.parse(content);
  });
  
  // Sort by rank
  return providers.sort((a, b) => a.rank - b.rank);
}

export function getProviderBySlug(slug: string) {
  const providers = getProviders();
  return providers.find(p => p.slug === slug);
}
