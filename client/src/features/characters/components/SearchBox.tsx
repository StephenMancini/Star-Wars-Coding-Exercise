interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  return (
    <input
      type="search"
      role="searchbox"
      aria-label="Search characters"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
