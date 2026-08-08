import { charactersApi } from '../../../api/charactersApi'
import { useAsyncData } from '../../../hooks/useAsyncData'

export function useCharacterList() {
  return useAsyncData(() => charactersApi.getCharacters(), [])
}
