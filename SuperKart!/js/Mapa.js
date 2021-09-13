/**
 * Clase que genera el mapa.
 */
class Mapa {
  constructor(scene) {

    //  Definimos la textura del circuito, una imagen y los materiales necesarios
    var texture = new THREE.TextureLoader().load('../imgs/circuito.png');
    var material = new THREE.MeshPhongMaterial({map: texture});
    //  Material de textura del circuito
    var physiMaterial = Physijs.createMaterial(material, 1, 0.4);
    var material_transparent = new THREE.MeshBasicMaterial({color: 0x000000,transparent: true,opacity: 0.01});
    var physiMaterial_transparent = Physijs.createMaterial(material_transparent, 1, 0.1);

    //  Material para los muros, basado en una imagen
    var muro = new THREE.TextureLoader().load('../imgs/block.png');
    //  Repetición de la imagen a lo largo de los muros
    muro.wrapS = THREE.MirroredRepeatWrapping;
    muro.wrapT = THREE.MirroredRepeatWrapping;
    muro.repeat.set(30, 4);
    var material_muro = new THREE.MeshPhongMaterial({map: muro});
    var physiMaterial_muro = Physijs.createMaterial(material_muro, 1, 0.1);

    //  Material para la bandera de la linea de meta, basado en una imagen
    var bandera = new THREE.TextureLoader().load('../imgs/bandera.png');
    var meta = new THREE.MeshPhongMaterial({map: bandera});
    var physiMaterial_meta = Physijs.createMaterial(meta, 1, 0.4);

    //  Material para las barras de la linea de meta
    var material_barra = new THREE.MeshBasicMaterial({color: 0x95979b});
    var physiMaterial_barra = Physijs.createMaterial(material_barra, 1, 0.1);

    physiMaterial.wrapS = physiMaterial.wrapT = THREE.RepeatWrapping;

    //  Crear el suelo con la imagen del circuito
    var geometry = new THREE.BoxGeometry(400, 0.2, 400);
    geometry.translate(0, -0.1, 0);
    this.ground = new Physijs.BoxMesh(geometry, physiMaterial, 0);
    this.ground.receiveShadow = true;

    //  Formamos el fondo de la escena con imágenes que forman un cubo
    var path = "../imgs/background/";
    var format = ".png";
    var urls = [
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format,
    ];

    //  Cargamos el fondo
    var textureCube = new THREE.CubeTextureLoader().load(urls);
    scene.background = textureCube;

    //  PAREDES DELIMITADORES DEL MAPA

    //  Pared SUR
    geometry = new THREE.BoxGeometry(405, 30, 5);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
    var physiPared = new Physijs.BoxMesh(geometry, physiMaterial_transparent, 0);
    physiPared.position.z = 200;
    this.ground.add(physiPared);

    //  Pared NORTE
    physiPared = new Physijs.BoxMesh(geometry, physiMaterial_transparent, 0);
    physiPared.position.z = -200;
    this.ground.add(physiPared);

    //  Pared ESTE
    var geometry1 = new THREE.BoxGeometry(405, 30, 5);
    geometry1.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
    geometry1.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    physiPared = new Physijs.BoxMesh(geometry1, physiMaterial_transparent, 0);
    physiPared.position.x = 200;
    this.ground.add(physiPared);

    //  Pared OESTE
    physiPared = new Physijs.BoxMesh(geometry1, physiMaterial_transparent, 0);
    physiPared.position.x = -200;
    this.ground.add(physiPared);

    //  CREACIÓN MUROS INTERIORES
    geometry = new THREE.BoxGeometry(187, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -7.8;
    physiMuro.position.x = -3;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(125, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 56;
    physiMuro.position.x = 89;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(29, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 117;
    physiMuro.position.x = 104;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(153, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 39;
    physiMuro.position.x = 117;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(50.5, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -36;
    physiMuro.position.x = 91;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(14, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -44;
    physiMuro.position.x = 67.25;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(165.5, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -51.75;
    physiMuro.position.x = -14.25;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(85, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -95.5;
    physiMuro.position.x = -95.5;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(40.25, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -136.5;
    physiMuro.position.x = -114.25;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(154, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -58.5;
    physiMuro.position.x = -132.9;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(14, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 17;
    physiMuro.position.x = -140;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(41.8, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 38.5;
    physiMuro.position.x = -145.5;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(14, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 57.9;
    physiMuro.position.x = -138.25;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(29.25, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 42.75;
    physiMuro.position.x = -132.75;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(39.5, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 29.70;
    physiMuro.position.x = -113;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(40.25, 4, 3.5);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 10.8;
    physiMuro.position.x = -95;
    this.ground.add(physiMuro);

    //Muros que estan en las esquinas
    geometry = new THREE.BoxGeometry(187.5, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 142;
    physiMuro.position.x = -106;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(58, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = 170;
    physiMuro.position.x = -13.75;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(112, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -139, 5;
    physiMuro.position.x = 143.5;
    this.ground.add(physiMuro);

    geometry = new THREE.BoxGeometry(60, 4, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMuro = new Physijs.BoxMesh(geometry, physiMaterial_muro, 0);
    physiMuro.position.z = -170;
    physiMuro.position.x = 89;
    this.ground.add(physiMuro);

    //  FIN DE CREACIÓN MUROS INTERIORES

    //  CREACIÓN DE LINEA DE META
    //  Palo izquierdo
    geometry = new THREE.BoxGeometry(3, 35, 1);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_barra, 0);
    physiMeta.position.z = 17.5;
    physiMeta.position.x = 149.5;
    physiMeta.castShadow = true;
    this.ground.add(physiMeta);

    //  Palo derecho
    geometry = new THREE.BoxGeometry(3, 35, 1);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_barra, 0);
    physiMeta.position.z = 17.5;
    physiMeta.position.x = 182;
    physiMeta.castShadow = true;
    this.ground.add(physiMeta);

    //  Bandera de la linea de meta
    geometry = new THREE.BoxGeometry(32, 5, 3);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
    var physiMeta = new Physijs.BoxMesh(geometry, physiMaterial_meta, 0);
    physiMeta.position.z = 17.5;
    physiMeta.position.x = 165.7;
    physiMeta.position.y = 15;
    physiMeta.castShadow = true;
    this.ground.add(physiMeta);

    //  Creamos los delimitadores de sección
    
    var material_muro = new THREE.MeshBasicMaterial({color: 0xFF0000})

    this.muro1 = new MurosPosicion(scene, 163.9, 17.62, 0, 1);
    this.muro2 = new MurosPosicion(scene, 161.9, -27.62, 0, 2);
    this.muro4 = new MurosPosicion(scene, -135.2, -171.6, Math.PI / 2, 4);
    this.muro5 = new MurosPosicion(scene, -165.4, 57.4, 0, 5);
    this.muro6 = new MurosPosicion(scene, 117.8, 147.5, Math.PI / 2, 6);

    scene.add(this.ground);

  }
}