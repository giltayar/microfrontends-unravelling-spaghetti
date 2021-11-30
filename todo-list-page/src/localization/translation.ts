import {useLocalization} from '@roundforest/react-localization-commons'
import english from './english.js'

export function useTranslation() {
  const context = useLocalization()

  switch (context.locale) {
    default:
      return english
  }
}
