import './styles.css';

import {_} from './js/underscore.js'

let deck = [];

const figuras = ['A', 'J', 'K', 'Q'],

        tipos = ['C', 'D', 'H', 'S'];

let  puntosJugadores = [];

// Referencias HTML

const   btnNuevo = document.querySelector('#btnNuevo'),

        btnPedir = document.querySelector('#btnPedir'),

        btnDetener = document.querySelector('#btnDetener'),

        marcador = document.querySelectorAll('small'),

        divCartas = document.querySelectorAll('.divCartas');

// Esta función permite iniciar el juego.

const iniciarJuego = (numJugadores = 2) =>{

    deck = crearDeck();

    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i ++) {

        puntosJugadores.push(0);

        marcador[i].innerText = 0;

        divCartas[i].innerText = '';
    };

    btnPedir.disabled = false;

    btnDetener.disabled = false;
};

// Esta función permite crear una nueva baraja de cartas.

const crearDeck = () => {

    deck = [];

    for (let i = 2; i <= 10; i ++) {
        for (let tipo of tipos) {
            deck.push( i + tipo);
        };
    };
    for (let figura of figuras) {
        for (let tipo of tipos) {
            deck.push(figura + tipo);
        };
    };

    return _.shuffle(deck)
};

iniciarJuego();

// Deshabilitación inicial de los botones pedir y detener.
// El usuario debe presionar nuevo juego.

btnPedir.disabled = true;

btnDetener.disabled = true;

// Esta función permite perdir una carta.

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No quedan cartas en la baraja';
    };
    
    return deck.pop();
};

// Estafunción permite conocer el valor de la carta entregada.

const valorCarta = (carta) => {
    
    let valor;

    if ( isNaN (carta[0]) ) {
        (carta[0] === 'A') ? valor = 11 : valor = 10;
    }
    else if (carta.length === 2) {
        valor = carta[0] * 1;
    }
    else if (carta.length === 3) {
        valor = 10;
    };

    return valor;
};

// Esta función sive para acumular puntos obtenido en el marcador de cada jugador.
// Turno = 0, se refiere al primer jugador. La computadora siempre será la última
// posición del array puntosJugadores.

const acumularPuntos = (turno, cartaEntregada) => {

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(cartaEntregada);
        
    marcador[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno]
};

// Esta función crea la imagen de la carta que correponde al
// jugador que se encuentra jugando.

const crearImagenCarta = (turno, cartaEntregada) => {

    const imagenCarta = document.createElement('img');

    imagenCarta.src =`./assets/img/cartas/${cartaEntregada}.png`;

    imagenCarta.classList.add('cartas');

    divCartas[turno].append(imagenCarta);

    return imagenCarta;
};

// Esta función permite determinar que jugador ha ganado la partida.

const determinarGanador = () => {

    const [puntosJugador, puntosComputadora] = puntosJugadores;

    setTimeout(() => {

        if ( puntosJugador <= 21 && (puntosJugador > puntosComputadora || puntosComputadora > 21) ) {
        
        alert('El jugador ha ganado, felicitaciones!!');
        }
        else if ( puntosJugador > 21 || puntosJugador < puntosComputadora) {

        alert('Ganó la computadora.');
        }   
        else if (puntosJugador === 21 && puntosComputadora === 21) {

        alert('El jugador y la computadora han empatado.');
        };

    }, 500);
};

// Esta función contiene la lógica de juego de la computadora.

const turnoComputadora = (puntosJugador) => {

    let puntosComputadora = puntosJugadores[puntosJugadores.length - 1];

    do {

        const cartaEntregada = pedirCarta();

        puntosComputadora = acumularPuntos(puntosJugadores.length - 1, cartaEntregada);

        crearImagenCarta(divCartas.length - 1, cartaEntregada);

    if ( puntosComputadora === 21 ) {

        break;
    };

    } while ( (puntosComputadora <= puntosJugador) && (puntosJugador <= 21) );

    determinarGanador();
};

// Eventos.

btnPedir.addEventListener('click', ()=> {

    const cartaEntregada = pedirCarta();

    const puntosJugador = acumularPuntos(0, cartaEntregada);
    
    crearImagenCarta(0, cartaEntregada);

    if (puntosJugador >= 21) {

        btnPedir.disabled = true;
        
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    };
});

btnDetener.addEventListener('click', ()=> {

    btnPedir.disabled = true;

    btnDetener.disabled = true;

    turnoComputadora(puntosJugadores[0]);
});

btnNuevo.addEventListener('click', () => {

    iniciarJuego();
});

