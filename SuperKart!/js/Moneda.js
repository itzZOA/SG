class Moneda {
	// Constructor para la moneda
	constructor(scene, posx, posz, index) {
    //  Posiciones para colocar la moneda en el mapa
	  this.posx = posx;
	  this.posz = posz;
    //  Índice que identifica a la moneda
	  this.index = index
    //  La escena
	  this.scene = scene;
    //  El objeto de la moneda
	  this.meshMoneda = new THREE.Object3D();
	  
	  var that = this;
	  
    //  Llamamos a la función crear moneda
	  this.createMoneda(this.meshMoneda);
	  
	  //  Caja fisica de la moneda
	  var containerGeometry = new THREE.BoxGeometry(5.2, 3, 3);
	  
	  this.box_moneda = new Physijs.BoxMesh(
      containerGeometry,
      new THREE.MeshBasicMaterial({wireframe: true,opacity: 0.0,transparent: true}),
      1
	  );
	  
    //  Añadimos la moneda a la caja física
	  this.box_moneda.add(this.meshMoneda);
	  
	  this.box_moneda.position.set(this.posx, 2, this.posz);
	  this.box_moneda.__dirtyPosition = true;
	  
	  //  Añadimos la caja a la escena
	  this.scene.add(this.box_moneda);
	  
    //  Establecemos que cuando se produzca un evento de tipo colisión
    //  desaparezca la moneda y en caso de ser el jugador el que la recoge
    //  le aplicamos un bonus de velocidad. 
    //  Si la recoge cualquiera de los jugadores, se le suma a su contador
    //  de monedas.
	  this.box_moneda.addEventListener('collision', function(objeto, v, r, n) {
		if(objeto.id == 13) {
		  that.scene.remove(that.box_moneda);
		  that.scene.coche.monedas++;
		  that.scene.coche.coche.applyEngineForce(500);
		}
		if(objeto.id == 32) { // Competidor 1
		  that.scene.remove(that.box_moneda);
		  that.scene.enemigo.monedas++;
		}
		if(objeto.id == 41) { // Competidor 2
		  that.scene.remove(that.box_moneda);
		  that.scene.enemigo2.monedas++;
		}
		if(objeto.id == 50) { // Competidor 3
		  that.scene.remove(that.box_moneda);
		  that.scene.enemigo2.monedas++;
		}
	  });
	  
	}
	
	//  Creamos el objeto de la moneda
	createMoneda() {
	  
	  var that = this;
	  var materialLoader = new THREE.MTLLoader();
	  var objectLoader = new THREE.OBJLoader();
	  
    //  Cargamos el material
	  materialLoader.load('../models/Coin.mtl',
      function(materials) {
        //  Cargamos el objeto
        objectLoader.setMaterials(materials);
        objectLoader.load('../models/Coin.obj',
        function(object) {
          var modelo = object;
          that.meshMoneda.add(modelo);
        }, null, null);
      }
	  );
	}
	
	//Metodo que actualiza
	update() {
    //  Para que rote la moneda
	  this.meshMoneda.rotation['y'] += 0.1;

    //  Para que la moneda no se desestabilice
	  this.meshMoneda.rotation['x'] = 0;
	  this.meshMoneda.rotation['z'] = 0;
	  this.box_moneda.__dirtyRotation = true;
	  
	}
}