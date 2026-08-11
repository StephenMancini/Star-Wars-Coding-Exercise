import type { CharacterAttributes } from '../../../api/types'
import styles from './InfoCard.module.css'

interface AttributesCardProps {
  readonly attributes: CharacterAttributes
}

export function AttributesCard({ attributes }: AttributesCardProps) {
  return (
    <section>
      <h2 className={styles.sectionLabel}>Attributes</h2>
      <dl className={`${styles.card} ${styles.rows}`}>
        <div className={styles.row}>
          <dt>Height</dt>
          <dd>{attributes.height}</dd>
        </div>
        <div className={styles.row}>
          <dt>Mass</dt>
          <dd>{attributes.mass}</dd>
        </div>
        <div className={styles.row}>
          <dt>Hair Color</dt>
          <dd>{attributes.hairColor}</dd>
        </div>
        <div className={styles.row}>
          <dt>Skin Color</dt>
          <dd>{attributes.skinColor}</dd>
        </div>
        <div className={styles.row}>
          <dt>Eye Color</dt>
          <dd>{attributes.eyeColor}</dd>
        </div>
        <div className={styles.row}>
          <dt>Birth Year</dt>
          <dd>{attributes.birthYear}</dd>
        </div>
        <div className={styles.row}>
          <dt>Gender</dt>
          <dd>{attributes.gender}</dd>
        </div>
      </dl>
    </section>
  )
}
