import type { CharacterSummary } from '../../../api/types'
import { CharacterListItem } from './CharacterListItem'

interface CharacterListProps {
  characters: CharacterSummary[]
  selectedId: number | null
  onSelectCharacter: (id: number) => void
}

export function CharacterList({ characters, selectedId, onSelectCharacter }: CharacterListProps) {
  return (
    <ul>
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
