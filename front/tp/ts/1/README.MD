npm init -y : Inicializa Proyecto node , con configuración básica. 

¿Por qué se usa --save-dev en lugar de guardar TypeScript como
dependencia normal?

-- Se utiliza el comando --save-dev para guardar typescript como una dependecia de desarrollo , ts solo se necesita en durante el desarrollo, 
en produccion no se necesita compilador ts ya que lo que se sube son archivos .js 

-- Peticiones API Los Simpson: 

https://thesimpsonsapi.com/api/characters : 

Devuleve lista de objetos con los personajes de los simpson, si accedemos a los resultados deuvelve una estructura de datos : 
[
0: 

age: 
    39
birthdate: 
    "1956-05-12"
gender: 
    "Male"
id: 
    1
name: 
    "Homer sSimpson"
occupation:
    "Safety Inspector"
phrases:
    (15) ['Doh!', 'Why you little...!', 'Woo-hoo!', 'Mmm... (food)... *drooling*', 'Stupid Flanders!', 'Shut up Flanders!', 'AAAAGHH!', 'Lisa, knock off that racket!', 'Uh oh, the boss.', 'Lets all go out for frosty chocolate milkshakes!', 'Whatever, Ill be at Moes.', 'I am evil Ho-mer! I am evil Ho-mer! I am evil Ho-mer!', 'Better them than me.', 'Better them than me... Oh wait, that was me.', 'Marge, my face hurts again!']

portrait_path: 
    "/character/1.webp"
status: 
    "Alive"
]