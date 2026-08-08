import { EmptyState } from '../../../components/EmptyState'
import type { Vehicle } from '../../../api/types'

interface VehiclesListProps {
  vehicles: Vehicle[]
}

export function VehiclesList({ vehicles }: VehiclesListProps) {
  if (vehicles.length === 0) {
    return <EmptyState message="No vehicles" />
  }

  return (
    <ul aria-label="Vehicles">
      {vehicles.map((vehicle) => (
        <li key={vehicle.name}>
          <strong>{vehicle.name}</strong> — {vehicle.vehicleClass}, {vehicle.model} (
          {vehicle.manufacturer}), crew {vehicle.crew}, passengers {vehicle.passengers}
        </li>
      ))}
    </ul>
  )
}
