/**
 * Clase que genera los muros que delimitan secciones.
 */
class MurosPosicion {
    //Necesitamos la escena, la posicion x, la posicion z, la rotacion de los muros y el ID
    constructor(scene, posx, posz, rotacion, index) {
      this.posx = posx;
      this.posz = posz;
      this.rotacion = rotacion;
      this.index = index;
      this.scene = scene;

      //  Creamos el muro
      this.crearMuro(this.index);

      //  Lo añadimos a la escena
      scene.add(this.physiMesh);
    }

    //  Función para generar el objeto Muro
    crearMuro(){
        var material_muro = new THREE.MeshBasicMaterial({ color: 0xFF0000})
        var material_transparent = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.01 })

        var geometry = new THREE.BoxGeometry(100, 4, 12);
        this.physiMesh = new Physijs.BoxMesh(geometry, material_transparent, 0);

        //  Altura de los muros
        this.physiMesh.position.set(this.posx, -1.87, this.posz);
        this.physiMesh.rotation.set(0, this.rotacion, 0);
        this.physiMesh.__dirtyPosition = true;
        this.physiMesh.__dirtyRotation = true;
    }
  
  }