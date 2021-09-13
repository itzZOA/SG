/**
 * Clase que genera el coche del jugador principal
 */
class Coche {
  //Necesitamos la escena, la posición x y z donde se va a colocar el coche y el color del coche.
  constructor(scene, posx, posz, colorCoche) {
    this.posx = posx;
    this.posz = posz;
    this.colorCoche = colorCoche;
    // ID del jugador principal
    this.index = -1;
    // Nº de sección dentro de la vuelta
    this.seccion = 0;
    // Nº de secciones totales recorridas
    this.numsecciones = 0;
    // Distancia a la siguiente seccion
    this.distancia = 0;
    // Para llevar el control de las vueltas que llevamos
    this.vueltas = -1;
    // La posición dentro de la carrera
    this.posicionCuadro = 0;
    // Las monedas que lleva recogidas
    this.monedas = 0;
    // La velocidad extra que se le aplica por recoger una moneda
    this.extra = 0;
    // Comprobar si el juego ha finalizado
    this.juegoFinalizado = true;
    this.scene = scene;

    //  Aspecto del personaje
    this.createCoche(scene);

    //  Controlar el motor del coche
    this.input = {
      power: null,  // Encendido o apagado
      direction: null,  // La direccion de las ruedas
      steering: 0,  // La dirección del volante
      rear: null  // Marcha atrás
    };

    var that = this

    //  Añadimos un listen de eventos de tipo colisión para controlar 
    //  las secciones por las que va el jugador
    this.coche.mesh.addEventListener('collision', function(objeto, v, r, n) {

      // Si la colisión es con el muro que limita la sección 0 (meta), 
      // añadimos una vuelta y actualizamos las secciones
      if (objeto.id == 95 && that.seccion == 0) {
        that.vueltas++;
        that.seccion++;
        that.numsecciones++;
      }

      //  Hacemos lo mismo para las siguientes secciones
      if (objeto.id == 96 && that.seccion == 1) {
        that.seccion++;
        that.numsecciones++;
      }

      if (objeto.id == 97 && that.seccion == 2) {
        that.seccion++;
        that.numsecciones++;
      }

      if (objeto.id == 98 && that.seccion == 3) {
        that.seccion++;
        that.numsecciones++;
      }

      if (objeto.id == 99 && that.seccion == 4) {
        that.seccion++;
        that.numsecciones++;
      }
    });

  }

  //  Crear el aspecto del personaje
  createCoche(scene) {

    this.input;

    //  Creamos la carrocería del coche
    var colorCarroceria = new THREE.MeshLambertMaterial({color: this.colorCoche});
    var carroceriaGeom = new THREE.BoxGeometry(5.2, 1.3, 2.5);
    carroceriaGeom.rotateY(Math.PI / 2);
    this.carroceria = new THREE.Mesh(carroceriaGeom, colorCarroceria);

    //  Creamos la caja geométrica con Physijs
    this.carroceriaPhy = new Physijs.BoxMesh(carroceriaGeom,colorCarroceria);
    this.carroceriaPhy.position.y = 1.4;

    var cabinaGeom = new THREE.BoxGeometry(2.86, 1.04, 2);
    cabinaGeom.rotateY(Math.PI / 2);
    this.cabina = new THREE.Mesh(cabinaGeom, new THREE.MeshLambertMaterial({color: 0xFFFFFF}));

    //  Creamos las ventanas
    var cabinaVentanaFrontal = new THREE.BoxGeometry(0.2, 0.7, 1.75);
    cabinaVentanaFrontal.rotateY(Math.PI / 2);
    this.ventanaFrontal = new Physijs.BoxMesh(cabinaVentanaFrontal, new THREE.MeshLambertMaterial({color: 0x666666}));
    this.ventanaFrontal.position.y = 1.1;
    this.ventanaFrontal.position.z = 1.35;

    this.ventanaTrasera = new Physijs.BoxMesh(cabinaVentanaFrontal, new THREE.MeshLambertMaterial({color: 0x666666}));
    this.ventanaTrasera.position.y = 1.1;
    this.ventanaTrasera.position.z = -1.35;

    var cabinaVentanaLateral = new THREE.BoxGeometry(0.87, 0.7, 0.2)
    cabinaVentanaLateral.rotateY(Math.PI / 2);
    this.ventanaIzqda1 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({color: 0x666666}));
    this.ventanaIzqda1.position.y = 1.1;
    this.ventanaIzqda1.position.z = 0.6;
    this.ventanaIzqda1.position.x = -1;

    this.ventanaIzqda2 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({color: 0x666666}));
    this.ventanaIzqda2.position.y = 1.1;
    this.ventanaIzqda2.position.z = -0.6;
    this.ventanaIzqda2.position.x = -1;

    this.ventanaDcha1 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({color: 0x666666}));
    this.ventanaDcha1.position.y = 1.1;
    this.ventanaDcha1.position.z = 0.6;
    this.ventanaDcha1.position.x = 0.92;

    this.ventanaDcha2 = new Physijs.BoxMesh(cabinaVentanaLateral, new THREE.MeshLambertMaterial({color: 0x666666}));
    this.ventanaDcha2.position.y = 1.1;
    this.ventanaDcha2.position.z = -0.6;
    this.ventanaDcha2.position.x = 0.92;

    //  Finalizamos creación de Ventanas

    this.cabina.position.y = 1;

    //  Añadimos a la carrocería las ventanas y la cabina
    this.carroceriaPhy.add(this.ventanaFrontal);
    this.carroceriaPhy.add(this.ventanaTrasera);
    this.carroceriaPhy.add(this.ventanaDcha1);
    this.carroceriaPhy.add(this.ventanaDcha2);
    this.carroceriaPhy.add(this.ventanaIzqda1);
    this.carroceriaPhy.add(this.ventanaIzqda2);
    this.carroceriaPhy.add(this.cabina);

    //  Configuramos las sombras
    this.carroceriaPhy.castShadow = this.carroceriaPhy.receiveShadow = true;

    //  Creamos el coche mediante la funcionalidad Physijs de Vehicle
    this.coche = new Physijs.Vehicle(this.carroceriaPhy, new Physijs.VehicleTuning(
      10, //rigidez
      1.83,  //compresion
      0.28, //recorrido
      500.0,
      10.5,
      6000
    ));

    //  Posicionamos el coche

    this.coche.mesh.position.x = this.posx;
    this.coche.mesh.position.z = this.posz;
    this.coche.mesh.rotation.y = -Math.PI;
    this.coche.castShadow = this.coche.receiveShadow = true;

    //  Creamos las ruedas

    var ruedaGeom = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
    ruedaGeom.rotateZ(-Math.PI / 2);

    var materialRueda = new THREE.MeshLambertMaterial({
      color: 0x333333
    });

    scene.add(this.coche);

    //  Ajustamos las ruedas
    for (var i = 0; i < 4; i++) {
      this.coche.addWheel(
        ruedaGeom,
        materialRueda,
        new THREE.Vector3(
          i % 2 === 0 ? -1.3 : 1.3,
          -0.3, // Altura ruedas
          i < 2 ? 1.5 : -1.5 // Como de separadas estan las ruedas
        ),
        new THREE.Vector3(0, -1, 0), // Ruedas motrices
        new THREE.Vector3(-1, 0, 0),
        0.75, // Altura coche respecto a ruedas
        0.5,
        i < 2 ? false : true
      );
    }
  }

  //  Metodo que actualiza
  update() {

    //  Controlamos motor del coche
    if (this.input && this.coche) {
      //  Si la dirección no está controlada (ni se presiona A ni S)
      if (this.input.direction !== null) {
        this.input.steering += this.input.direction / 50;
        if (this.input.steering < -.1) this.input.steering = -.1; //  Grado de giro de las ruedas
        if (this.input.steering > .1) this.input.steering = .1;
      } else {
        this.input.steering *= 0.9;
      }
      // Indicamos qué ruedas son las de dirección
      this.coche.setSteering(this.input.steering, 0);
      this.coche.setSteering(this.input.steering, 1);

      //  Si el coche arranca
      if (this.input.power === true) {
        //  Si estamos dando marcha atrás le aplicamos fuerza negativa al motor
        if (this.input.rear === true) {
          this.coche.applyEngineForce(-15 - this.extra);
        } 
        //  Si vamos hacia delante se le aplica una fuerza al motor
        else {
          this.coche.applyEngineForce(30 + this.extra);
        }
      } 
      //  Si se presiona el freno de mano
      else if (this.input.power === false) {
        this.coche.setBrake(2, 2);
        this.coche.setBrake(2, 3);
      } 
      //  Si no se presiona W no se le aplica fuerza al motor
      else {
        this.coche.applyEngineForce(0);
      }
    }

    //  Si el número de vueltas dadas ya es dos mostramos el ranking y le indicamos a la escena prncipal
    //  que pare el renderizador
    if (this.vueltas == 2) {

      var target = document.getElementById('tabla');
      target.style.display = 'block';

      if (this.juegoFinalizado) {
        this.scene.finalizado = false;
        console.log("JUEGO FINALIZADO");
      }

    }

    //  Limitamos la velocidad para que el coche tenga una velocidad máxima en la carrera (50 km/h)
    if (this.coche.mesh.getLinearVelocity().x > 50) {

      this.coche.mesh.setLinearVelocity({x: 50,y: this.coche.mesh.getLinearVelocity().y,z: this.coche.mesh.getLinearVelocity().z});
      
    } else if (this.coche.mesh.getLinearVelocity().z > 50) {

      this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x,y: this.coche.mesh.getLinearVelocity().y,z: 50});

    } else if (this.coche.mesh.getLinearVelocity().x < -50) {

      this.coche.mesh.setLinearVelocity({x: -50,y: this.coche.mesh.getLinearVelocity().y,z: this.coche.mesh.getLinearVelocity().z});

    } else if (this.coche.mesh.getLinearVelocity().z < -50) {

      this.coche.mesh.setLinearVelocity({x: this.coche.mesh.getLinearVelocity().x,y: this.coche.mesh.getLinearVelocity().y,z: -50});

    }
  }
}