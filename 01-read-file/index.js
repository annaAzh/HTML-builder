const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8',
);

let data = '';

stream.on('error', () => {
  console.log('Error');
});

stream.on('data', (chunk) => {
  data += chunk;
});

stream.on('end', () => {
  console.log(data);
});
