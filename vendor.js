'use strict';
const faker = require('faker');
const events = require('./event');
require('dotenv').config();
let storeName = process.env.STORE_NAME || 'Ammar Shop';

events.on('delivered', delivered);
setInterval(()=>{
  let order = {
    storeName: storeName,
    orderId: faker.random.uuid(),
    customerName: faker.name.firstName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup',order);
},5000);

function delivered(order){
  console.log(`VENDOR: Thank you for delivering ${order.orderId}`);
}
