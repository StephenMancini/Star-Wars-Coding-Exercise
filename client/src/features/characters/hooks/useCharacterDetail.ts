import { charactersApi } from '../../../api/charactersApi'
import { useAsyncData } from '../../../hooks/useAsyncData'

export function useCharacterDetail(selectedId: number | null) {
  return useAsyncData(
    selectedId === null ? null : () => charactersApi.getCharacterById(selectedId),
    [selectedId],
  )
}
