import { spawn } from 'child_process';
import * as path from 'path';


/** 
 * command example
 * npx ts-node main.ts -t <folder-name> -p <file-name>
 * -t: execute type
 * -p: processing
*/

const args = process.argv.slice(2);

let type = '';
let pathToRun = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-t') {
    type = args[i + 1];
  }
  if (args[i] === '-p') {
    pathToRun = args[i + 1];
  }
}

if (type && pathToRun) {
  const filePath = path.resolve(__dirname, type, `${pathToRun}.ts`);
  const tsNode = path.resolve(__dirname, 'node_modules', '.bin', 'ts-node');

  const child = spawn(tsNode, [filePath], { stdio: 'inherit' });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
} else {
  console.error('Please provide the correct arguments.');
}
