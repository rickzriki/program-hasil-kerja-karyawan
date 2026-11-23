export const metadata = {
  title: 'Hasil Kerja Karyawan — PT. Meleo Mahkota Abadi',
  description: 'Aplikasi pencatatan hasil kerja karyawan PT. Meleo Mahkota Abadi',
  icons: {
    icon: '/icon-192',
    apple: '/icon-192',
  },
  appleWebApp: {
    capable: true,
    title: 'Hasil Kerja',
    statusBarStyle: 'default',
  },
};

export const viewport = {
  themeColor: '#14532d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', background: '#f3f4f6', color: '#1f2937' }}>
        {children}
      </body>
    </html>
  );
}
