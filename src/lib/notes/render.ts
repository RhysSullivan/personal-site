import type { JSONContent } from '@tiptap/core';
import { renderToHTMLString } from '@tiptap/static-renderer/pm/html-string';
import { extensions } from './schema';

export const renderNote = (doc: JSONContent) => renderToHTMLString({ content: doc, extensions });

const plainText = (node: JSONContent | undefined): string =>
  node?.text ?? node?.content?.map(plainText).join('') ?? '';

/** Untitled notes are named by their first line, so quick captures need no title. */
export const noteTitle = (title: string, firstBlock: JSONContent | undefined) =>
  title.trim() || plainText(firstBlock).trim().slice(0, 120) || 'Untitled';

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
