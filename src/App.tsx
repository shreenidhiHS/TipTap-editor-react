import TipTapEditor from './components/TipTapEditor/TipTapEditor'

function App() {

  const defaultContent = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Hello, world!' }],
      },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TipTap Rich Text Editor</h1>
      <TipTapEditor defaultContent={defaultContent} />
    </div>
  )
}

export default App
