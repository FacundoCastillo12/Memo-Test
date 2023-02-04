const URL = 'http://127.0.0.1:8080';
const NUMERO_CUADROS = 12;

context('Memotest', () => {
	describe('Asegurando las imagenes en marcos', () => {
		before('Probando mi juego', () => {
			cy.visit(URL);
		});
		it('Se asegura que los marcos tengan imagenes', () => {
			cy.get('#tablero')
				.find('.imagenes')
				.should('have.length', NUMERO_CUADROS);
		});
	});
	describe('Probar que los marcos sean aleatorios', () => {
		before('Probando mi juego', () => {
			cy.visit(URL);
		});
		it('Se asegura que los marcos sean aleatorios', () => {
			cy.get('.imagenes').then((imagenes) => {
				let imagenesOriginales = [];
				imagenes.each(function (i, imagenes) {
					imagenesOriginales.push(imagenes.name);
				});
				cy.visit(URL);
				let imagenesNuevas = [];
				cy.get('.imagenes').then((nuevasImagenes) => {
					nuevasImagenes.each(function (i, imagen) {
						imagenesNuevas.push(imagen.name);
					});
					cy.wrap(imagenesOriginales).should('not.deep.equal', imagenesNuevas);
				});
			});
		});
	});
	describe('Probando error', () => {
		before('Yendo a direccion', () => {
			cy.visit(URL);
      cy.contains('INICIAR').click()
		});
		let mapaDePares, listaDePares;
		it('Eligue una combinacion erronea', () => {
			cy.get('.imagenes').then((imagenes) => {
				mapaDePares = obtenerParesDeMarcos(imagenes);

				listaDePares = Object.values(mapaDePares);
				cy.get(listaDePares[0][0]).click();
				cy.get(listaDePares[1][0]).click();

        cy.get('#fallos').should((fallo)=>{
          expect(fallo).to.contain(1);
        })
        
			});
		});
	});
	describe('Resolver juego', () => {
		before('Dar click', () => {
      cy.visit(URL);
      cy.contains('INICIAR').click()
		});

    let mapaDePares, listaDePares;
    it('Eligue la combinacion correcta', () => {
			cy.get('.imagenes').then((imagenes) => {
				mapaDePares = obtenerParesDeMarcos(imagenes);
				listaDePares = Object.values(mapaDePares);

        listaDePares.forEach((par) => {
          cy.get(par[0]).click();
          cy.get(par[1]).click();

        });
        cy.get('.marco').should('have.class', 'ocultar');
        cy.get('#ganar').should('be.visible')
			});
		});
	});
});

function obtenerParesDeMarcos(imagenes) {
	const pares = {};

	imagenes.each((i, marcos) => {
		const nombreImagen = marcos.name;
		if (pares[nombreImagen]) {
			pares[nombreImagen].push(marcos);
		} else {
			pares[nombreImagen] = [marcos];
		}
	});
	return pares;
}
