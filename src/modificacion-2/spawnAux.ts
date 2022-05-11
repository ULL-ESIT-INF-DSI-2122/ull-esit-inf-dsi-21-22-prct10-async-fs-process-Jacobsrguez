import {spawn} from "child_process";


export function commandSpawn(commandAux: string, callback: (err: string | undefined, data: string | undefined) => void): void {
  if (err) {
    callback(err, undefined);
  } else {
    const vector = commandAux.split(" ");
    const commandName = vector[0];
    const body = vector.slice(1, vector.length);
    const child = spawn(commandName, body);
    child.stdout.on('data', (data) => {
      callback(undefined, data.toString());
    });
    child.stderr.on('data', (data) => {
      callback(data.toString(), undefined);
    });
  }
}

