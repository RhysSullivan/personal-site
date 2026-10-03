import { getSchema, type JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

/** Shared by the browser editor and server rendering so stored documents always match one schema. */
export const extensions = [
  StarterKit.configure({
    link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
  }),
  TaskList,
  TaskItem.configure({ nested: true }),
];

export const emptyDoc: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };

const schema = getSchema(extensions);

/** Throws when the document does not conform to the editor schema. */
export function assertValidDoc(doc: unknown): asserts doc is JSONContent {
  schema.nodeFromJSON(doc).check();
}
