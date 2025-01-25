class Color {
	constructor(name) {

		if (new.target === Color) {
		  throw new Error("Color cannot be instantiated directly.");
		}
	
		this.name = name;

		Color.supportedColors.add(this.name);
	  }	

	  static supportedColors = new Set();

	  static getSupportedColors() {
		return Array.from(this.supportedColors);
	}	
}

class Green extends Color {
	constructor() {
		super('green');
	}
}

class Blue extends Color {
	constructor() {
		super('blue');
	}
}

class Red extends Color {
  constructor() {
    super('red');
  }
}

class White extends Color {
	constructor() {
		super('white')
	}
}


class Black extends Color {
	constructor() {
		super('black')
	}
}

[Green, Blue, Red, White, Black].forEach((ColorClass) => new ColorClass());

module.exports = {
	Green,
	Blue,
	Red,
	White,
	Black,
	supportedColors: Color.getSupportedColors(),
  };  