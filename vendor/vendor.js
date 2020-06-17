'use strict';
require('dotenv').config();
const faker = require('faker');
const STORE_NAME = process.env.STORE_NAME || 'Ammar Store';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

socket.emit('join',STORE_NAME);

socket.on('delivered', payload=>{
  console.log(`Thank you for delivering ${payload.orderId}`)
})


setInterval(()=>{
  let order = {
    storeName: STORE_NAME,
    orderId: faker.random.uuid(),
    customerName: faker.name.firstName(),
    address: faker.address.streetAddress(),
  };
  socket.emit('pickup', order)
},5000);
