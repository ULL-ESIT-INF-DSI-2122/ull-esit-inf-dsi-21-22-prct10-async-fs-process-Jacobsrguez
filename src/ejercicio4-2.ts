import * as chalk from 'chalk';
import * as fs from 'fs';
export class Ejercicio42 {
  constructor(private path: string, private name: string) {}
  public directoryFile(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        fs.lstat(this.path, (err, stats) => {
          if (err) {
            callback(chalk.red("El archivo no existe " + err.message), undefined);
          } else {
            if (stats.isDirectory()) {
              callback(undefined, chalk.green("El archivo es un directorio"));
            } else {
              callback(undefined, chalk.green("El archivo es un fichero"));
            }
          }
        });
      }
    });
  }
  public mkdir(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El directorio no existe " + err.message), undefined);
      } else {
        fs.mkdir(this.path + '/' + this.name, (err) => {
          if (err) {
            callback(chalk.red("El directorio no existe " + err.message), undefined);
          } else {
            callback(undefined, chalk.green("El directorio ha sido creado"));
          }
        });
      }
    });
  }
  public list(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El directorio no existe " + err.message), undefined);
      } else {
        fs.readdir(this.path, (err, files) => {
          if (err) {
            callback(chalk.red("El directorio no existe " + err.message), undefined);
          } else {
            callback(undefined, chalk.green(files.toString()));
          }
        });
      }
    });
  }
  public show(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        fs.readFile(this.path, (err, data) => {
          if (err) {
            callback(chalk.red("El archivo no existe " + err.message), undefined);
          } else {
            callback(undefined, chalk.green(data));
          }
        });
      }
    });
  }
  public removeFile(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        fs.unlink(this.path, (err) => {
          if (err) {
            callback(chalk.red("El archivo no existe " + err.message), undefined);
          } else {
            callback(undefined, chalk.green("El archivo ha sido eliminado"));
          }
        });
      }
    });
  }
  public removeDir(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El directorio no existe " + err.message), undefined);
      } else {
        fs.rmdir(this.path, (err) => {
          if (err) {
            callback(chalk.red("El directorio no existe " + err.message), undefined);
          } else {
            callback(undefined, chalk.green("El directorio ha sido eliminado"));
          }
        });
      }
    });
  }
  public copy(newPath: string, callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(this.path, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        fs.cp(this.path, newPath, (err) => {
          if (err) {
            callback(chalk.red("El archivo no existe " + err.message), undefined);
          } else {
            callback(undefined, chalk.green("El archivo ha sido copiado"));
          }
        });
      }
    });
  }
}

new Ejercicio42("./src/leer", "prueba").removeDir((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
