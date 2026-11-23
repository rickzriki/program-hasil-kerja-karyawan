export default function manifest() {
  return {
    name: 'Hasil Kerja Karyawan — PT. Meleo Mahkota Abadi',
    short_name: 'Hasil Kerja',
    description: 'Aplikasi pencatatan hasil kerja karyawan PT. Meleo Mahkota Abadi: input hasil per shift, pengiriman driver, dan rekap harian/mingguan.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#14532d',
    lang: 'id',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
