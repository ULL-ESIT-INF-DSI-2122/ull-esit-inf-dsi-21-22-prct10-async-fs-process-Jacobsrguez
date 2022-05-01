import * as fs from 'fs';
import * as chalk from 'chalk';

export class Ejercicio3 {
  constructor(private user: string) {}
  /**
   * Metodo que devuelve el usuario pasado por parametro
   * @returns {this.user} usuario
   */
  public getUser(): string {
    return this.user;
  }

  /**
   * Método que cambia el valor del usuario por el pasado por parametro
   * @param user Nuevo usuario pasado a asignar
   */
  public setUser(user: string): void {
    this.user = user;
  }
  /**
   * Metodo que verifica si se ha creado borrado o editado una nota
   * @param callback callback que se le pasa por parametro
   */
  public management(callback: (err: string | undefined, data: string | undefined) => void): void {
    fs.access(`./${this.user}`, fs.constants.F_OK, (err) => {
      if (err) {
        callback(chalk.red("El archivo no existe " + err.message), undefined);
      } else {
        fs.watch(`./${this.user}`, (eventType, filename) => {
          if (eventType === 'rename') {
            fs.access(`./${this.user}/${filename}`, fs.constants.F_OK, (err) => {
              if (err) {
                callback(chalk.green("El archivo fue borrado " + err.message), undefined);
              } else {
                fs.readFile(`./${this.user}/${filename}`, (err, data) => {
                  if (err) {
                    callback(chalk.red("El archivo no pudo ser leido " + err.message), undefined);
                  } else {
                    callback(undefined, chalk.green("El archivo fue creado satisfactoriamente " + data.toString()));
                  }
                });
              }
            });
          } else {
            fs.readFile(`./${this.user}/${filename}`, (err, data) => {
              if (err) {
                callback(chalk.red("El archivo no pudo ser leido " + err.message), undefined);
              } else {
                callback(undefined, chalk.green("El archivo fue modificado con exito " + data.toString()));
              }
            });
          }
        });
      }
    });
  }
}

new Ejercicio3(process.argv[2]).management((err, data) => {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(data);
  }
});
