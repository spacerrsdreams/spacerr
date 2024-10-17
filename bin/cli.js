#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to install a package
function installPackage(packageName) {
    console.log(chalk.blueBright(`\nInstalling ${packageName}...`));
    execSync(`npm install ${packageName}`, { stdio: 'inherit' });
}

// Main function to run the CLI tool
async function run() {
    // Install inquirer
    installPackage('inquirer');

    // Now that inquirer is installed, import it
    const inquirer = await import('inquirer').then(module => module.default);

    // Prompt the user for the folder name
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'folderName', 
            message: 'What do you want to name your folder? (default: my-nextjs-app)',
            default: 'my-nextjs-app', // Set default name
        },
    ]);

    const folderName = answers.folderName;

    console.log(chalk.blueBright(`\nCloning repository into ${folderName}...`));
    execSync(`git clone https://github.com/spacerrsdreams/spacerr.git ${folderName}`);

    console.log(chalk.blueBright(`\nCleaning up...`));
    fs.rmSync(path.join(folderName, '.git'), { recursive: true, force: true });

    const binFolder = path.join(folderName, 'bin');
    const licenseFile = path.join(folderName, 'LICENSE');

    if (fs.existsSync(binFolder)) {
        fs.rmSync(binFolder, { recursive: true, force: true });
    } else {
        console.log(chalk.yellow(`No bin directory found in ${folderName}`));
    }

    if (fs.existsSync(licenseFile)) {
        fs.rmSync(licenseFile);
    } else {
        console.log(chalk.yellow(`No LICENSE file found in ${folderName}`));
    }

    const packageJsonPath = path.join(folderName, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Remove unnecessary fields from package.json
    delete packageJson.publicConfig;
    delete packageJson.bin;
    delete packageJson.license;
    delete packageJson.author;

    ['dependencies', 'devDependencies'].forEach((depType) => {
        if (packageJson[depType]) {
            delete packageJson[depType]['chalk'];
            delete packageJson[depType]['inquirer'];
        }
    });

    // Remove package-lock.json if it exists
    const packageLockPath = path.join(folderName, 'package-lock.json');
    if (fs.existsSync(packageLockPath)) {
        fs.rmSync(packageLockPath);
        console.log(chalk.blueBright(`Removed package-lock.json`));
    }

    // Write the updated package.json back to file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Notify the user to install dependencies with pnpm
    console.log(chalk.blueBright(`\nYour project is ready!`));
    console.log(chalk.blueBright(`Next steps:`));
    console.log(chalk.cyanBright(`\n  1. cd ${folderName}`));
    console.log(chalk.cyanBright(`  2. pnpm install`));
    console.log(chalk.cyanBright(`  3. pnpm run dev`));
}

// Run the main function
run();
