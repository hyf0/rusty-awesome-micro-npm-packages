var isEven = require('../index').default;
var isEvenNative = require('./index');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('rust', function() {
  isEven(0)
  !isEven(1)
  isEven(2)
  !isEven(3)
})
.add('native', function() {
  isEvenNative(0)
  !isEvenNative(1)
  isEvenNative(2)
  !isEvenNative(3)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });