import { NextResponse } from 'next/server';
import { readDoc, writeDoc, DEFAULT_EMPLOYEES } from '@/lib/db';

export async function GET() {
  const doc = await readDoc();
  return NextResponse.json(doc);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }
  const doc = {
    employees: Array.isArray(body.employees) && body.employees.length ? body.employees : [...DEFAULT_EMPLOYEES],
    entries: Array.isArray(body.entries) ? body.entries : [],
    driverEntries: Array.isArray(body.driverEntries) ? body.driverEntries : [],
  };
  await writeDoc(doc);
  return NextResponse.json({ ok: true });
}
