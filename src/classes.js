class Color {
  constructor(name) {
    if (new.target === Color) {
      throw new Error('Color cannot be instantiated directly.')
    }

    this.name = name

    Color.supportedColors.add(this.name)
  }

  static supportedColors = new Set()

  static getSupportedColors() {
    return Array.from(this.supportedColors)
  }

  // Add a getter for the name
  getName() {
    return this.name
  }
}

class Green extends Color {
  constructor() {
    if (Green.instance) {
      return Green.instance
    }
    super('green')
    Green.instance = this
  }
}

class Blue extends Color {
  constructor() {
    if (Blue.instance) {
      return Blue.instance
    }
    super('blue')
    Blue.instance = this
  }
}

class Red extends Color {
  constructor() {
    if (Red.instance) {
      return Red.instance
    }
    super('red')
    Red.instance = this
  }
}

class White extends Color {
  constructor() {
    if (White.instance) {
      return White.instance
    }
    super('white')
    White.instance = this
  }
}

class Black extends Color {
  constructor() {
    if (Black.instance) {
      return Black.instance
    }
    super('black')
    Black.instance = this
  }
}

const instantiatedColors = {}

// Initialize all color subclasses to populate the supported colors set
;[Green, Blue, Red, White, Black].forEach((ColorClass) => {
  const color = new ColorClass()
  const { name } = color.constructor
  Object.defineProperty(instantiatedColors, name, {
    get() {
      return color
    },
  })
})

module.exports = Object.assign(instantiatedColors, {
  supportedColors: Color.getSupportedColors(),
})
