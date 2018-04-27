import * as i18next from 'i18next'

i18next.init({
  debug: true,
  lng: navigator.language,
  resources: {
    en: {
      translation: {
        home: {
          title: 'Points Breakdown'
        },
        navigation: {
          home: 'Ponits Breakdown'
        }
      }
    }
  }
})
