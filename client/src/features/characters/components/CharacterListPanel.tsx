import { AsyncStateView } from '../../../components/AsyncStateView'
import { EmptyState } from '../../../components/EmptyState'
import type { CharacterSummary } from '../../../api/types'
import { useCharacterList } from '../hooks/useCharacterList'
import { CharacterList } from './CharacterList'
import styles from './CharacterListPanel.module.css'

interface CharacterListPanelProps {
  query: string
  selectedId: number | null
  onSelectCharacter: (id: number) => void
}

export function CharacterListPanel({ query, selectedId, onSelectCharacter }: CharacterListPanelProps) {
  const state = useCharacterList()

  const renderCharacters = (characters: CharacterSummary[]) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase()),
    )

    if (filtered.length === 0) {
      return <EmptyState message="No characters match your search." />
    }

    return (
      <CharacterList characters={filtered} selectedId={selectedId} onSelectCharacter={onSelectCharacter} />
    )
  }

  return (
    <section className={styles.panel}>
      <h2 className={styles.label}>Characters</h2>
      <div className={styles.listBox}>
        <AsyncStateView state={state} onSuccess={renderCharacters} />
      </div>
    </section>
  )
}
