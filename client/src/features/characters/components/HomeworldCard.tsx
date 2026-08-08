import { EmptyState } from '../../../components/EmptyState'
import type { Homeworld } from '../../../api/types'

interface HomeworldCardProps {
  homeworld: Homeworld | null
}

export function HomeworldCard({ homeworld }: HomeworldCardProps) {
  if (!homeworld) {
    return <EmptyState message="Homeworld unknown" />
  }

  return (
    <section aria-label="Homeworld">
      <h2>{homeworld.name}</h2>
      <dl>
        <dt>Population</dt>
        <dd>{homeworld.population}</dd>
        <dt>Terrain</dt>
        <dd>{homeworld.terrain}</dd>
        <dt>Climate</dt>
        <dd>{homeworld.climate}</dd>
        <dt>Surface Water</dt>
        <dd>{homeworld.surfaceWater}</dd>
        <dt>Diameter</dt>
        <dd>{homeworld.diameter}</dd>
        <dt>Rotation Period</dt>
        <dd>{homeworld.rotationPeriod}</dd>
        <dt>Orbital Period</dt>
        <dd>{homeworld.orbitalPeriod}</dd>
        <dt>Gravity</dt>
        <dd>{homeworld.gravity}</dd>
      </dl>
    </section>
  )
}
