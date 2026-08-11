import styles from './SearchBox.module.css'

interface SearchBoxProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder?: string
}

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  return (
    <span className={styles.wrapper}>
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.25" />
        <path d="M11 11l3.5 3.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        role="searchbox"
        aria-label="Search characters"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </span>
  )
}
