import {spawn} from 'child_process';
import {access} from 'fs';
import * as chalk from 'chalk';
/**
 * Clase CatGrep que resuelve el ejercicio 1 propuesto de 2 maneras diferentes cada una de ellas expresadas su respectivo metodo
 */

export class CatGrep {
  constructor() {}

  /**
   * Método forma 1 que resuelve el ejercicio 1 haciendo uso del metodo pipe de un stream
   */
  public forma1(callback: (err: string | undefined, data: string | undefined) => void) {
    if (process.argv.length !== 4) {
      callback(chalk.red('Por favor ponga un archivo y una palabra a buscar.'), undefined);
    } else {
      access(process.argv[2], (err) => {
        if (err) {
          callback(chalk.red('El archivo no existe.'), undefined);
        } else {
          const cat = spawn('cat', [process.argv[2]]);
          const grep = spawn('grep', [process.argv[3]]);
          cat.stdout.pipe(grep.stdin);
          let out = '';
          grep.stdout.on('data', (piece) => out += piece);
          grep.on('close', () => {
            callback(undefined, chalk.blue(out));
            const cont = new RegExp(process.argv[3], 'g');
            if (out.match(cont) != undefined) {
              callback(undefined, chalk.green("La palabra " + process.argv[3] + " aparece " + out.match(cont)?.length + " veces."));
            } else {
              callback(undefined, chalk.red("La palabra " + process.argv[3] + " no aparece en el archivo."));
            }
          });
        }
      });
    }
  }
  /**
   * Método forma 2 que resuelve el ejercicio 1 sin usar el metodo pipe
   */
  public forma2(callback: (err: string | undefined, data: string | undefined) => void) {
    if (process.argv.length !== 4) {
      callback(chalk.red('Por favor ponga un archivo y una palabra a buscar.'), undefined);
    } else {
      access(process.argv[2], (err) => {
        if (err) {
          callback(chalk.red('El archivo no existe.'), undefined);
        } else {
          const cat = spawn('cat', [process.argv[2]]);
          const grep = spawn('grep', [process.argv[3]]);
          cat.stdout.on('data', (piece) => grep.stdin.write(piece));
          cat.on('close', () => {
            let out = '';
            grep.stdout.on('data', (piece) => callback(undefined, chalk.blue(piece)));
            grep.on('close', () => {
              callback(undefined, chalk.blue(out));
              const cont = new RegExp(process.argv[3], 'g');
              if (out.match(cont) != undefined) {
                callback(undefined, chalk.green("La palabra " + process.argv[3] + " aparece " + out.match(cont)?.length + " veces."));
              } else {
                callback(undefined, chalk.red("La palabra " + process.argv[3] + " no aparece en el archivo."));
              }
            });
          });
        }
      });
    }
  }
}

new CatGrep().forma2((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
