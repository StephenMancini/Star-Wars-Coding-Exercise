import { EmptyState } from '../../../components/EmptyState'
import { ImagePlaceholderIcon } from '../../../components/icons/ImagePlaceholderIcon'
import type { Film } from '../../../api/types'
import { toRomanNumeral } from '../../../utils/toRomanNumeral'
import styles from './FilmsStrip.module.css'

interface FilmsStripProps {
  films: Film[]
}

export function FilmsStrip({ films }: FilmsStripProps) {
  return (
    <section>
      <h2 className={styles.sectionLabel}>Films</h2>
      {films.length === 0 ? (
        <EmptyState message="No films" />
      ) : (
        <ul className={styles.list}>
          {[...films]
            .sort((a, b) => a.episodeId - b.episodeId)
            .map((film) => (
              <li key={film.title} className={styles.item}>
                <span className={styles.icon}>
                  <ImagePlaceholderIcon />
                </span>
                <p className={styles.title}>{film.title}</p>
                <p className={styles.episode}>Episode {toRomanNumeral(film.episodeId)}</p>
              </li>
            ))}
        </ul>
      )}
    </section>
  )
}
