import { EmptyState } from '../../../components/EmptyState'
import type { Film } from '../../../api/types'
import { toRomanNumeral } from '../../../utils/toRomanNumeral'

interface FilmsStripProps {
  films: Film[]
}

export function FilmsStrip({ films }: FilmsStripProps) {
  if (films.length === 0) {
    return <EmptyState message="No films" />
  }

  return (
    <ul aria-label="Films">
      {films.map((film) => (
        <li key={film.title}>
          {film.title} — Episode {toRomanNumeral(film.episodeId)}
        </li>
      ))}
    </ul>
  )
}
