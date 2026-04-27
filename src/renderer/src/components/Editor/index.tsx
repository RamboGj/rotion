import { EditorContent, useEditor } from "@tiptap/react";

import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import ExtensionPlaceholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                document: false,
            }),
            Highlight,
            Typography,
            ExtensionPlaceholder.configure({
                placeholder: "Untitled",
                emptyEditorClass: 'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none'
            }),
            Document.extend({
                content: 'heading block*'
            })
        ],
        content: '<h1>Back-end</h1><p>Esse documento explica sobre back-end</p>',
        autofocus: 'end',
        editorProps: {
            attributes: {
                class: 'focus:outline-none prose prose-invert prose-headings:mt-0'
            }
        }
    })

    return (
        <EditorContent editor={editor} className="w-[65ch]" />
    )
}