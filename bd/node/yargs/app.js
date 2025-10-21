import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import { config} from './config.js';
const { port, mode } = config;
const argv = yargs(hideBin(process.argv))
   .option('saludo' , {
       type: 'string',
       describe: 'Nombre de la persona a saludar'
   })
  .parse();

console.log(`Servidor corriendo en el puerto ${port} (modo ${mode}): Hola ${argv.saludo}!`);

