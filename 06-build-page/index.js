const fs = require('fs');
const path = require('path');
const {
  readdir,
  mkdir,
  copyFile,
  readFile,
  writeFile,
} = require('fs/promises');

if (!readdir(path.resolve(__dirname, 'project-dist'))) {
  mkdir(path.resolve(__dirname, 'project-dist'), (err) => {
    if (err) console.log(err.message);
  });
}

const stylesPath = path.join(__dirname, 'styles');
const fileWritePath = path.join(__dirname, 'project-dist', 'style.css');
const writeStream = fs.createWriteStream(fileWritePath, { flag: 'a' }, 'utf-8');

readdir(stylesPath)
  .then((data) => {
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
  })
  .catch((err) => console.log(err.message));

function copyFiles(src, dist) {
  readdir(src, { withFileTypes: true }, (data) => {
    return data;
  })
    .then((data) => {
      data.forEach((file) => {
        if (file.isFile()) {
          copyFile(path.join(src, file.name), path.join(dist, file.name));
        }
      });
    })
    .catch((err) => console.log(err.message));
}

function copyDirectory(src, dist) {
  mkdir(dist, { recursive: true })
    .then(() => {
      copyFiles(src, dist);
      const childrenFiles = readdir(src, { withFileTypes: true });
      return childrenFiles;
    })
    .then((childrenFiles) => {
      childrenFiles.forEach((children) => {
        if (children.isDirectory()) {
          copyDirectory(
            path.join(src, children.name),
            path.join(dist, children.name),
          );
        }
      });
    })
    .catch((err) => console.log(err.message));
}

const src = path.join(__dirname, 'assets');
const dist = path.join(__dirname, 'project-dist', 'assets');

copyDirectory(src, dist);
let templateHtml;
let templateComponents;

function createHtmlWithTemplate(html, componentFolder) {
  readFile(html, { encoding: 'utf-8' })
    .then((data) => {
      templateHtml = data.toString();
      templateComponents = templateHtml.match(/{{(.*)}}/gi);
    })
    .then(() => {
      if (templateComponents) {
        templateComponents.forEach((component) => {
          const componentName = `${component.replace(/[{{}}]/g, '')}.html`;
          const readStream = fs.createReadStream(
            path.join(componentFolder, componentName),
            'utf-8',
          );
          let text = '';
          readStream.on('data', (chunk) => {
            text += chunk;
          });
          readStream.on('end', () => {
            templateHtml = templateHtml.replaceAll(component, text);
            writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              templateHtml,
            );
          });
        });
      }
    });
}
const html = path.join(__dirname, 'template.html');
const componentFolder = path.join(__dirname, 'components');
createHtmlWithTemplate(html, componentFolder);
