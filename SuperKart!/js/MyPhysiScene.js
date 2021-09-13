// Clase principal, donde se define la escena
class MyPhysiScene extends Physijs.Scene {

  constructor(myCanvas) {
    // El gestor de hebras
    Physijs.scripts.worker = './physijs/physijs_worker.js'
    // El motor de física de bajo nivel, en el cual se apoya Physijs
    Physijs.scripts.ammo = './ammo.js'
    super();

    //  Variables para controlar las posiciones y si paramos el render cuando finalice el juego
    this.posiciones;
    this.finalizado = true;

    // Crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Se establece el valor de la gravedad, negativo, los objetos caen hacia abajo
    this.setGravity(new THREE.Vector3(0, -33, 0));

    // El personaje principal, le pasamos la escena, las coordenadas x y z, el color del coche y un ID
    this.coche = new Coche(this, 159, 30, 0xA52523, 0);

    // Creamos a los competidores, le pasamos la escena, las coordenadas x y z, el color de cada competidor y un ID
    this.enemigo = new Enemigos(this, 171.65, 39.19, 0x00FF00, 1);
    this.enemigo2 = new Enemigos(this, 159.37, 48.83, 0x0000FF, 2);
    this.enemigo3 = new Enemigos(this, 171.97, 58.19, 0xFFFF00, 3);

    // Creamos un array con los competidores
    this.enemigos = [this.enemigo, this.enemigo2, this.enemigo3];

    //  Creamos las monedas, le pasamos la escena, las coordenadas x y z y le asignamos un ID
    this.moneda2 = new Moneda(this, 31.53, -100.82, 4);
    this.moneda3 = new Moneda(this, -53.14, -148.79, 5);
    this.moneda5 = new Moneda(this, -164.55, 8.13, 6);
    this.moneda7 = new Moneda(this, 90.40, 151.96, 7);
    this.moneda8 = new Moneda(this, 165.17, 112.24, 8);

    // Se crean y añaden luces a la escena
    this.createLights();

    // Creamos la camara
    this.createCamera();

    // Creamos el mapa, le pasamos la escena
    this.mapa = new Mapa(this);

    //Los elementos del html que vamos a ir modificando
    this.primero = document.getElementById('1');
    this.segundo = document.getElementById('2');

  }

  // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
  createRenderer(myCanvas) {

    // Se instancia un Renderer WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Activamos las sombras
    renderer.shadowMapEnabled = true;

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  /// Método que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
  onWindowResize() {
    this.setCameraAspect(window.innerWidth / window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Método que crea la cámara
  createCamera() {

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set(30, 10, 10);
    this.camera.lookAt(this.coche.coche.mesh.position);

    // Para hacer zoom en la cámara
    this.cameraControl = new THREE.TrackballControls(this.camera, this.renderer.domElement);
    this.cameraControl.noRotate = true;
  }

  //  Método que crea las luces y sombras
  createLights() {

    this.light2 = new THREE.AmbientLight(0xffffff );
    this.light2.position.set(20, 60, -15);

    this.light = new THREE.SpotLight( 0xffffff ); 
    this.light.position.set( 200, 250, 200 );  
    this.light.castShadow = true;  
    this.light.shadowMapWidth = 1024; 
    this.light.shadowMapHeight = 1024;  
    this.light.shadowCameraNear = 250; 
    this.light.shadowCameraFar = 750; 
    this.light.shadowCameraFov = 500; 
    this.light.visible=false;

    this.add( this.light );

    this.coche.coche.mesh.add(this.light2);
  }

  //  Método que se llama en update() para actualizar la posición de la camara
  getCamera() {

    //  Para que la cámara se sitúe tras el coche todo el tiempo
    var relativeCameraOffset = new THREE.Vector3(0, 25, -25);
    this.coche.coche.mesh.updateMatrixWorld(); // Para que la cámara no tiemble
    var cameraOffset = relativeCameraOffset.applyMatrix4(this.coche.coche.mesh.matrixWorld);

    this.camera.position.z = cameraOffset.z;
    this.camera.position.x = cameraOffset.x;

    this.camera.lookAt(this.coche.coche.mesh.position);

    return this.camera;
  }

  //Se define el aspecto de la cámara
  setCameraAspect(ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  update() {

    if (this.finalizado) // Mientras finalizado esté a true se renderiza la escena (lo usamos para parar el juego)
      requestAnimationFrame(() => this.update());

    //  Actualizamos el coche principal
    this.coche.update();

    //  Actualizamos los coches de los competidores
    this.enemigo.update();
    this.enemigo2.update();
    this.enemigo3.update();

    //  Actualizamos las monedas
    this.moneda2.update();
    this.moneda3.update();
    this.moneda5.update();
    this.moneda7.update();
    this.moneda8.update();

    //  Actualizamos los controles de la cámara (encargados de hacer el zoom)
    this.cameraControl.update();

    //  Situamos la luz (de sombras) donde se posicione el coche en todo momento
    this.light.position.set( this.coche.coche.mesh.position.x + 100, 250, this.coche.coche.mesh.position.z + 100 ); 

    //  Para calcular la velocidad que lleva el coche y colocarla en el velocímetro
    var velZ = this.coche.coche.mesh.getLinearVelocity().z.toFixed(2);  //  Obtenemos velocidades lineales en Z
    var velX = this.coche.coche.mesh.getLinearVelocity().x.toFixed(2);  //  Obtenemos velocidades lineales en x

    var velocidad = Math.sqrt(Math.pow(velZ, 2) + Math.pow(velX, 2)); //  Calculamos el módulo

    //  Indicamos el número de vueltas
    if (this.coche.vueltas == -1)
      this.primero.innerHTML = 1;
    else if (this.coche.vueltas == 2)
      this.primero.innerHTML = 2;
    else
      this.primero.innerHTML = this.coche.vueltas + 1;

    //  Llamamos a la función que calcula la distancia relativa y la posición relativa dentro de la carrera
    calcularDistancia(this);
    //  Modificamos en el html la posición
    this.segundo.innerHTML = this.coche.posicionCuadro;

    //  Variables necesarias para hacer funcionar el velocímetro
    let tacho = 0;
    let gas = 0;
    let turnSignalsStates = {}
    let iconsStates = {}

    //  Función necesaria para actualizar el velocímetro
    function redraw() {
      draw((velocidad * 0.005), tacho, gas, (velocidad).toFixed(2), turnSignalsStates, iconsStates);
    }
    redraw();

    //  Actualizamos las animaciones de los coches enemigos
    TWEEN.update();

    //  Para que funcione Vehicle de Physijs
    this.simulate();

    //  Actualizamos el renderer con la cámara
    this.renderer.render(this, this.getCamera());
  }

}

/// La función principal
$(function() {

  // Se crea la escena
  var scene = new MyPhysiScene("#WebGL-output");

  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener("resize", () => scene.onWindowResize());

  //  Para cuando se pulse el botón de restaurar se de la vuelta el coche, colocandose correctamente
  document.getElementById("restaurar").addEventListener("click", function() {
    scene.coche.coche.mesh.__dirtyRotation = true;
    scene.coche.coche.mesh.__dirtyPosition = true;
    scene.coche.coche.mesh.rotation['x'] = 0;
    scene.coche.coche.mesh.rotation['y'] = Math.PI / 2;
    scene.coche.coche.mesh.rotation['z'] = 0;
  });

  //  Para cuando se active el checkbox de las sombras se activen o se desactiven
  document.getElementById("shadows").addEventListener('change', function() {
    if (this.checked) {
      //  Activamos la luz de sombras
      scene.light.visible=true;
      //  Cambiamos el color a uno mas oscuro y que no se sature
      scene.light2.color.setHex( 0x404040 );
    } else {
      //  Desactivamos la luz de sombras
      scene.light.visible=false;
      //  Volvemos a poner la luz completamente blanca
      scene.light2.color.setHex( 0xffffff );
    }
  });

  //  Función para detectar las pulsaciones de teclas de control del coche tras pasar la cuenta atrás inicial
  function detectar() {
    window.addEventListener('keydown', function(ev) {
      switch (ev.keyCode) {
        case 65: // left
          scene.coche.input.direction = 1;
          break;

        case 87: // forward
          scene.coche.input.power = true;
          break;

        case 68: // right
          scene.coche.input.direction = -1;
          break;

        case 66: // brake 32
          scene.coche.input.power = false;
          break;

        case 83: // back
          scene.coche.input.power = true;
          scene.coche.input.rear = true;
          break;
      }
    });

    window.addEventListener('keyup', function(ev) {
      switch (ev.keyCode) {
        case 65: // left
          scene.coche.input.direction = null;
          break;

        case 87: // forward
          scene.coche.input.power = null;
          scene.coche.coche.setBrake(0.5, 2);
          scene.coche.coche.setBrake(0.5, 3);
          break;

        case 68: // right
          scene.coche.input.direction = null;
          break;

        case 66: // brake
          scene.coche.input.power = null;
          break;

        case 83: // back
          scene.coche.input.power = null;
          scene.coche.input.rear = null;
          break;
      }
    });
  }
  setTimeout(detectar, 4000); // Detectar tras 4 segundos

  // Finalmente, realizamos el primer renderizado.
  scene.update();
});