import * as fs from 'fs';
import {spawn} from 'child_process';

export class Modificacion {
  constructor() {
  }

  public main() {
    if (process.argv.length !== 3) {
      console.log('Por favor, especifique el fichero');
    } else {
      if (fs.existsSync(process.argv[2])) {
        fs.watch(process.argv[2], (eventType, filename) => {
          if (eventType === 'rename') {
            console.log(`Fichero ${filename} ha sido borrado`);
          }
          console.log("\nThe file", filename, "was modified!");
          console.log("The type of change was:", eventType);
          const ls = spawn('ls', ['-l', '-h', process.argv[2]]);
          let output = '';
          ls.stdout.on('data', (chain) => output += chain);
          ls.on('close', () => {
            const lsOutputAsArray = output.split(/\s+/);
            console.log(`Los permisos del fichero son ${lsOutputAsArray[0]} `);
            console.log(`El usuario propietario del fichero es ${lsOutputAsArray[2]}`);
            console.log(`El grupo propietario del fichero es ${lsOutputAsArray[3]}`);
          });
        });
      } else {
        console.log('El fichero no existe');
      }
    }
  }
}
const modificacion = new Modificacion();
modificacion.main();
