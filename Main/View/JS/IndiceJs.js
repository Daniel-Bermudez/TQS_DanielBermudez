//Nivel maximo de juego, segun este numero asi sera el tamaño del array 
const MAX_LEVEL = 10

//Pasando Colores desde el php a partir de los documentos ByID a unas variables para poder usarlas
const Verde = document.getElementById('Verde')
const Rojo = document.getElementById('Rojo')
const Amarillo = document.getElementById('Amarillo')
const Azul = document.getElementById('Azul')
//const example = jest.createMockFromModule('./Jugador')
const Start = document.getElementById('start')

class Game{
    
    constructor() {
        //Llamamos a Initialize para que ponga los valores score a 0 y 1 en caso que no esten ya
        this.initialize()
        //Aqui vamos a llamar para construir un array de las posiciones que queramos, 
        //en mi caso he puesto 10 posiciones
        // Ejemplo [0,1,2,3,0,1,2,3,0,1]
        this.array(MAX_LEVEL)
        //Hay que añadir a estas funciones el bind(this) lo que hace es que el this se refiera al juego y no al boton
        this.chooseColor = this.chooseColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        //Aqui hacemos que el siguiente nivel tenga un cierto retraso 
        setTimeout(this.nextLevel, 700) 
    }

    //inicializamos valores tanto score, como level
    initialize() {
        
        //Inicializamos la puntuación (Score) a 0 y el nivel (level) a 1, aunque por defecto ya esta inicializado en el php
        if(document.getElementById('score') != 0 || document.getElementById('currentLevel') != 1){this.score = 0;this.level = 1}
        this.colors = {Verde,Rojo,Amarillo,Azul};
        //para inicializar debe estar score a 0, level a 1 y entonces le damos al boton y empieza
        if(this.score == 0 && this.level == 1){this.Boton()}
        else{this.initialize}
        
        return [this.score, this.level]
    }

    //Creamos un array random de LN posiciones (NivelMaximo) que contiene numeros del 0-3 uno para cada color
    array(LN) {
        //Estas condiciones son para el test mas que nada, para que compruebe que no se inserte un nivel Maximo = 0 o negativo, y que por arriba el maximo sea 10
        var ambas = false
            var primeraLN = false
            var segundaMS = false
            if(LN>10 || LN <= 0) //Valores no validos
                if(LN == 0) {primeraLN = true} //Condition 
                if(Math.sign(LN) == -1) {segundaMS = true} //Condition 2
                if(LN == 0 || Math.sign(LN) == -1)  { ambas = true}  //Decision 1+2
                if(ambas == true || primeraLN == true || segundaMS == true){LN = 1}
                if(LN > 10){ LN = 10}
            
            //Creamos array de LN elementos, con fill ponemos los LN elementos a 0, 
            //y con los mathrandom hacemos que los valores sean entre 0 y 4 (sin llegar a ser 4) 
            //y con el floor hacemos que sean enteros
            this.sequence = new Array(LN).fill(0).map(n => Math.floor(Math.random() * 4)) 
            
            //Este return es para los test
            return [this.sequence, ambas, primeraLN, segundaMS] 
    }

    //ev = Mouse event
    chooseColor(ev) {
        
        //Aqui volvemos a comprobar que el max_level no sea mayor a 10 ni menor a 1
        if(MAX_LEVEL > 10){
            MAX_LEVEL = 10
        }
        if(MAX_LEVEL == 0 || Math.sign(MAX_LEVEL) == -1){
            MAX_LEVEL = 1
        }
        //ev.target en que elemento se realiza el click 
        const numberColor = this.transformColorToNumber(ev.target.dataset.color)
        this.iluminationColor(ev.target.dataset.color)

        //Si aciertas el color subes puntuacion en 1, se guarda la puntuacion y subes el nivel del personaje para adaptarlo al nivel del tablero
        if (numberColor === this.sequence[this.subLevel]) {
            //Cada vez que cliquemos una casilla de color correcta sumaremos 1 punto
            this.score += 1
            //Guardaremos y actualizaremos el Score de la pantalla
            this.currentScore();
            //Aumentamos en 1 el nivel del jugador (no es el mismo que el que se muestra por pantalla, es el nivel para que repita la secuencia)
            this.subLevel++
            // si el nivel del jugador es el mismo que el del tablero significa que el jugador lo ha acertado y por lo tanto pasa de nivel el tablero
            if (this.subLevel === this.level) {
                this.level++
                //Si el nivel es igual al maximo +1 significa que ha acabado el juego y has ganado
                if (this.level === (MAX_LEVEL + 1)) {
                    this.winGame()
                } else {
                //Si el nivel no es igual al maximo significa que has acertado pero el juego sigue al siguiente nivel
                    setTimeout(this.nextLevel, 1500)
                }
            }
        //Si no aciertas al elegir el color has perdido el juego
        } else {
            this.lostGame()
        }
    }

    nextLevel() {
        
        //Aqui es donde empieza el usuario en si, el gameboard inicia en 1 y el usuario puede verlo inicia en 0 y 
        //cuando muestre secuencia el gameboard, pasa al 1 el sublevel
        if(this.subLevel != 0){this.subLevel = 0}
        
        //Se ilumina a partir del array los valores que tocan
        this.iluminationSequence(this.level, this.sequence)
        //Actualizamos Score
        this.currentScore()

        //Le pasamos a la funcion de Add o eliminar Click que queremos activarlo y le mandamos un true 
        let ActivarClick = true
        this.add_eliminate_click(ActivarClick)
        //Actualizamos nivel
        this.currentLevel();

        //Return para el test
        return this.subLevel
    }

    Boton() {
        //Si es distinto a Null se entra (al comprobar con test, al principio intentaba entrar con null)
        if(Start != null){
            //si tiene la clase hide la quitamos y sino la añadimos, 
            //es para ocultar el boton al empezar y se añada de nuevo a la pantalla al perder o ganar
            if (Start.classList.contains('hide')) {Start.classList.remove('hide')} 
            else {Start.classList.add('hide')}
        }else{return "null"}
    }
    
    

    transformNumberToColor(number) {
        //Transformamos los numeros del array a colores, para que se iluminen al llamar ilumination
        switch (number) {
            case 0: return 'Verde'
            case 1: return 'Azul'
            case 2: return 'Rojo'
            case 3: return 'Amarillo'
            default: return 'Error'
        }
    }

    transformColorToNumber(color) {
        //Transformamos los colores a numeros, para comprobar que al elegir un color (ChooseColor) hemos acertado o fallado
        switch (color) {
            case 'Verde': return 0
            case 'Azul': return 1
            case 'Rojo': return 2
            case 'Amarillo': return 3
            default: return 'Error'
        }
    }
    //Actualizar Score en el php
    currentScore() {
        document.getElementById('score').innerHTML = this.score; 
    }
    //Actualizar Nivel en el php
    currentLevel(){
        document.getElementById('currentLevel').innerHTML = this.level;
    }


    iluminationSequence(level, sequence) {
        //Iluminar secuencia es a partir de la secuencia y del nivel que se encuentra va a transformar esos numeros a colores y los va a iluminar un instante de tiempo
        for (let i = 0; i < level; i++) { 
            //si en vez de utilizar la variable const utilizamos Var hay problemas, ya que se pisa y repite el ultimo color todas las veces
            const color = this.transformNumberToColor(sequence[i]) 
            //el 1000 * i es para que los diferentes colores no salgan por pantalla rapidisimos y a la vez, sino que entre ellos tengan cierto tiempo
            setTimeout(() => this.iluminationColor(color), 1000 * i) 
        }
    }

    iluminationColor(color) {
        //le pide a ese color su classList (todas las clases que tiene) y le añadimos la clase light (del css) para que "encienda" el boton
        this.colors[color].classList.add('light') 
        //Apagara el color "light" pasados 400 ms
        setTimeout(() => this.shutDown(color), 400) 
    }

    shutDown(color) {
        //le quitara la clase light devolviendo el color.light a color (mirar CSS)
        this.colors[color].classList.remove('light') 
    }
    
    add_eliminate_click(add) {
        //Segun si le llamamos pasandole un booleano true o false, activara que se pueda clicar o lo desactivara.
        if(add == true){
            this.colors.Verde.addEventListener('click', this.chooseColor) //this.chooseColor.bind(this) si no ponemos esto, el this va a ser el boton, y queremos que sea el juego
            this.colors.Azul.addEventListener('click', this.chooseColor)
            this.colors.Rojo.addEventListener('click', this.chooseColor)
            this.colors.Amarillo.addEventListener('click', this.chooseColor)  
        }else{
            this.colors.Verde.removeEventListener('click', this.chooseColor)
            this.colors.Azul.removeEventListener('click', this.chooseColor)
            this.colors.Rojo.removeEventListener('click', this.chooseColor)
            this.colors.Amarillo.removeEventListener('click', this.chooseColor)  
        }   
    }


    winGame() {
        //Has llegado al ultimo nivel y lo has superado por lo tanto has ganado y sale un mensaje de Felicidades, tu nombre y puntuación
        swal(
            'Ganaste', 
            'Felicidades ' + document.getElementById('Name').innerHTML + ', ganaste el juego con ' + document.getElementById('score').innerHTML + ' puntos' , 
            'success')
        .then(() => {
            //Y a continuación se inicializa para que puedas jugar otra vez y resetea valores
            this.add_eliminate_click(false)
            this.initialize()
            this.resetValues()
        })
    }

    lostGame() {
        //has selecionado mal un color y por lo tanto has perdido, sale un mensaje de que perdiste y te muestra tu nombre y puntuacion
        swal(
            'Perdiste', 
            'Lo lamentamos ' + document.getElementById('Name').innerHTML + ', perdiste el juego con ' + document.getElementById('score').innerHTML + ' puntos :(', 
            'error')
            .then(() => {
                this.add_eliminate_click(false)
                this.resetValues()
                this.initialize()
            })
    }

    resetValues() {
        //Es la funcion para resetear valores cuando pierdes o ganas, actualizando el php a los valores iniciales
        if(document.getElementById('score') != null){
            document.getElementById('score').innerHTML = '0'
            document.getElementById('currentLevel').innerHTML = '1'
            document.getElementById('Name').innerHTML = ' '
            return [document.getElementById('score').innerHTML, document.getElementById('currentLevel').innerHTML] 
        }
        else{
            var score = 0;
            var nivel = 1
            var name = ' '
            return[score, nivel,name]

            
        }  
    }
}

//Esta clase Jugador nos sirve para Insertar el nombre al principiio y chuequear que has escrito alguna cosa y que no has cerrado la ventana del nombre
//En caso que la dejes vacia o la cierres, se abrira automaticamente hasta que escribas algo
class Jugador {
    
    constructor(name,score){
        this.name = "";
        this.score = 0;
    }
    getName() {
        return this.name;
    }
    getScore() {
        return this.score;
    }
    setName(newName){
        this.name = newName;
    }
    
    setScore(newScore){
        this.score = newScore;
    }
    
    InsertName(){
        Name = prompt("Ingrese su nombre: ");
        document.getElementById('Name').innerHTML = Name
        return document.getElementById('Name').innerHTML
    }
    CheckName(){
        

        while(document.getElementById('Name').innerHTML.length == 0)
        {
            this.InsertName()
        }  
        return document.getElementById('Name').innerHTML
    } 
}


function startGame() {
    //Este Se puede -considerar la funcion principal "Main" ya que es el inicio de todo, 
    //desde el php le decimos que se cuando se clique el boton jugar se inicie
    //Entonces te saldra una ventana para que pongas tu nombres y empezara el juego
    const Jug = new Jugador()
    Name = document.getElementById('Name').innerHTML
    Jug.InsertName()

    if(document.getElementById('Name').innerHTML.length > 0){
        window.game = new Game()
    }
    else{
        Jug.CheckName()
        window.game = new Game()
    }
}

 
//Exportamos Game y Jugador para poder importar en el main.spec.js (que son los tests)
module.exports = {Game, Jugador};


