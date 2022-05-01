import * as chalk from 'chalk';
import * as fs from 'fs';
import {spawn} from 'child_process';
export class Ejercicio4 {
  constructor() {}
  /**
   * Método que demuestra si la ruta que se le pasa contiene un directorio o un fichero
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public directoryFile(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(process.argv[2], fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        const ls = spawn('ls', ['-ld', process.argv[2]]);
        let lsOutput = '';
        ls.stdout.on('data', (chain) => lsOutput += chain);
        ls.on('close', () => {
          const lsOutputAsArray = lsOutput.split(/\s+/);
          if (lsOutputAsArray[0].includes('d')) {
            callback(undefined, chalk.green("El archivo es un directorio"));
          } else {
            callback(undefined, chalk.green("El archivo es un fichero"));
          }
        });
      }
    });
  }

  /**
   * Metodo que crea un nuevo directorio a partir de una ruta pasada por parametro
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public newDirectory(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.mkdir(process.argv[2], (err) => {
      if (err) {
        callback(chalk.red("No se pudo crear el directorio " + err.message), undefined);
      } else {
        callback(undefined, chalk.green("El directorio ha sido creado"));
      }
    });
  }
  /**
   * Metodo que lista los archivos de un directorio
   */
  public list(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.readdir(process.argv[2], (err, data) => {
      if (err) {
        callback(chalk.red("No se pudo listar el directorio " + err.message), undefined);
      } else {
        callback(undefined, chalk.green(data.toString()));
      }
    });
  }
  /**
   * Metodo que muestra el contenido de un fichero
   */
  public show(callback: (err: string | undefined, data: string | undefined) => void) : void {
    fs.access(process.argv[2], fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        fs.readFile(process.argv[2], (err, data) => {
          if (err) {
            callback(chalk.red("El archivo no pudo ser leido " + err.message), undefined);
          } else {
            callback(undefined, chalk.green(data.toString() + "\n" + "El archivo fue leido con exito"));
          }
        });
      }
    });
  }
}

new Ejercicio4().list((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
