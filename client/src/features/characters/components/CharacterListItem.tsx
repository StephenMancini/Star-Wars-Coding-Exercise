import styles from './CharacterListItem.module.css'

interface CharacterListItemProps {
  id: number
  name: string
  isSelected: boolean
  onSelect: (id: number) => void
}

export function CharacterListItem({ id, name, isSelected, onSelect }: CharacterListItemProps) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={isSelected}
        className={isSelected ? `${styles.button} ${styles.selected}` : styles.button}
        onClick={() => onSelect(id)}
      >
        {name}
      </button>
    </li>
  )
}
