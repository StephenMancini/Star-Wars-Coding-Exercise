import { useState } from 'react'
import { AsyncStateView } from '../../../components/AsyncStateView'
import type { CharacterSummary } from '../../../api/types'
import { useCharacterList } from '../hooks/useCharacterList'
import { CharacterList } from './CharacterList'
import { SearchBox } from './SearchBox'

interface CharacterListPanelProps {
  selectedId: number | null
  onSelectCharacter: (id: number) => void
}

export function CharacterListPanel({ selectedId, onSelectCharacter }: CharacterListPanelProps) {
  const [query, setQuery] = useState('')
  const state = useCharacterList()

  const renderCharacters = (characters: CharacterSummary[]) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()),
    )

    if (filtered.length === 0) {
      return <p>No characters match your search.</p>
    }

    return (
      <CharacterList characters={filtered} selectedId={selectedId} onSelectCharacter={onSelectCharacter} />
    )
  }

  return (
    <div>
      <SearchBox value={query} onChange={setQuery} placeholder="Search characters..." />
      <AsyncStateView state={state} onSuccess={renderCharacters} />
    </div>
  )
}
