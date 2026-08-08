import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Vehicle } from '../../../api/types'
import { VehiclesList } from './VehiclesList'

describe('VehiclesList', () => {
  it('renders each vehicle', () => {
    const vehicles: Vehicle[] = [
      {
        name: 'Snowspeeder',
        model: 't-47 airspeeder',
        manufacturer: 'Incom corporation',
        crew: '2',
        passengers: '0',
        vehicleClass: 'airspeeder',
      },
    ]

    render(<VehiclesList vehicles={vehicles} />)

    expect(screen.getByText(/Snowspeeder/)).toBeInTheDocument()
    expect(screen.getByText(/t-47 airspeeder/)).toBeInTheDocument()
    expect(screen.getByText(/Incom corporation/)).toBeInTheDocument()
  })

  it('renders an empty state when there are no vehicles', () => {
    render(<VehiclesList vehicles={[]} />)

    expect(screen.getByText(/no vehicles/i)).toBeInTheDocument()
  })
})
