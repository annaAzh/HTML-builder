const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'secret-folder');

fs.promises
  .readdir(filePath, (err) => {
    if (err) {
      console.log(err.message);
    }
  })
  .then((stats) => {
    for (let i = 0; i < stats.length; i++) {
      fs.stat(path.resolve(filePath, `${stats[i]}`), (err, stat) => {
        if (err) {
          console.log(err.message);
        }
        if (!stat.isDirectory()) {
          const notes = path.join(__dirname, 'secret-folder', `${stats[i]}`);
          const index = path.basename(notes).indexOf('.');
          const fileName = path.basename(notes).slice(0, index);
          const fileExtname = path.extname(notes).slice(1);
          const fileSize = `${stat.size / 1024} kb`;
          console.log(`${fileName} - ${fileExtname} - ${fileSize}`);
        }
      });
    }
  });
