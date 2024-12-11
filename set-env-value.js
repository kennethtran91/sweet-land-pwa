const fs = require("fs");
const targetPath = "./src/app/environments/environment.prod.ts";
const customValue = process.env.CUSTOM_VALUE || "default_value";
fs.readFile(targetPath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${targetPath}`, err);
    process.exit(1);
  }
  const updatedData = data.replace(/__CUSTOM_VALUE__/g, customValue);
  fs.writeFile(targetPath, updatedData, "utf8", (err) => {
    if (err) {
      console.error(`Error writing file: ${targetPath}`, err);
      process.exit(1);
    }
    console.log(`Custom value set to: ${customValue}`);
  });
});
