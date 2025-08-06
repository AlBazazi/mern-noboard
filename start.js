import { spawn } from "child_process";
const backend = spawn("npm", ["run", "start", "--prefix", "backend"], { stdio: "inherit" });
const frontend = spawn("npm", ["run", "dev", "--prefix", "frontend"], { stdio: "inherit" });
