import { spawn } from "child_process";

class ScriptExecuter {
  execute(scriptPath: string, callBack: (a: string | null, b: string | null) => void): string {
    const pythonProcess = spawn("python3", [scriptPath]);
    let response: string = "";

    pythonProcess.stdout.on("data", (data) => {
      response += data as string;
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Error by reading a python file", data);
      callBack(`stderr: ${data}`, null);
    });

    pythonProcess.on("close", (code) => {
      console.log("The python process finished with code : ", code);
      callBack(null, response);
    });

    return response;
  }
}

export default new ScriptExecuter();
