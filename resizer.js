const fs = require("fs");
const sharp = require("sharp");
const isImage = require("is-image");

const sizes = process.argv[2].split("x");
const width = +sizes[0];
const height = +sizes[1];
const filesFromInputDir = fs.readdirSync("./input_dir");
const filesFromOutputDir = fs.readdirSync("./output_dir");

if (filesFromOutputDir.length) {
  filesFromOutputDir.forEach((file) => fs.unlinkSync(`./output_dir/${file}`));
}

filesFromInputDir
  .filter((file) => isImage(`./input_dir${file}`))
  .forEach((picture) => {
    sharp(`./input_dir/${picture}`)
      .resize({ width, height })
      .toFile(`./output_dir/${picture}`, (error) => {
        if (error) {
          console.log(`sharp-error-${error}`);
        }
      });
  });
