function checkOut() {
    if (LOGGED == true) {
        if (CART.length > 0) {
            console.log("Actualizar div");
            $('.ui-popup').popup('close');
            var html = '<div>' +
                '<center>' +
                '<h3> ¿Que deseas hacer con el pedido?</h3>' +
                '<br>' +
                '<a style="width:300px" onclick="displaySummary(\'list\');" data-role="button" data-icon="bullets" data-iconpos="right" data-theme="b" onclick="">Mostrar listado para recoger</a>' +
                '<br>' +
                '<a style="width:300px" onclick="displaySummary(\'home\');" data-role="button" data-icon="home" data-iconpos="right" data-theme="b" onclick="">Enviar a Casa</a>' +
                '<br>' +
                '<a style="width:300px" onclick="displaySummary(\'store\');" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b" onclick="">Recoger en Mi Tienda</a>' +
                '</center>' +
                '</div>';
            $("#divContent").html(html);
            $("#divContent").trigger('create');
            var n = nodeIds.length + 1;
            updateBackButton(nodeIds[n], nodeNames[n]);
        } else {
            alert("No hay productos");
        }
    } else {
        $('.ui-popup').popup('close');
        setTimeout(function () {
            REDIRECT = true;
            $("#popupLogin").popup("open");
        }, popupTimeout);
        console.log("No estás logado");
    }
}

function updateBackButton(originNode, originName) {
    if (nodeIds.length == 0) {
        nodeIds.push(0);
        nodeNames.push("Menú");
        nodeIds.push(originNode);
        nodeNames.push(originName);
    } else {
        nodeIds.push(originNode);
        nodeNames.push(originName);
    }
    $("#divBack").html('<div onclick="backPage(' + nodeIds[nodeIds.length - 2] + ', \'' + nodeNames[nodeNames.length - 2] + '\')"> <span  class="flaticon-leftarrow" style="font-size:14px; margin-right:10px">                   </span>' + nodeNames[nodeNames.length - 1] + '</div>');
}


function changeIdiom(idioma) {


    console.log("El idioma a cambiar es " + idioma);

    switch (idioma) {

    case "español":

        break;

    case "ingles":

        break;

    case "portugues":

        break;

    case "catalan":

        break;

    case "frances":

        break;

    default:

        break;



    }




}