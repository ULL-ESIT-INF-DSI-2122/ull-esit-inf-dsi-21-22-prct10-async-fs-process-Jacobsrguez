// import * as fs from 'fs';
import {spawn} from 'child_process';
import {access} from 'fs';
import * as chalk from 'chalk';
import { mainModule } from 'process';
/**
 * Clase CatGrep que resuelve el ejercicio 1 propuesto de 2 maneras diferentes cada una de ellas expresadas su respectivo metodo
 */

export class CatGrep {
  constructor() {}

  /**
   * Método forma 1 que resuelve el ejercicio 1 haciendo uso del metodo pipe de un stream
   */
  public forma1() {
    if (process.argv.length !== 4) {
      console.log(chalk.red('Por favor ponga un archivo y una palabra a buscar.'));
    } else {
      access(process.argv[2], (err) => {
        if (err) {
          console.log(chalk.red('El archivo no existe.'));
        } else {
          const cat = spawn('cat', [process.argv[2]]);
          const grep = spawn('grep', [process.argv[3]]);
          cat.stdout.pipe(grep.stdin);
          let out = '';
          grep.stdout.on('data', (piece) => out += piece);
          grep.on('close', () => {
            console.log(chalk.blue(out));
            const cont = new RegExp(process.argv[3], 'g');
            if (out.match(cont) != undefined) {
              console.log(chalk.green("La palabra " + process.argv[3] + " aparece " + out.match(cont)?.length + " veces."));
            } else {
              console.log(chalk.red("La palabra " + process.argv[3] + " no aparece en el archivo."));
            }
          });
        }
      });
    }
  }
  /**
   * Método forma 2 que resuelve el ejercicio 1 sin usar el metodo pipe
   */
  public forma2() {
    if (process.argv.length !== 4) {
      console.log(chalk.red('Por favor ponga un archivo y una palabra a buscar.'));
    } else {
      access(process.argv[2], (err) => {
        if (err) {
          console.log(chalk.red('El archivo no existe.'));
        } else {
          const cat = spawn('cat', [process.argv[2]]);
          const grep = spawn('grep', [process.argv[3]]);
          cat.stdout.on('data', (piece) => grep.stdin.write(piece));
          cat.on('close', () => {
            let out = '';
            grep.stdout.on('data', (piece) => out += piece);
            grep.on('close', () => {
              console.log(chalk.blue(out));
              const cont = new RegExp(process.argv[3], 'g');
              if (out.match(cont) != undefined) {
                console.log(chalk.green("La palabra " + process.argv[3] + " aparece " + out.match(cont)?.length + " veces."));
              } else {
                console.log(chalk.red("La palabra " + process.argv[3] + " no aparece en el archivo."));
              }
            });
          });
        }
      });
    }
  }
}
