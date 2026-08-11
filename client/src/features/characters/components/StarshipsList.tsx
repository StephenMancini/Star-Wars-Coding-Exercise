import { EmptyState } from '../../../components/EmptyState'
import { NoImageIcon } from '../../../components/icons/NoImageIcon'
import type { Starship } from '../../../api/types'
import styles from './VehicleRow.module.css'

interface StarshipsListProps {
  readonly starships: Starship[]
}

export function StarshipsList({ starships }: StarshipsListProps) {
  return (
    <section>
      <h2 className={styles.sectionLabel}>Starships</h2>
      {starships.length === 0 ? (
        <EmptyState message="No starships" />
      ) : (
        <ul className={styles.list}>
          {starships.map((starship) => (
            <li key={starship.name} className={styles.row}>
              <span className={styles.icon}>
                <NoImageIcon />
              </span>
              <div className={styles.info}>
                <p className={styles.nameLine}>
                  <strong>{starship.name}</strong>
                  <span>{starship.starshipClass}</span>
                </p>
                <p className={styles.metaLine}>
                  Crew / Passengers: {starship.crew} / {starship.passengers}
                </p>
                <p className={styles.metaLine}>
                  Model / Manufacturer: {starship.model} / {starship.manufacturer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
