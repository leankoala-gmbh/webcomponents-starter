import { createApp } from 'vue'
import App from './App.vue'
import './assets/colors.css'
import './assets/index.css'

import { defineCustomElement } from 'vue'
import ExampleWrapper from './components/feature/ExampleWrapper/ExampleWrapper.ce.vue'
import ExampleTrigger from './components/feature/ExampleTrigger/ExampleTrigger.ce.vue'

const ExampleWrapperComponent = defineCustomElement(ExampleWrapper)
const ExampleTriggerComponent = defineCustomElement(ExampleTrigger)
customElements.define('example-wrapper', ExampleWrapperComponent)
customElements.define('example-trigger', ExampleTriggerComponent)

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { worker } = (await import(/* @vite-ignore */ './mocks/browser.js'))
    worker?.start()
  }
  const app = createApp(App)
  app.mount('#app')