let primeraSecuencia = [];
let segundaSecuencia = [];
let numeroDeAciertos = 0;
let numeroDeFallos = 0;
let cartasElegidas = 0;
let tiempoTrascurrido;
let marcoId = [];
let imagenId = [];
let imagenesOriginales = [
	'ciri',
	'ciri',
	'gaskier',
	'gaskier',
	'Gerald',
	'Gerald',
	'vesemir',
	'vesemir',
	'triss',
	'triss',
	'yennefer',
	'yennefer',
];

bloquearInputDelUsuario();
document.querySelector('#iniciar-juego').onclick = iniciarMemoTest;
document.querySelector('#reiniciar-juego').onclick = reiniciar;

function iniciarMemoTest() {
	reiniciar();
	permitirSelecionarTarjeta();
	reorganizarCuadros();
	desbloquearInputDelUsuario();
}

function reiniciar() {
	mostrarTodasLasImagenes();
	mostrarTodosLosBotones();
	reiniciarSecuencias();
	bloquearInputDelUsuario();
	impedirSelecionarTarjeta();
	numeroDeAciertos = 0;
	numeroDeFallos = 0;
	tiempoTrascurrido = 0;
}
function reorganizarCuadros() {
	const $imagenes = document.querySelectorAll('.imagenes');
	borrarImagenes();
	aleatorizarImagenesOriginales();
	for (let i = 0; i < $imagenes.length; i++) {
		agregarImagenAMarcos(i);
		añadirNuevaImagen(i);
		ocultarImagenes(i);
	}
}

function aleatorizarImagenesOriginales() {
	imagenesOriginales.sort(function () {
		return Math.random() - 0.5;
	});
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

function añadirNuevaImagen(numero) {
	let nuevoNumero = numero + 1;
	const remplazarImagen = document.querySelector(`#imagen${nuevoNumero}`);
	remplazarImagen.src = `img/${imagenesOriginales[numero]}.jpg`;
	remplazarImagen.alt = `${imagenesOriginales[numero]}`;
}

function borrarImagenes() {
	const $imagenes = document.querySelectorAll('img');
	for (let i = 0; i < $imagenes.length; i++) {
		$imagenes[i].remove();
	}
}
function ocultarImagenes(numero) {
	if (/^[0-9]+$/.test(numero)) {
		let nuevoNumero = numero + 1;
		const $imagen = document.querySelector(`#imagen${nuevoNumero}`);
		$imagen.style.opacity = '0';
	} else {
		const $imagenId = document.querySelector(`#${numero}`);
		$imagenId.style.opacity = '0';
	}
}
function mostrarImagen(id) {
	if (/^[0-9]+$/.test(id)) {
		if (id === 0 || 11) {
			id++;
		}
		const $imagen = document.querySelector(`#imagen${id}`);
		$imagen.style.opacity = '1';
	} else {
		const $imagenOpacidad = document.querySelector(`#${id}`);
		$imagenOpacidad.style.opacity = '1';
	}
}
function mostrarTodasLasImagenes() {
	const $imagenes = document.querySelectorAll('.imagenes');
	for (let i = 0; i < $imagenes.length; i++) {
		mostrarImagen(i);
	}
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


function controlarInputUsuario(event) {
	if (cartasElegidas <= 2) {
		eleccionUsuario(event);
		if (cartasElegidas === 2) {
			bloquearInputDelUsuario();
			impedirSelecionarTarjeta();
			verificarAciertoOIncorrecto();
		}
	}
    if (numeroDeAciertos === 6) {
		console.log('Has ganado!');
	}
}
function eleccionUsuario(e) {
	cartasElegidas++;
	const $personaje = e.target.alt;
	const $secuenciaId = e.target.id;
	if (cartasElegidas === 1) {
		primeraSecuencia.push($personaje);
		imagenId.push($secuenciaId);
		marcoId.push(e.currentTarget.id);
		mostrarImagen(e.target.id);
		bloquearTarjeta(e.currentTarget.id);
	} else if (cartasElegidas === 2) {
		segundaSecuencia.push($personaje);
		imagenId.push($secuenciaId);
		marcoId.push(e.currentTarget.id);
		mostrarImagen(e.target.id);
		bloquearTarjeta(e.currentTarget.id);
	}
}

function verificarAciertoOIncorrecto() {
	if (primeraSecuencia[0] === segundaSecuencia[0]) {
		mostrarYOcultarBotones(marcoId[0], true);
		mostrarYOcultarBotones(marcoId[1], true);
		numeroDeAciertos++;
		permitirSelecionarTarjeta();
		reiniciarSecuencias();
		desbloquearInputDelUsuario();
	} else {
		impedirSelecionarTarjeta();
		bloquearInputDelUsuario();
		numeroDeFallos++;
		setTimeout(function () {
			ocultarImagenes(imagenId[0]);
			ocultarImagenes(imagenId[1]);
			desbloquearTarjeta(marcoId[0]);
			desbloquearTarjeta(marcoId[1]);
			permitirSelecionarTarjeta();
			reiniciarSecuencias();
			desbloquearInputDelUsuario();
		}, 1000);
	}

}
function reiniciarSecuencias() {
	primeraSecuencia = [];
	segundaSecuencia = [];
	cartasElegidas = 0;
	marcoId = [];
	imagenId = [];
}

function mostrarYOcultarBotones(id, ocultar) {
	if (ocultar) {
		const $boton = document.querySelector(`#${id}`);
		$boton.classList.add('ocultar');
	} else {
		const $boton = document.querySelector(`#${id}`);
		$boton.classList.remove('ocultar');
		$boton.classList.add('');
	}
}
function mostrarTodosLosBotones() {
	const $botones = document.querySelectorAll('.marco');
	for (let i = 0; i < $botones.length; i++) {
		$botones[i].classList.remove('ocultar');
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

