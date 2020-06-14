'use strict';
const faker = require('faker');
const events = require('./event');

events.on('pickup',pickup);




function pickup(order){
  setTimeout(()=>{
    console.log(`DRIVER: picked up ${order.orderId}`);
    events.emit('in-transit',order);
  },1000);
  setTimeout(()=>{
    console.log(`DRIVER: Delivered up ${order.orderId}`);
    events.emit('delivered',order);
  },3000);
}