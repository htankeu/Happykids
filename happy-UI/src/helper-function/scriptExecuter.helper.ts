import { spawn } from "child_process";

class ScriptExecuter {
  execute(scriptPath: string): string {
    const pythonProcess = spawn("python", [scriptPath]);
    let reponse: string = "";

    pythonProcess.stdout.on("data", (data) => {
      reponse = data as string;
      console.log("data stdout------------", data);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Error by reading a python file", data);
    });

    pythonProcess.on("close", (code) => {
      console.log("The python process finished with code : ", code);
    });

    return reponse;
  }
}

export default new ScriptExecuter();
