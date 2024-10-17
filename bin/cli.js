#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";

// Helper function to run shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    process.exit(1);
  }
};

// Function to prompt for a project name if none is provided
const askProjectName = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Please specify the project directory name:",
      default: "my-nextjs-app",
    },
  ]);
  return answers.projectName;
};

// Main function to initialize the project
const createSpacerrsApp = async () => {
  let projectName = process.argv[2];

  // If the user didn't provide a project name, prompt for one
  if (!projectName) {
    projectName = await askProjectName();
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  // Clone the starter template into the specified directory
  runCommand(`git clone https://github.com/yourusername/nextjs-starter-pack ${projectPath}`);

  // Navigate to the project directory
  process.chdir(projectPath);

  // Remove the .git folder from the cloned project
  try {
    const gitDir = path.join(projectPath, ".git");
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
      console.log(`Removed .git directory from ${projectPath}`);
    }
  } catch (err) {
    console.error("Failed to remove .git directory", err);
  }

  // Install dependencies
  runCommand("npm install");

  console.log(`\nYour new Next.js project is ready!`);
  console.log(`\nTo get started, run: cd ${projectName} && npm run dev`);
};

// Execute the function
createSpacerrsApp();
