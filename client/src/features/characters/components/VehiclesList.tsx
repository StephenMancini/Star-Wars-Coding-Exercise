import { EmptyState } from '../../../components/EmptyState'
import { NoImageIcon } from '../../../components/icons/NoImageIcon'
import type { Vehicle } from '../../../api/types'
import styles from './VehicleRow.module.css'

interface VehiclesListProps {
  readonly vehicles: Vehicle[]
}

export function VehiclesList({ vehicles }: VehiclesListProps) {
  return (
    <section>
      <h2 className={styles.sectionLabel}>Vehicles</h2>
      {vehicles.length === 0 ? (
        <EmptyState message="No vehicles" />
      ) : (
        <ul className={styles.list}>
          {vehicles.map((vehicle) => (
            <li key={vehicle.name} className={styles.row}>
              <span className={styles.icon}>
                <NoImageIcon />
              </span>
              <div className={styles.info}>
                <p className={styles.nameLine}>
                  <strong>{vehicle.name}</strong>
                  <span>{vehicle.vehicleClass}</span>
                </p>
                <p className={styles.metaLine}>
                  Crew / Passengers: {vehicle.crew} / {vehicle.passengers}
                </p>
                <p className={styles.metaLine}>
                  Model / Manufacturer: {vehicle.model} / {vehicle.manufacturer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
