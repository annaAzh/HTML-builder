const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const stylesPath = path.join(__dirname, 'styles');
const fileWritePath = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(fileWritePath, { flag: 'a' }, 'utf-8');

readdir(stylesPath, (err) => {
  if (err) {
    console.log(err.message);
  }
}).then((data) => {
  for (let file in data) {
    const extName = path.extname(data[file]);
    const fileReadPath = path.join(__dirname, 'styles', `${data[file]}`);
    const readStream = fs.createReadStream(fileReadPath, 'utf-8');
    if (extName == '.css') {
      readStream.on('data', (chunk) => {
        writeStream.write(chunk);
      });
    }
  }
});
