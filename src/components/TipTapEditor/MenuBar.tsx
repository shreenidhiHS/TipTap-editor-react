import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Undo,
  Redo,
  Code,
} from 'lucide-react'

interface MenuBarProps {
  editor: Editor | null
}

const FONT_SIZES = [
  '8', '10', '12', '14', '16', '18', '20', '24', '30', '36', '48', '60', '72'
]

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)
    if (url === null) {
      return
    }
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-col gap-1.5 p-2 border rounded-xl bg-white shadow-sm">
      {/* Top Row - Text Styles */}
      <div className="flex flex-wrap gap-1">
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-2 rounded-md hover:bg-white transition-colors ${
              editor.isActive('paragraph') ? 'bg-white shadow-sm' : ''
            }`}
            title="Paragraph"
          >
            <Pilcrow size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded-md hover:bg-white transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-white shadow-sm' : ''
            }`}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-md hover:bg-white transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-white shadow-sm' : ''
            }`}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded-md hover:bg-white transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-white shadow-sm' : ''
            }`}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <select
            onChange={(e) => editor.chain().focus().setFontSize(e.target.value + 'px').run()}
            className="px-2 py-1 rounded-lg border bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={editor.getAttributes('textStyle').fontSize?.replace('px', '') || '16'}
          >
            {FONT_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>

          <select
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="px-2 py-1 rounded-lg border bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="#000000">Black</option>
            <option value="#EF4444">Red</option>
            <option value="#10B981">Green</option>
            <option value="#3B82F6">Blue</option>
            <option value="#8B5CF6">Purple</option>
            <option value="#F59E0B">Orange</option>
          </select>
        </div>

        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-md hover:bg-white transition-colors disabled:opacity-50"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-md hover:bg-white transition-colors disabled:opacity-50"
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Row - Formatting Options */}
      <div className="flex flex-wrap gap-1">
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('bold') ? 'bg-white shadow-sm' : ''
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('italic') ? 'bg-white shadow-sm' : ''
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('underline') ? 'bg-white shadow-sm' : ''
            }`}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('code') ? 'bg-white shadow-sm' : ''
            }`}
            title="Code"
          >
            <Code size={16} />
          </button>
        </div>

        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-white shadow-sm' : ''
            }`}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-white shadow-sm' : ''
            }`}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-white shadow-sm' : ''
            }`}
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>

        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('bulletList') ? 'bg-white shadow-sm' : ''
            }`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('orderedList') ? 'bg-white shadow-sm' : ''
            }`}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('blockquote') ? 'bg-white shadow-sm' : ''
            }`}
            title="Quote"
          >
            <Quote size={16} />
          </button>
        </div>

        <div className="flex items-center bg-gray-50 rounded-lg p-1">
          <button
            onClick={setLink}
            className={`p-1.5 rounded-md hover:bg-white transition-colors ${
              editor.isActive('link') ? 'bg-white shadow-sm' : ''
            }`}
            title="Add Link"
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={addImage}
            className="p-1.5 rounded-md hover:bg-white transition-colors"
            title="Add Image"
          >
            <ImageIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuBar