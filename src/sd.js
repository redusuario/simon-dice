
console.log('simon dice');

let secuenciaUsuario = [];
let secuenciaMaquina = [];
let ronda;




document.querySelector('#boton-inicio').onclick = inicioJuego;

function inicioJuego() {
	//console.log('boton inicio presionado');
	reiniciarEstado();
	manejadorRonda();
}

function reiniciarEstado() {
	secuenciaUsuario = [];
	secuenciaMaquina = [];
	ronda = 0;
}

function manejadorRonda() {
	//-------------------------------------------------------------------------------------------
	//										MAQUINA
	//-------------------------------------------------------------------------------------------

	actualizarEstadoPartida('MAQUINA');
	bloquearInputUsuario();
	let cuadroNuevo = obtenerCuadroAleatorio();
	console.log('cuadroNuevo ');
	console.log(cuadroNuevo);

	secuenciaMaquina.push(cuadroNuevo);

	const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

	secuenciaMaquina.forEach(function($cuadro, index) {
      	const RETRASO_MS = (index + 1) * 1000;

      	setTimeout(function() {
        	resaltar($cuadro);
      	}, RETRASO_MS);

    });

	//-------------------------------------------------------------------------------------------
	//										USUARIO
	//-------------------------------------------------------------------------------------------


	setTimeout(function() {
		actualizarEstadoPartida('USUARIO');
		desbloquearInputUsuario();
	},RETRASO_TURNO_JUGADOR);

	secuenciaUsuario = [];

	ronda++;

	actualizarEstadoRonda();

}


function desbloquearInputUsuario(){
	//console.log('turno de juego del usuario');
	document.querySelectorAll('.col-md-1').forEach(function($cuadros){
		$cuadros.onclick = manejarInputUsuario; 
	});
}

function manejarInputUsuario(e){
	console.log(e);
	$cuadros = e.target;
	resaltar($cuadros);
	secuenciaUsuario.push($cuadros);

	const $cuadrosMaquina = secuenciaMaquina[secuenciaUsuario.length-1];

	if ($cuadrosMaquina !== $cuadros) {
		perder();
		return;
	}

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
      	bloquearInputUsuario();
      	setTimeout(manejadorRonda, 1000);
    }

}

function perder() {
    bloquearInputUsuario();
    reiniciarEstado();
    actualizarEstadoPartida('Perdiste! Tocá "Empezar" para jugar de nuevo!');
    document.querySelector('#nivel').innerText=' ';

}



function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll('.col-md-1');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
}



function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
      	$cuadro.style.opacity = 0.5;
    }, 500);
}


function actualizarEstadoPartida(estado) {
	document.querySelector('#estadoRonda').innerText = estado;
}


function bloquearInputUsuario() {
	document.querySelectorAll('.col-md-1').forEach(function($cuadro){
		$cuadro.onclick = function(){
			console.log($cuadro);
			console.log('usuario bloqueado');
		};
	});

}

function actualizarEstadoRonda(argument) {
	document.querySelector('#nivel').innerText='NIVEL '+ronda;
}