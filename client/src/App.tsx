import { useState } from 'react'
import { CharacterDetailPanel } from './features/characters/components/CharacterDetailPanel'
import { CharacterListPanel } from './features/characters/components/CharacterListPanel'

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <main>
      <h1>Star Wars Character Datapad</h1>
      <CharacterListPanel selectedId={selectedId} onSelectCharacter={setSelectedId} />
      <CharacterDetailPanel selectedId={selectedId} />
    </main>
  )
}

export default App
