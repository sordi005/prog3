import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import { sumar,restar,multiplicar,dividir } from './math.js';
import fs from 'fs/promises';


const argv = yargs(hideBin(process.argv))
  .command('saludar <nombre>', 'Saluda a la persona con el nombre indicado',
     (yargs) => {
        yargs.positional('nombre', {
            alias: 'n',
            type: 'string'
        });
    },
    (argv) => {
        console.log(`Hola ${argv.nombre}!`);
    }
    )
    .command('despedir <nombre>', 'Despedir a la persona con el nombre indicado',
        (yargs) => {
            yargs.positional('nombre', {
                alias: 'n',
                type: 'string'
        });
        },
        (argv) => {
            console.log(`Adiós ${argv.nombre}!`);
        }   
    )
    .command('calcular', 'Realiza una operación matemática',
        (yargs) => {
            yargs
            .option('operacion', {
                alias: 'o',
                type: 'string',
                choices: ['sumar', 'restar', 'multiplicar', 'dividir'],
            })
            .option('n1',{
                describe: 'Primer número',
                type: 'number',
                demandOption: true
            })
            .option('n2',{
                describe: 'Segundo número',
                type: 'number',
                demandOption: true
            });
        },
        (argv) => {
            const { operacion, n1, n2 } = argv;
            let resultado;
            switch (operacion) {
                case 'sumar':
                    resultado = sumar(n1, n2);
                    break;
                case 'restar':
                    resultado = restar(n1, n2);
                    break;
                case 'multiplicar':
                    resultado = multiplicar(n1, n2);
                    break;
                case 'dividir':
                    try {
                        resultado = dividir(n1, n2);
                    } catch (error) {
                        console.error(error.message);
                        return;
                    }
                    break;
            }
            console.log(`El resultado de ${operacion} ${n1} y ${n2} es: ${resultado}`);

        }
    )
    .command('leer json', 'Lee un archivo JSON',
        (yargs) => {
            yargs.option('archivo', {
                type: 'string',
                demandOption: true,
                describe: 'Ruta del archivo JSON a leer'
            });
        },
        async (argv) => {
            const { archivo } = argv;
            try {
                const data = await fs.readFile(archivo, 'utf-8');
                const jsonData = JSON.parse(data);
                console.log('Contenido del archivo JSON:', jsonData);
            } catch (error) {
                console.error(`Error al leer el archivo: ${error.message}`);
            }
        }
    )
    .demandCommand(1, 'Se debe especificar un comando')
    .help()
    .alias('help', 'h')
    .parse();

// Ejemplo de uso:
// node cli.js saludar --nombre=Juan
// node cli.js despedir --nombre=Juan
// node cli.js calcular --operacion=sumar --n1=5 --n2=3
// node cli.js leer json --archivo json.json
// node cli.js help