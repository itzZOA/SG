/**
 * Clase que genera los coches de los competidores y los anima
 */
class Enemigos {
  //Necesitamos la escena la posición x y z donde se va a colocar el coche, el color del coche y el ID
  constructor(scene, posx, posz, colorCoche, index) {
    this.posx = posx;
    this.posz = posz;
    this.colorCoche = colorCoche;
    this.index = index;
    // Nº de sección dentro de la vuelta
    this.seccion = 0;
    // Nº de secciones totales recorridas
    this.numsecciones = 0;
    // Distancia a la siguiente seccion
    this.distancia = 0;
    // Para llevar el control de las vueltas que llevan
    this.vueltas = -1;
    // La posición dentro de la carrera
    this.posicionCuadro = 0;
    // Spline para llevar a cabo la animación/simulación del competidor
    this.spline;
    // Comprobar si el juego ha finalizado (porque el último competidor que quede termine por delante del principal)
    this.juegoFinalizado = true;
    this.monedas = 0;
    this.scene = scene;

    // Factor de multiplicación que se escoge aleatoriamente para darle al recorrido
    // un toque de aleatoriedad, igualmente se aplica a la velocidad de animación del
    // spline para que cada vez los competidores tengan velocidades distintas
    this.setNumeros = [0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07];

    //  Creamos el objeto coche
    this.createCoche(scene);

    //  Caja fisica del coche
    var containerGeometry = new THREE.BoxGeometry(5.2, 1.7, 3);
    containerGeometry.translate(0, -1, 0);

    this.box_container = new Physijs.BoxMesh(
      containerGeometry,
      new THREE.MeshBasicMaterial({wireframe: true,opacity: 0.0,transparent: true}),
      1
    );

    //  Añadimos el coche a su caja física
    this.box_container.add(this.meshCocheEnemigo);

    this.box_container.position.set(this.posx, 0, this.posz);
    this.box_container.__dirtyPosition = true;

    //  Configuramos las sombras
    this.box_container.castShadow = this.box_container.receiveShadow = true;

    //  Recorrido para los competidores
    //  En función del ID jugador que tengamos tenemos un recorrido ligeramente diferente
    //  dentro de los límites que establece la carretera del mapa
    if (this.index === 2) {
      this.spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(159.37, 0.5, 48.83),
        new THREE.Vector3(166.9, 0.5, 17.62),
        new THREE.Vector3(158.7, 0.5, -45.21),
        new THREE.Vector3(133.75, 0.5, -59.21),
        new THREE.Vector3(-69.33, 0.5, -161.38),
        new THREE.Vector3(-140.75, 0.5, -172.27),
        new THREE.Vector3(-168.88, 0.5, -127.26),
        new THREE.Vector3(-169.56, 0.5, 47.71),
        new THREE.Vector3(-158.82, 0.5, 89.03),
        new THREE.Vector3(-124.4, 0.5, 82.57),
        new THREE.Vector3(-79.17 * this.setNumeros[getRandom()], 0.5, 51.44 * this.setNumeros[getRandom()] * 1.4),
        new THREE.Vector3(-36.07 * this.setNumeros[getRandom()], 0.5, 39.05 * this.setNumeros[getRandom()] * 1.4),
        new THREE.Vector3(-29.75, 0.5, 34.38 * this.setNumeros[getRandom()]),
        new THREE.Vector3(7.51 * this.setNumeros[getRandom()], 0.5, 28.55 * this.setNumeros[getRandom()]),
        new THREE.Vector3(29.74 * this.setNumeros[getRandom()], 0.5, 56.14),
        new THREE.Vector3(70.5, 0.5, 141.95 * this.setNumeros[getRandom()]),
        new THREE.Vector3(124.28, 0.5, 160.02),
        new THREE.Vector3(168.47, 0.5, 130.49),
        new THREE.Vector3(159.37, 0.5, 48.83),
      ]);
    }
    if (this.index === 1) {
      this.spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(171.65, 0.5, 39.19),
        new THREE.Vector3(166.9 * this.setNumeros[getRandom()], 0.5, 17.62),
        new THREE.Vector3(158.7 * this.setNumeros[getRandom()], 0.5, -45.21 * this.setNumeros[getRandom()]),
        new THREE.Vector3(133.75 * this.setNumeros[getRandom()], 0.5, -59.21 * this.setNumeros[getRandom()]),
        new THREE.Vector3(29.3 * this.setNumeros[getRandom()], 0.5, -104.34 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-69.33 * this.setNumeros[getRandom()], 0.5, -161.38 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-140.75 * this.setNumeros[getRandom()], 0.5, -172.27 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-168.88 * this.setNumeros[getRandom()], 0.5, -127.26 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-169.56 * this.setNumeros[getRandom()], 0.5, 47.71 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-158.82 * this.setNumeros[getRandom()], 0.5, 89.03 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-124.4 * this.setNumeros[getRandom()], 0.5, 82.57 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-83.17 * this.setNumeros[getRandom()], 0.5, 51.44 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-36.07 * this.setNumeros[getRandom()], 0.5, 39.05 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-29.75, 0.5, 34.38),
        new THREE.Vector3(-8.17, 0.5, 17.46),
        new THREE.Vector3(7.51 * this.setNumeros[getRandom()], 0.5, 28.55 * this.setNumeros[getRandom()]),
        new THREE.Vector3(29.74 * this.setNumeros[getRandom()], 0.5, 56.14 * this.setNumeros[getRandom()]),
        new THREE.Vector3(70.5 * this.setNumeros[getRandom()], 0.5, 141.95 * this.setNumeros[getRandom()]),
        new THREE.Vector3(124.28 * this.setNumeros[getRandom()], 0.5, 160.02 * this.setNumeros[getRandom()]),
        new THREE.Vector3(168.47 * this.setNumeros[getRandom()], 0.5, 130.49 * this.setNumeros[getRandom()]),
        new THREE.Vector3(171.65, 0.5, 39.19),
      ]);
    }
    if (this.index === 3) {
      this.spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(171.97, 0.5, 58.19),
        new THREE.Vector3(166.9 * this.setNumeros[getRandom()], 0.5, 17.62 * this.setNumeros[getRandom()]),
        new THREE.Vector3(158.7 * this.setNumeros[getRandom()], 0.5, -45.21 * this.setNumeros[getRandom()]),
        new THREE.Vector3(133.75 * this.setNumeros[getRandom()], 0.5, -59.21 * this.setNumeros[getRandom()]),
        new THREE.Vector3(46.37 * this.setNumeros[getRandom()], 0.5, -92.21 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-69.33 * this.setNumeros[getRandom()], 0.5, -161.38 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-140.75 * this.setNumeros[getRandom()], 0.5, -172.27 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-168.88 * this.setNumeros[getRandom()], 0.5, -127.26 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-169.56 * this.setNumeros[getRandom()], 0.5, 47.71 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-158.82 * this.setNumeros[getRandom()], 0.5, 89.03 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-124.4 * this.setNumeros[getRandom()], 0.5, 82.57 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-75.52 * this.setNumeros[getRandom()], 0.5, 51.44 * this.setNumeros[getRandom()]),
        new THREE.Vector3(-36.07 * this.setNumeros[getRandom()], 0.5, 39.05),
        new THREE.Vector3(-29.75, 0.5, 34.38 * this.setNumeros[getRandom()]),
        new THREE.Vector3(7.51 * this.setNumeros[getRandom()], 0.5, 28.55 * this.setNumeros[getRandom()]), // CURVA ABAJO
        new THREE.Vector3(29.74 * this.setNumeros[getRandom()], 0.5, 56.14 * this.setNumeros[getRandom()]),
        new THREE.Vector3(70.5 * this.setNumeros[getRandom()], 0.5, 141.95 * this.setNumeros[getRandom()]),
        new THREE.Vector3(124.28 * this.setNumeros[getRandom()], 0.5, 160.02 * this.setNumeros[getRandom()]),
        new THREE.Vector3(168.47 * this.setNumeros[getRandom()], 0.5, 130.49 * this.setNumeros[getRandom()]),
        new THREE.Vector3(171.97, 0.5, 58.19),
      ]);
    }

    //  Generamos el spline y le ponemos material transparente para que no se visualice
    this.geometryLine = new THREE.Geometry();
    this.geometryLine.vertices = this.spline.getPoints(100);
    var material_visible = new THREE.MeshBasicMaterial({ color: 0xFF0000})
    var material_transparent = new THREE.MeshBasicMaterial({color: 0x000000,transparent: true,opacity: 0.01});

    var visibleSpline = new THREE.Line(this.geometryLine, material_transparent);

    //  Llamamos a la función que hace que los competidores hagan la carrera
    this.animarCompetidor(this.box_container, this.spline, this.meshCocheEnemigo);

    var that = this;

    //  Añadimos un listener para detectar colisiones con las secciones, así llevamos la cuenta
    //  de la posición relativa en la carrera
    this.box_container.addEventListener('collision', function(objeto, v, r, n) {

      if (objeto.id == 95) {
        that.seccion++;
        that.vueltas++;
        that.numsecciones++;
      }
      if (objeto.id == 96) {
        that.seccion++;
        that.numsecciones++;
      }
      if (objeto.id == 97) {
        that.seccion++;
        that.numsecciones++;
      }
      if (objeto.id == 98) {
        that.seccion++;
        that.numsecciones++;
      }
      if (objeto.id == 99) {
        that.seccion++;
        that.numsecciones++;
      }
    });

    //  Añadir la caja y el spline a la escena
    scene.add(this.box_container);
    scene.add(visibleSpline);
  }

  //  Crear el aspecto del coche competidor, el modelo es como el principal
  createCoche() {

    this.meshCocheEnemigo = new THREE.Object3D();

    var colorCarroceria = new THREE.MeshLambertMaterial({
      color: this.colorCoche
    });

    //  Construimos las cuatro ruedas

    this.ruedaDelanteDer = this.fabricaRuedas();
    this.ruedaDelanteDer.position.x = 1.5;
    this.ruedaDelanteDer.position.z = -1.3;
    this.ruedaDelanteDer.position.y = -0.5;

    this.ruedaDelanteIzq = this.fabricaRuedas();
    this.ruedaDelanteIzq.position.x = 1.5;
    this.ruedaDelanteIzq.position.z = 1.3;
    this.ruedaDelanteIzq.position.y = -0.5;

    this.ruedaDetrasDer = this.fabricaRuedas();
    this.ruedaDetrasDer.position.x = -1.5;
    this.ruedaDetrasDer.position.z = -1.3;
    this.ruedaDetrasDer.position.y = -0.5;

    this.ruedaDetrasIzq = this.fabricaRuedas();
    this.ruedaDetrasIzq.position.x = -1.5;
    this.ruedaDetrasIzq.position.z = 1.3;
    this.ruedaDetrasIzq.position.y = -0.5;

    //  Construimos la carrocería con el color deseado
    var carroceriaGeom = new THREE.BoxGeometry(5.2, 1.3, 2.5);
    this.carroceria = new THREE.Mesh(carroceriaGeom, colorCarroceria);

    //  Creamos las texturas de las ventanas
    const carFrontTexture = getCarFrontTexture();
    const carBackTexture = getCarFrontTexture();
    const carRightSideTexture = getCarSideTexture();
    const carLeftSideTexture = getCarSideTexture();

    carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    //  Generamos la cabina con las ventanas
    var cabinaGeom = new THREE.BoxGeometry(2.86, 1.04, 2);
    var cabina = new THREE.Mesh(cabinaGeom, [
      new THREE.MeshLambertMaterial({map: carFrontTexture}),
      new THREE.MeshLambertMaterial({map: carBackTexture}),
      new THREE.MeshLambertMaterial({color: 0xffffff}), // top
      new THREE.MeshLambertMaterial({color: 0xffffff}), // bottom
      new THREE.MeshLambertMaterial({map: carRightSideTexture}),
      new THREE.MeshLambertMaterial({map: carLeftSideTexture}),
    ]);

    //  Colocamos la cabina sobre la carrocería
    cabina.position.y = 1;

    //  Añadimos todo a la carrocería
    this.carroceria.add(cabina);
    this.carroceria.add(this.ruedaDelanteDer);
    this.carroceria.add(this.ruedaDelanteIzq);
    this.carroceria.add(this.ruedaDetrasDer);
    this.carroceria.add(this.ruedaDetrasIzq);
    
    this.carroceria.rotation.y = (-Math.PI / 2)
    
    //  Objeto final
    this.meshCocheEnemigo.add(this.carroceria);
    
  }
  
  //  Función para animar a los competidores, recibe el objeto a animar, su spline y su malla
  animarCompetidor(objeto, spline, mesh) {
    var that = objeto;

    //  Dividimos el recorrido en secciones
    //  El comienzo (de 0 a 0.2), está duplicado ya que cuando empieza el juego queremos
    //  Darle un efecto a la animación como si arrancasen el motor
    var origen1 = {p: 0.0}; 
    var destino1 = {p: 0.02};
    var animacion1 = new TWEEN.Tween(origen1)
      .to(destino1, 3000 * this.setNumeros[getRandom()])
      .easing(TWEEN.Easing.Exponential.In)
      .onUpdate(function() {
        //  Posicionamos el coche sobre el spline
        var posicion = spline.getPointAt(origen1.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen1.p);
        posicion.add(tangente);
        that.children[0].lookAt(posicion);
        //  Usamos la malla para que el coche siempre mire hacia delante
        mesh.lookAt(posicion);
        that.__dirtyRotation = true;
      })
      .delay(4000)
      .onComplete(function() {
        animacion2.start()
      }) 
      .start();
  
    // La 2º fase de la animación es hasta poco antes de la mitad
    // Cada fase tiene un tiempo preestablecido que fluctúa hacia arriba o
    // hacia abajo en función de la aleatoriedad
    var origen2 = {p: 0.02}; 
    var destino2 = {p: 0.45};
    var animacion2 = new TWEEN.Tween(origen2)
      .to(destino2, 13000 * this.setNumeros[getRandom()])
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        var posicion = spline.getPointAt(origen2.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen2.p);
        posicion.add(tangente);
        that.children[0].lookAt(posicion);
        mesh.lookAt(posicion);
        that.__dirtyRotation = true;
      })
      .onComplete(function() {
        animacion3.start()
      }); 

    var origen3 = {p: 0.45}; 
    var destino3 = {p: 1.0};
    var animacion3 = new TWEEN.Tween(origen3)
      .to(destino3, 13000 * this.setNumeros[getRandom()]) 
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        var posicion = spline.getPointAt(origen3.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen3.p);
        posicion.add(tangente);
        mesh.lookAt(posicion);
        that.children[0].lookAt(posicion);
        that.__dirtyRotation = true;
      })
      .onComplete(function() {
        animacion4.start()
      });

    //  Ya hemos dado una vuelta y para que el coche no frene como si estuviese comenzando
    //  establecemos esta animación
    var origen4 = {p: 0.0}; 
    var destino4 = {p: 0.02};
    var animacion4 = new TWEEN.Tween(origen4)
      .to(destino4, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        var posicion = spline.getPointAt(origen4.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen4.p);
        posicion.add(tangente);
        that.children[0].lookAt(posicion);
        mesh.lookAt(posicion);
        that.__dirtyRotation = true;
      })
      .onComplete(function() {
        animacion5.start()
      }); 

    var origen5 = {p: 0.02}; 
    var destino5 = {p: 0.45};
    var animacion5 = new TWEEN.Tween(origen5)
      .to(destino5, 13000 * this.setNumeros[getRandom()])
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        var posicion = spline.getPointAt(origen5.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen5.p);
        posicion.add(tangente);
        that.children[0].lookAt(posicion);
        mesh.lookAt(posicion);
        that.__dirtyRotation = true;
      })
      .onComplete(function() {
        animacion6.start()
      }); 

    var origen6 = {p: 0.45}; 
    var destino6 = {p: 1.0};

    var animacion6 = new TWEEN.Tween(origen6)
      .to(destino6, 13000 * this.setNumeros[getRandom()]) 
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        var posicion = spline.getPointAt(origen6.p);
        that.position.copy(posicion);
        that.__dirtyPosition = true;
        var tangente = spline.getTangentAt(origen6.p);
        posicion.add(tangente);
        mesh.lookAt(posicion);
        that.children[0].lookAt(posicion);
        that.__dirtyRotation = true;
      })
      .onComplete(function() {
        animacion4.start()
      })
    //  Transcurso de la animación: 1->2->3->
                                    //4->5->6-> vuelve a empezar desde el 4
  }

  //  Función que construye las ruedas
  fabricaRuedas() {
    var ruedaGeom = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
    ruedaGeom.rotateX(Math.PI / 2);
    var materialRueda = new THREE.MeshLambertMaterial({color: 0x333333});

    var rueda = new THREE.Mesh(ruedaGeom, materialRueda);
    return rueda;
  }

  //  Metodo que actualiza
  update() {

    //Evitar que el personaje se desestabilice
    this.box_container.rotation['x'] = 0;
    this.box_container.rotation['z'] = 0;
    this.box_container.rotation['y'] = 0;
    this.box_container.__dirtyRotation = true;

    //  Si soy el jugador en posición 3º y ya hemos hecho dos vueltas
    //  significa que el jugador principal va último (4º), por lo que
    //  se debe finalizar el juego y mostrar el Ranking
    if (this.vueltas == 2 && this.posicionCuadro == 3) {

      var target = document.getElementById('tabla');
      target.style.display = 'block';

      if (this.juegoFinalizado) {
        this.scene.finalizado = false;
        console.log("JUEGO FINALIZADO");
      }
    }
  }
}

//  Funciones para generar el color de las ventanas (gris) dentro del cubo blanco de la cabina
function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 64, 32);

  context.fillStyle = "#666666";
  context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 128, 32);

  context.fillStyle = "#666666";
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}

//  Función para obtener un número aleatorio entre 0 y 16, para así elegir un
//  factor para aplicar dentro del vector.
function getRandom() {
  return Math.floor(Math.random() * 16);
}