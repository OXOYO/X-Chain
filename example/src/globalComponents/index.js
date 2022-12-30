import pageContainer from './page-container.vue'

const components = {
  pageContainer
}

const globalComponents = {
  installed: false
}

globalComponents.install = function (app, options) {
  if (globalComponents.installed) {
    return
  }
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default globalComponents
