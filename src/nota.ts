
/**
 * Alias de tipo que identifica los colores de una nota.
 */
export type Color = 'red' | 'green' | 'yellow' | 'blue';

/**
 * Clase Note que representa una nota.
 */
export class Note {
  constructor(private title: string, private body: string,
  private color: Color) {}

  /**
   * Metodo que devuelve el titulo de la nota.
   * @returns {this.title} Titulo de la nota.
  */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Metodo que devuelve el cuerpo de la nota.
   * @returns {this.body} Cuerpo de la nota.
   */
  public getBody(): string {
    return this.body;
  }

  /**
   * Metodo que devuelve el color de la nota.
   * @returns {this.color} Color de la nota.
   */
  public getColor(): Color {
    return this.color;
  }
  /**
   * Metodo que actualiza el titulo de la nota.
   * @param title Nuevo titulo de la nota que se le pasa por parametro
   */
  public setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Metodo que actualiza el cuerpo de la nota.
   * @param body Nuevo cuerpo de la nota que se le pasa por parametro
   */
  public setBody(body: string): void {
    this.body = body;
  }

  /**
   * Metodo que actualiza el color de la nota.
   * @param color Nuevo color de la nota que se le pasa por parametro
   */
  public setColor(color: Color): void {
    this.color = color;
  }
}
