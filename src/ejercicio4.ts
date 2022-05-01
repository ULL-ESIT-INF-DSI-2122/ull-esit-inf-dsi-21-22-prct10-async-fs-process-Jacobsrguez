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
    fs.access(process.argv[2], fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El directorio no existe " + err.message), undefined);
      } else {
        const mkdir = spawn('mkdir', [process.argv[2] + '/' + process.argv[3]]);
        let mkdirOutput = '';
        mkdir.stdout.on('data', (chain) => mkdirOutput += chain);
        mkdir.on('close', () => {
          callback(undefined, chalk.green("El directorio ha sido creado"));
        });
      }
    });
  }
  /**
   * Metodo que lista el contenido de un directorio
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public list(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(process.argv[2], fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El directorio no existe " + err.message), undefined);
      } else {
        const ls = spawn('ls', [process.argv[2]]);
        let lsOutput = '';
        ls.stdout.on('data', (chain) => lsOutput += chain);
        ls.on('close', () => {
          callback(undefined, chalk.green(lsOutput));
        });
      }
    });
  }
  /**
   * Metodo que muestra el contenido de un fichero
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public show(callback: (err: string | undefined, data: string | undefined) => void) : void {
    fs.access(process.argv[2], fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        const cat = spawn('cat', [process.argv[2]]);
        let catOutput = '';
        cat.stdout.on('data', (chain) => catOutput += chain);
        cat.on('close', () => {
          callback(undefined, chalk.green(catOutput));
        });
      }
    });
  }
  /**
   * Metodo remove que elimina archivos y carpetas
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public remove(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(process.argv[2], fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        const rm = spawn('rm', ['-rf', process.argv[2]]);
        let rmOutput = '';
        rm.stdout.on('data', (chain) => rmOutput += chain);
        rm.on('close', () => {
          callback(undefined, chalk.green("El archivo ha sido eliminado"));
        });
      }
    });
  }

  /**
   * metodo que mueve directorios y ficheros
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public move(callback: (err: string | undefined, data: string | undefined) => void): void {
    const move = spawn('mv', [process.argv[2], process.argv[3]]);
    let moveOutput = '';
    move.stdout.on('data', (chain) => moveOutput += chain);
    move.on('close', () => {
      callback(undefined, chalk.green("El archivo ha sido movido"));
    });
  }

  /**
   * Metodo que copia directorios
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public copyDirectory(callback: (err: string | undefined, data: string | undefined) => void): void {
    const copy = spawn('cp', ['-r', process.argv[2], process.argv[3]]);
    let copyOutput = '';
    copy.stdout.on('data', (chain) => copyOutput += chain);
    copy.on('close', () => {
      callback(undefined, chalk.green("El archivo ha sido copiado"));
    });
  }

  /**
   * Metodo que copia ficheros
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public copyFile(callback: (err: string | undefined, data: string | undefined) => void): void {
    const copy = spawn('cp', [process.argv[2], process.argv[3]]);
    let copyOutput = '';
    copy.stdout.on('data', (chain) => copyOutput += chain);
    copy.on('close', () => {
      callback(undefined, chalk.green("El archivo ha sido copiado"));
    });
  }
}

new Ejercicio4().newDirectory((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
