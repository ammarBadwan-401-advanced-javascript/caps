'use strict';

const events = require('../event');

jest.spyOn(global.console,'log');
// To test with timeout
jest.useFakeTimers();

describe('Caps testing',()=>{
  it('No output if the test does not wait for 5 seconds',()=>{
    require('../caps');
    expect(console.log).not.toHaveBeenCalled();
  });



  it('Testing output after some time value',()=>{
    require('../caps');
    events.emit('pickup',{orderId:'test'});
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
  

  it('Testing output from vendor.js',()=>{
    require('../vendor');
    events.emit('delivered',{orderId:'testing'});
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });

  it('Testing if there is an output if we pass an order id into driver',()=>{
    require('../driver');
    events.emit('pickup',{orderId: 'hahah'});
    setTimeout(()=>{
      console.log('hello');
      expect(console.log).not.toHaveBeenCalled();
    },6000);
  });
});