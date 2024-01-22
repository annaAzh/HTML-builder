const path = require('path');
const { readdir, mkdir, rm, copyFile } = require('fs/promises');

const folderName = 'files-copy';
const folderPath = path.resolve(__dirname, `${folderName}`);

rm(folderPath, { recursive: true, force: true })
  .then(() => mkdir(folderPath, { recursive: true }))
  .then(() =>
    readdir(
      path.resolve(__dirname, 'files'),
      { withFileTypes: true },
      (data) => {
        return data;
      },
    ),
  )
  .then((data) => {
    data.forEach((file) => {
      const fileReadPath = path.join(__dirname, 'files', `${file.name}`);
      const fileWritePath = path.join(__dirname, 'files-copy', `${file.name}`);
      if (file.isFile()) {
        copyFile(fileReadPath, fileWritePath);
      }
    });
  })
  .catch((err) => console.log(err.message));
