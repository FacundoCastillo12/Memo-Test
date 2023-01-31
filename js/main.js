let secuenciaCorrecta = []; 
let numeroDeAciertos = 0; 
let numeroDeFallos = 0;
let imagenesOriginales = [
	'img/ciri.jpg',
	'img/ciri.jpg',
	'img/gaskier.jpg',
	'img/gaskier.jpg',
	'img/Gerald.jpg',
	'img/Gerald.jpg',
	'img/vesemir.jpg',
	'img/vesemir.jpg',
	'img/triss.jpg',
	'img/triss.jpg',
	'img/yennefer.jpg',
	'img/yennefer.jpg',
];
let tarjetaFondo = ['img/logo.jpg'];

document.querySelector('#iniciar-juego').onclick = iniciarMemoTest;
document.querySelector('#reiniciar-juego').onclick = reiniciar;

function iniciarMemoTest() {
	controlarJuego();
}
function controlarJuego() {
	reorganizarCuadros();
}
function reiniciar() {
	mostrarTodasLasImagenes();
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
	let randomizarindices = imagenesOriginales.sort(function () {
		return Math.random() - 0.5;
	});
	return randomizarindices;
}

function agregarImagenAMarcos(numero) {
	let nuevoNumero = numero + 1;
	const $ingresarBoton = document.querySelectorAll('.marco');
	const $imagen = document.createElement('img');
	$imagen.id = `imagen${nuevoNumero}`;
	$imagen.classList.add('img-fluid', 'imagenes');
	$ingresarBoton[numero].appendChild($imagen);
}

function añadirNuevaImagen(numero) {
	let nuevoNumero = numero + 1;
	const remplazarImagen = document.querySelector(`#imagen${nuevoNumero}`);
	remplazarImagen.src = imagenesOriginales[numero];
}

function borrarImagenes() {
	const $imagenes = document.querySelectorAll('img');
	for (let i = 0; i < $imagenes.length; i++) {
		$imagenes[i].remove();
	}
}
function ocultarImagenes(numero) {
	let nuevoNumero = numero + 1;
	const $imagen = document.querySelector(`#imagen${nuevoNumero}`);
	$imagen.style.opacity = '0';
}
function mostrarImagen(numero) {
	if (numero === 0 || 11) {
		numero++;
	}
	const $imagen = document.querySelector(`#imagen${numero}`);
	$imagen.style.opacity = '1';
}
function mostrarTodasLasImagenes() {
	const $imagenes = document.querySelectorAll('.imagenes');
	for (let i = 0; i < $imagenes.length; i++) {
		mostrarImagen(i);
	}
}

