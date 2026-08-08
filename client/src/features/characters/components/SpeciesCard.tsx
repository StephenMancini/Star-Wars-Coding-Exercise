import { EmptyState } from '../../../components/EmptyState'
import type { Species } from '../../../api/types'

interface SpeciesCardProps {
  species: Species | null
}

export function SpeciesCard({ species }: SpeciesCardProps) {
  if (!species) {
    return <EmptyState message="Species unknown" />
  }

  return (
    <section aria-label="Species">
      <h2>{species.name}</h2>
      <dl>
        <dt>Classification</dt>
        <dd>{species.classification}</dd>
        <dt>Designation</dt>
        <dd>{species.designation}</dd>
        <dt>Average Height</dt>
        <dd>{species.averageHeight}</dd>
        <dt>Average Lifespan</dt>
        <dd>{species.averageLifespan}</dd>
        <dt>Language</dt>
        <dd>{species.language}</dd>
      </dl>
    </section>
  )
}
