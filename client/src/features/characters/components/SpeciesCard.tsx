import { EmptyState } from '../../../components/EmptyState'
import type { Species } from '../../../api/types'
import styles from './InfoCard.module.css'

interface SpeciesCardProps {
  species: Species | null
}

export function SpeciesCard({ species }: SpeciesCardProps) {
  return (
    <section>
      <h2 className={styles.sectionLabel}>Species</h2>
      {species ? (
        <div className={styles.card}>
          <h3 className={styles.title}>{species.name}</h3>
          <dl className={styles.rows}>
            <div className={styles.inlineRow}>
              <dt>Classification</dt>
              <dd>{species.classification}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Designation</dt>
              <dd>{species.designation}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Average Height</dt>
              <dd>{species.averageHeight}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Average Lifespan</dt>
              <dd>{species.averageLifespan}</dd>
            </div>
            <div className={styles.inlineRow}>
              <dt>Language</dt>
              <dd>{species.language}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className={styles.card}>
          <EmptyState message="Species unknown" />
        </div>
      )}
    </section>
  )
}
