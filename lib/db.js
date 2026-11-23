import { put, head } from '@vercel/blob';

const KEY = 'hasil-kerja/data.json';

export const DEFAULT_EMPLOYEES = [
  'AGISTA', 'AISYAH', 'ALI', 'AMEL', 'ANDY', 'ANI', 'AWANG', 'AYU',
  'DARNO', 'DEDE', 'DINA', 'FADIL', 'HAIRIYAH', 'HARIRI', 'IMAS', 'JONI',
  'JUA', 'KARTIKA', 'MEGA', 'NOVI', 'NUR', 'PETTY', 'RIDHO', 'RIZKY',
  'SALMA', 'SITI M', 'SYAHRUL', 'TAMAH', 'TETI', 'TIARA', 'TIAS', 'TUGI',
];

export function emptyDoc() {
  return { employees: [...DEFAULT_EMPLOYEES], entries: [], driverEntries: [] };
}

export async function readDoc() {
  try {
    const meta = await head(KEY);
    // Blob store ini private: URL biasa tidak bisa di-fetch tanpa token,
    // jadi pakai downloadUrl (signed URL) dari head(), fallback ke url.
    const src = meta.downloadUrl || meta.url;
    // cache-buster: blob URL is stable across overwrites, so bypass edge cache
    const res = await fetch(`${src}${src.includes('?') ? '&' : '?'}v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('blob fetch failed');
    const doc = await res.json();
    return {
      employees: Array.isArray(doc.employees) && doc.employees.length ? doc.employees : [...DEFAULT_EMPLOYEES],
      entries: Array.isArray(doc.entries) ? doc.entries : [],
      driverEntries: Array.isArray(doc.driverEntries) ? doc.driverEntries : [],
    };
  } catch {
    return emptyDoc();
  }
}

export async function writeDoc(doc) {
  const clean = {
    employees: Array.isArray(doc.employees) && doc.employees.length ? doc.employees : [...DEFAULT_EMPLOYEES],
    entries: Array.isArray(doc.entries) ? doc.entries : [],
    driverEntries: Array.isArray(doc.driverEntries) ? doc.driverEntries : [],
  };
  await put(KEY, JSON.stringify(clean), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}
