/**
 * Función para calcular la distancia.
 * 
 * En función de la sección en la que se encuentre el vehículo, calculamos la
 * distancia en línea recta con el delimitador de la sección siguiente.
 */
function calcularDistancia(scene){
    
    //  Obtenemos la posición del coche principal
    var posicionMiCoche = scene.coche.coche.mesh.position;
    var distancia;
    
    //  Sección para los competidores
    for(var i = 0; i < scene.enemigos.length; i++){
        //  Cargamos la posición del enemigo
        var posicionEnemigo = scene.enemigos[i].box_container.position;
        if(scene.enemigos[i].seccion == 0){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        if(scene.enemigos[i].seccion == 1){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro2.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        if(scene.enemigos[i].seccion == 2){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.x - scene.mapa.muro4.physiMesh.position.x), 2));
            scene.enemigos[i].distancia = distancia2;
        }

        if(scene.enemigos[i].seccion == 3){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro5.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        
        if(scene.enemigos[i].seccion == 4){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.x - scene.mapa.muro6.physiMesh.position.x), 2));
            scene.enemigos[i].distancia = distancia2;
        }
        if(scene.enemigos[i].seccion == 5){
            distancia2 = Math.sqrt(Math.pow((posicionEnemigo.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.enemigos[i].distancia = distancia2;
            scene.enemigos[i].seccion = 0;
        }

        if(scene.coche.seccion == 0){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 1){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro2.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 2){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.x - scene.mapa.muro4.physiMesh.position.x), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 3){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro5.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
        }
        
        if(scene.coche.seccion == 4){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.x - scene.mapa.muro6.physiMesh.position.x), 2));
            scene.coche.distancia = distancia;
        }
        if(scene.coche.seccion == 5){
            distancia = Math.sqrt(Math.pow((posicionMiCoche.z - scene.mapa.muro1.physiMesh.position.z), 2));
            scene.coche.distancia = distancia;
            scene.coche.seccion = 0;
        }

    }

    //  Llamamos a la función que calcula la posición relativa 
    //  en base a las mediciones de distancia
    calcularPosicion(scene);
}


/**
 * Función para calcular la posición relativa.
 * 
 * Distinguimos 3 casos:
 *  1º. Si el coche principal está en una sección anterior a la de los competidores --> Se le pone el último
 *  2º. Si el coche principal está en una sección posterior a la de los competidores --> Se le pone primero
 *  3º. Si el coche principal está en la misma sección que los competidores, se usa las distancias relativas
 *      con la siguiente sección calculadas en la función anterior, siendo la menor de las distancias el coche
 *      que se encuentra en primera posición
 */
function calcularPosicion(scene){

    //  Vector que contiene a los competidores y al coche principal
    var array = [];

    for(var i= 0; i < scene.enemigos.length; i++){
        array.push(scene.enemigos[i]);
    }

    array.push(scene.coche);

    //  Ordenamos por secciones (Caso 1 y 2)
    array.sort(function(a,b){
            return (b.numsecciones - a.numsecciones);
        }
    );

    //  Una vez ordenado por secciones, si se encuentran en la misma sección, se ordenan por distancia (Caso 3)
    array.sort(function(a,b){
        if(a.numsecciones == b.numsecciones)
                return (a.distancia - b.distancia);
        }
    );

    //  Actualizamos las posiciones en cada objeto
    for(var i = 0; i < array.length; i++){
        if(array[i].index == -1){
            scene.coche.posicionCuadro = i+1;
        }
        if(array[i].index == 1){

            scene.enemigos[0].posicionCuadro = i+1;
        }
        if(array[i].index == 2){
            scene.enemigos[1].posicionCuadro = i+1;
        }
        if(array[i].index == 3){
            scene.enemigos[2].posicionCuadro = i+1;
        }
    }

    // Obetenemos las posiciones
    var primero = array[0].index.toString();
    var primeroMonedas = array[0].monedas.toString();
    var segundo = array[1].index.toString();
    var segundoMonedas = array[1].monedas.toString();
    var tercero = array[2].index.toString();
    var terceroMonedas = array[2].monedas.toString();
    var cuarto = array[3].index.toString();
    var cuartoMonedas = array[3].monedas.toString();

    // Para formatear el ranking
    if(primero.includes("-1")){
        primero = primero.replace('-1', 'Tú');
    }
    else if(primero.includes("1")){
        primero = primero.replace("1", "Jugador verde");
    }
    else if(primero.includes("2")){
        primero = primero.replace("2", "Jugador azul");
    }
    else if(primero.includes("3")){
        primero = primero.replace("3", "Jugador amarillo");
    }

    if(segundo.includes("-1")){
        segundo = segundo.replace("-1", "Tú");
    }
    else if(segundo.includes("1")){
        segundo = segundo.replace("1", "Jugador verde");
    }
    else if(segundo.includes("2")){
        segundo = segundo.replace("2", "Jugador azul");
    }
    else if(segundo.includes("3")){
        segundo = segundo.replace("3", "Jugador amarillo");
    }

    if(tercero.includes("-1")){
        tercero = tercero.replace("-1", "Tú");
    }
    else if(tercero.includes("1")){
        tercero = tercero.replace("1", "Jugador verde");
    }
    else if(tercero.includes("2")){
        tercero = tercero.replace("2", "Jugador azul");
    }
    else if(tercero.includes("3")){
        tercero = tercero.replace("3", "Jugador amarillo");
    }

    if(cuarto.includes("-1")){
        cuarto = cuarto.replace("-1", "Tú");
    }
    else if(cuarto.includes("1")){
        cuarto = cuarto.replace("1", "Jugador verde");
    }
    else if(cuarto.includes("2")){
        cuarto = cuarto.replace("2", "Jugador azul");
    }
    else if(cuarto.includes("3")){
        cuarto = cuarto.replace("3", "Jugador amarillo");
    }

    // Formamos el ranking y lo mandamos al HTML
    var html = [];
    html.push('<div class="leaderboard" >');
    html.push('<div class="head">');
    html.push('<i class="fas fa-crown"></i>');
    html.push('<h1>RANKING</h1>');
    html.push('</div>');
    html.push('<div class="body">');
    html.push('<ol>');
    html.push('<li>');
    html.push('<mark>'+ primero +'</mark>');
    html.push('<small><i class="fas fa-coins"></i> '+ primeroMonedas +'</small>');
    html.push('</li>');
    html.push('<li>');
    html.push('<mark>'+ segundo +'</mark>');
    html.push('<small><i class="fas fa-coins"></i> '+ segundoMonedas +'</small>');
    html.push('</li>');
    html.push('<li>');
    html.push('<mark>' + tercero +'</mark>');
    html.push('<small><i class="fas fa-coins"></i> '+ terceroMonedas +'</small>');
    html.push('</li>');
    html.push('<li>');
    html.push('<mark>'+ cuarto +'</mark>');
    html.push('<small><i class="fas fa-coins"></i> '+ cuartoMonedas +'</small>');
    html.push('</li>');
    html.push('</ol>');
    html.push('</div>');
    html.push('<h3 style="text-align: center;padding-left: 10%"><a href=".">Volver a jugar</a></h3>');
    html.push('</div>');
    var target = document.getElementById('tabla');
    target.innerHTML = html.join('');

    scene.posiciones = primero;
}
