const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);


const dgram = require('dgram');
const { log } = require('console');
const serverUDP = dgram.createSocket('udp4');
const PORTUDP = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
  });

  const PORT = 2121;

/* 
setInterval(() => {
    serverUDP.send("chcem data", "8888", "192.168.4.1", (err) => {
      if (err) {
        console.error(`Error sending message: ${err}`);
      } else {
        console.log(`Send UDP, no error ...`);
      }
  
    });
}, 150);
*/

app.get('/', (req, res) => {
  res.send('Server is running.');
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A client has connected. (socket.io)');

    socket.on('message', (data) =>{
        console.log(data);
    });

    socket.on('pohyb', (data) => {
      nastavenie = data;
      

        serverUDP.send(data, "8888", "192.168.4.1", (err) => {
          if (err) {
            console.error(`Error sending message: ${err}`);
          } else {
            console.log(`Send UDP, no error ...`);
          }
      
        });
    
    });

    socket.on('rychlost', (data) =>{
      
      serverUDP.send(data, "8888", "192.168.4.1", (err) => {
        if (err) {
          console.error(`Error sending message: ${err}`);
        } else {
          console.log(`Send UDP, no error ...`);
        }
    
      });
    });

  
    socket.on('disconnect', () => {
        console.log('A client has disconnected.');
    });

    serverUDP.on('message', (message, rinfo) => {
      jsonData = JSON.parse(message.toString('utf-8'));
      //console.log("Teplota je: " + jsonData.temperature.toFixed(2));
      io.emit('dataSenzor', jsonData);
    });
});




serverUDP.on('listening', () => {
  const address = serverUDP.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

serverUDP.bind(PORTUDP);

app.post("/data", (req, res) => {
    console.log(req.body);
    res.send('dostal som diki ...');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});