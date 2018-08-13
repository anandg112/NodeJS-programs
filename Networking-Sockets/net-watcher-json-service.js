'use strict';

const fs = require('fs');
const net = require('net');

const filename = process.argv[2];

if(!filename) {
    throw Error('Error: filename specified.');
}

net.createServer(connection => {
    //Reporting
    console.log('Subscriber connected');
    connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n');

    //watcher setup
    const watcher = fs.watch(filename, () => connection.write(JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n'));

    //cleanup
    connection.on('close', () => {
        console.log('Subscriber discconnected');
        watcher.close();
    });
}).listen(60300, () => console.log('Listening for subscribers...'));