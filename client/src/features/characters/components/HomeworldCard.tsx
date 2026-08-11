import { EmptyState } from '../../../components/EmptyState'
import type { Homeworld } from '../../../api/types'
import styles from './InfoCard.module.css'

interface HomeworldCardProps {
  readonly homeworld: Homeworld | null
}

export function HomeworldCard({ homeworld }: HomeworldCardProps) {
  return (
    <section>
      <h2 className={styles.sectionLabel}>Homeworld</h2>
      {homeworld ? (
        <div className={styles.card}>
          <h3 className={styles.title}>{homeworld.name}</h3>
          <dl className={styles.rows}>
            <div className={styles.inlineRow}>
              <dt>Population</dt>
              <dd>{homeworld.population}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Terrain</dt>
              <dd>{homeworld.terrain}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Climate</dt>
              <dd>{homeworld.climate}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Surface Water</dt>
              <dd>{homeworld.surfaceWater}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Diameter</dt>
              <dd>{homeworld.diameter}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Rotation Period</dt>
              <dd>{homeworld.rotationPeriod}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Orbital Period</dt>
              <dd>{homeworld.orbitalPeriod}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Gravity</dt>
              <dd>{homeworld.gravity}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className={styles.card}>
          <EmptyState message="Homeworld unknown" />
        </div>
      )}
    </section>
  )
}
