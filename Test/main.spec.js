

//const { it } = require("jest-circus");
//const { describe } = require("yargs");

const {it, expect} = require("@jest/globals");
const { DOCUMENTATION_NOTE } = require("jest-config/build/utils");
const { test } = require("picomatch");
const { string } = require("yargs");
const {Game, Jugador} = require('../Main/View/JS/IndiceJs');
//const {number2} = require('../Main/View/JS/Jugador');

describe('Game', () => {
    var game = new Game();
    
    //constructor() No
            /*Comprobado individualmente las 2 funciones que llaman (Initialize, GenerateSeq)*/

    //initialize() Caja gris? El juego tiene que inicializar con los valores Score = 0 y Nivel = 1, por lo tanto no hace falta saber mas que si devuelve esos valores o no.
    describe('Game-Initialize', () => {
        it('Comprobar que al inicializar los valores Score = 0 y Nivel = 1 esten correctamente inicializados', () => {
            const score_nivel = game.initialize();
            var InitCorrecte = false
            if(score_nivel[0] == 0 && score_nivel[1] == 1)
            {
                InitCorrecte = true;
            }
            expect(InitCorrecte).toBe(true);  
             
        });
    })


    //toggleBtnStart() Puede
            /*Utiliza Classlist (Css)*/


    //GENERATE_SEQUENCE Caja Negra/Gris, ya que yo le digo que tiene que ser de tamaño 10 por ejemplo, y me tiene que devolver que el tamaño es 10, pero yo no se el contenido del array
   
    describe('Game-Array', () => {
        
        it('Comprobar en caso que la array maxima sea de 10 si se genera un array de 10 elementos', () => {
            const resultado = game.array(10);
            expect(resultado[0].length).toBe(10);
        it('Comprobar en caso que la array maxima sea de 10 si se genera un array de 10 elementos', () => {
            const resultado = game.array(5);
            expect(resultado[0].length).toBe(5);  
	it('Comprobar en caso que la array maxima sea de 10 si se genera un array de 10 elementos', () => {
            const resultado = game.array(3);
            expect(resultado[0].length).toBe(3);  
       

        //Condiciones
        
        it('Comprobar combinaciones posibles de la condicion 1 + 2 en este caso True-False', () => {
            const resultado = game.array(0);
            expect(resultado[1]).toBe(true);
        });

        it('Comprobar combinaciones posibles de la condicion 1 + 2 en este caso False-True', () => {
            const resultado= game.array(-5);
            expect(resultado[1]).toBe(true);
        });

        it('Comprobar combinaciones posibles de la condicion 1 + 2 en este caso False-False', () => {
            const resultado= game.array(6);
            expect(resultado[1]).toBe(false);
        });

        
    })

    // nextLevel()
        /*Solo tiene subnivel a 0 lo otro se comprueba con otras funciones*/

    //currentScore()  Puede
        /* Accede y modifica Html directamente*/


    //transformNumberToColor(number) Caja Blanca, porque se que dentro hay 4 valores del 0-3 asignados a 4 colores "Verde, Azul, Rojo, Amarillo"
    describe('Game-TransformNumberToColor', () => {
        
        //Valores Validos
        
        it('Comprobar en caso que le llegue el numero 0 del array devuelve el color Verde', () => {
            const color = game.transformNumberToColor(0)
            expect(color).toBe('Verde');   
        });
        it('Comprobar en caso que le llegue el numero 3 del array devuelve el color Amarillo', () => {
            const color = game.transformNumberToColor(3)
            expect(color).toBe('Amarillo');   
        });
        
        //Casos intermedios
        it('Comprobar en caso que le llegue el numero 1 del array devuelve el color Azul', () => {
            const color = game.transformNumberToColor(1)
            expect(color).toBe('Azul');   
        });
        it('Comprobar en caso que le llegue el numero 2 del array devuelve el color Rojo', () => {
            const color = game.transformNumberToColor(2)
            expect(color).toBe('Rojo');   
        });
        
        //Valores Invalidos
        
        it('Limite de 0 por abajo es el -1 (el 1 ya esta comprobado en casos intermedios)', () => {
            const color = game.transformNumberToColor(-1)
            expect(color).toBe('Error');   
        });
        
        it('Limite de 3 por arriba es el 4 (el 2 ya esta comprobado en casos intermedios)', () => {
            const color = game.transformNumberToColor(4)
            expect(color).toBe('Error');   
        });


    })

    //transformColorToNumber(color) Caja Blanca, porque se que dentro hay 4 valores del 0-3 asignados a 4 colores "Verde, Azul, Rojo, Amarillo"
   
    describe('Game-TransformColorToNumber', () => {

        //Valores Validos
        it('Comprobar en caso que le llegue el color Verde devuelve el valor 0', () => {
            const color = game.transformColorToNumber('Verde')
            expect(color).toBe(0);   
        });
        it('Comprobar en caso que le llegue el color Azul devuelve el valor 1', () => {
            const color = game.transformColorToNumber('Azul')
            expect(color).toBe(1);   
        });
        it('Comprobar en caso que le llegue el color Rojo  devuelve el valor 2', () => {
            const color = game.transformColorToNumber('Rojo')
            expect(color).toBe(2);   
        });
        it('Comprobar en caso que le llegue el color Amarillo devuelve el valor 3', () => {
            const color = game.transformColorToNumber('Amarillo')
            expect(color).toBe(3);   
        });
        //Valores invalidos
        it('Comprobar en caso que le llegue otro color devuelva error', () => {
            const color = game.transformColorToNumber('Rosa')
            expect(color).toBe('Error');   
        });
        

    //iluminationSequence() No
    
    //iluminationColor(color)     /* ClassList */
    
    //shutDown(color)  /* ClassList */
       
    //addEventClick() /*AddEventListener*/
        
    //eliminateEventClick() /*AddEventListener*/
       
    //chooseColor(ev)
   
    //winGame()
        /*Comprobando el reset Values ya comprobamos que los valores se reinicien una vez ganada la partida*/

    //lostGame()
        /*Se comprueba con el reset values + Initialize (ya que como en este caso no ha acabado, hay que volver a inicializarlo para que no siga)*/


    //resetValues() Caja Negra / gris ?? Al resetear valores, tiene que ser Score = 0, Nivel = 1 y name = " " no hay que saber mas
    describe('Game-resetValues', () => {
        it('Comprobar que en caso de que se Gane/pierda la partida se reinicie los valores Score=0 , Nivel=1, name = " " ', () => {
            const score_nivel_name = game.resetValues();
            expect(score_nivel_name[0]).toBe(0);  
            expect(score_nivel_name[1]).toBe(1);
            expect(score_nivel_name[2]).toBe(" ");  
        });
    })

    //Juego
    describe('Game-prove', () => {
        const Last_Nivel = 2
        //Utilizare esta array para que sea todo mas visual a la hora de seguir el test, aunque genere una de prueba para ver que funciona
        let SecArrs = [0,1] // verde-azul
        let score = null
        let nivel = null

        // Iniciamos comprando que los valores Score y Nivel estan correctamente inicializados, y clicamos en BotonStart
        it('initialize_BotonStart', () => {
            const score_nivel = game.initialize();
            var InitCorrecte = false
            if(score_nivel[0] == 0 && score_nivel[1] == 1)
            {
                InitCorrecte = true;
            }
            score = score_nivel[0]
            nivel = score_nivel[1]
            expect(InitCorrecte).toBe(true);   
        });

        //Al clicar al boton Start te pedira ingresar un nombre por pantalla, y generaremos una array
        it('Array', () => {
            const SecArr = game.array(Last_Nivel);
            expect(SecArr[0].length).toBe(Last_Nivel);
            
        });
        
        //La partida ha empezado!!
        //empezariamos en nextLevel que llama a Ilumination / AddEventClick  / CurrentScore como algunas funciones se generan dando click, 
        //yo voy a simular esos clicks y dar un resultado a las variables y funciones
        //Aqui comprobamos que la transformacion del numero de la array se transforma correctamente en un color (y este se iluminara y apagara por pantalla)
        it('Ilumination_TransformNumberToColor', () => {
            const Color = game.transformNumberToColor(SecArrs[0])
            expect(Color).toBe('Verde');
        });

        //Aqui simularemos que se ha encendido el boton verde del Simon y se ha apagado al momento
        // Y simularemos los 2 caminos posibles distintos, escoger el color Verde (correcto) y otro color como el Amarillo (Incorrecto)
        //Llamaremos a la funcion TransformColorTuNumber para comprobar si el boton que hemos seleccionado es correcto o no (pasando el color por el numero del array )

        describe('Eleccion-Correcta-Nivel_1', () => {
            //Eleccion Correcta
            
            it('Eleccion Correcta en el nivel 1, subimos de nivel y puntuacion', () => {
                expect(score).toBe(0)
                expect(nivel).toBe(1)
                const Number = game.transformColorToNumber('Verde')
                expect(Number).toBe(0);
                //Como la opcion ha sido correcta sumamos +1 punto por cada click correcto que se hace y tambien el nivel
                score+=1
                nivel+=1
                expect(score).toBe(1)
                expect(nivel).toBe(2)

            });
            //Ahora se iluminaran 2 colores (o 2 veces el mismo color)
            it('Eleccion Correcta en el nivel 1, subimos a nivel 2 y por lo tanto ya tenemos array 0 y 1', () => {
                const Color = game.transformNumberToColor(SecArrs[0])
                expect(Color).toBe('Verde');
                const Color2 = game.transformNumberToColor(SecArrs[1])
                expect(Color2).toBe('Azul');
            });
            
            //Hemos acertado y por lo tanto hemos ganado el juego
            describe('Eleccion-Correcta-Nivel_2', () => {
                it('Eleccion Correcta en el nivel 2.1', () => {
                    const Number = game.transformColorToNumber('Verde')
                    expect(Number).toBe(0);
                    //Sumamos puntuacion en +1
                    score+=1
                    expect(score).toBe(2)
                });
                it('Eleccion Correcta en el nivel 2.2', () => {
                    const Number2 = game.transformColorToNumber('Azul')
                    expect(Number2).toBe(1);
                    //sumamos puntuacion y nivel
                    score+=1
                    expect(score).toBe(3)
                    nivel+=1
                    expect(nivel).toBe(3)
                    
                });    
                it('Comprobar que en caso de que se Gane/pierda la partida se reinicie los valores Score=0 , Nivel=1, name = " " ', () => {
                    const score_nivel_name = game.resetValues();
                    expect(score_nivel_name[0]).toBe(0);  
                    expect(score_nivel_name[1]).toBe(1);
                    expect(score_nivel_name[2]).toBe(" ");  
                });
                    
            });

        });

    })

    describe('Game-prove2', () => {
        const Last_Nivel = 2
        //Utilizare esta array para que sea todo mas visual a la hora de seguir el test, aunque genere una de prueba para ver que funciona
        let SecArrs = [0,1] // verde-azul
        let score = null
        let nivel = null

        // Iniciamos comprando que los valores Score y Nivel estan correctamente inicializados, y clicamos en BotonStart
        it('initialize_BotonStart', () => {
            const score_nivel = game.initialize();
            var InitCorrecte = false
            if(score_nivel[0] == 0 && score_nivel[1] == 1)
            {
                InitCorrecte = true;
            }
            score = score_nivel[0]
            nivel = score_nivel[1]
            expect(InitCorrecte).toBe(true);   
        });

        //Al clicar al boton Start te pedira ingresar un nombre por pantalla, y generaremos una array
        it('Array', () => {
            const SecArr = game.array(Last_Nivel);
            expect(SecArr[0].length).toBe(Last_Nivel); 
        });
        
        //La partida ha empezado!!
        //empezariamos en nextLevel que llama a Ilumination / AddEventClick  / CurrentScore como algunas funciones se generan dando click, 
        //yo voy a simular esos clicks y dar un resultado a las variables y funciones
        //Aqui comprobamos que la transformacion del numero de la array se transforma correctamente en un color (y este se iluminara y apagara por pantalla)
        it('Ilumination_TransformNumberToColor', () => {
            const Color = game.transformNumberToColor(SecArrs[0])
            expect(Color).toBe('Verde');
        });

        //Aqui simularemos que se ha encendido el boton verde del Simon y se ha apagado al momento
        // Y simularemos los 2 caminos posibles distintos, escoger el color Verde (correcto) y otro color como el Rojo (Incorrecto)
        //Llamaremos a la funcion TransformColorTuNumber para comprobar si el boton que hemos seleccionado es correcto o no (pasando el color por el numero del array )

        describe('Eleccion-Incorrecta-Nivel_1', () => {
            it('Eleccion Incorrecta en el nivel 1 ', () => {
                const Number = game.transformColorToNumber('Rojo')
                expect(Number).not.toBe(0);
                //No sumamos nivel ni puntuacion
            });
            it('Comprobar que en caso de que se Gane/pierda la partida se reinicie los valores Score=0 , Nivel=1, name = " " ', () => {
                const score_nivel_name = game.resetValues();
                expect(score_nivel_name[0]).toBe(0);  
                expect(score_nivel_name[1]).toBe(1);
                expect(score_nivel_name[2]).toBe(" ");  
            });
           
        });
            


    })


});

describe('Jugador', () => {
    var jugador = new Jugador();
   
    //constructor() 
    it('Comprobar que al inicializar los valores Score = 0 y Nivel = 1 esten correctamente inicializados', () => {
        const name = jugador.getName();
        expect(name).toBe("");  
        const score = jugador.getScore();
        expect(score).toBe(0);
    });

});




