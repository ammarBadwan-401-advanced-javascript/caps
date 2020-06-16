'use strict';
const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT);



const caps = io.of('/caps');
caps.on('connection',socket=>{
  console.log('Welcome to CAPS, user-'+socket.id);
  let currentRoom = '';

  socket.on('join', room=>{
    socket.leave(currentRoom);
    socket.join(room);
    currentRoom = room;
    console.log('someonne joined the room' + room);
    caps.to(currentRoom).emit('message');


    socket.on('pickup', order=>{
      io.emit(order);
      let time = new Date();
      console.log('EVENT',{event:order.event,time,payload: order.payload});
    });
  
    socket.on('in-transit', payload=>{
      caps.to('vendor').emit('in-transit',payload);
      console.log('someone is here');

    });
  
    socket.on('delivered',payload=>{
      caps.to('vendor').emit('delivered',payload);
    });


  });


});





/*
const net = require('net');




const server = net.createServer(); 
server.listen(PORT, ()=> console.log(`Server is up on ${PORT}`));

let socketPool = {};
let iterator = 0;

server.on('connection',(socket)=>{
  const id =`Socket-${iterator++}`;

  console.log(`Client with ID ${id} got connected!`);
  socketPool[id] = socket;

  socket.on('end', (end)=>{
    console.log('connection ended', end);
    delete socketPool[id];
  });

  socket.on('data',(data)=>dataParser(data));
});

server.on('error', (e)=> {
  console.log('SERVER ERROR', e);
});


function dataParser(data){
  let order = JSON.parse(data.toString());
  if(order.event && order.payload){
    let time = new Date();
    console.log('EVENT',{event:order.event,time,payload: order.payload});
    broadcast(order);
  } else {
    console.log('Non-legitimate object recieved');
  }
}

function broadcast(data){
  let payload = JSON.stringify(data);
  for (let socket in socketPool){
    socketPool[socket].write(payload);
  }
}
*/