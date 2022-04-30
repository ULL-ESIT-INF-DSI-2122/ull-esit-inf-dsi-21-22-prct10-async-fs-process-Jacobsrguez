import {Note} from './nota';
import * as fs from 'fs';
import * as chalk from 'chalk';
import {Color} from './nota';
export class Method {
  constructor() {}
  /**
   * Metodo add que crea una nota
   * @param nota nota que se le pasa a crear
   * @param owner nombre de la carpeta del usuario
   */
  public add(nota: Note, owner: string): void {
    if (!fs.existsSync(`./${owner}`)) {
      fs.mkdirSync(`./${owner}`);
    }
    if (!fs.existsSync(`./${owner}/${nota.getTitle()}.json`)) {
      // eslint-disable-next-line max-len
      fs.writeFileSync(`./${owner}/${nota.getTitle()}.json`, JSON.stringify(nota));
      // eslint-disable-next-line max-len
      console.log(chalk.green(`La Nota ${nota.getTitle()} ha sido creada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${nota.getTitle()} ya existe`));
    }
  }
  /**
   * Metodo edit que modifica una nota
   * @param owner nombre del uusario de la nota
   * @param title titulo de la nota a editar
   * @param body body nuevo de la nota
   * @param color color nuevo de la nota
   */
  public edit(owner: string, title: string, body: string, color: Color): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      const nota = new Note(title, body, color);
      fs.writeFileSync(`./${owner}/${title}.json`, JSON.stringify(nota));
      console.log(chalk.green(`La Nota ${title} ha sido modificada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }

  /**
   * Metodo remove que elimina una nota
   * @param owner nombre del usuario de la nota
   * @param title Titulo de la nota a eliminar
   */
  public remove(owner: string, title: string): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      fs.rmSync(`./${owner}/${title}.json`);
      console.log(chalk.green(`La Nota ${title} ha sido eliminada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }

  /**
   * Metodo list que lista todas las notas
   * @param owner usuario de las notas
   */
  public list(owner: string): void {
    if (fs.existsSync(`./${owner}`)) {
      const files = fs.readdirSync(`./${owner}`);
      files.forEach((file) => {
        const nota = JSON.parse(fs.readFileSync(`./${owner}/${file}`, 'utf8'));
        console.log(nota['title']);
      });
    } else {
      console.log(chalk.red(`El usuario ${owner} no existe`));
    }
  }

  /**
   * Metodo find que lee una nota
   * @param owner Usuaio dueño de la nota
   * @param title Titulo de la nota a leer
   */
  public read(owner: string, title: string): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      // eslint-disable-next-line max-len
      const nota = JSON.parse(fs.readFileSync(`./${owner}/${title}.json`, 'utf8'));
      console.log(nota);
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }
}
