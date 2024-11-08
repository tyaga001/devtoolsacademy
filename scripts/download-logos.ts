import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOGOS = {
    supabase: 'https://raw.githubusercontent.com/supabase/supabase/master/packages/config/logos/supabase-logo.svg',
    neon: 'https://neon.tech/images/logo.svg',
    grafana: 'https://grafana.com/static/img/grafana_icon.svg',
    prisma: 'https://prismalens.vercel.app/header/logo-white.svg',
    nextjs: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
    tailwindcss: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg'
};

async function downloadLogos() {
    const logoDir = path.join(__dirname, '..', 'public', 'tool-logos');

    if (!fs.existsSync(logoDir)) {
        fs.mkdirSync(logoDir, { recursive: true });
    }

    for (const [name, url] of Object.entries(LOGOS)) {
        try {
            const response = await fetch(url);
            const buffer = Buffer.from(await response.arrayBuffer());

            const extension = path.extname(url) || '.svg';
            fs.writeFileSync(
                path.join(logoDir, `${name}${extension}`),
                buffer
            );

            console.log(`Downloaded ${name} logo`);
        } catch (error) {
            console.error(`Failed to download ${name} logo:`, error);
        }
    }
}

downloadLogos().catch(console.error);