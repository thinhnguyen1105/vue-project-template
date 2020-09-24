/*eslint-disable */
function _getProp(obj, destination) {
  if (obj && `${typeof destination}` === 'string') {
    if (destination === 'this') return obj
    let arr = destination.split('.')
    while (arr.length && (obj = obj[arr.shift()])) { }
    return obj
  }
  return null
}
function getProp(obj, ...destinations) {
  if (obj) {
    while (destinations.length) {
      let value = _getProp(obj, destinations[0])
      if (value) {
        return value
      } else {
        destinations.shift()
      }
    }
  }
  return null
}
const module = {
  collaborationModule: {
    router: null,
    store: null
  },
  handleOption(createElement, item) {
    let options = {}
    if (item.props) options.props = item.props
    if (item.attrs) options.attrs = item.attrs
    if (item.slot) options.slot = item.slot
    if (item.style) options.style = item.style
    if (item.class) options.class = item.class
    if (item.staticClass) options.staticClass = item.staticClass
    if (item.scopedSlots) {
      options.scopedSlots = {}
      Object.keys(item.scopedSlots).forEach(name => {
        options.scopedSlots[name] = props => {
          let attrs = {}
          item.scopedSlots[name].mapProps.forEach(coupleKeyVal => {
            attrs[coupleKeyVal[0]] = getProp(props, coupleKeyVal[1])
          })
          if (item.scopedSlots[name].props) attrs = Object.assign({}, attrs, item.scopedSlots[name].props)
          item.scopedSlots[name].attrs = attrs
          return this.renderElement(createElement, item.scopedSlots[name])
        }
      })
    }
    if (item.nativeOn) {
      options.nativeOn = {}
      Object.keys(item.nativeOn).forEach(event => {
        let { module, command, params } = item.nativeOn[event]
        options.nativeOn[event] = () => {
          this.collaborationModule[module][command].apply(this.collaborationModule[module], params)
        }
      })
    }
    return options
  },
  renderElement(createElement, data) {
    if (!data) return '<!-- -->'
    if (typeof data === 'string') {
      return data
    }

    if (data instanceof Object && data.element) {
      if (data.children) {
        return createElement(
          data.element,
          {
            ...this.handleOption(createElement, data)
          },
          this.renderElement(createElement, data.children)
        )
      } else {
        return createElement(data.element, {
          ...this.handleOption(createElement, data)
        })
      }
    }
    if (data instanceof Array) {
      return data.map(item => {
        return this.renderElement(createElement, item)
      })
    }
  }
}

export default {
  install(Vue, options) {
    module.collaborationModule = Object.assign(module.collaborationModule, options)
    Vue.prototype.$renderUIFromJSON = module
  }
}
