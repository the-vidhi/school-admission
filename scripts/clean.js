const path = require("path");
const fs = require("fs");
const { rm } = require("fs/promises");

const execute = async () => {
  const distDirectory = path.join(__dirname, "..", "dist");
  const exists = fs.existsSync(distDirectory);
  if (exists) {
    await rm(distDirectory, { recursive: true });
  }
};

execute();
