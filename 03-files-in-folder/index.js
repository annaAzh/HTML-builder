const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'secret-folder');

fs.promises
  .readdir(filePath, { withFileTypes: true }, (err) => {
    if (err) {
      console.log(err.message);
    }
  })
  .then((stats) => {
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].isFile() && !stats[i].isDirectory()) {
        fs.stat(path.resolve(filePath, `${stats[i].name}`), (err, stat) => {
          if (err) {
            console.log(err.message);
          }
          const notes = path.join(
            __dirname,
            'secret-folder',
            `${stats[i].name}`,
          );
          const index = path.basename(notes).indexOf('.');
          const fileName = path.basename(notes).slice(0, index);
          const fileExtname = path.extname(notes).slice(1);
          const fileSize = `${(stat.size / 1000).toFixed(3)} kb`;
          console.log(`${fileName} - ${fileExtname} - ${fileSize}`);
        });
      }
    }
  });
