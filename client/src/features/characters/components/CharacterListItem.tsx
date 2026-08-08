interface CharacterListItemProps {
  id: number
  name: string
  isSelected: boolean
  onSelect: (id: number) => void
}

export function CharacterListItem({ id, name, isSelected, onSelect }: CharacterListItemProps) {
  return (
    <li>
      <button type="button" aria-pressed={isSelected} onClick={() => onSelect(id)}>
        {name}
      </button>
    </li>
  )
}
