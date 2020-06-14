'use strict';
const faker = require('faker');
const events = require('./event');
let storeName = 'Ammar Shop';

events.on('delivered', delivered);
setInterval(()=>{
  let order = {
    storeName: storeName,
    orderId: faker.random.number(),
    customerName: faker.name.firstName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup',order);
},5000);

function delivered(order){
  console.log(`Thank you for delivering ${order.orderId}`);
}
