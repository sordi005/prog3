import fs from 'fs/promises'

export default class Notas {

    constructor() {
        this.NotasFolder = './notas/';
    }    
    async listar() {
        try{    
            return await fs.readdir(this.NotasFolder)
        } catch (error) {
            console.error('Error al leer el directorio de notas:', error);
            return []
        }
    }

    async crearNota(titulo, contenido) {
        try {
            await fs.writeFile(this.NotasFolder + titulo + '.txt', contenido)
        } catch (error) {
            throw new Error('Error al crear la nota')
        }
    }

}
