import * as chalk from 'chalk';
import * as fs from 'fs';
import {spawn} from 'child_process';
export class Ejercicio4 {
  constructor(private path: string, private aux: string) {}
  /**
   * Método que demuestra si la ruta que se le pasa contiene un directorio o un fichero
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public directoryFile(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const ls = spawn('ls', ['-ld', this.path]);
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
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const mkdir = spawn('mkdir', [this.path + '/' + this.aux]);
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
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const ls = spawn('ls', [this.path]);
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
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const cat = spawn('cat', [this.path]);
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
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const rm = spawn('rm', ['-rf', this.path]);
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
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const move = spawn('mv', [this.path, this.aux]);
        let moveOutput = '';
        move.stdout.on('data', (chain) => moveOutput += chain);
        move.on('close', () => {
          callback(undefined, chalk.green("El archivo ha sido movido"));
        });
      }
    });
  }

  /**
   * Metodo que copia directorios
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public copyDirectory(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const copy = spawn('cp', ['-r', this.path, this.aux]);
        let copyOutput = '';
        copy.stdout.on('data', (chain) => copyOutput += chain);
        copy.on('close', () => {
          callback(undefined, chalk.green("El directorio ha sido copiado"));
        });
      }
    });
  }

  /**
   * Metodo que copia ficheros
   * @param callback patron callback devuelve un error o un mensaje con la evento hecho
   */
  public copyFile(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red(err.message), undefined);
      } else {
        const copy = spawn('cp', [this.path, this.aux]);
        let copyOutput = '';
        copy.stdout.on('data', (chain) => copyOutput += chain);
        copy.on('close', () => {
          callback(undefined, chalk.green("El archivo ha sido copiado"));
        });
      }
    });
  }
}

/*
new Ejercicio4("./src/leer/a.txt", "./src/pruebas").copyFile((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
*/
