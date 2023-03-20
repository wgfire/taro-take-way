import { runShell } from "./common";

console.log("[Task: format code]".green);
runShell("prettier --config .prettierrc --write src/**/*.{ts,tsx,less,css,scss,js,json}");

console.log("[Task: Typescript Compile]".green);
runShell("tsc --noEmit");

console.log("[Task: esLint]".green);
runShell(`eslint --fix src/**/*.{ts,tsx,json}`);
