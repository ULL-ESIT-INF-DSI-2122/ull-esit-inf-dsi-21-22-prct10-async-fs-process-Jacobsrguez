# Practica 10 - Sistemas de ficheros y creación de procesos Node.js

## Datos generales
- Alumno: Jacob Santana Rodríguez
- e-mail: alu010130426@ull.edu.es
- Universidad de la Laguan
- Grado en ingeniería informática
- Curso nº 3, segundo cuatrimestre
- Asignatura: Desarrollo en Sistemas informáticos
- Fecha de entrega: 25/04/2022

## Índice

### Resumen

En esta práctica se plantan una serie de ejercicios a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos  
  
### Ejercicio 2 <a name = "ej2."></a>

Implementar un programa que devuelva el número de ocurrencias de una palabra en un fichero de texto. Para acceder al contenido del fichero deberá expandir el comando cat, además de expandir el comando grep con la salida proporcionada por cat como entrada para obtener las lineas en las que se encuentra la palabra buscada.

El fichero como la palabra buscada tienen que ser parámetros pasados desde la línea de comandos.

El ejercicio hay que llevarlo a cabo de dos maneras diferentes. Para ello cree un método para cada manera.

La primera forma, haciendo uso del metodo pipe de un stream para poder redirigir la salida de un comando hacia otro.
```typescript
public forma1() {
  if (process.argv.length !== 4) {
    console.log(chalk.red('Por favor ponga un archivo y la palabra a buscar.'));
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
```
Para la resolucion, lo que hice fue:
  - Lo primero un condicional que me asegure que por la linea de comandos se le pasan el archivo y la palabra a buscar, si
  esto no se diese, muestro por pantalla un mensaje de que tiene que poner un el archivo y la palabra a buscar.
  - Luego con la función access verifico si el archivo no existe, gracias a un manejador err. Si err es falso muestro por
  pantalla un mensaje de que el archivo no existe.
  - Una vez verificado la existencia del archivo, gracias a la función spawn creo un objeto childProcess en este caso, cat
  que muestra el contenido de un fichero. Con el comando grep hago lo mismo gracias a la función spawn.
  - Ahora, accedemos al proceso hijo stdout y le pasamos la entrada del pipe.
  - Creo la variable out que la voy a usar para ir concatenando los valores.
  - Con el método on, voy a concatenar los valores leidos desde el stream a través del buffer,
  - Con el evento close, muestro por consol todos los valores obtenidos. Como en el enunciado nos pide crear una expresión
  regular para mostrar cuantas veces aparece la palabra buscada. Por ello cree la variable cont. Con la ayuda del método
  match logro contar cuántas palabras hay. Si el valor no es undefined muestro cuantas veces aparece la palabra, pero si 
  es undefined quiere decir que la palabra no aparace y lo muestro por pantalla. 

Cuando muestro los mensajes, los fallos, los muestro en rojo y los aciertos de color verde haciendo uso del paquete chalk