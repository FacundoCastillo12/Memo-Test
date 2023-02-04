let primeraSecuencia = [];
let segundaSecuencia = [];
let numeroDeMovimientos = 0;
let numeroDeAciertos = 0;
let numeroDeFallos = 0;
let cartasElegidas = 0;
let tiempoTrascurrido;
let marcoId = [];
let imagenId = [];

bloquearInputDelUsuario();
ordenarMarcosInicial();
document.querySelector('#iniciar-juego').onclick = iniciarMemoTest;
document.querySelector('#reiniciar-juego').onclick = reiniciar;

function iniciarMemoTest() {
	reiniciar();
	permitirSelecionarTarjeta();
	ordenarMarcosInicial();
	desbloquearInputDelUsuario();
	iniciarCronometro();
}
function ordenarMarcosInicial() {
	let imagenesAleatorias = organizarImagenes();
	reorganizarCuadros(imagenesAleatorias);
}
function reiniciar() {
	ocultarTodasLasImagenes();
	mostrarTodasLasImagenes();
	reiniciarSecuencias();
	bloquearInputDelUsuario();
	impedirSelecionarTarjeta();
	permitirSelecionarTarjeta();
	numeroDeAciertos = 0;
	numeroDeFallos = 0;
	numeroDeMovimientos = 0;
	cargarContadores();
	reiniciarTextoTiempo();
	detenerCronometro();
	mostrarTodosLosMarcos();
}

function reorganizarCuadros(imagenes) {
	const $imagenes = document.querySelectorAll('.imagenes');
	borrarImagenes();
	for (let i = 0; i < $imagenes.length; i++) {
		agregarImagenAMarcos(i);
		añadirNuevaImagen(i, imagenes);
		ocultarImagenes(i);
	}
}

function controlarInputUsuario(event) {
	if (cartasElegidas <= 2) {
		manejarEleccionUsuario(event);
		if (cartasElegidas === 2) {
			bloquearInputDelUsuario();
			impedirSelecionarTarjeta();
			verificarAciertoOIncorrecto();
		}
	}
	if (numeroDeAciertos === 6) {
		mostrarMensajeGanar();
		bloquearInputDelUsuario();
		detenerCronometro();
	}
}

function manejarEleccionUsuario(e) {
	cartasElegidas++;
	const $personaje = e.target.name;
	const $secuenciaId = e.target.id;
	if (cartasElegidas === 1) {
		primeraSecuencia.push($personaje);
		imagenId.push($secuenciaId);
		marcoId.push(e.currentTarget.id);
		mostrarImagen(e.target.id);
		bloquearTarjeta(e.currentTarget.id);
		reproducirAudioSeleccionar();
	} else if (cartasElegidas === 2) {
		segundaSecuencia.push($personaje);
		imagenId.push($secuenciaId);
		marcoId.push(e.currentTarget.id);
		mostrarImagen(e.target.id);
		bloquearTarjeta(e.currentTarget.id);
		numeroDeMovimientos++;
	}
	cargarContadores();
}

function verificarAciertoOIncorrecto() {
	if (primeraSecuencia[0] === segundaSecuencia[0]) {
		numeroDeAciertos++;
		reproducirAudioAcierto();
		ocultarMarco(marcoId[0]);
		ocultarMarco(marcoId[1]);
		permitirSelecionarTarjeta();
		reiniciarSecuencias();
		desbloquearInputDelUsuario();
	} else {
		impedirSelecionarTarjeta();
		bloquearInputDelUsuario();
		reproducirAudioIncorrecto();
		numeroDeFallos++;
		setTimeout(function () {
			ocultarImagenes(imagenId[0]);
			ocultarImagenes(imagenId[1]);
			desbloquearTarjeta(marcoId[0]);
			desbloquearTarjeta(marcoId[1]);
			permitirSelecionarTarjeta();
			reiniciarSecuencias();
			desbloquearInputDelUsuario();
		}, 500);
	}
	cargarContadores();
}
function reiniciarSecuencias() {
	primeraSecuencia = [];
	segundaSecuencia = [];
	cartasElegidas = 0;
	marcoId = [];
	imagenId = [];
}
function agregarImagenAMarcos(numero) {
	let nuevoNumero = numero + 1;
	const $ingresarBoton = document.querySelectorAll('.marco');
	const $imagen = document.createElement('img');
	$imagen.id = `imagen${nuevoNumero}`;
	$imagen.classList.add('img-fluid', 'imagenes');
	$imagen.draggable = false;
	$ingresarBoton[numero].appendChild($imagen);
}

function añadirNuevaImagen(numero, imagenes) {
	let nuevoNumero = numero + 1;
	const $remplazarImagen = document.querySelector(`#imagen${nuevoNumero}`);
	const $nombreMarco = document.querySelector(`#marco${nuevoNumero}`);
	$remplazarImagen.src = `img/${imagenes[numero]}.jpg`;
	$remplazarImagen.name = `${imagenes[numero]}`;
	$nombreMarco.name = (`${imagenes[numero]}`)
}

function borrarImagenes() {
	const $imagenes = document.querySelectorAll('img');
	for (let i = 0; i < $imagenes.length; i++) {
		$imagenes[i].remove();
	}
}
function organizarImagenes() {
	let imagenesOriginales = [
		'ciri',
		'gaskier',
		'gerald',
		'vesemir',
		'triss',
		'yennefer',
	];
	let imagenes = imagenesOriginales.concat(imagenesOriginales);
	imagenes.sort(function () {
		return Math.random() - 0.5;
	});
	return imagenes;
}

function bloquearInputDelUsuario() {
	document.querySelectorAll('.marco').forEach(function ($marco) {
		$marco.onclick = function () {};
	});
}
function desbloquearInputDelUsuario() {
	document.querySelectorAll('.marco').forEach(function ($marco) {
		$marco.onclick = controlarInputUsuario;
	});
}
function ocultarImagenes(numero) {
	if (/^[0-9]+$/.test(numero)) {
		let nuevoNumero = numero + 1;
		const $imagen = document.querySelector(`#imagen${nuevoNumero}`);
		$imagen.classList.add('desaparecer');
	} else {
		const $imagenId = document.querySelector(`#${numero}`);
		$imagenId.classList.add('desaparecer');
	}
}
function mostrarImagen(id) {
	if (/^[0-9]+$/.test(id)) {
		if (id === 0 || 11) {
			id++;
		}
		const $imagen = document.querySelector(`#imagen${id}`);
		$imagen.classList.remove('desaparecer');
	} else {
		const $imagen = document.querySelector(`#${id}`);
		$imagen.classList.remove('desaparecer');
	}
}
function mostrarMarco(id) {
	if (/^[0-9]+$/.test(id)) {
		if (id === 0 || 11) {
			id++;
		}
		const $boton = document.querySelector(`#marco${id}`);
		$boton.classList.remove('ocultar');
	} else {
		const $imagen = document.querySelector(`#${id}`);
		$imagen.classList.remove('ocultar');
	}
}
function ocultarMarco(id) {
	const $boton = document.querySelector(`#${id}`);
	$boton.classList.add('ocultar');
	if (/^[0-9]+$/.test(id)) {
		if (id === 0 || 11) {
			id++;
		}
		const $boton = document.querySelector(`#marco${id}`);
		$boton.classList.remove('ocultar');
	} else {
		const $boton = document.querySelector(`#${id}`);
		$boton.classList.add('ocultar');
	}
}
function mostrarTodosLosMarcos() {
	const $imagenes = document.querySelectorAll('.marco');
	for (let i = 0; i < $imagenes.length; i++) {
		mostrarMarco(i);
	}
}

function mostrarTodasLasImagenes() {
	const $imagenes = document.querySelectorAll('.imagenes');
	for (let i = 0; i < $imagenes.length; i++) {
		mostrarImagen(i);
	}
}
function ocultarTodasLasImagenes() {
	const $imagenes = document.querySelectorAll('.imagenes');
	for (let i = 0; i < $imagenes.length; i++) {
		ocultarImagenes(i);
	}
}

function impedirSelecionarTarjeta() {
	document.querySelectorAll('.marco').forEach(function ($marco) {
		$marco.classList.add('bloquear');
	});
}
function permitirSelecionarTarjeta() {
	document.querySelectorAll('.marco').forEach(function ($marco) {
		$marco.classList.remove('bloquear');
	});
}

function bloquearTarjeta(id) {
	const $impedirSelecionarTarjeta = document.querySelector(`#${id}`);
	$impedirSelecionarTarjeta.classList.add('bloquear');
}
function desbloquearTarjeta(id) {
	const $impedirSelecionarTarjeta = document.querySelector(`#${id}`);
	$impedirSelecionarTarjeta.classList.remove('bloquear');
}

function mostrarMensajeGanar() {
	const $ganar = document.querySelector('#ganar');
	reproducirAudioGanar();
	$ganar.classList.remove('oculto');
	setTimeout(function () {
		$ganar.classList.add('oculto');
	}, 3000);
}
function cargarContadores() {
	const $movimientos = document.querySelector('#movimientos');
	const $aciertos = document.querySelector('#aciertos');
	const $fallos = document.querySelector('#fallos');
	$movimientos.innerHTML = numeroDeMovimientos;
	$aciertos.innerHTML = numeroDeAciertos;
	$fallos.innerHTML = numeroDeFallos;
}
function reproducirAudioGanar() {
	const AUDIO = new Audio('./audio/victoria.mp3');
	AUDIO.play();
}
function reproducirAudioAcierto() {
	const AUDIO = new Audio('./audio/correcto.mp3');
	AUDIO.play();
}
function reproducirAudioIncorrecto() {
	const AUDIO = new Audio('./audio/incorrecto.mp3');
	AUDIO.play();
}
function reproducirAudioSeleccionar() {
	const AUDIO = new Audio('./audio/seleccionar.mp3');
	AUDIO.play();
}

function detenerCronometro() {
	clearInterval(tiempoTrascurrido);
}
function iniciarCronometro() {
	let contadorSegundos = 0;
	let contadorMinutos = 0;
	const $segundos = document.querySelector('#segundos');
	const $minutos = document.querySelector('#minutos');
	tiempoTrascurrido = setInterval(function () {
		if (contadorSegundos === 60) {
			contadorSegundos = 0;
			contadorMinutos++;
			if (contadorMinutos === 0) {
				contadorMinutos = 0;
			}
		}
		$segundos.innerHTML = contadorSegundos;
		$minutos.innerHTML = contadorMinutos;
		contadorSegundos++;
	}, 1000);
}
function reiniciarTextoTiempo() {
	const $segundos = document.querySelector('#segundos');
	const $minutos = document.querySelector('#minutos');
	$segundos.innerHTML = '0';
	$minutos.innerHTML = '0';
}
