const fs = require('fs');
const path = require('path');

const folderName = 'files-copy';
const folderPath = path.resolve(__dirname, `${folderName}`);

fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.log(err.message);
  }
});

fs.promises
  .readdir(path.resolve(__dirname, 'files'), (err, data) => {
    if (err) {
      console.log(err.message);
    }
    return data;
  })
  .then((data) => {
    for (let file in data) {
      const fileReadPath = path.join(__dirname, 'files', `${data[file]}`);
      const fileWritePath = path.join(__dirname, 'files-copy', `${data[file]}`);
      fs.readFile(fileReadPath, 'utf-8', (err, data) => {
        if (err) {
          console.log(err.message);
        }
        fs.writeFile(fileWritePath, `${data}`, (err) => {
          if (err) {
            console.log(err.message);
          }
        });
      });
    }
  });
