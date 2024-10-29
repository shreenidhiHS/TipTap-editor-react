import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import FontSize from 'tiptap-extension-font-size'
import FontFamily from '@tiptap/extension-font-family'

import { useState } from 'react'
import MenuBar from './MenuBar'

const TipTapEditor = ({defaultContent}: {defaultContent: any}) => {
  const [editorContent, setEditorContent] = useState<string>('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      FontSize.configure({
        types: ['textStyle'],
      }),
      FontFamily,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: defaultContent || '',
    onUpdate: ({ editor }) => {
      setEditorContent(JSON.stringify(editor.getJSON()))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none max-w-none leading-tight',
      },
    },
  })

  return (
    <div className="flex flex-col gap-3 max-w-2xl mx-auto">
      <MenuBar editor={editor} />
      <div className="bg-white rounded-xl border shadow-sm shadow-gray-200 shadow-md">
        <EditorContent 
          editor={editor} 
          className="min-h-[300px] p-4"
        />
      </div>
      <div className="mt-2 bg-gray-50 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Editor Content (HTML)</h3>
        <div className="bg-white p-4 rounded-lg overflow-auto max-h-[200px] text-sm border shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </div>
      </div>
    </div>
  )
}

export default TipTapEditor 