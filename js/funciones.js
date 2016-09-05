/*
* Funcion para mostrar un pop up informativo
* size: 'xsm', 'xsmall', 'sm', 'small', 'md', 'medium', 'lg', 'large', 'xlg', 'xlarge', 'full', 'auto'
* web para mirar mas opciones http://flwebsites.biz/jAlert/
*/
function mostrarAlerta(titulo,mensaje,color,tamaño) {

    $.jAlert({
        'title': titulo,
        'content': mensaje,
        'theme': color,
        'size': tamaño
    });

}