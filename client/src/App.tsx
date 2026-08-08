import { useState } from 'react'
import { Header } from './components/Header'
import { CharacterDetailPanel } from './features/characters/components/CharacterDetailPanel'
import { CharacterListPanel } from './features/characters/components/CharacterListPanel'
import styles from './App.module.css'

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [query, setQuery] = useState('')

  return (
    <div className={styles.page}>
      <Header query={query} onQueryChange={setQuery} />
      <div className={styles.layout}>
        <CharacterListPanel query={query} selectedId={selectedId} onSelectCharacter={setSelectedId} />
        <CharacterDetailPanel selectedId={selectedId} />
      </div>
    </div>
  )
}

export default App
