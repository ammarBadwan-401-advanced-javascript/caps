'use strict';

const events = require('./event');
require('./vendor');
require('./driver');

events.on('pickup', payload => logger('pickup',payload));
events.on('delivered', payload => logger('delivered',payload));
events.on('in-transit', payload => logger('in-transit',payload));


function logger(event,payload){
  let time = new Date();
  console.log('EVENT',{event,time,payload});
}