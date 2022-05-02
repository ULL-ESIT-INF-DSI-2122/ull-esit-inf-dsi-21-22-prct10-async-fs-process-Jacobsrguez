import 'mocha';
import {expect} from 'chai';
import {Ejercicio4} from '../src/ejercicio4';
import * as chalk from 'chalk';

describe("Probando la clase Ejercicio4", () => {
  it("Probando el metodo directorytFile con un fichero", (done) => {
    new Ejercicio4("./src/leer/a.txt", "").directoryFile((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El archivo es un fichero"));
        done();
      }
    });
  });
  it("Probando el metodo directorytFile con un directorio", (done) => {
    new Ejercicio4("./src/leer", "").directoryFile((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El archivo es un directorio"));
        done();
      }
    });
  });
  it("Probando el metodo directorytFile con el error", (done) => {
    new Ejercicio4("./src/prueba2", "").directoryFile((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './src/prueba2'"));
        done();
      }
    });
  });
  it("Probando el metodo newDirectory", (done) => {
    new Ejercicio4("./src/pruebas", "").newDirectory((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El directorio ha sido creado"));
        done();
      }
    });
  });
  it("Probando el error del metodo newDirectory", (done) => {
    new Ejercicio4("./src/pepe", "").newDirectory((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './src/pepe'"));
        done();
      }
    });
  });
  it("Probando metodo list", (done) => {
    new Ejercicio4("./src/leer", "").list((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("a.txt\nb.txt\n"));
        done();
      }
    });
  });
  it("Probando el error en el metodo list", (done) => {
    new Ejercicio4("./src/pepe", "").list((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './src/pepe'"));
        done();
      }
    });
  });
  it("Probando el metodo show", (done) => {
    new Ejercicio4("./helloworld.txt", "").show((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("Hello World! Hola"));
        done();
      }
    });
  });
  it("Probando el error del metodo show", (done) => {
    new Ejercicio4("./a.txt", "").show((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './a.txt'"));
        done();
      }
    });
  });
  it("Probando el metodo delete", (done) => {
    new Ejercicio4("./src/borrar", "").remove((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El archivo ha sido eliminado"));
        done();
      }
    });
  });
  it("Probando el error del metodo delete", (done) => {
    new Ejercicio4("./pepe", "").remove((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './pepe'"));
        done();
      }
    });
  });

  it("Provando el metodo move", (done) => {
    new Ejercicio4("./helloworld.txt", "").move((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El archivo ha sido movido"));
        done();
      }
    });
  });
  it("Probando el error del metodo move", (done) => {
    new Ejercicio4("./pepe", "").move((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './pepe'"));
        done();
      }
    });
  });
  it("Probando el metodo copyDirectory", (done) => {
    new Ejercicio4("./src/leer", "").copyDirectory((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El directorio ha sido copiado"));
        done();
      }
    });
  });
  it("Probando el error del metodo copyDirectory", (done) => {
    new Ejercicio4("./pepe", "").copyDirectory((err, _) => {
      if (err) {
        expect(err).to.be.equal(chalk.red("ENOENT: no such file or directory, access './pepe'"));
        done();
      }
    });
  });
  it("Probando el metodo copyFile", (done) => {
    new Ejercicio4("./helloworld.txt", "").copyFile((_, data) => {
      if (data) {
        expect(data).to.be.equal(chalk.green("El archivo ha sido copiado"));
        done();
      }
    });
  });
});
