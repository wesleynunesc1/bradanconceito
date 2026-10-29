const fs = require('fs');
const path = require('path');

const SOURCE_ROOT = path.resolve(__dirname, '..', 'Bradan _ Loja Online_');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const CATALOG_DEST = path.join(PUBLIC_DIR, 'catalog');
const BRAND_DEST = path.join(PUBLIC_DIR, 'brand');
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');

// Ensure directories exist
[CATALOG_DEST, BRAND_DEST, DATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Remove accidental .jpg file if it exists
const brokenDotJpg = path.join(CATALOG_DEST, 'calcados', '.jpg');
if (fs.existsSync(brokenDotJpg)) {
  fs.unlinkSync(brokenDotJpg);
}

// 1. Copy brand logos
console.log('--- Copiando Logos Oficiais BRADAN CONCEITO ---');
const logos = [
  { src: 'BRADAN_CONCEITO.jpg', dest: 'bradan-conceito-dark.jpg' },
  { src: 'BRADAN_CONCEITO_bronze_sem_fundo.png', dest: 'bradan-conceito-bronze.png' },
  { src: 'BRADAN_CONCEITO_cobre_2D_sem_fundo.png', dest: 'bradan-conceito-cobre.png' },
];

logos.forEach(l => {
  const srcPath = path.join(SOURCE_ROOT, l.src);
  const destPath = path.join(BRAND_DEST, l.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Logo copiado: ${l.dest}`);
  }
});

// Category normalization mapping
const categoryMeta = {
  'boné’s_': {
    name: 'Bonés',
    slug: 'bones',
    description: 'Acessórios masculinos com acabamento premium e marcas consagradas.',
    heroText: 'Design refinado e assinatura exclusiva em acessórios de alto padrão.'
  },
  'calçados': {
    name: 'Calçados',
    slug: 'calcados',
    description: 'Calçados masculinos sofisticados, de loafers em couro a tênis casuais refinados.',
    heroText: 'Passo a passo com elegância, conforto estruturado e presença marcante.'
  },
  'calças_': {
    name: 'Calças',
    slug: 'calcas',
    description: 'Calças jeans e alfaiataria contemporânea com caimento e lavagem impecáveis.',
    heroText: 'Caimento impecável e tecidos selecionados para uma silhueta alinhada.'
  },
  'camisas gola careca': {
    name: 'Camisas Gola Careca',
    slug: 'camisas-gola-careca',
    description: 'Camisetas casuais refinadas em algodão nobre das marcas mais desejadas.',
    heroText: 'Minimalismo essencial com toque premium e sofisticação no dia a dia.'
  },
  'camisas polo_': {
    name: 'Camisas Polo',
    slug: 'camisas-polo',
    description: 'Polos com texturas exclusivas, golas estruturadas e elegância atemporal.',
    heroText: 'A clássica alfaiataria casual masculina reinventada em detalhes premium.'
  },
  'camisas políamida_': {
    name: 'Camisas Poliamida',
    slug: 'camisas-poliamida',
    description: 'Tecnologia têxtil com toque gelado, secagem rápida e caimento atlético superior.',
    heroText: 'Inovação e alto desempenho em fibras nobres de poliamida.'
  },
  'camisas zara': {
    name: 'Camisas Zara',
    slug: 'camisas-zara',
    description: 'Camisetas básicas e estruturadas com apelo contemporâneo e toque aveludado.',
    heroText: 'O corte moderno e versátil que eleva composições masculinas.'
  },
  'cueca políamida': {
    name: 'Cuecas Poliamida',
    slug: 'cuecas-poliamida',
    description: 'Cuecas boxer confeccionadas em poliamida respirável de marcas de luxo.',
    heroText: 'Máximo conforto anatômico, respirabilidade e acabamento nobre.'
  },
  'mauricinho_': {
    name: 'Mauricinho & Shorts',
    slug: 'mauricinho',
    description: 'Bermudas e shorts de sarja e banho com corte refinado e estética veraneio chic.',
    heroText: 'Estilo descontraído com caimento nobre para momentos de lazer e descanso.'
  },
  'perfumes importados': {
    name: 'Perfumes Importados',
    slug: 'perfumes-importados',
    description: 'Fragrâncias árabes e importadas com projeção marcante e matérias-primas raras.',
    heroText: 'Presença olfativa inesquecível com acordes nobres e alta fixação.'
  }
};

function normalizeCategoryKey(dirName) {
  return dirName.trim().toLowerCase();
}

function cleanFilename(file) {
  return file.replace(/\.[^/.]+$/, '');
}

function sanitizeForUrl(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function detectBrand(name, categoryName) {
  const lower = (name + ' ' + categoryName).toLowerCase();
  if (lower.includes('ralph lauren') || lower.includes('polo ralph')) return 'Ralph Lauren';
  if (lower.includes('armani') || lower.includes('emporio')) return 'Emporio Armani';
  if (lower.includes('hugo boss') || lower.includes('boss')) return 'Hugo Boss';
  if (lower.includes('fred perry')) return 'Fred Perry';
  if (lower.includes('tommy')) return 'Tommy Hilfiger';
  if (lower.includes('aramis')) return 'Aramis';
  if (lower.includes('zara')) return 'Zara';
  if (lower.includes('crocs')) return 'Crocs';
  if (lower.includes('lattafa') || lower.includes('asad') || lower.includes('bade_e') || lower.includes("bade'e")) return 'Lattafa / Perfumes Árabes';
  if (lower.includes('brand collection')) return 'Brand Collection';
  return 'BRADAN Moda Masculina';
}

function getSanitizedDestinationFilename(filename, usedFilenames) {
  const ext = path.extname(filename);
  let base = path.basename(filename, ext).trim();
  if (base === '__' || base === '') {
    base = 'tenis-casual-branco-premium';
  }
  let safeBase = sanitizeForUrl(base) || 'item';
  let candidate = safeBase + ext.toLowerCase();
  let counter = 2;
  while (usedFilenames.has(candidate)) {
    candidate = `${safeBase}-${counter}${ext.toLowerCase()}`;
    counter++;
  }
  usedFilenames.add(candidate);
  return candidate;
}

// Read directory
const subdirs = fs.readdirSync(SOURCE_ROOT, { withFileTypes: true });

const products = [];
const categories = [];

subdirs.forEach(item => {
  if (!item.isDirectory()) return;

  const rawDirName = item.name;
  const key = normalizeCategoryKey(rawDirName);
  const meta = categoryMeta[key] || {
    name: rawDirName.replace(/_/g, '').trim(),
    slug: sanitizeForUrl(rawDirName),
    description: 'Coleção exclusiva BRADAN MODA MASCULINA.',
    heroText: 'Elegância e autenticidade.'
  };

  const catFolderSource = path.join(SOURCE_ROOT, rawDirName);
  const files = fs.readdirSync(catFolderSource).filter(f => {
    return /\.(jpg|jpeg|png|webp)$/i.test(f);
  });

  if (files.length === 0) return;

  const catDestFolder = path.join(CATALOG_DEST, meta.slug);
  if (!fs.existsSync(catDestFolder)) fs.mkdirSync(catDestFolder, { recursive: true });

  const usedFilenames = new Set();
  const grouped = new Map();

  files.forEach(file => {
    const originalPath = path.join(catFolderSource, file);
    const destName = getSanitizedDestinationFilename(file, usedFilenames);
    const destPath = path.join(catDestFolder, destName);
    fs.copyFileSync(originalPath, destPath);

    const publicPath = `/catalog/${meta.slug}/${destName}`;

    // Grouping logic based on real item patterns
    let groupKey = '';
    let productName = '';

    const clean = cleanFilename(file).replace(/_+/g, ' ').trim();

    if (rawDirName === 'Calçados') {
      if (/crocs/i.test(file)) {
        groupKey = 'chinelo-crocs';
        productName = 'Chinelo Crocs Slide';
      } else if (/armani/i.test(file)) {
        groupKey = 'tenis-armani-exchange';
        productName = 'Tênis Casual Armani Exchange';
      } else if (file === '__.jpg' || clean === '') {
        groupKey = 'tenis-casual-branco-premium';
        productName = 'Tênis Casual Branco Premium em Couro';
      } else {
        groupKey = sanitizeForUrl(clean);
        productName = clean
          .replace(/sapatilha slip on/i, 'Sapatilha Slip-on')
          .replace(/loafer/i, 'Loafer')
          .replace(/tenis/i, 'Tênis');
      }
    } else if (rawDirName.startsWith('Camisas Polo')) {
      if (/aramis/i.test(file)) {
        groupKey = 'camisa-polo-aramis-texturizada';
        productName = 'Camisa Polo Aramis Texturizada';
      } else {
        groupKey = sanitizeForUrl(clean);
        productName = clean.replace(/polo/i, 'Camisa Polo');
      }
    } else if (rawDirName.toLowerCase().includes('camisas zara')) {
      groupKey = 'camisa-zara-basica-premium';
      productName = 'Camiseta Básica Zara Premium';
    } else if (rawDirName.toLowerCase().includes('camisas gola careca')) {
      if (/ralph lauren/i.test(file)) {
        groupKey = 'camisetas-casuais-ralph-lauren';
        productName = 'Camisetas Casuais Ralph Lauren';
      } else if (/fred perry/i.test(file)) {
        groupKey = 'camisetas-casuais-fred-perry';
        productName = 'Camisetas Casuais Fred Perry com Fita';
      } else if (/aramis/i.test(file)) {
        groupKey = 'camisetas-casuais-aramis';
        productName = 'Camisetas Casuais Aramis';
      } else if (/tommy hilfiger/i.test(file)) {
        groupKey = 'camiseta-basica-tommy-hilfiger';
        productName = 'Camiseta Básica Tommy Hilfiger';
      } else if (/tommy/i.test(file)) {
        groupKey = 'camiseta-tommy-hilfiger-faixa';
        productName = 'Camiseta Tommy Hilfiger Faixa Central';
      } else if (/zara/i.test(file)) {
        groupKey = 'camiseta-zara-gola-careca';
        productName = 'Camiseta Zara Gola Careca';
      } else {
        groupKey = sanitizeForUrl(clean);
        productName = clean;
      }
    } else if (rawDirName.toLowerCase().includes('cueca')) {
      if (/armani/i.test(file)) {
        groupKey = 'cueca-boxer-poliamida-emporio-armani';
        productName = 'Cueca Boxer Poliamida Emporio Armani';
      } else if (/hugo boss/i.test(file)) {
        groupKey = 'cueca-boxer-poliamida-hugo-boss';
        productName = 'Cueca Boxer Poliamida Hugo Boss';
      } else {
        groupKey = sanitizeForUrl(clean);
        productName = clean;
      }
    } else if (rawDirName.toLowerCase().includes('mauricinho')) {
      if (/shorts de banho/i.test(file)) {
        groupKey = 'shorts-de-banho-masculino';
        productName = 'Shorts de Banho Masculino';
      } else if (/casual de sarja/i.test(file) && /aramis/i.test(file)) {
        groupKey = 'shorts-casual-sarja-aramis';
        productName = 'Shorts Casual de Sarja Aramis';
      } else if (/casual de sarja/i.test(file)) {
        groupKey = 'shorts-masculino-casual-sarja';
        productName = 'Shorts Masculino Casual de Sarja';
      } else if (/tommy/i.test(file)) {
        groupKey = 'shorts-tommy-hilfiger';
        productName = 'Shorts Tommy Hilfiger';
      } else {
        groupKey = sanitizeForUrl(clean);
        productName = clean;
      }
    } else if (rawDirName.toLowerCase().includes('perfumes')) {
      if (/bade/i.test(file)) {
        groupKey = 'perfume-arabe-badee-al-oud';
        productName = "Perfume Árabe Bade'e Al Oud Lattafa";
      } else if (/asad/i.test(file)) {
        groupKey = 'perfume-asad-bourbon-lattafa';
        productName = 'Perfume Asad Bourbon Lattafa';
      } else {
        groupKey = sanitizeForUrl(clean);
        productName = clean.replace(/brand collection/i, 'Perfume Brand Collection Masculino');
      }
    } else {
      groupKey = sanitizeForUrl(clean.replace(/\([0-9]+\)/g, ''));
      productName = clean.replace(/\([0-9]+\)/g, '').replace(/_+/g, ' ').trim();
    }

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, {
        name: productName,
        images: []
      });
    }

    grouped.get(groupKey).images.push(publicPath);
  });

  // Create products for this category
  let productIndex = 1;
  grouped.forEach((data, gSlug) => {
    const brand = detectBrand(data.name, meta.name);
    const prodId = `prod_${meta.slug}_${productIndex++}`;

    products.push({
      id: prodId,
      name: data.name,
      slug: gSlug,
      category: meta.name,
      categorySlug: meta.slug,
      mainImage: data.images[0],
      images: data.images,
      price: null, // "Consultar valor" - sem inventar dados
      priceDisplay: 'Consultar valor',
      brand: brand,
      inStock: true,
      description: `Peça selecionada com padrão de qualidade e elegância BRADAN MODA MASCULINA. Acabamento primoroso e materiais selecionados para presença e sofisticação no guarda-roupa masculino.`,
      tags: [meta.name, brand].filter(Boolean),
      createdAt: new Date().toISOString()
    });
  });

  categories.push({
    name: meta.name,
    slug: meta.slug,
    description: meta.description,
    heroText: meta.heroText,
    coverImage: grouped.values().next().value.images[0],
    productCount: grouped.size
  });
});

// Write to JSON
const catalogOutput = {
  store: {
    name: 'BRADAN MODA MASCULINA',
    slogan: 'O essencial não precisa ser comum.',
    description: 'Moda masculina contemporânea, elegância atemporal e curadoria de alto padrão.',
    whatsapp: '5585991284210', // Oficial BRADAN MODA MASCULINA
    whatsappDisplay: '(85) 99128-4210',
    instagram: '@bradanconceito',
    location: 'Atendimento e envios para todo o Brasil',
    schedule: 'Segunda a Sábado, das 09h às 19h'
  },
  categories,
  products
};

fs.writeFileSync(
  path.join(DATA_DIR, 'catalog.json'),
  JSON.stringify(catalogOutput, null, 2),
  'utf-8'
);

console.log(`\n Catálogo gerado com sucesso!`);
console.log(`Total de categorias: ${categories.length}`);
console.log(`Total de produtos reais identificados: ${products.length}`);
categories.forEach(c => {
  console.log(`  - ${c.name} (${c.slug}): ${c.productCount} produto(s)`);
});
