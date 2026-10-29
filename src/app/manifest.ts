import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bradan Moda Masculina',
    short_name: 'Bradan',
    description: 'Catálogo digital exclusivo de moda masculina, calçados nobres e perfumaria importada.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0908',
    theme_color: '#0B0908',
    icons: [
      {
        src: '/brand/bradan-emblem.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
  };
}
