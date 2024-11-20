#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "input",
      name: "folderName",
      message: "What do you want to name your folder? (default: spacerr-app)",
      default: "spacerr-app",
    },
  ])
  .then(async (answers) => {
    const folderName = answers.folderName;
    const folderPath = path.join(process.cwd(), folderName);

    if (fs.existsSync(folderPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `The folder "${folderName}" already exists. Do you want to overwrite it?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.redBright("\nOperation canceled."));
        return;
      }

      console.log(chalk.yellowBright(`\nRemoving existing folder "${folderName}"...`));
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    console.log(chalk.blueBright(`\nCloning repository into ${folderName}...`));
    execSync(`git clone https://github.com/spacerrsdreams/spacerr.git ${folderName}`);

    console.log(chalk.blueBright(`\nCleaning up...`));
    fs.rmSync(path.join(folderName, ".git"), { recursive: true, force: true });

    const binFolder = path.join(folderName, "bin");
    const licenseFile = path.join(folderName, "LICENSE");

    fs.existsSync(binFolder) && fs.rmSync(binFolder, { recursive: true, force: true });
    fs.existsSync(licenseFile) && fs.rmSync(licenseFile);

    const packageJsonPath = path.join(folderName, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    delete packageJson.publicConfig;
    delete packageJson.bin;
    delete packageJson.license;
    delete packageJson.author;
    delete packageJson.keywords;

    if (packageJson.dependencies) {
      delete packageJson.dependencies["chalk"];
      delete packageJson.dependencies["inquirer"];
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(chalk.blueBright(`\nYour project is ready!`));
    console.log(chalk.blueBright(`Next steps:`));
    console.log(chalk.cyanBright(`\n  1. cd ${folderName}`));
    console.log(chalk.cyanBright(`  2. pnpm install`));
    console.log(chalk.cyanBright(`  3. pnpm dev\n`));
  })
  .catch((err) => {
    console.error(chalk.redBright(`\nAn error occurred: ${err.message}`));
  });
