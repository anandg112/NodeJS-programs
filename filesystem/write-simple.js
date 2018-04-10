'use strict'

const fs = require('fs');
fs.writeFile('target.txt', 'hello world 2', (err) => {

  if(err) {
    throw err;
  }
  console.log('File saved');
});

