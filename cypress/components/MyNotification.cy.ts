import MyNotification from '../../src/components/MyNotification.vue'

describe('<MyNotification />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MyNotification)
  })
})
