import { AsyncStateView } from '../../../components/AsyncStateView'
import { EmptyState } from '../../../components/EmptyState'
import { PersonIcon } from '../../../components/icons/PersonIcon'
import type { CharacterDetail } from '../../../api/types'
import { useCharacterDetail } from '../hooks/useCharacterDetail'
import { AttributesCard } from './AttributesCard'
import styles from './CharacterDetailPanel.module.css'
import { FilmsStrip } from './FilmsStrip'
import { HomeworldCard } from './HomeworldCard'
import { SpeciesCard } from './SpeciesCard'
import { StarshipsList } from './StarshipsList'
import { VehiclesList } from './VehiclesList'

interface CharacterDetailPanelProps {
  readonly selectedId: number | null
}

function renderDetail(detail: CharacterDetail) {
  return (
    <article>
      <div className={styles.profile}>
        <header className={styles.profileHeader}>
          <PersonIcon />
          <h1 className={styles.name}>{detail.name}</h1>
        </header>
        <div className={styles.attributesGrid}>
          <AttributesCard attributes={detail.attributes} />
          <SpeciesCard species={detail.species} />
          <HomeworldCard homeworld={detail.homeworld} />
        </div>
      </div>
      <div className={styles.section}>
        <FilmsStrip films={detail.films} />
      </div>
      <div className={styles.twoColumn}>
        <StarshipsList starships={detail.starships} />
        <VehiclesList vehicles={detail.vehicles} />
      </div>
    </article>
  )
}

export function CharacterDetailPanel({ selectedId }: CharacterDetailPanelProps) {
  const state = useCharacterDetail(selectedId)

  return (
    <AsyncStateView
      state={state}
      onSuccess={renderDetail}
      emptyFallback={
        <div className={styles.placeholder}>
          <EmptyState message="Select a character to see their details" />
        </div>
      }
      loadingFallback={
        <div className={styles.placeholder}>
          <output>Loading…</output>
        </div>
      }
      errorFallback={
        <div className={styles.placeholder}>
          <p role="alert">Something went wrong.</p>
        </div>
      }
    />
  )
}
