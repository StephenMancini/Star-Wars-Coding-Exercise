import type { CharacterAttributes } from '../../../api/types'

interface AttributesCardProps {
  attributes: CharacterAttributes
}

export function AttributesCard({ attributes }: AttributesCardProps) {
  return (
    <section aria-label="Attributes">
      <h2>Attributes</h2>
      <dl>
        <dt>Height</dt>
        <dd>{attributes.height}</dd>
        <dt>Mass</dt>
        <dd>{attributes.mass}</dd>
        <dt>Hair Color</dt>
        <dd>{attributes.hairColor}</dd>
        <dt>Skin Color</dt>
        <dd>{attributes.skinColor}</dd>
        <dt>Eye Color</dt>
        <dd>{attributes.eyeColor}</dd>
        <dt>Birth Year</dt>
        <dd>{attributes.birthYear}</dd>
        <dt>Gender</dt>
        <dd>{attributes.gender}</dd>
      </dl>
    </section>
  )
}
