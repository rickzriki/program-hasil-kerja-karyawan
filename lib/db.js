import { put, get } from '@vercel/blob';

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
    // Store private: baca lewat get() dengan access 'private' — SDK mengambil
    // blob dengan header Authorization (token), dan useCache: false memaksa
    // baca segar melewati CDN cache (dokumen ini sering ditimpa).
    const result = await get(KEY, { access: 'private', useCache: false });
    if (!result || !result.stream) return emptyDoc();
    const doc = JSON.parse(await new Response(result.stream).text());
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
