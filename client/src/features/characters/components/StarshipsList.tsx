import { EmptyState } from '../../../components/EmptyState'
import type { Starship } from '../../../api/types'

interface StarshipsListProps {
  starships: Starship[]
}

export function StarshipsList({ starships }: StarshipsListProps) {
  if (starships.length === 0) {
    return <EmptyState message="No starships" />
  }

  return (
    <ul aria-label="Starships">
      {starships.map((starship) => (
        <li key={starship.name}>
          <strong>{starship.name}</strong> — {starship.starshipClass}, {starship.model} (
          {starship.manufacturer}), crew {starship.crew}, passengers {starship.passengers}
        </li>
      ))}
    </ul>
  )
}
