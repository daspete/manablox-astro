import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import manabloxUi from '@assets/ui/manablox-ui'

export default (app: App) => {
  app.use(PrimeVue, {
    unstyled: true,
    pt: manabloxUi
  })
}
