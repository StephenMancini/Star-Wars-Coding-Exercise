import type { CharacterSummary } from '../../../api/types'
import { CharacterListItem } from './CharacterListItem'
import styles from './CharacterList.module.css'

interface CharacterListProps {
  readonly characters: CharacterSummary[]
  readonly selectedId: number | null
  readonly onSelectCharacter: (id: number) => void
}

export function CharacterList({ characters, selectedId, onSelectCharacter }: CharacterListProps) {
  return (
    <ul className={styles.list}>
      {characters.map((character) => (
        <CharacterListItem
          key={character.id}
          id={character.id}
          name={character.name}
          isSelected={character.id === selectedId}
          onSelect={onSelectCharacter}
        />
      ))}
    </ul>
  )
}
