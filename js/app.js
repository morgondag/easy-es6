/**
 * Sloopy es6 example with lots of console logs
 */
import utils from './utils.js'

class TestClass {
	constructor(word) {
		this.word = word
		this.somestuff = 'world'
	}
	awesomefunction() {
		console.log('parent function')
	}
}

class SomeOtherClass extends TestClass {
	constructor(word) {
		super(word)
		this.hello = 'hello ' + this.somestuff
	}
}

var stuff = new SomeOtherClass('pewpew')

console.log('hello')
console.log(utils.calculate(1))
console.log(stuff.hello)

setTimeout(() => {
	console.log('arrows! no more bind.this')
	stuff.awesomefunction()
}, 15)

console.log('https://babeljs.io/docs/learn-es6/')