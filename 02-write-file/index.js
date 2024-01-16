const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.resolve(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
readLine.question('Hello! Type something here... \n', (answer) => {
  writeStream.write(answer);
});

readLine.on('line', (input) => {
  if (input === 'exit') {
    process.exit();
  } else {
    writeStream.write(`\n${input}`);
  }
});

process.on('exit', () => {
  console.log('Thank you for your attention');
});

readLine.on('SIGINT', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
