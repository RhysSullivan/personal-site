import { neon } from '@neondatabase/serverless';
import type { JSONContent } from '@tiptap/core';
import { DATABASE_URL } from 'astro:env/server';

const sql = neon(DATABASE_URL);

export type Note = {
  id: string;
  title: string;
  doc: JSONContent;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteSummary = Omit<Note, 'doc'> & { firstBlock: JSONContent | undefined };

type Row = {
  id: string;
  title: string;
  doc: JSONContent;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
};

const toNote = (row: Row): Note => ({
  id: row.id,
  title: row.title,
  doc: row.doc,
  isPublic: row.is_public,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const newId = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_');
};

export async function listNotes({ includePrivate }: { includePrivate: boolean }): Promise<NoteSummary[]> {
  const rows = (await sql`
    select id, title, doc->'content'->0 as first_block, is_public, created_at, updated_at
    from notes
    where is_public or ${includePrivate}
    order by updated_at desc
  `) as (Omit<Row, 'doc'> & { first_block: JSONContent | null })[];
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    firstBlock: row.first_block ?? undefined,
    isPublic: row.is_public,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function getNote(id: string): Promise<Note | null> {
  const rows = (await sql`select * from notes where id = ${id}`) as Row[];
  return rows[0] ? toNote(rows[0]) : null;
}

export async function createNote(input: { title: string; doc: JSONContent }): Promise<Note> {
  const rows = (await sql`
    insert into notes (id, title, doc)
    values (${newId()}, ${input.title}, ${JSON.stringify(input.doc)}::jsonb)
    returning *
  `) as Row[];
  return toNote(rows[0]!);
}

export async function updateNote(
  id: string,
  patch: { title?: string; doc?: JSONContent; isPublic?: boolean },
): Promise<Note | null> {
  const rows = (await sql`
    update notes set
      title = coalesce(${patch.title ?? null}::text, title),
      doc = coalesce(${patch.doc === undefined ? null : JSON.stringify(patch.doc)}::jsonb, doc),
      is_public = coalesce(${patch.isPublic ?? null}::boolean, is_public),
      updated_at = now()
    where id = ${id}
    returning *
  `) as Row[];
  return rows[0] ? toNote(rows[0]) : null;
}

export async function deleteNote(id: string): Promise<boolean> {
  const rows = await sql`delete from notes where id = ${id} returning id`;
  return rows.length > 0;
}
