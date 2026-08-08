import { SearchBox } from '../features/characters/components/SearchBox'
import styles from './Header.module.css'

interface HeaderProps {
  query: string
  onQueryChange: (query: string) => void
}

export function Header({ query, onQueryChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Star Wars Character Datapad</h1>
      <SearchBox value={query} onChange={onQueryChange} placeholder="Search characters" />
    </header>
  )
}
