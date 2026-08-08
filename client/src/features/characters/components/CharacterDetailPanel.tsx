import { AsyncStateView } from '../../../components/AsyncStateView'
import { EmptyState } from '../../../components/EmptyState'
import type { CharacterDetail } from '../../../api/types'
import { useCharacterDetail } from '../hooks/useCharacterDetail'
import { AttributesCard } from './AttributesCard'
import { FilmsStrip } from './FilmsStrip'
import { HomeworldCard } from './HomeworldCard'
import { SpeciesCard } from './SpeciesCard'
import { StarshipsList } from './StarshipsList'
import { VehiclesList } from './VehiclesList'

interface CharacterDetailPanelProps {
  selectedId: number | null
}

function renderDetail(detail: CharacterDetail) {
  return (
    <article>
      <h1>{detail.name}</h1>
      <AttributesCard attributes={detail.attributes} />
      <SpeciesCard species={detail.species} />
      <HomeworldCard homeworld={detail.homeworld} />
      <FilmsStrip films={detail.films} />
      <StarshipsList starships={detail.starships} />
      <VehiclesList vehicles={detail.vehicles} />
    </article>
  )
}

export function CharacterDetailPanel({ selectedId }: CharacterDetailPanelProps) {
  const state = useCharacterDetail(selectedId)

  return (
    <AsyncStateView
      state={state}
      onSuccess={renderDetail}
      emptyFallback={<EmptyState message="Select a character to see their details" />}
    />
  )
}
