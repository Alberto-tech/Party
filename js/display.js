/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
*/

function displayNode(data, originNode, originName, linkImg, aux) {

    //console.log("DisplayNode-> Nodes es " + data.result + " link " + linkImg);

    console.log("Entramos al displayNode. Cargamos nuevos nodos");
    console.log(data);

    ID_NODE = originNode;

    num_personas_fiesta = 0;

    var len = data.nodes.length;

    if (parseInt(len) < parseInt(data.columns)) {
        console.log("Length " + len);
        len = data.columns;
    }

    var alturaMin = W_HEIGTH * 0.6;
    var filas = Math.ceil(len / data.columns);
    var count = 1;

    var aux_altura = parseInt(alturaMin / filas); //altura de la patanlla por el % del div partido por el numero de filas

    var alturaBox = parseInt(alturaMin / data.columns); // //obtenemos el valor en px 
    var alturaBox2 = (aux_altura / W_HEIGTH) * 100; //obtenemos el valor en % 


    if (parseInt(originNode) == 0) {
        //var altura_menu = "height:" + (heig_block * 0.8) + "px;";
        var heigth = (W_WIDTH * (0.95));
    } else {
        var heigth = (W_WIDTH * (0.93));
    }
    //var heigth = (W_WIDTH * (0.93));
    var heigth2 = (W_WIDTH * (0.04)); //se utiliza para el margen de separacion de las cajas

    var heig_block = parseInt(heigth / data.columns); // valor de cada caja
    var he_b_margin = parseInt(heigth2 / (data.columns - 1)); // valor de cada caja

    //var heigth_img = parseInt(alturaMin * 0.35);

    //console.log("Comprobamos las alturas");
    //console.log("alturaMin " + alturaMin + " filas " + filas + " heig_block " + heig_block + " alturaBox " + alturaBox + "");

    //console.log("*Filas " + filas + " Altura min " + alturaMin + "  Altura es : " + alturaBox + " aux_altura " + aux_altura);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;

        pantallaActual = "";

        if (aux && aux != "back") {
            //console.log("Eliminamos la pantalla -------------------------------------------------------");
            ISFIESTA = aux;
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
        }

        if (CART.length > 0) {
            $("#btn_finalizarpedido").show();
        }

        //PRODUCTS = [];
        //TEMP_PRODUCTS = [];

        if (originNode == 0) {
            loadMenu(data);
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
            PRODUCTS = [];
        } else {
            console.log("Nodo origen " + originNode + " nombre " + originName + "******************");
            updateBackButton(originNode, originName, linkImg);
        }

        //console.log("Seguimos despus de guardar la pantalla  " + data.columns);

        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a' style='margin-right:0px;'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d' style='margin-right:0px;'>";
            type = "horizontal";
            break;

        }

        var extra = "";
        console.log("Tipo " + type);

        switch (type) {
        case "horizontal":
            {
                LINKINT = "";
                htmlContent = grid;
                var aux_col = 1; //se utiliza para el margen de las cajas
                var aux_reinicio = 10;

                //console.log("Antes del for");
                //console.log(data.nodes.length);

                for (var i = 0; i < data.nodes.length; i++) {

                    //console.log("Dentro for");
                    aux_reinicio = 0;
                    //console.log("Margen es " + he_b_margin + " columnas " + data.columns + " aux " + aux_col);
                    if (parseInt(data.columns) == parseInt(aux_col)) {
                        he_b_margin = 0;
                        aux_col = 0;
                        aux_reinicio = 1;
                    }

                    aux_col++;


                    //solo se mostrar en el menu inicial de la app getNodes(0) diferenciamos entre los diferentes bloques del menu principal
                    if (originNode == 0) {

                        //comprobamos si existe algun nodo principal
                        //console.log("Este es el principal??? " + data.nodes[i].isMain);
                        if (parseInt(data.nodes[i].isMain) == 1) {
                            console.log("Este es principal " + data.nodes[i].isMain);
                            var valorSwitch = 7;
                        } else {
                            var valorSwitch = parseInt(data.nodes[i].type);
                        }
                        switch (valorSwitch) {
                        case 1: //catalogo
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 2: //promos
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 3: // asis fistas
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 4: // asis disfra
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            //extra = 'displayPantallaPreviaDisfraces(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 5: // sugerencias
                            extra = 'displayPantallaSugerencias()';
                            //extra = 'displayPopUpPantallaSugerencias()';//con select de usuario o dependiente
                            break;
                        case 6: // fuera tienda
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                            extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                            break;
                        }

                    } else { //mostramos los bloques sin ningun orden

                        extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';

                    }

                    if (parseInt(originNode) == 0) {
                        //var altura_menu = "height:" + (heig_block * 0.8) + "px;";
                        var altura_menu = "height:" + alturaBox + "px;";
                    } else {
                        var altura_menu = "";
                    }

                    if (position < parseInt(data.columns)) { //columnas que tendra la pantalla
                        switch (position) {
                        case 0:
                            block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + (originNode == 0 ? "" : "border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;") + '' + altura_menu + 'width:' + heig_block + 'px;margin-right: 1%;margin-bottom:1%;margin-left: 1.3%;">';
                            break;
                        case 1:
                            block = '<div class="ui-block-b"  data-corners="false" onclick="' + extra + '" style="' + (originNode == 0 ? "" : "border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;") + '' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 2:
                            block = '<div class="ui-block-c"  data-corners="false" onclick="' + extra + '" style="' + (originNode == 0 ? "" : "border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;") + '' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 3:
                            block = '<div class="ui-block-d"  data-corners="false" onclick="' + extra + '" style="' + (originNode == 0 ? "" : "border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;") + '' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 4:
                            block = '<div class="ui-block-e"  data-corners="false" onclick="' + extra + '" style="' + (originNode == 0 ? "" : "border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;") + '' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        }

                    } else {

                        position = 0;
                        block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + (originNode == 0 ? "" : "border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;") + '' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%;margin-left: 1.3%;">';


                    }

                    //var imgLinkExt = data.nodes[i].linkext.replace("wide", "bigPreview");
                    var imgLinkExt = data.nodes[i].linkext;

                    if (valorSwitch == 7) { //despues de la primera fila se mostrara el elemento principal que ocupa toda una fila

                        var element2 = '<div class="ui-block-a" style="width: 25%;height:' + alturaBox + 'px"></div><div class="ui-block-b" style="width: ' + heig_block + 'px;height:' + alturaBox + 'px"><a  data-corners="false" data-role="button" data-theme="f" style="background-color: lightgray;"><img src="' + imgLinkExt + '" style="width: 100px;height: 100px;" ><br><strong>' + data.nodes[i].name +
                            '</strong></a></div><div class="ui-block-c" style="width: 25%;height:' + alturaBox + 'px"></div>';

                        var element = block + '<div><a  data-corners="false" data-role="button" data-theme="f"><img src="' +
                            imgLinkExt + '" style="width: 150px;height:' + alturaBox + 'px"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';

                        count++;
                        htmlContent = htmlContent + element + element2;

                    } else {

                        if (parseInt(originNode) == 0) { //se carga el menu cuando se hace un getNodes(0)

                            pantallaActual = "menu";

                            var element = block + '<div style="position:absolute; display: table; height:' + alturaBox + 'px;width:' + heig_block + 'px;background-image:url(\'' + imgLinkExt + '\'); background-size:cover; background-position: top center; background-repeat: no-repeat;">' +
                                '<div style="width:' + heig_block + 'px;position:absolute; bottom:0; font-size:30px;color: white; text-align: center; display: block;text-transform: uppercase;">' + data.nodes[i].name + '</div></div>' +
                                '</div>';

                        } else {

                            pantallaActual = "";

                            //border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);text-transform: uppercase;
                            var element = block + //'<a  data-corners="false" data-role="button" data-theme="f" style="">' +
                                '<br><center><div style="height:' + (heig_block * 0.7) + 'px;min-width: ' + (heig_block * 0.8) + 'px;display: table-cell;vertical-align: middle;"><img src="' + imgLinkExt + '" style="width:' + (heig_block * 0.8) + 'px;max-height:' + (heig_block * 0.7) + 'px;"></div></center>' +
                                '<br>' +
                                '<label style="margin-bottom: 0px;text-align:center;line-height: ' + (heig_block * 0.15) + 'px;height: ' + (heig_block * 0.15) + 'px;overflow: hidden;text-overflow: ellipsis;background-color: rgb(23, 152, 209);color: rgb(255, 255, 255);text-transform: uppercase;">' + data.nodes[i].name + '</label>' +
                                //'</a>' +
                                '</div>';

                        }

                        htmlContent = htmlContent + element;

                    }

                    if (aux_reinicio == 1) {
                        he_b_margin = parseInt(heigth2 / (data.columns - 1));
                    }
                    position++;


                }

                htmlContent = htmlContent + '</div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                if (originNode != 0) {
                    $("#divHeader_catalogo").show();
                    $("#divHeader_menuInicial").hide();
                }

                break;
            };
        case "vertical":
            {

                LINKINT = linkImg;

                htmlContent = grid + " <div class='ui-block-a' align='right' style='width:50%;'><img src='" + linkImg + "' style='max-width: " + (W_WIDTH * 0.35) + "px;'></div>";
                htmlContent = htmlContent + '<div class="ui-block-b" align="left" style="width:50%;">';

                for (var i = 0; i < data.nodes.length; i++) {


                    if (data.nodes[i].name == "") {
                        var element = '<a  data-corners="false" data-role="button" data-theme="b" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + linkImg + '\')" style="border: 0px;width: 50%;margin: 1% 1% 1% 1%;"><label style="font-weight: bold;text-transform: uppercase;">' + data.nodes[i].name + '</label></a>';
                    } else {
                        var element = '<a  data-corners="false" data-role="button" data-theme="b" onclick="getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + linkImg + '\')" style="border: 0px;width: 50%;margin: 1% 1% 1% 1%;"><label style="font-weight: bold;text-transform: uppercase;">' + data.nodes[i].name + '</label></a>';
                    }
                    htmlContent = htmlContent + element;
                }

                htmlContent = htmlContent + '</div></div>';
                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');
                $("#divHeader_catalogo").show();
                $("#divHeader_menuInicial").hide();
                break;
            };
        }

    } else {

        console.log("Error en el envio");

    }

    translateButtons(idiomStore);

}

function refreshDisplayProducts(data, productAlter, id_produc) {

    //console.log(data);
    //console.log(productAlter);

    PRODUCTS.push(productAlter);

    AUX = 1;

    var htmlContent = "";
    var htmlContent_seccion = "";
    var new_htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;
    var seccion_titulo = "";
    var aux = {};
    aux = data;
    //console.log("Longitud de secciones es " + aux.length);

    for (var a = 0; a < data.length; a++) { //buscamos el producto alternativo

        for (var b = 0; b < data[a].typeproducts.length; b++) {

            if (data[a].typeproducts[b].id == id_produc) {

                for (var k = 0; k < data[a].typeproducts[b].caracteristics.length; k++) {

                    var caracteristicas = data[a].typeproducts[b].caracteristics[k];

                    if (caracteristicas.type == "9") {

                        var unidades = caracteristicas.name;
                        units = unidades.split(' ');
                        break;

                    } else {

                        units = 1;
                        continue;

                    }
                }

                /*cantidad = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units));
                productAlter.quantity = cantidad;
                productAlter.original = false; //este campo indica si el articulo ha sido sustituido o no
                productAlter.dedonde = nodeIds[nodeIds.length - 1];*/
                data[a].typeproducts.push(productAlter);
                break;
            }
        }
    }
    
    for (var j = 0; j < data.length; j++) {


        seccion_titulo = "<div id='tituloSeccion' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"

        switch (parseInt(COLUMS)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        switch (type) {
        case "horizontal":

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;

            for (var i = 0; i < data[j].typeproducts.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                var pro_seccion = data[j].typeproducts[i];
                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(COLUMS);

                if (position < parseInt(COLUMS)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }


                if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                    //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                    continue;
                } else {
                    precio = pro_seccion.price_x_region[0].totalPrice;
                }

                var count = pro_seccion.caracteristics.length;
                var caracteristicas = pro_seccion.caracteristics;

                for (var k = 0; k < count; k++) {

                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[k].type == "9") {
                        unidades = caracteristicas[k].name;
                        //console.log("Caracteristica encontrada");
                        aux_carac = 0;
                        break;
                    } else {
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;
                    }

                }

                var imgStock = "";
                var stock = parseInt(pro_seccion.stock_x_store);

                if (stock == 0) {
                    stock = parseInt(pro_seccion.stock_x_central_store);
                }

                if (parseInt(stock) > parseInt(pro_seccion.stock_min)) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (parseInt(stock) > 0 && parseInt(stock) <= parseInt(pro_seccion.stock_min)) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (parseInt(stock) == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                if (pro_seccion.name == "") {
                    continue;
                } else {
                    var titulo = pro_seccion.name;
                }

                var unidades_prod = 1;

                if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo
                    unidades_prod = 1;
                } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {
                    unidades_prod = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0]));
                } else { //mas personas que unidades del articulo
                    unidades_prod = 1;
                }

                if (aux_carac == 1) { //en el caso que no tengamos unidades se añade uno solo
                    unidades_prod = 1;
                }

                if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var displayNone = "display:none;"

                var nada = "";

                var imgLinkExt = pro_seccion.linkext.replace("wide", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + pro_seccion.id + '" class="circulo" style="width: 40px; ' + (id_produc == pro_seccion.id ? displayNone : nada) + 'height: 40px;position: absolute;">' +
                    '<label id="quantity' + pro_seccion.id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">' + unidades_prod + '</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + ID_NODE + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' (' + unidades + ') </strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');" style="' + (productAlter.id == pro_seccion.id ? displayNone : nada) + '">' + jsonIdiomas.asistente_fiestas.btn_añadir_prod + '</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="' + (productAlter.id != pro_seccion.id ? displayNone : nada) + '">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + pro_seccion.id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + pro_seccion.id + ',1);">+</button></div>' +
                    '</div></a></div>';

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent += '</div>';
            htmlContent_seccion = seccion_titulo + htmlContent;
            $('#popupListItems').popup('close');
            break;


        case "vertical":

            break;

        } //switch

        new_htmlContent += htmlContent_seccion;


    } //for secciones


    console.log("Len");
    console.log(CART.length);
    var precio = productAlter.price_x_region[0].totalPrice;

    /*if (CART.length < 1) {
        CART.push(productAlter);
        CART.ammount = parseInt(precio * parseInt(productAlter.quantity));
    } else {
        CART.push(productAlter);
        var ammount = parseInt(CART.ammount);
        CART.ammount = ammount + parseInt(precio * parseInt(productAlter.quantity));
    }*/

    $("#divContent").html(new_htmlContent);
    $("#divContent").trigger('create');
    //$("#btn_finalizarpedido").show();

    $("#popupCargando").popup("close");

    //updatePrecioTotalArticulo(); // TEMP !!
    //updateCarritoDisplay();
    TEMP_PRODUCTS=[];
    translateButtons(idiomStore);
    updateOpcionCompraProducto(); //actualizamos las opciones para la compra
    calcularTotalStoreOnline(); //añadimos los prod en tienda, web, etc
    updateCarritoDisplay();
    
}

/**
 *       updatePrecioTotalArticulo
 *
 *       Actualiza el precio total mostrado en función del precio del articulo y la cantidad de este.
 */
function updatePrecioTotalArticulo() {

    for (var i = 0; i < CART.length; i++) {

        var precioArticulo = parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice);

        //console.log('-> ACTUALIZANDO precio de procId: ' + CART[i].id + ' a precio por unidad: ' + parseFloat(CART[i].price_x_region[0].totalPrice));

        if (precioArticulo > 0.00) {
            $("#labelPrecioTotalProducto" + CART[i].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));
            $("#labelPrecioTotalProducto" + CART[i].id).show();
        }
    }
}

/**
 *       updateCarritoDisplay
 *
 *       Funcion que se encarga de actualizar la visualizacion del carrito i el boton finalizar pedido
 *       en funcion de los productos comprados i la pantalla actual.
 */
function updateCarritoDisplay() {

    var total = 0;

    for (var i = 0; i < CART.length; i++) {
        total = total + CART[i].quantity;
    }

    //var precio_persona = formatoNumero((CART.ammount / num_personas_fiesta), 2, ",", ".", "€");

    $("#spBtnPopupCartProducts").text(total);
    $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    $("#spPopupCartCount").text(total);
    $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

    if (CART.length < 1) {

        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP 

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");

    } else {

        //if (pantallaActual == 'Asistente fiestas') {
        //$("#spBtnAmountPerson").text(precio_persona + " x"); //TEMP
        //$("#userIcoCarrito").show();
        //}

        $("#btn_finalizarpedido").show();
        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        //console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }
}

function displayProducts(data, originNode, originName, param, param4) {

    PRODUCTS = [];

    console.log("DisplayProducts-> Nodo Origen Id " + originNode + " param4 " + param4 + " pantalla " + pantallaActual);

    $("#btn_finalizarpedido").removeClass("btn_disabled");

    var aux_carac = 0;

    if (data.result == 1 && pantallaActual == "Asistente fiestas" && param4 == "") { // Hay resultados

        AUX = 1;
        //PRODUCTS.push(data.products);
        PRODUCTS = PRODUCTS.concat(data.products);

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        updateBackButton(originNode, originName);


        if (pantallaActual == "Asistente disfraces") {
            console.log("Estamos en la pantalla ".pantallaActual);
        } else if (pantallaActual == "Asistente fiestas") {
            console.log("Estamos en la pantalla ".pantallaActual);
            num_personas_fiesta = $("#personas_fiesta").val();
        }

        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        switch (type) {
        case "horizontal":

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;
            //auxTest = data;

            console.log("Productos que tenemos asistente fiestas");
            console.log(data.products);

            for (var i = 0; i < data.products.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(data.columns);

                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;

                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }


                if (data.products[i].price_x_region.length == 0) { // si no tiene precio continuamos
                    //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }

                var count = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;

                /*for (var j = 0; j < count; j++) {

                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        //console.log("Caracteristica encontrada");
                        aux_carac = 0;
                        break;
                    } else {
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;

                    }

                }*/

                for (var k = 0; k < count; k++) {

                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[k].type == "9") {
                        unidades = caracteristicas[k].name;
                        //console.log("Caracteristica encontrada");
                        units = unidades.split(' ');
                        aux_carac = 0;
                        break;
                    } else {
                        //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                        aux_carac = 1;
                        continue;
                    }

                }


                var imgStock = "";
                var stock = parseInt(data.products[i].stock_x_store);

                if (stock == 0) {
                    stock = parseInt(data.products[i].stock_x_central_store);
                }

                if (parseInt(stock) > parseInt(data.products[i].stock_min)) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (parseInt(stock) > 0 && parseInt(stock) <= parseInt(data.products[i].stock_min)) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                    units = 1;
                }


                /*if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }*/

                if (data.products[i].name == "") {
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                var unidades_prod = 1;


                if (aux_carac == 1) { //en el caso que no tengamos unidades se añade uno solo
                    unidades_prod = 1;
                }

                if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo
                    unidades_prod = 1;
                } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {
                    unidades_prod = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0]));
                } else { //mas personas que unidades del articulo
                    unidades_prod = 1;
                }

                var imgLinkExt = data.products[i].linkext.replace("normalPreview", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;position: absolute;">' + //display: none;
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">' + unidades_prod + '</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 20px;overflow:hidden"><img src="' + imgStock + '" style="width: 40px;position:absolute;float:right;"></div>' + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' (' + unidades + ')</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addCartAsistFiestas(' + data.products[i].id + ');">' + jsonIdiomas.asistente_fiestas.btn_añadir_prod + '</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    //'<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-a" onclick="addToCart(' + data.products[i].id + ',-1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/menos_prod.png" style="width: 40px;"></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="addToCart(' + data.products[i].id + ',1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/msd.png" style="width: 40px;"></div>' +
                    //'<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';

            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');

            /*var aux = 0;
            // calculo del numero de articulos por producto
            for (var k = 0; k < data.products.length; k++) {

                //console.log("Calculamos los articulos para el carrito------------------------------------------------");
                aux = 0;
                var count = data.products[k].caracteristics.length;
                var caracteristicas = data.products[k].caracteristics;

                for (var j = 0; j < count; j++) {

                    if (caracteristicas[j].type == "9" && data.products[k].name != "" && data.products[k].price_x_region.length > 0) {

                        var num_uni = caracteristicas[j].name;
                        var units = num_uni.split(' ');

                        //console.log("Encontrada car. Unidades es " + units[0]);

                        if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo

                            //console.log("Unidades es1 " + units[0] + " se añade 1");
                            addToCart(data.products[k].id, 1);
                            aux = 1;

                        } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {

                            addToCart(data.products[k].id, Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                            //console.log("Math " + Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                            aux = 1;

                        } else { //mas personas que unidades del articulo
                            addToCart(data.products[k].id, 1);
                            aux = 1;
                        }

                        break;

                    }

                }

                //console.log("Aux es " + aux); // si es cerno no tiene unidades pondremos que es uno

                if (aux == 0 && data.products[k].name != "" && data.products[k].price_x_region.length > 0) { //en el caso que no tengamos unidades se añade uno solo
                    addToCart(data.products[k].id, 1);

                }
            }*/

            //mostrar los productos añadidos al carrito al cargar
            if (CART.length > 0) {

                for (var l = 0; l < data.products.length; l++) {

                    var prod = data.products[l]; //recorremos todos los productos

                    for (var n = 0; n < CART.length; n++) {

                        if (parseInt(CART[n].id) == parseInt(prod.id)) {

                            console.log("ACTUALIZAMOS LA LISTA SEGUN EL CARRITO");
                            displayItemOperations(CART[n].id, parseInt(CART[n].quantity));

                        }
                    }
                }
            }

            $("#popupCargando").popup("close");

            break;


        case "vertical":

            htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
            block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
            for (var i = 0; i < data.products.length; i++) {

                if (data.products[i].name == "") {
                    var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
                } else {
                    var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
                }

                htmlContent = htmlContent + element;

            }
            htmlContent = htmlContent + '</div></div></div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#divHeader_catalogo").show();
            $("#divHeader_menuInicial").hide();

            $("#popupCargando").popup("close");
            break;

        }

    } else if (data.result == 1 && pantallaActual == "Asistente fiestas" && param4 == "getProductsClassified") { // Hay resultados

        console.log("Cargamos la pantalla de productos");
        console.log(data);
        AUX = 1;

        if (PRODUCTS.length > 0) { //se añadido este if para no duplicar productos en PRODUCTS


            for (var c = 0; c < data.products.length; c++) { //guardamos los productos

                for (var d = 0; d < data.products[c].typeproducts.length; d++) {

                    añadirProductosArray(data.products[c].typeproducts[d]);

                }
            }

        } else {

            for (var c = 0; c < data.products.length; c++) { //guardamos los productos

                for (var d = 0; d < data.products[c].typeproducts.length; d++) {

                    data.products[c].typeproducts[d].original = true;
                    PRODUCTS = PRODUCTS.concat(data.products[c].typeproducts[d]);
                    PRODUCTS[d].original = true;

                }

            }

        }


        TEMP_PRODUCTS = data.products;

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = "";
        var htmlContent_seccion = "";
        var new_htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var seccion_titulo = "";

        updateBackButton(originNode, originName, "productos");


        if (pantallaActual == "Asistente disfraces") {
            //console.log("Estamos en la pantalla " + pantallaActual);
        } else if (pantallaActual == "Asistente fiestas" && (num_personas_fiesta == "" || num_personas_fiesta == undefined)) {
            //console.log("Estamos en la pantalla " + pantallaActual);
            num_personas_fiesta = $("#personas_fiesta").val();
        }

        var aux = {};
        aux = data.products;
        //console.log("Longitud de secciones es " + aux.length);

        for (var j = 0; j < data.products.length; j++) {

            //console.log("Entramos en la nueva visualizacion 2, jota es " + j);
            //console.log(aux[j]);

            seccion_titulo = "<div id='tituloSeccion" + j + "' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;display: inline-table;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"

            switch (parseInt(data.columns)) {
            case 1:

                grid = "<div class='ui-grid-a'>";
                type = "vertical";
                break;

            case 2:

                grid = "<div class='ui-grid-a'>";
                type = "horizontal";
                break;

            case 3:

                grid = "<div class='ui-grid-b'>";
                type = "horizontal";
                break;

            case 4:

                grid = "<div class='ui-grid-c'>";
                type = "horizontal";
                break;

            case 5:

                grid = "<div class='ui-grid-d'>";
                type = "horizontal";
                break;

            }

            switch (type) {
            case "horizontal":

                htmlContent = grid;
                position = "a";
                var precio;
                var unidades;

                for (var i = 0; i < data.products[j].typeproducts.length; i++) {

                    //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                    var pro_seccion = data.products[j].typeproducts[i];
                    var heigth = (W_WIDTH * (0.98));
                    var heig_block = heigth / parseInt(data.columns);

                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    }


                    if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                        //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                        continue;
                    } else {
                        precio = pro_seccion.price_x_region[0].totalPrice;
                    }

                    var count = pro_seccion.caracteristics.length;
                    var caracteristicas = pro_seccion.caracteristics;
                    var units = 1;

                    for (var k = 0; k < count; k++) {

                        //console.log("Caracteristica " + caracteristicas[j].type);
                        if (caracteristicas[k].type == "9") {
                            unidades = caracteristicas[k].name;
                            //console.log("Caracteristica encontrada");
                            units = unidades.split(' ');
                            aux_carac = 0;
                            break;
                        } else {
                            //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                            aux_carac = 1;
                            continue;
                        }

                    }

                    var imgStock = "";
                    var stock = parseInt(pro_seccion.stock_x_store);

                    if (stock == 0) {
                        stock = parseInt(pro_seccion.stock_x_central_store);
                    }

                    if (parseInt(stock) > parseInt(pro_seccion.stock_min)) {
                        imgStock = "css/maqueta/barraVerde.png";
                    } else if (parseInt(stock) > 0 && parseInt(stock) <= parseInt(pro_seccion.stock_min)) {
                        imgStock = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgStock = "css/maqueta/barraRojo.png";
                    }

                    if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                        //console.log("No tiene unidades saltamos el producto")
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        units = 1;
                    }

                    if (pro_seccion.name == "") {
                        continue;
                    } else {
                        var titulo = pro_seccion.name;
                    }

                    if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                        var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                            '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                            '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                            '</div>';
                    } else {
                        var displayWarning = "";
                    }

                    var unidades_prod = 1;

                    if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo
                        unidades_prod = 1;
                    } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {
                        unidades_prod = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0]));
                    } else { //mas personas que unidades del articulo
                        unidades_prod = 1;
                    }

                    if (aux_carac == 1) { //en el caso que no tengamos unidades se añade uno solo
                        unidades_prod = 1;
                    }


                    var imgLinkExt = pro_seccion.linkext.replace("normalPreview", "bigPreview");

                    var element = block +
                        '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                        '<div style="position: relative;overflow:hidden">' +
                        '<div id="circulo' + pro_seccion.id + '" class="circulo" style="width: 40px;height: 40px;position: absolute;">' +
                        '<label id="quantity' + pro_seccion.id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">' + unidades_prod + '</label>' +
                        '</div>' +
                        '<div style="float:right;width: 50px;padding-right: 20px;overflow:hidden"><img src="' + imgStock + '" style="width: 40px;position:absolute;float:right;"></div>' + displayWarning +
                        '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                        '<div class="contenedor">' + titulo + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                        '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' (' + unidades + ')</strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                        '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;">' +
                        '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');">' + jsonIdiomas.asistente_fiestas.btn_añadir_prod + '</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="display:none;">' +
                        //'<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                        '<div class="ui-block-a" onclick="addToCart(' + pro_seccion.id + ',-1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/menos_prod.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="addToCart(' + pro_seccion.id + ',1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/msd.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                        //'<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                        '</div></a></div>';

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;

                }

                htmlContent += '</div>';
                htmlContent_seccion = seccion_titulo + htmlContent;
                break;

            case "vertical":

                break;

            } //switch

            new_htmlContent += htmlContent_seccion;


        } //for secciones


        $("#divContent").html(new_htmlContent);
        $("#divContent").trigger('create');

        $("#popupCargando").popup("close");

        //mostrar los productos añadidos al carrito al cargar
        if (CART.length > 0) {

            for (var l = 0; l < data.products.length; l++) {

                for (var m = 0; m < data.products[l].typeproducts.length; m++) {

                    var prod = data.products[l].typeproducts[m]; //recorremos todos los productos

                    for (var n = 0; n < CART.length; n++) {

                        if (parseInt(CART[n].id) == parseInt(prod.id)) {

                            console.log("ACTUALIZAMOS LA LISTA SEGUN EL CARRITO");
                            displayItemOperations(CART[n].id, parseInt(CART[n].quantity));

                        }

                    }
                }
            }
        }

    } else if (data.result == 1 && pantallaActual == "Asistente disfraces" && param4 == "") { //getProductsClassified

        //PRODUCTS = PRODUCTS.concat(data.products);
        console.log("Productos");
        console.log(data);
        //añadirProductosArray(data.products);

        if (PRODUCTS.length > 0) { //se añadido este if para no duplicar productos en PRODUCTS

            for (var c = 0; c < data.products.length; c++) { //guardamos los productos

                añadirProductosArray(data.products[c]);

            }

        } else {

            for (var c = 0; c < data.products.length; c++) { //guardamos los productos

                data.products[c].original = true;
                PRODUCTS = PRODUCTS.concat(data.products[c]);

            }

        }


        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var aux_carac = 0;
        ID_NODE = originNode;
        console.log("Productos para el asistente de disfraces");

        updateBackButton(originNode, originName, "productos");

        console.log("Estamos en el " + pantallaActual);


        switch (parseInt(data.columns)) {
        case 1:

            grid = "<div class='ui-grid-a'>";
            type = "vertical";
            break;

        case 2:

            grid = "<div class='ui-grid-a'>";
            type = "horizontal";
            break;

        case 3:

            grid = "<div class='ui-grid-b'>";
            type = "horizontal";
            break;

        case 4:

            grid = "<div class='ui-grid-c'>";
            type = "horizontal";
            break;

        case 5:

            grid = "<div class='ui-grid-d'>";
            type = "horizontal";
            break;

        }

        switch (type) {
        case "horizontal":

            htmlContent = grid;
            position = "a";
            var precio;
            var unidades;

            //console.log("Sexo " + sexo + " talla " + talla);

            for (var i = 0; i < data.products.length; i++) {

                var heigth = (W_WIDTH * (0.98));
                var heig_block = heigth / parseInt(data.columns);

                var count_carac = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;
                var generoDisfraz = 0; //sexo del disfraz no es el seleccioando

                var count_uses = data.products[i].uses.length;
                var uses = data.products[i].uses;

                for (var j = 0; j < count_carac; j++) {
                    //console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        break;
                    } else {
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        aux_carac = 1;
                        continue;
                    }

                }


                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                if (position < parseInt(data.columns)) {

                    switch (position) {
                    case 0:

                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                        break;


                    case 1:

                        block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                        break;

                    case 2:

                        block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                        break;

                    case 3:

                        block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                        break;

                    case 4:

                        block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                        break;
                    }
                } else {
                    position = 0;
                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                }

                //en el caso que no tengamos el precio no se muestra el articulo
                if (data.products[i].price_x_region.length == 0) {
                    continue;
                } else {
                    precio = data.products[i].price_x_region[0].totalPrice;
                }

                if (data.products[i].name == "" || data.products[i].linkext == "") {
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                var imgStock = "";
                var stock = parseInt(data.products[i].stock_x_store);

                if (stock == 0) {
                    stock = parseInt(data.products[i].stock_x_central_store);
                }

                if (parseInt(stock) > parseInt(data.products[i].stock_min)) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (parseInt(stock) > 0 && parseInt(stock) <= parseInt(data.products[i].stock_min)) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (parseInt(stock) == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }


                //if (data.products[i].stock_x_store == 0) {
                if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("normalPreview", "bigPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 20px;overflow:hidden"><img src="' + imgStock + '" style="width: 40px;position:absolute;float:right;"></div>'
                    //'<img src="' + imgStock + '" style="position:absolute;float:right;width: 40px;height: 40px;">'
                    + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                    '<div class="contenedor">' + titulo + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' (' + unidades + ' )</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">' + jsonIdiomas.asistente_fiestas.btn_añadir_prod + '</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    //'<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-a" onclick="addToCart(' + data.products[i].id + ',-1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/menos_prod.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="addToCart(' + data.products[i].id + ',1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/msd.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                    //'<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';



                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';

            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');

            $("#popupCargando").popup("close");

            //mostrar los productos añadidos al carrito al cargar
            if (CART.length > 0) {

                for (var l = 0; l < data.products.length; l++) {

                    var prod = data.products[l]; //recorremos todos los productos
                    console.log("Prod " + prod.id);

                    for (var n = 0; n < CART.length; n++) {

                        if (parseInt(CART[n].id) == parseInt(prod.id)) {

                            console.log("ACTUALIZAMOS LA LISTA SEGUN EL CARRITO disfraces solo " + CART[n].id + " ene es " + n);
                            displayItemOperations(CART[n].id, parseInt(CART[n].quantity));

                        }

                    }

                }
            }

            break;


        case "vertical":

            htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
            block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
            for (var i = 0; i < data.products.length; i++) {

                if (data.products[i].name == "") {
                    var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                } else {
                    var element = '<a data-role="button" onclick="">' + data.products[i].name + '</a>';
                }

                htmlContent = htmlContent + element;

            }
            htmlContent = htmlContent + '</div></div></div>';
            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#divHeader_catalogo").show();
            $("#divHeader_menuInicial").hide();

            $("#popupCargando").popup("close");

            break;

        }



    } else if (data.result == 1 && pantallaActual == "catalogo") {

        //console.log("Entramos en la nueva visualizacion");
        console.log(data);
        AUX = 1;

        if (PRODUCTS.length > 0) { //se añadido este if para no duplicar productos en PRODUCTS


            for (var c = 0; c < data.products.length; c++) { //guardamos los productos

                for (var d = 0; d < data.products[c].typeproducts.length; d++) {

                    añadirProductosArray(data.products[c].typeproducts[d]);

                }
            }

        } else {

            for (var c = 0; c < data.products.length; c++) { //guardamos los productos

                for (var d = 0; d < data.products[c].typeproducts.length; d++) {

                    data.products[c].typeproducts[d].original = true;
                    PRODUCTS = PRODUCTS.concat(data.products[c].typeproducts[d]);
                    PRODUCTS[d].original = true;

                }

            }

        }

        TEMP_PRODUCTS = data.products;

        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = "";
        var htmlContent_seccion = "";
        var new_htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        var seccion_titulo = "";

        updateBackButton(originNode, originName);


        var aux = {};
        aux = data.products;
        //console.log("Longitud de secciones es " + aux.length);

        for (var j = 0; j < data.products.length; j++) {

            //console.log("Entramos en la nueva visualizacion 2, jota es " + j);
            //console.log(aux[j]);

            if (aux[j].type !== "empty") {
                seccion_titulo = "<div id='tituloSeccion" + j + "' style='display:flex;padding-top: 3px;padding-bottom: 3px;'><div style='width:5%'><hr></div><div style='width:auto;padding: 0px 1%;display: inline-table;'>" + aux[j].type + "</div><div style='width:100%'><hr></div></div>"
            }

            switch (parseInt(data.columns)) {
            case 1:

                grid = "<div class='ui-grid-a'>";
                type = "vertical";
                break;

            case 2:

                grid = "<div class='ui-grid-a'>";
                type = "horizontal";
                break;

            case 3:

                grid = "<div class='ui-grid-b'>";
                type = "horizontal";
                break;

            case 4:

                grid = "<div class='ui-grid-c'>";
                type = "horizontal";
                break;

            case 5:

                grid = "<div class='ui-grid-d'>";
                type = "horizontal";
                break;

            }

            switch (type) {
            case "horizontal":

                htmlContent = grid;
                position = "a";
                var precio;
                var unidades;

                for (var i = 0; i < data.products[j].typeproducts.length; i++) {

                    //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");
                    var pro_seccion = data.products[j].typeproducts[i];
                    var heigth = (W_WIDTH * (0.98));
                    var heig_block = heigth / parseInt(data.columns);

                    if (position < parseInt(data.columns)) {

                        switch (position) {
                        case 0:

                            block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                            break;

                        case 1:

                            block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                            break;

                        case 2:

                            block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                            break;

                        case 3:

                            block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                            break;

                        case 4:

                            block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                            break;
                        }
                    } else {
                        position = 0;
                        block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    }


                    if (pro_seccion.price_x_region.length == 0) { // si no tiene precio continuamos
                        //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                        continue;
                    } else {
                        precio = pro_seccion.price_x_region[0].totalPrice;
                    }

                    var count = pro_seccion.caracteristics.length;
                    var caracteristicas = pro_seccion.caracteristics;
                    var units = 1;

                    for (var k = 0; k < count; k++) {

                        //console.log("Caracteristica " + caracteristicas[j].type);
                        if (caracteristicas[k].type == "9") {
                            unidades = caracteristicas[k].name;
                            //console.log("Caracteristica encontrada");
                            units = unidades.split(' ');
                            aux_carac = 0;
                            break;
                        } else {
                            //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                            aux_carac = 1;
                            continue;
                        }

                    }

                    var imgStock = "";
                    var stock = parseInt(pro_seccion.stock_x_store);

                    if (stock == 0) {
                        stock = parseInt(pro_seccion.stock_x_central_store);
                    }

                    if (parseInt(stock) > parseInt(pro_seccion.stock_min)) {
                        imgStock = "css/maqueta/barraVerde.png";
                    } else if (parseInt(stock) > 0 && parseInt(stock) <= parseInt(pro_seccion.stock_min)) {
                        imgStock = "css/maqueta/barraAmarilla.png";
                    } else if (parseInt(stock) == 0) {
                        imgStock = "css/maqueta/barraRojo.png";
                    }

                    if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                        //console.log("No tiene unidades saltamos el producto")
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        units = 1;
                    }

                    if (pro_seccion.name == "") {
                        continue;
                    } else {
                        var titulo = pro_seccion.name;
                    }

                    if (pro_seccion.price_x_region[0].exclusiveWeb == 1 || pro_seccion.stock_x_store == 0) {
                        var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                            '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                            '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (pro_seccion.price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                            '</div>';
                    } else {
                        var displayWarning = "";
                    }

                    var imgLinkExt = pro_seccion.linkext.replace("normalPreview", "bigPreview");

                    var element = block +
                        '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                        '<div style="position: relative;overflow:hidden">' +
                        '<div id="circulo' + pro_seccion.id + '" class="circulo" style="display:none;width: 40px;height: 40px;position: absolute;">' +
                        '<label id="quantity' + pro_seccion.id + '" style="margin-top: 9px;font-size: 22px;color: white;"></label>' +
                        '</div>' +
                        '<div style="float:right;width: 50px;padding-right: 20px;overflow:hidden"><img src="' + imgStock + '" style="width: 40px;position:absolute;float:right;"></div>' + displayWarning +
                        '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + pro_seccion.id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                        '<div class="contenedor">' + titulo + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                        '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' (' + unidades + ')</strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                        '<strong><label id="labelPrecioTotalProducto' + pro_seccion.id + '" style="color:green;margin-top:5px;"></label></strong>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a" style="width: 100%;">' +
                        '<button  data-corners="false" data-theme="b" id="btnAddProduct' + pro_seccion.id + '" onclick="addCartAsistFiestas(' + pro_seccion.id + ');">' + jsonIdiomas.asistente_fiestas.btn_añadir_prod + '</button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="ui-grid-b" id="grid' + pro_seccion.id + '" style="display:none;">' +
                        //'<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                        '<div class="ui-block-a" onclick="addToCart(' + pro_seccion.id + ',-1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/menos_prod.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                        '<div class="ui-block-b" style="width:10%;"></div>' +
                        '<div class="ui-block-c" onclick="addToCart(' + pro_seccion.id + ',1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/msd.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                        //'<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                        '</div></a></div>';

                    htmlContent = htmlContent + element;
                    if (position == "c") {
                        htmlContent = htmlContent + grid;
                    }
                    position++;

                }

                htmlContent += '</div>';
                htmlContent_seccion = seccion_titulo + htmlContent;
                break;

            case "vertical":

                break;

            } //switch

            new_htmlContent += htmlContent_seccion;


        } //for secciones


        $("#divContent").html(new_htmlContent);
        $("#divContent").trigger('create');

        $("#popupCargando").popup("close");

        //mostrar los productos añadidos al carrito al cargar
        if (CART.length > 0) {

            for (var l = 0; l < data.products.length; l++) {

                for (var m = 0; m < data.products[l].typeproducts.length; m++) {

                    var prod = data.products[l].typeproducts[m]; //recorremos todos los productos

                    for (var n = 0; n < CART.length; n++) {

                        if (parseInt(CART[n].id) == parseInt(prod.id)) {

                            console.log("ACTUALIZAMOS LA LISTA SEGUN EL CARRITO");
                            displayItemOperations(CART[n].id, parseInt(CART[n].quantity));

                        }

                    }
                }
            }
        }

    } else {

        console.log("Error...");

    }

    translateButtons(idiomStore);

}


function añadirMasProductos(data, originNode, originName, param) {

    AUX = 1;
    PRODUCTS = PRODUCTS.concat(data.products);
    COLUMS = parseInt(data.columns);
    ID_NODE = originNode;
    var htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;
    var continuar = 0;

    switch (parseInt(COLUMS)) {
    case 1:
        type = "vertical";
        break;

    case 2:
        type = "horizontal";
        break;

    case 3:
        type = "horizontal";
        break;

    case 4:
        type = "horizontal";
        break;

    case 5:
        type = "horizontal";
        break;

    }

    switch (type) {
    case "horizontal":

        htmlContent = "";
        position = 0;
        var precio;
        var unidades;

        console.log("Cargamos mas productos en el catalogo");
        console.log(data.products);

        for (var i = 0; i < data.products.length; i++) {

            //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

            var heigth = (W_WIDTH * (0.98));
            var heig_block = heigth / parseInt(data.columns);

            if (POS_GRID == "A" && continuar == 0) { //continuamos por la ultima caja que tenemos
                position = 1;
                continuar = 1;
            } else if (POS_GRID == "B" && continuar == 0) {
                position = 2;
                continuar = 1;
            } else if (POS_GRID == "C" && continuar == 01) {
                position = 3;
                continuar = 1;
            } else if (POS_GRID == "D" && continuar == 0) {
                position = 4;
                continuar = 1;
            } else if (POS_GRID == "E" && continuar == 0) {
                position = 0;
                continuar = 1;
            }

            if (position < parseInt(data.columns)) {

                switch (position) {
                case 0:

                    block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                    POS_GRID = "A";
                    break;

                case 1:

                    block = '<div class="ui-block-b" style="width:' + heig_block + 'px;">';
                    POS_GRID = "B";
                    break;

                case 2:

                    block = '<div class="ui-block-c" style="width:' + heig_block + 'px;">';
                    POS_GRID = "C";
                    break;

                case 3:

                    block = '<div class="ui-block-d" style="width:' + heig_block + 'px;">';
                    POS_GRID = "D";
                    break;

                case 4:

                    block = '<div class="ui-block-e" style="width:' + heig_block + 'px;">';
                    POS_GRID = "E";
                    break;
                }

            } else {
                position = 0;
                block = '<div class="ui-block-a" style="width:' + heig_block + 'px;">';
                POS_GRID = "A";
            }

            if (data.products[i].price_x_region.length == 0) { // si no tiene precio continuamos
                //console.log("Producto " + data.products[i].id + " no tiene precio, no lo mostramos");
                continue;
            } else {
                precio = data.products[i].price_x_region[0].totalPrice;
            }

            if (data.products[i].name == "") {
                continue;
            } else {
                var titulo = data.products[i].name;
            }


            var count = data.products[i].caracteristics.length;
            var caracteristicas = data.products[i].caracteristics;

            for (var j = 0; j < count; j++) {

                //console.log("Caracteristica " + caracteristicas[j].type);
                if (caracteristicas[j].type == "9") {
                    unidades = caracteristicas[j].name;
                    //console.log("Caracteristica encontrada");
                    aux_carac = 0;
                    break;
                } else {
                    //console.log("Esta no es la carac buena, pasamos a la siguiente carac");
                    aux_carac = 1;
                    continue;

                }

            }

            var count_carac = data.products[i].caracteristics.length;
            var caracteristicas = data.products[i].caracteristics;


            for (var j = 0; j < count_carac; j++) {
                //console.log("Caracteristica " + caracteristicas[j].type);
                if (caracteristicas[j].type == "9") {
                    unidades = caracteristicas[j].name;
                    break;
                } else {
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                    continue;
                }

            }

            var imgStock = "";
            var stock = parseInt(data.products[i].stock_x_store);

            if (stock == 0) {
                stock = data.products[i].stock_x_central_store;
            }

            if (parseInt(stock) > parseInt(data.products[i].stock_min)) {
                imgStock = "css/maqueta/barraVerde.png";
            } else if (parseInt(stock) > 0 && parseInt(stock) <= parseInt(data.products[i].stock_min)) {
                imgStock = "css/maqueta/barraAmarilla.png";
            } else if (stock == 0) {
                imgStock = "css/maqueta/barraRojo.png";
            }

            //if (data.products[i].stock_x_store == 0) {
            if (data.products[i].price_x_region[0].exclusiveWeb == 1 || data.products[i].stock_x_store == 0) {
                var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                    '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                    //'<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                    '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + (data.products[i].price_x_region[0].exclusiveWeb == 0 ? jsonIdiomas.soloEnWeb : jsonIdiomas.exclusivoWeb) + '</div>' +
                    '</div>';
            } else {
                var displayWarning = "";
            }


            var element = block +
                '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);" class="ui-link ui-btn ui-btn-f ui-shadow" role="button">' +
                '<div style="position: relative;overflow:hidden">' +
                '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                '</div>' +
                '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>' + displayWarning +
                '<img src="' + data.products[i].linkext + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                '<div class="contenedor">' + titulo + '</div>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' (' + unidades + ')</strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;">' +
                '<button  data-corners="false" data-theme="b" class=" ui-btn ui-btn-b ui-shadow" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">' + jsonIdiomas.asistente_fiestas.btn_añadir_prod + '</button>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                //'<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                '<div class="ui-block-a" onclick="addToCart(' + pro_seccion.id + ',-1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/menos_prod.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                '<div class="ui-block-b" style="width:10%;"></div>' +
                '<div class="ui-block-c" onclick="addToCart(' + pro_seccion.id + ',1);" style="width: 45%;background-color: #0197d4;height: 45px;"><img src="img/msd.png" style="width: 45px;padding-bottom: 0px;"></div>' +
                //'<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                '</div></a></div>';



            htmlContent = htmlContent + element;
            if (position == "c") {
                htmlContent = htmlContent;
            }
            position++;

        }

        $("#gridCatalogo").append(htmlContent);

        break;


    case "vertical":

        htmlContent = grid + " <div class='ui-block-a' style='width:66%'><center><span class='flaticon-catalog-h' style='color:#EE7F01;'></span></center></div>";
        block = '<div class="ui-block-b" style="width:30%; margin: 2%"><div style="text-align:right">';
        for (var i = 0; i < data.products.length; i++) {

            if (data.products[i].name == "") {
                var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
            } else {
                var element = '<a  data-corners="false" data-role="button" onclick="">' + data.products[i].name + '</a>';
            }

            htmlContent = htmlContent + element;

        }
        htmlContent = htmlContent + '</div></div></div>';
        $("#divContent").append(htmlContent);
        break;

    }



}

/******************************************************************
    Enseña o esconde los botones de añadir o restar productos 
    Parametros:
    -0: mostrar botones de restar y sumas
    -else: esconderlos
******************************************************************/
function displayItemOperations(id, param, position, borrarItem) {

    if (param > 0) {
        //console.log("La cantidad que llega es " + param);
        $("#btnAddProduct" + id).hide();
        $("#grid" + id).show();
        $("#quantity" + id).text(param);
        $("#circulo" + id).show();

    } else {
        $("#btnAddProduct" + id).show();
        $("#grid" + id).hide();

        if (pantallaActual != "Asistente fiestas") {
            $("#circulo" + id).hide();
        }

        //$("#circulo" + id).text("2");
        for (var i = 0; i < CART.length; i++) { //TEMP añadimos la cantidad

            if (CART[i].id == id) {

                for (var k = 0; k < CART[i].caracteristics.length; k++) {

                    var caracteristicas = CART[i].caracteristics[k];

                    if (caracteristicas.type == "9") {

                        var unidades = caracteristicas.name;
                        units = unidades.split(' ');
                        break;

                    } else {

                        units = 1;
                        continue;

                    }
                }


                var cantidad = Math.ceil(parseInt(num_personas_fiesta) / parseInt(units));
                if (units == 1) var cantidad = 1;
                $("#quantity" + id).text(cantidad);
            }
        }


        //console.log('-------> No ocultamos el precio -----------'); // TEMP !!

        $("#labelPrecioTotalProducto" + id).hide();
        //CART.splice(position, 1);
        //console.log("BORRAMOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" + position);
        //console.log(CART);
    }

    if (borrarItem == "borrar") {
        CART.splice(position, 1);
    }

    updateCarritoDisplay();

    translateButtons(idiomStore);


}

function openPopupAction(param, id) {

    $("#lbpopupAction").text(param);
    $("#lbpopupAction").data('id', id);

    switch (param) {
    case 'deleteItem':

        $("#popupListItems").popup("close");
        setTimeout(function () {
            $("#popupAction").popup("open");
        }, popupTimeout);

        break;
    }

    translateButtons(idiomStore);
}

function openPopUpConfirmacionVaciarCarrito() {

    //console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    $("#popupListItems").popup("close");

    setTimeout(function () {
        $("#popupConfirmacionVaciarCarrito").popup("open");
    }, popupTimeout);
}


function getImgDisponibilidadStore(product) {

    var imgAvailability = "";
    var stock = parseInt(CART[product].stock_x_store);

    if (stock > parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock > 0 && stock <= parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }

    return imgAvailability;
}

function getImgDisponibilidadCentral(product) {

    var imgAvailability = "";
    var stock = parseInt(CART[product].stock_x_central_store);
    console.log("Stock " + stock);

    if (stock > parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock > 0 && stock <= parseInt(CART[product].stock_min)) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock <= 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }
    console.log("Stock " + imgAvailability);
    return imgAvailability;
}


function displayPopupItemList() { //cambios jordi

    var html = '';
    var html_store = '';
    var html_online = '';

    var precioTotalCesta = 0;
    var precioTotalProductosTienda = 0;
    var precioTotalProductosWeb = 0;

    //var tituloPopUp = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;">' + jsonIdiomas.popup_errores.tituloPopUp + '</h1><div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div></div>';
    var tituloPopUpTienda = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;width:500px;margin-left:150px;">' + jsonIdiomas.popup_errores.tituloPopUpDisponiblesTienda + '</h1><div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div></div>';
    var tituloPopUpWeb = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;width:500px;margin-left:150px;">' + jsonIdiomas.popup_errores.tituloPopUpDisponiblesWeb + '</h1>' + (CART.productosEnTienda <= 0 ? '<div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/vaciar.png" style="width:32px; heigth:30px;" /></div>' : '') + '</div>';

    var labelsBar = '<div data-role="header" style="background-color:#ffffff; height:30px;">' +
        '<div class="ui-block-e" style="width:8%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;color:#0197d4;">WEB</label></div>' +
        '<div class="ui-block-e" style="width:7%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;color:#0197d4;">Tienda</label></div>' +
        '<div class="ui-block-e" style="width:14%;float:right;margin-top:5px;"><label id="labelPopUpItemListPrice" style="text-align: center;color:#0197d4;">STOCK EN:</label></div>' +
        '</div>';

    //productosEnTienda = 0;
    //productosEnWeb = 0;

    for (var i = 0; i < CART.length; i++) { // develop 2

        var imgLinkExt = CART[i].linkext;

        var srcTienda = getImgDisponibilidadStore(i);
        var srcCentral = getImgDisponibilidadCentral(i);

        if (CART[i].quantity > 0) {

            if (CART[i].stock_x_store > 0) {

                //var src = getImgDisponibilidad(i);

                //productosEnTienda++;

                console.log('Añadimos un articulo de tienda');
                console.log(CART[i]);

                var price = parseFloat(parseInt(CART[i].store_quantity) * CART[i].price_x_region[0].totalPrice).toFixed(2);

                precioTotalProductosTienda += price;

                html_store = html_store +
                    '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' + //margin-left: 2%;
                    '<div class="ui-grid-b">' +
                    '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
                    '<div class="ui-block-b" style="width:35%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align:center;color:#0197d4;">' + CART[i].name + '<br/> ' + CART[i].sku + ' - ' + CART[i].providerVendor + '</label></div>' +
                    '<div class="ui-block-c" style="width:52%;">' +
                    '<div class="ui-grid-d">' +
                    '<div class="ui-block-a" style="width:10%;" id="div_resta' + CART[i].id + '"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1,1);"></a></div>' + //setTimeout(function () {displayPopupItemList();}, 550);
                    '<div class="ui-block-b" style="width:10%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 25%;color:#0197d4;">' + parseInt(CART[i].store_quantity) + '</label></div>' +
                    '<div class="ui-block-c" style="width:16%;" id="div_suma' + CART[i].id + '"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1,1);"></a></div>' + //setTimeout(function () {displayPopupItemList();}, 550);
                    '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 15%;color:#0197d4;">' + price + ' €</label></div>' +
                    '<div class="ui-block-e" style="width:70px; height:40px;"><a id="div_eliminar' + CART[i].id + '" onclick="openPopupAction(\'deleteItem\',' + CART[i].id + '); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcTienda + '" /></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcCentral + '" /></div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';

                if (CART[i].online_quantity > 0) { //el prod tambien esta online

                    console.log('Añadimos el articlo tambien en online');

                    var price = parseFloat(CART[i].online_quantity * CART[i].price_x_region[0].totalPrice).toFixed(2);

                    html_online = html_online +
                        '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' +
                        '<div class="ui-grid-b">' +
                        '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
                        '<div class="ui-block-b" style="width:35%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;color:#0197d4;">' + CART[i].name + '<br/> ' + CART[i].sku + ' - ' + CART[i].providerVendor + '</label></div>' +
                        '<div class="ui-block-c" style="width:52%;">' +
                        '<div class="ui-grid-d">' +
                        '<div class="ui-block-a" style="width:10%;" id="div_resta' + CART[i].id + '_2"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1,1);"></a></div>' + //setTimeout(function () {displayPopupItemList();}, 550);
                        '<div class="ui-block-b" style="width:10%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 25%;color:#0197d4;">' + parseInt(CART[i].online_quantity) + '</label></div>' +
                        '<div class="ui-block-c" style="width:16%;" id="div_suma' + CART[i].id + '_2"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1,1);"></a></div>' + //setTimeout(function () {displayPopupItemList();}, 550);
                        '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 15%;color:#0197d4;">' + price + ' €</label></div>' +
                        '<div class="ui-block-e" style="width:70px; height:40px;"><a id="div_eliminar' + CART[i].id + '_2" onclick="openPopupAction(\'deleteItem\',' + CART[i].id + ');$(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
                        '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcTienda + '" /></div>' +
                        '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcCentral + '" /></div>' +
                        '</div>' +
                        '</div>' +
                        '</li>';

                }

            } else if (CART[i].stock_x_central_store > 0) {

                //productosEnWeb++;

                console.log('Añadimos un articulo de online');

                var price = parseFloat(CART[i].quantity * CART[i].price_x_region[0].totalPrice).toFixed(2);

                precioTotalProductosWeb += price;

                html_online = html_online +
                    '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' +
                    '<div class="ui-grid-b">' +
                    '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
                    '<div class="ui-block-b" style="width:35%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;color:#0197d4;">' + CART[i].name + '<br/> ' + CART[i].sku + ' - ' + CART[i].providerVendor + '</label></div>' +
                    '<div class="ui-block-c" style="width:52%;">' +
                    '<div class="ui-grid-d">' +
                    '<div class="ui-block-a" style="width:10%;" id="div_resta' + CART[i].id + '"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1,1);"></a></div>' + // setTimeout(function () {displayPopupItemList();}, 250);
                    '<div class="ui-block-b" style="width:10%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 25%;color:#0197d4;">' + parseInt(CART[i].quantity) + '</label></div>' +
                    '<div class="ui-block-c" style="width:16%;" id="div_suma' + CART[i].id + '"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1,1);"></a></div>' + //setTimeout(function () {displayPopupItemList();}, 250);
                    '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 15%;color:#0197d4;">' + price + ' €</label></div>' +
                    '<div class="ui-block-e" style="width:70px; height:40px;"><a id="div_eliminar' + CART[i].id + '" onclick="openPopupAction(\'deleteItem\',' + CART[i].id + ');$(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcTienda + '" /></div>' +
                    '<div class="ui-block-e" style="width:12%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + srcCentral + '" /></div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }
        }
    }

    var listadoProdTienda = tituloPopUpTienda + labelsBar + html_store;
    var listadoProdOnLine = tituloPopUpWeb + labelsBar + html_online;
    //getSendPrice();
    html = '<div style="width: 100%; height:600px; overflow: scroll;">' +
        //(CART.productosEnTienda > 0 ? listadoProdTienda : '') + (CART.productosSoloEnWeb > 0 ? listadoProdOnLine : '') + '</div>' +
        (html_store != '' ? listadoProdTienda : '') + (html_online != '' ? listadoProdOnLine : '') + '</div>' +
        //'<div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="opcionesPago();">' +
        //'<label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label>'+
        //'</div>' +
        '<div id="btn_nuevo" onclick="opcionesPago();" style="height: 65px;background-color:#0097d3;" class="ui-grid-c">' +
        '<div class="ui-block-a" style="width: 10%;margin-top: 10px;"></div>' +
        '<div class="ui-block-b" style="width: 58%;margin-top: 10px;">' +
        '<div style="border:2px solid white;border-radius:25px;height:45px;width:65%;margin-left: 130px;" class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 19%;"><img src="img/play_button.png" style="width: 45px;"></div>' +
        '<div class="ui-block-b" style="width: 75%;"><label style="margin-top:5px;font-size:25px;text-transform:uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>' +
        '</div></div>' +
        '<div class="ui-block-c" style="width:32%;text-transform:uppercase;margin-top: 10px;">' +
        '<div class="ui-block-a"><label style="color:white;margin-top:19px;">Total cuenta: </label></div>' +
        '<div class="ui-block-b" style="margin-left: 8px;"><label style="font-size: 30px;color:white;margin-top:5px;" id="total_popup">' + formatoNumero(CART.ammount, 2, ",", ".", "€") + ' </label></div></div>' +
        '</div>';


    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    switch (CART.length) {
    case 0:

        console.log("No hay items");
        break;

    default:

        $("#popupCart").popup("close");
        setTimeout(function () {

            $("#popupListItems").popup("open");
        }, popupTimeout);

    }
    translateButtons(idiomStore);

    if (pantallaActual == "opciones de pago" || pantallaActual == "opciones envio" || pantallaActual == "sistemas pago") {

        $("#btn_finalizar_pedido_popup").addClass("btn_disabled");

        for (var i = 0; i < CART.length; i++) {

            $("#div_suma" + CART[i].id).addClass("btn_disabled");
            $("#div_resta" + CART[i].id).addClass("btn_disabled");
            $("#div_eliminar" + CART[i].id).addClass("btn_disabled");

            if (CART[i].online_quantity > 0) {

                $("#div_suma" + CART[i].id + "_2").addClass("btn_disabled");
                $("#div_resta" + CART[i].id + "_2").addClass("btn_disabled");
                $("#div_eliminar" + CART[i].id + "_2").addClass("btn_disabled");

            }

        }

    } else {

        $("#btn_finalizarpedido").removeClass("btn_disabled");
        $("#btn_finalizar_pedido_popup").removeClass("btn_disabled");

        for (var i = 0; i < CART.length; i++) {

            $("#div_suma" + CART[i].id).removeClass("btn_disabled");
            $("#div_resta" + CART[i].id).removeClass("btn_disabled");
            $("#div_eliminar" + CART[i].id).removeClass("btn_disabled");

            if (CART[i].online_quantity > 0) {

                $("#div_suma" + CART[i].id + "_2").removeClass("btn_disabled");
                $("#div_resta" + CART[i].id + "_2").removeClass("btn_disabled");
                $("#div_eliminar" + CART[i].id + "_2").removeClass("btn_disabled");

            }

        }
    }
}

function displayItemAlter(id_prod_alter, id_product, idnode) {

    var aux_prod;
    var aux_cart;

    for (var i = 0; i < PRODUCTS_ALTER.length; i++) {

        if (parseInt(PRODUCTS_ALTER[i].id) == parseInt(id_prod_alter)) {
            aux_prod = PRODUCTS_ALTER[i];
            break;

        }
    }

    for (var j = 0; j < CART.length; j++) {
        console.log("Id " + id_product + " car id " + CART[j].id);
        if (parseInt(CART[j].id) == parseInt(id_product)) {
            aux_cart = CART[j];
        }
    }

    var imgAvailability = "";
    var stock = parseInt(aux_prod.stock_x_store);

    if (stock == 0) {
        stock = parseInt(aux_prod.stock_x_central_store);
    }

    if (stock > parseInt(aux_prod.stock_min)) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock > 0 && stock <= parseInt(aux_prod.stock_min)) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }

    var html = '';

    if (aux_prod.definition == "NULL") {
        var definition = aux_prod.short_name;
    } else {
        var definition = aux_prod.definition;
    }

    var imgLinkExt = aux_prod.linkext.replace("normalPreview", "bigPreview");

    var sec = mod = pos = "";

    if (aux_prod.position_x_store.section != undefined) {
        sec = aux_prod.position_x_store.section;
    }
    if (aux_prod.position_x_store.module != undefined) {
        mod = aux_prod.position_x_store.module;
    }
    if (aux_prod.position_x_store.position != undefined) {
        pos = aux_prod.position_x_store.position;
    }

    html = '<ul data-role="listview" data-inset="true">' +
        //'<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + aux_prod.name + ' - ' + aux_prod.sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + aux_prod.quantity + '</span></li>' +
        '<li data-role="list-divider" data-theme="c"><span style="margin-right: 6%;">' + aux_prod.name + ' - ' + aux_prod.sku + '</span><span style="margin-right: 1%;";>STOCK TIENDA: ' + PRODUCTS[i].stock_x_store + '</span><span>STOCK ONLINE: ' + PRODUCTS[i].stock_x_central_store + '</span></li>' +
        '<li>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="width: 325px;max-height: 350px;"></div>' +
        '<div class="ui-block-b">' +
        '<br><label style="font-size: 20px;margin-top:5px;"><h1>Precio: ' + parseFloat(aux_prod.price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
        '<p><strong style="font-size: 15px;margin-top:5px;"> Ubicación: ' + sec + ' ' + mod + ' ' + pos + ' </strong></p>' +
        '<p><strong style="font-size: 15px;margin-top:5px;"> Descripción: </strong></p>' +
        '<strong style=""><p style="white-space: initial;font-size: 15px;margin-top:5px;">' + definition + '</p></strong>' +
        '<p class="ui-li-aside"><img src="' + imgAvailability + '" style="width:50px;"></p>' +
        '</div></div>' +
        '</ul>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><a data-corners="false" data-role="button" data-theme="b" data-iconpos="notext" onclick="volver(' + id_product + ',' + idnode + ');">VOLVER</a></div>' +
        '<div class="ui-block-b" style="width:50%;"><a data-corners="false" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCartAlter(' + aux_prod.id + ',' + id_product + ');">Sustituir</a></div>' +
        '</div>';

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    $("#cantidad_prod_alter").text(aux_prod.quantity);

    switch (CART.length) {
    case 0:
        //console.log("No hay items");
        break;
    default:
        $("#popupCart").popup("close");
        setTimeout(function () {
            $("#popupListItems").popup("open");
        }, popupTimeout);
    }
}

function displayAlternativeProducts(idnode, idproduct, cantidad) {

    console.log("Productos alternativos");
    console.log(PRODUCTS_ALTER);

    var productList = PRODUCTS_ALTER;

    var carrusel = "";

    //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");

    if (productList != null) {

        for (var i = 0; i < productList.length; i++) {

            var prod_alt = productList[i];

            var aux = jQuery.isEmptyObject(prod_alt.linkext); // si es false es que no esta vacio

            if (aux == false && prod_alt.price_x_region[0] != "undefined") {

                if (prod_alt.price_x_region.length > 0) {

                    var imgLinkExt = prod_alt.linkext.replace("wide", "bigPreview");

                    var click = 'onclick="displayItemAlter(' + prod_alt.id + ',' + idproduct + ',' + idnode + ');"';
                    //var nada = "";
                    //+ (cantidad == 0 ? nada : click) +

                    carrusel = carrusel + '<div class="swiper-slide" style="height: 175px;"><ul>' +
                        '<li style="list-style-type: none;">' +
                        '<img ' + click + ' src="' + imgLinkExt + '" style="max-width: 75px;max-height: 75px;">' +
                        '</li>' +
                        '<li style="list-style-type: none;" >' +
                        '<label ' + click + ' style="color:rgb(0, 128, 0);">' + formatoNumero(prod_alt.price_x_region[0].totalPrice, 2, ",", ".", "€") + '</label>' +
                        '</li>' +
                        '<li style="list-style-type: none;">' +
                        '<div ' + click + ' style="white-space: normal;font-size: 14px;"><strong>' + prod_alt.name + '</strong></div>' +
                        '</li>' +
                        '</ul></div>';

                }
            }
        }
    }


    var html = '<div class="swiper-container" style="height: 175px;"><div class="swiper-wrapper" style="height: 175px;">' + carrusel + '</div><div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div></div>';


    $("#swiper").html(html);
    $("#swiper").trigger("create");

    $("#swiper").show();
    $("#imgBarraCarga").hide();

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 15
    });

}

function displayPopupItemDetail(id, param, idproduct) {

    if (pantallaActual == "catalogo") {

        console.log("Mostramos el pop de detalle del producto catalogo");

        switch (param) {
        case "CART":

            break;

        case "PRODUCTOS":
            var quantity = 0;
            var buttonBack = "";
            var carrusel = "";

            var div_carrusel = "";

            for (var i = 0; i < PRODUCTS.length; i++) {

                if (PRODUCTS[i].id == idproduct) {

                    var imgAvailability = "";
                    var stock = parseInt(PRODUCTS[i].stock_x_store);

                    if (stock == 0) {
                        stock = parseInt(PRODUCTS[i].stock_x_central_store);
                    }

                    if (stock > parseInt(PRODUCTS[i].stock_min)) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= parseInt(PRODUCTS[i].stock_min)) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }


                    var html = '';

                    if (PRODUCTS[i].definition == "NULL") {
                        var definition = PRODUCTS[i].short_name;
                    } else {
                        var definition = PRODUCTS[i].definition;
                    }

                    if (PRODUCTS[i].quantity > 0) {
                        var cantidad = PRODUCTS[i].quantity;
                    } else {
                        var cantidad = 0;
                    }

                    var imgLinkExt = PRODUCTS[i].linkext.replace("normalPreview", "wide"); // TEMP !!

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><span style="margin-right: 6%;">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</span><span style="margin-right: 4%;";>STOCK TIENDA: ' + PRODUCTS[i].stock_x_store + '</span><span>STOCK ONLINE: ' + PRODUCTS[i].stock_x_central_store + '</span><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        //'<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:5px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:5px;"> Ubicación: ' + (PRODUCTS[i].position_x_store.section == undefined ? '' : PRODUCTS[i].position_x_store.section) + ' ' + (PRODUCTS[i].position_x_store.module == undefined ? '' : PRODUCTS[i].position_x_store.module) + ' ' + (PRODUCTS[i].position_x_store.position == undefined ? '' : PRODUCTS[i].position_x_store.position) + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;vertical-align:sub;margin-top:5px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;vertical-align:sub;margin-top:5px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '" style="width:50px;"></p>' +
                        '</div>' +
                        '</li>' +
                        '</ul>';

                    if (buttonBack != "") {
                        html = html + buttonBack;
                    }
                }


            }

            $("#contentPopupListItems").html(html);
            $("#contentPopupListItems").trigger("create");

            $("#swiper").hide();

            setTimeout(function () {
                $("#popupListItems").popup("open");
            }, popupTimeout);

            setTimeout(function () {
                getAlternativeProducts(id, idproduct);
            }, 510);

        }

        translateButtons(idiomStore);


    } else if (pantallaActual == "Asistente disfraces") {


        console.log("Mostramos el pop de detalle del producto en el asistente de disfraces");
        switch (param) {
        case "CART":
            var productList = CART;
            var quantity = productList[id].quantity;
            var buttonBack = '<center><br><a data-icon="back" data-role="button" data-theme="b" style="width:120px" onclick="displayPopupItemList();">Atrás</a></center>';
            break;

        case "PRODUCTOS":
            var quantity = 0;
            var buttonBack = "";
            var carrusel = "";

            var div_carrusel = "";

            for (var i = 0; i < PRODUCTS.length; i++) {

                if (PRODUCTS[i].id == idproduct) {

                    var imgAvailability = "";
                    var stock = parseInt(PRODUCTS[i].stock_x_store);

                    if (stock == 0) {
                        stock = parseInt(PRODUCTS[i].stock_x_central_store);
                    }

                    if (stock > parseInt(PRODUCTS[i].stock_min)) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= parseInt(PRODUCTS[i].stock_min)) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }


                    var html = '';

                    if (PRODUCTS[i].definition == "NULL") {
                        var definition = PRODUCTS[i].short_name;
                    } else {
                        var definition = PRODUCTS[i].definition;
                    }

                    if (PRODUCTS[i].quantity > 0) {
                        var cantidad = PRODUCTS[i].quantity;

                    } else {
                        var cantidad = 0;
                    }

                    var imgLinkExt = PRODUCTS[i].linkext.replace("normalPreview", "wide"); // TEMP !!

                    var section = PRODUCTS[i].position_x_store.section;
                    var section = PRODUCTS[i].position_x_store.module;
                    var section = PRODUCTS[i].position_x_store.position;

                    var ubicacion = PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.module + ' ' + PRODUCTS[i].position_x_store.position;

                    if (PRODUCTS[i].position_x_store.section == undefined) {
                        ubicacion = "";
                    }

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><span style="margin-right: 6%;">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</span><span style="margin-right: 4%;";>STOCK TIENDA: ' + PRODUCTS[i].stock_x_store + '</span><span>STOCK ONLINE: ' + PRODUCTS[i].stock_x_central_store + '</span><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        //'<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        //'<div class="ui-block-a"><img src="' + PRODUCTS[i].linkext + '" style="max-width: 325px;max-height: 350px;"></div>' +
                        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;max-height: 350px;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:10px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:10px;"> Ubicación: ' + ubicacion + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;margin-top:5px;margin-top:10px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;margin-top:5px;margin-top:10px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '" style="width: 50px;"></p>' +
                        '</div>' +
                        '</li>' +
                        '</ul>';

                    if (buttonBack != "") {
                        html = html + buttonBack;
                    }
                }


            }

            $("#contentPopupListItems").html(html);
            $("#contentPopupListItems").trigger("create");

            $("#swiper").hide();

            setTimeout(function () {
                $("#popupListItems").popup("open");
            }, popupTimeout);

        }

        translateButtons(idiomStore);



    } else {

        console.log("Mostramos el pop de detalle del producto assit fiestas");

        var aux_original;
        var html = '';
        var cantidad = 0;

        switch (param) {
        case "CART":
            var productList = CART;
            var quantity = productList[id].quantity;
            var buttonBack = '<center><br><a data-icon="back" data-role="button" data-theme="b" style="width:120px" onclick="displayPopupItemList();">Atrás</a></center>';
            break;

        case "PRODUCTOS":
            var quantity = 0;
            var buttonBack = "";
            var carrusel = "";

            var div_carrusel = "";

            for (var i = 0; i < PRODUCTS.length; i++) {

                if (PRODUCTS[i].id == idproduct) {

                    console.log("Entramos para mostrar las info del producto");
                    var imgAvailability = "";
                    var stock = parseInt(PRODUCTS[i].stock_x_store);

                    if (stock == 0) {
                        stock = parseInt(PRODUCTS[i].stock_x_central_store);
                    }

                    if (stock > parseInt(PRODUCTS[i].stock_min)) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock > 0 && stock <= parseInt(PRODUCTS[i].stock_min)) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }

                    if (PRODUCTS[i].definition == "NULL") {
                        var definition = PRODUCTS[i].short_name;
                    } else {
                        var definition = PRODUCTS[i].definition;
                    }

                    if (PRODUCTS[i].quantity > 0) {
                        cantidad = PRODUCTS[i].quantity;

                    } else {
                        cantidad = 0;
                    }

                    var section = PRODUCTS[i].position_x_store.section;
                    var section = PRODUCTS[i].position_x_store.module;
                    var section = PRODUCTS[i].position_x_store.position;

                    var ubicacion = PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.module + ' ' + PRODUCTS[i].position_x_store.position;

                    if (PRODUCTS[i].position_x_store.section == undefined) {
                        ubicacion = "";
                    }


                    var imgLinkExt = PRODUCTS[i].linkext.replace("normalPreview", "wide"); // TEMP !!

                    div_carrusel = '<li data-role="list-divider" data-theme="c"><span>' + jsonIdiomas.popup_info_item.alternativos + '</span></li>' +
                        '<li style="height: 175px;" id="img_prod_alter"><div class="ui-grid-a" style="height: 175px;">' +
                        '<div id="imgBarraCarga"><center><label>' + jsonIdiomas.popup_errores.labelCargando + '</label></center></div>' +
                        '<div id="swiper" style="height: 175px;"></div>' +
                        '</div>' +
                        '</li>';

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><span style="margin-right: 6%;">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</span><span style="margin-right: 4%;";>STOCK TIENDA: ' + PRODUCTS[i].stock_x_store + '</span><span>STOCK ONLINE: ' + PRODUCTS[i].stock_x_central_store + '</span><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        //'<div class="ui-block-a"><img src="' + PRODUCTS[i].linkext + '" style="max-width: 325px;max-height: 350px;"></div>' +
                        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;max-height: 350px;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:10px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:10px;"> Ubicación: ' + ubicacion + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;margin-top:5px;margin-top:10px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;margin-top:5px;margin-top:10px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"style="width: 50px;"></p>' +
                        '</div>' +
                        '</li>' + div_carrusel +
                        '</ul>';

                    if (buttonBack != "") {
                        html = html + buttonBack;
                    }

                    if (PRODUCTS[i].original == true) {
                        aux_original = PRODUCTS[i].original;
                    }

                    break;

                } //if
            } //for


            $("#contentPopupListItems").html(html);
            $("#contentPopupListItems").trigger("create");

            $("#swiper").hide();

            setTimeout(function () {
                $("#popupListItems").popup("open");
            }, 200);

            if (aux_original == true) { // si no es alternativo y tiene cantidad en el carrito se mostraran los alternativos
                setTimeout(function () {
                    getAlternativeProducts(id, idproduct, cantidad);
                }, 510);
            }

        } //switch

        translateButtons(idiomStore);


    } //else



}


/*********************************** 
Función que carga el menú lateral
************************************/
function loadMenu(data) {

    var options = '';
    var htmlHeader = '';

    console.log(data);

    if (data.nodes == undefined) {
        var len = data.node.length;
        var node = data.node;
    } else {
        var len = data.nodes.length;
        var node = data.nodes;
    }

    // var len = data.nodes.length;
    //var node = data.nodes;

    if (len > 0) {
        for (var i = 0; i < len; i++) {

            var imgLinkExt = node[i].linkext.replace("wide", "bigPreview");

            if (parseInt(data.nodes[i].isMain) == 1) {
                //console.log("este es el principal " + node[i].isMain);
                var valorSwitch = 7;
            } else {
                var valorSwitch = parseInt(node[i].type);
            }

            switch (valorSwitch) {
            case 1: //catalogo
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\',\'1\')';
                break;
            case 2: //promos
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\',\'2\')';
                break;
            case 3: // asis fistas
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\',\'3\')';
                break;
            case 4: // asis disfra
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\',\'4\')';
                break;
            case 5: // sugerencias
                //extra = 'displayPantallaSugerencias()';
                //extra = 'displayPopUpPantallaSugerencias()';
                extra = 'displayPantallaSugerencias()';
                break;
            case 6: // fuera tienda
                extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\',\'menu_lateral\')';
                break;
            case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',\'' + data.nodes[i].linkext + '\',\'menu_lateral\')';
                break;
            }

            //options = options + '<li onclick="' + extra + '; openMenu();"><img src="' + imgLinkExt + '" style="width:12em">' + node[i].name + '</li>';
            options = options + '<li style="text-align: center;color: rgb(23, 152, 209);font-weight: bold;" onclick="' + extra + '; openMenu();">' + node[i].name + '</li>';
        }

    }

    //options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">' + jsonIdiomas.menu_lateral.menu + '</a></center></li>';
    options = options + '<div onclick="getNodes(0);" style="text-align: center;color: white;text-transform: uppercase;">' + jsonIdiomas.menu_lateral.menu + '</div>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');


    var cart = //'<a onclick="displayPopupItemList();" data-position-to="origin">' + //displayCar();
        '<div onclick="displayPopupItemList();" class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;position: relative;">' +
        '<div style="position: relative;margin-top:10px;margin-left: 20%;z-index:-1;float: left;"><img id="img_cesta" src="css/icons/cesta.png" style="width: 50px;height: 50px;"></div>' +
        '<div id="circuloCantidad" class="circulo" style="float: right;width: 25px; height: 25px;z-index:25;display:none;position: absolute;top: 0px;margin-left: 69%;">' +
        '<label id="spBtnPopupCartProducts" style="font-size:18px;color: white;">0</label></div>' +
        '</div>' +
        '<div class="ui-block-b" style="width:50%;margin-top:14%;">' +
        //'</div><span style="margin:15px;display:none;" id="spBtnPopupCartAmmount">0 €</span><br><span style="margin:15px" id="spBtnAmountPerson"></span>' + //TEMP
        '<label style="margin-left:7px;display:none;color:#0197d4" id="spBtnPopupCartAmmount">0 €</label></div>' +
        //'<img id="userIcoCarrito" style="display:none;" src="img/user_carrito.png" style="margin-left:-8px; margin-top:4px;">' +
        '</div>'; //+'</a>';


    /*HEADER  de la pantalla*/
    htmlHeaderMenuInicial = '';
    htmlHeaderMenuInicial = '<div class="ui-grid-d" id="headerMenuIniical">' +
        '<div class="ui-block-b" style="margin-top:10px;margin-left: 37%; width:32%;"><img src="css/icons/logo.png" onclick="getNodes(0);" width="75%"></div>' +
        '</div>';

    var aux_login = "";
    if (INFO_USU.id != undefined) {
        aux_login = "Bienvenido/a " + INFO_USU.name + ',<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">';
    } else {
        aux_login = jsonIdiomas.header.login;
    }



    htmlHeader = '<div class="ui-grid-d">' +
        '<div class="ui-block-a" style="margin-top:10px; width:22%;color: rgb(70, 130, 180);text-transform:uppercase;" id="divBack"></div>' +

        '<div class="ui-block-b" style="margin-top:20px;width:15%;" id="session" onclick="displayLogin();">' +
        '<center><a id="login" onclick="displayLogin();" style="text-transform: uppercase;float:left;font-size: 12pt;"><span>' + aux_login + '</span></a>' +
        '</div>' +

        '<div class="ui-block-c" style="width:44%;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="margin-top:10px; width:65%;"><img src="css/icons/logo.png" onclick="getNodes(0);" width="100%%" style="float: left;"></div>' +
        '<div class="ui-block-b" style="margin-top:20px; width:35%;padding-left:3px;"><div id="btn_finalizarpedido" class="btn_finalizarpedido" style="display: none;">' + jsonIdiomas.btn_finalizar_pedido + '</div></div>' +
        '</div></div>' +

        '<div class="ui-block-d" style="width:14%; margin-top:3px;" id="car_compra">' + cart + '</div>' +
        '<div class="ui-block-e" style="margin-top:10px;width:4%">' +
        '<a id="btnMenuLateral" onclick="openMenu()" style="margin:10px; float:right"> <span class="flaticon-menu"></span> </a>' +
        '</div>' +
        '</div>';


    $("#divHeader_menuInicial").html(htmlHeaderMenuInicial);
    $("#divHeader_menuInicial").show();

    $("#divHeader_catalogo").html(htmlHeader);
    $("#divHeader_catalogo").trigger('create');

    $("#divHeader_catalogo").addClass("border-header");
    $("#divHeader_catalogo").hide();
    $("#lateralMenu").panel("close");

    if (INFO_USU.id != undefined) {
        $('#login').attr('onclick', "logout()");
        $('#session').attr('onclick', "logout()");
    }

    translateButtons(idiomStore);

    $('#btn_finalizarpedido').click(function () { // develop 1
        
        updateOpcionCompraProducto();

        console.log('Handler for .click() called. con opcionCompraProductos ' + opcionCompraProductos + ' productosEnTienda ' + CART.productosEnTienda + ' productosEnWeb ' + CART.productosEnWeb);
        opcionesPago();

    });
}


function displayPantallaIntermediaAsistDisfra(data) {

    if (data) {

        //console.log("Tenemos datos para cargar el select de disfraces");
        $("#divHeader_catalogo").show();
        $("#divHeader_menuInicial").hide();
        console.log("Info del nodo");
        console.log(data);
        var info = data.node;
        INFO_AUX = data.node;

        htmlContent = '<div id="page_count" style="display: block;padding-top: 1%;">' +
            '<br><center>' +
            '<img src="' + info.linkint + '" style="max-width: 30%;">' +
            '<div style="width: 30%"><select id="select_edad" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
            '</select></div>' +
            '<button style="width: 30%;" id="btn_continuar_dis"  data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
            '</center>' +
            '</div>';

        htmlContent = htmlContent;
        $("#divContent").html(htmlContent);
        $("#divContent").trigger('create');

        $("#select_edad").attr("data-native-menu", "false");

        $('#select_edad').scrollTop(5);

        getSize(info.gender); //llamamos al webservice que tiene los sexos

        $('#select_edad').change(function () {
            var optionSelected = $(this).find('option:selected');
            var optValueSelected = optionSelected.val();
            SIZE = optValueSelected;
        });

        $('#btn_continuar_dis').click(function () {
            getCostumes(INFO_AUX, SIZE);
        });

        translateButtons(idiomStore);


    } else {


        $("#divHeader_catalogo").show();
        $("#divHeader_menuInicial").hide();

        htmlContent = '<div id="page_count" style="display: block;padding-top: 20%;">' +
            '<center>' +
            '<div style="width: 30%"><select id="select_sexo" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
            '</select></div>' +
            '<div id="div_selectTalla" style="width: 30%;display:none"><select id="select_talla" data-theme="f" data-native-menu="false" data-corners="false">' +
            '</select></div>' +
            '<button style="width: 30%;" id="btn_continuar_dis" onclick="" data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
            '</center>' +
            '</div>';

        htmlContent = htmlContent;
        $("#divContent").html(htmlContent);
        $("#divContent").trigger('create');

        $("#select_sexo").attr("data-native-menu", "false");
        $("#select_talla").attr("data-native-menu", "false");

        $('#select_sexo').scrollTop(5);
        $('#select_talla').scrollTop(5);

        getGender(); //llamamos al webservice que tiene los sexos

        $('#select_sexo').change(function () {


            var optionSelected = $(this).find('option:selected');
            var optValueSelected = optionSelected.val();
            console.log("Opcion seleccionada es " + optValueSelected);

            if (optValueSelected != 0) {

                getSize(optValueSelected);
                $("#div_selectTalla").show();

                $("#btn_continuar_dis").click(function () { //TEMP

                    var sexo = $("select#select_sexo option").filter(":selected").val(); // en los dos selects en caso de que no haya seleccionado nada sera cero
                    var talla = $("select#select_talla option").filter(":selected").val();

                    if (sexo != 0 && talla != 0) {

                        var info_aux = {
                            talla: talla,
                            sexo: sexo
                        }

                        getCostumesAge(info_aux);

                    }

                });

            } else {
                $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
                $('#popupAlert').popup('open');

                $("#div_selectTalla").hide();
            }
        });

        translateButtons(idiomStore);

    }

}


function displayPantallaIntermediaAsistFiestas(data) {

    //console.log(data);
    console.log("Asistente de fiestas");
    console.log(data);

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 50%;height:550px;">' +
        '<img src="' + data.linkint + '" style="width:90%; display:block; margin:10% auto;">' +
        '</div>' +
        '<center>' +
        '<div class="ui-block-b" style="width: 50%;height:550px;">' +
        '<h4 style="margin-top:25%;"><label id="label_num_per_fiesta" style="font-size:20px">' + jsonIdiomas.asistente_fiestas.label_num_per_fiesta + '</label></h4>' +
        '<div class="ui-grid-c" style="width: 75%;">' +
        '<div class="ui-block-a">' +
        '<img src="img/a_fiesta_u_ico.png" />' +
        '</div>' +
        '<div class="ui-block-b" onclick=\'$("#personas_fiesta").val("4");\'>' +
        '<img src="img/4.png" />' +
        '</div>' +
        '<div class="ui-block-c" onclick=\'$("#personas_fiesta").val("8");\'>' +
        '<img src="img/8.png" />' +
        '</div>' +
        '<div class="ui-block-d" onclick=\'$("#personas_fiesta").val("12");\'>' +
        '<img src="img/12.png" />' +
        '</div>' +
        //'<div class="ui-block-e" onclick=\'$("#personas_fiesta").val("20");\'>' +
        //'<img src="img/a_fiesta_num_20.jpg" />' +
        //'</div>' +
        '</div>' +
        '<div class="ui-grid-b" style="max-width:80%;margin-bottom: 2%;margin-top: 2%;">' +
        //'<div class="ui-block-a" style="width:20%;margin-right:3%;margin-left:2%;"><a  data-corners="false" id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b"><img src="img/menos.png"/></a></div>' +
        '<div class="ui-block-a" style="width:20%;margin-right:3%;margin-left:2%;" id="menos_fiesta" onclick="addPeople(0);"><img src="img/menos.png" style="width: 50px;"></div>' +
        '<div class="ui-block-b" style="width:50%;margin-right:3%;"><input data-corners="false" type="number" id="personas_fiesta" value="2" min="2" max="200" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:20%;" id="mas_fiesta"><img src="img/mas.png" style="width: 50px;"></div>' +
        //'<div class="ui-block-c" style="width:20%;"><a data-corners="false" id="mas_fiesta" data-role="button" data-theme="b"><img src="img/mas.png"/></a></div>' +
        '</div>' +
        '<a data-corners="false" style="width:68%;margin:0 auto;" id="btn_continuar_fiestas" onclick="" data-role="button" data-theme="b">' + jsonIdiomas.asistente_fiestas.btn_continuar + '</a>' +
        '</div>' +

        '</center>' +
        '</div>' +
        '</div>';

    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');


    //called when key is pressed in textbox
    $("#personas_fiesta").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Solo números").show().fadeOut("slow");
            return false;
        }
    });


    $("#btn_continuar_fiestas").click(function () {

        var valor = $("#personas_fiesta").val();

        if (valor >= 2) {
            displayProductos(data.id, data.name);
        } else {
            $.jAlert({
                'title': 'Alerta',
                'content': jsonIdiomas.alertas.pan_inter_asis_fiestas,
                'theme': 'gray',
                'size': 'xsm'
            });

        }

    });


    $("#mas_fiesta").click(function () {

        var valor = $("#personas_fiesta").val();
        var oparation = 1;
        //console.log("Valor de personas es " + valor);

        if (valor == "") valor = 0;

        if (oparation == 0 && valor > 2) { //para que el minimo de personsa sea 2
            if (valor != 0 || valor != "") {
                valor = parseInt(valor) - 1;
                $("#personas_fiesta").val(valor);
                //console.log("Sumamos " + valor);
            } else {
                //console.log("No hacemos nada ya que es cero");
            }
        } else if (oparation == 1) {
            valor = parseInt(valor) + 1;
            //console.log("Sumamos " + valor);
            $("#personas_fiesta").val(valor);
        }


        translateButtons(idiomStore);

    });

}


function displayRegistro() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}

function displayCambioContra() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupCambioContra").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}

function displaySugerencias() { //muestra el pop up de registro

    $("#popupLogin").popup("close");
    setTimeout(function () {
        $("#popupRegistro").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}

function displayLogin() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $('#pswd').val("");
    $("#popupRegistro").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, popupTimeout);

    translateButtons(idiomStore);

}


function displayLogin2() { //muestra el pop up de inicio de session

    $('#usrnm').val("");
    $("#popupCambioContra").popup("close");
    setTimeout(function () {
        $("#popupLogin").popup("open");
    }, 50);

    translateButtons(idiomStore);


}



function displayMenu() { //muestra el pop up de inicio de session

    //console.log("Volver al menu");
    getNodes(0);

    translateButtons(idiomStore);
}



function logout() { //muestra el pop up de inicio de session


    console.log("Cerramos session");
    html = '<div id="session" style="float: right;"><center><a id="login" onclick="displayLogin();" style="margin:10px;text-transform: uppercase;"><span>' + jsonIdiomas.header.login + '</span></a></center> </div>';
    $("#session").html(html);
    INFO_USU = "";
    LOGGED = false;
    $('#usrnm').val("");
    $('#pswd').val("");
    CART = [];
    $(':input').val(''); //limpiamos todos los inputs de la app


    /*if ($("#contenedorInfoUsuario").length > 0 && $("#contenedorInfoUsuario").is(':hidden')) { // Si estoy en formulario de domicilio y hago logout, muestro opciones de registro de usuario.
        $("#contenedorInfoUsuario").show();
    }*/

    translateButtons(idiomStore);

    //if (pantallaActual == "opciones envio" || pantallaActual == "opciones de pago") {
    // getNodes(0);
    //}



}

/*

<form action='expresscheckout.php' METHOD='POST'>
<input type='image' name='submit' src='https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif' border='0' align='top' alt='Check out with PayPal'/>
</form>

*/

function displayScreenSaver() { //muestra el pop up de inicio de session

    $('.ui-popup').popup('close');
    idleTimeActive = true;
    console.log("Protector de pantalla activado");
    $('#principal').hide();
    $('#contentPopupScreenSaver').show();

    translateButtons(idiomStore);

}

/**
 *   displayPopUpPantallaSugerencias
 *
 *   
 */
function displayPopUpPantallaSugerencias() {

    PRODUCTS = [];
    TEMP_PRODUCTS = [];

    //$('#popupElegirTipoUsuario').popup('open');
    //displayPantallaSugerencias(); // TEMP !!
    console.log("Guardamos carrito antes de sugerencias");

    guardarInfo('si'); // TEMP !!

    console.log("Entramos en la pantalla de sugerencias");

    $("#banderas").hide();

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();

    var html = '<div data-corners="false"  id="popupElegirTipoUsuario" style="width:25%; margin:10% auto;">' +
        '<label id="labelSugTipo" style="font-weight: bolder; margin-top: 5px;">Tipo de Usuario:</label>' +
        '<div class="ui-select" style="margin:0 auto;font-size: 20px;">' +
        '<select id="selectUser" name="suge_inci" data-theme="b" data-native-menu="false" data-corners="false" tabindex="-1">' +
        '<option value="1" selected="selected">Cliente</option>' +
        '<option value="2">Dependiente</option>' +
        '</select>' +
        '<div style="display: none;" id="select-43-listbox-placeholder">' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-c" style="margin:0 auto;">' +
        '<button data-theme="b" id="btn_selectPantallaSugerencia" onclick="eligePantalla();" data-corners="false" style="border: 0px;text-transform: uppercase;font-size: 20px;" class=" ui-btn ui-btn-b ui-shadow">Acceder</button>' +
        '</div>' +
        '</div>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');

    translateButtons(idiomStore);

    console.log("--> Arribo al if amb length: " + CART.length);

    pantallaActual = 'sugerencias'; // TEMP !!

    if (CART.length < 1) { // TEMP !!!
        console.log("--> IF si: " + CART.length); // TEMP !! log

        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");
    } else {

        console.log("--> ELSE no: " + CART.length + ' i pantalla: ' + pantallaActual); // TEMP !! log

        if (pantallaActual == 'Asistente fiestas') {

            $("#userIcoCarrito").show();
            //$("#spBtnAmountPerson").show(); //TEMP
        } else {
            $("#userIcoCarrito").hide();
            //$("#spBtnAmountPerson").hide(); //TEMP
        }

        $("#btn_finalizarpedido").show();

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        //console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

    $("#selectUser").val(1); // TEMP !!
}

function eligePantalla() {

    if ($("#selectUser").val() == 1) {
        displayPantallaSugerencias();
    } else {
        // ******************************* TODO !!
    }
}

function displayPantallaSugerencias() {

    console.log("Guardamos carrito antes de sugerencias");

    guardarInfo('si'); // TEMP !!

    console.log("Entramos en la pantalla de sugerencias");

    $("#banderas").hide();
    nodeIds = [];
    nodeNames = [];
    //loadMenu(node_cero);

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();
    //$("#divHeader").show();

    html_sug = '<div id="form_sugerencias" style="margin-top:2%;">' +
        '<form  enctype="text/plain">' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNom">' + jsonIdiomas.form_sugerencias.labelSugNom + '</label><input type="text" id="nombre" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugNaci">' + jsonIdiomas.form_sugerencias.labelSugNaci + '</label><input type="date" value="" id="fecha_naci" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugMail">' + jsonIdiomas.form_sugerencias.labelSugMail + '</label ><input type="email" value="" id="correo" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-b">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugNPob">' + jsonIdiomas.form_sugerencias.labelSugNPob + '</label ><input type="text" id="poblacion" size="25" maxlength="50" data-clear-btn="true"></div>' +
        '<div class="ui-block-b" style="width: 31%;margin-right: 1%;"><label id="labelSugProv">' + jsonIdiomas.form_sugerencias.labelSugProv + '</label><input type="text" value="" id="provincia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style=""><label id="labelSugTelf">' + jsonIdiomas.form_sugerencias.labelSugTelf + '</label><input type="number" value="" id="telf" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width: 31%;margin-right: 1%;"><label id="labelSugTipo">' + jsonIdiomas.form_sugerencias.labelSugTipo + '</label><select name="suge_inci" data-native-menu="false"  data-corners="false"><option value="1">' + jsonIdiomas.form_sugerencias.selectOption + '<option value="2">Petición</select></div>' +
        '<div class="ui-block-b" style="width: 65%;"><label id="labelSugNSugPreg">' + jsonIdiomas.form_sugerencias.labelSugNSugPreg + '</label><input type="text" value="" id="tipo_sugenrencia" size="40" maxlength="100" data-clear-btn="true"></div>' +
        '</div>' +
        '<label id="labelSugPreg">' + jsonIdiomas.form_sugerencias.labelSugPreg +
        '<textarea cols="40" rows="3" id="sugerencias" style="height: 52px;" placeholder="' + jsonIdiomas.form_sugerencias.sugerenciasPlaceholder + '"></textarea>' +
        '<table width="25%" border="0" align="center" cellpadding="10" cellspacing="0">' +
        '<tr>' +
        '<td>' +
        '<div align="center">' +
        '<button type="button" onclick="enviarSugerencia();"  data-corners="false" id="enviar_sugerencia">' + jsonIdiomas.form_sugerencias.enviar_sugerencia + '</button>' +
        '</div>' +
        '</form>' +
        '</div>';


    $("#divContent").html(html_sug);
    $("#divContent").trigger('create');

    translateButtons(idiomStore);

    console.log("--> Arribo al if amb length: " + CART.length);

    pantallaActual = 'sugerencias'; // TEMP !!

    if (CART.length < 1) { // TEMP !!!

        console.log("--> IF si: " + CART.length); // TEMP !! log

        $("#popupListItems").popup("close");

        //$("#spBtnAmountPerson").text(''); //TEMP

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");

    } else {

        console.log("--> ELSE no: " + CART.length + ' i pantalla: ' + pantallaActual); // TEMP !! log

        if (pantallaActual == 'Asistente fiestas') {

            $("#userIcoCarrito").show();
            //$("#spBtnAmountPerson").show(); //TEMP
        } else {
            $("#userIcoCarrito").hide();
            //$("#spBtnAmountPerson").hide(); //TEMP
        }

        $("#btn_finalizarpedido").show();

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        //console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

}

function displaySummary(param) {

    $("#page_count").hide();

    var html = '';
    if (LOGGED == true) {
        if (CART.length > 0) {
            //console.log("Actualizar div");
            $('.ui-popup').popup('close');

            var div_li_prod = "";

            for (var i = 0; i < CART.length; i++) {

                div_li_prod = div_li_prod + "<li></li>";

            }

            var htmlHeader = '<div id="lista" style="witdh:90%;"><ul data-role="listview">' +
                '<li data-role="list-divider" style="background-color:#0096D2; font-size:20px; color:white;">' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width:70%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:20%"></div>' +
                '<div class="ui-block-b" style="width:40%">Producto</div>' +
                '<div class="ui-block-v" style="width:40%">Ubicación</div>' +
                '</div>' +
                '</div>' +
                '<div class="ui-block-b" style="width:30%">' +
                '<div class="ui-grid-b">' +
                '<div class="ui-block-a" style="width:25%; text-align:center;">Unds</div>' +
                '<div class="ui-block-b" style="width:25%; text-align:center;">Precio</div>' +
                '<div class="ui-block-c" style="width:25%; text-align:center;">Total</div>' +
                '<div class="ui-block-d" style="width:25%; text-align:right;"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li></div>';


            html = htmlHeader + htmlContent + '</ul>';
            $("#divContent").html(html);
            $("#divContent").trigger('create');
            var n = nodeIds.length + 1;
            updateBackButton(nodeIds[n], nodeNames[n]);
        } else {
            alert("No hay productos");
        }
    } else {

        console.log("No estás logado");
    }

    translateButtons(idiomStore);
}


function displayFlags(res) {

    console.log("Cargamos el popUp de idiomas");

    var html = '<ul data-role="listview">'; // data-role="listview" 

    var count = res.flags.length;
    var info = res.flags;

    //console.log(info);

    for (var i = 0; i < count; i++) {

        html += '<li style="list-style-type: none;background-color:#1798d1;" onclick="changeIdiom(\'' + info[i].shortname + '\',' + info[i].id + ');">' + //data-icon="false"
            //'<a onclick="changeIdiom(\'' + info[i].shortname + '\',' + info[i].id + ');"><label style="text-transform: uppercase;text-align: center;">' + info[i].name + '</label></a>' +
            '<label style="text-transform: uppercase;text-align: center;color: rgb(255, 255, 255);">' + info[i].name + '</label>' +
            '</li>';

    }

    li = '<center><img src="css/icons/creu.png" onclick="cerrar_popup()" style="width: 15%;"></center>';

    html += li + '</ul>';

    $("#contentPopupIdioma").html(html);
    $("#contentPopupIdioma").trigger('create');
    $("#contentPopupIdioma").css('font-size', '20px');

    translateButtons(idiomStore);

}

function displayPantallaPreviaDisfraces(idNode, nodeName, isAlgo, aux, backPage) { //Nuevo

    console.log("Asistente de disfraces");
    pantallaActual = 'Asistente disfraces'; //TEMP !!

    $("#banderas").hide();

    updateBackButton(0, jsonIdiomas.header.menu);

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();
    //console.log(data);

    htmlContent = '<div id="page_count" style="display: block;padding-top: 20%;">' +
        '<center>' +
        '<label id="labelSugTipo" style="font-weight: bolder; margin-top: 5px;text-align:center;">Seleccione una opcion:</label>' +
        '<div style="width: 30%">' +
        '<select id="select_tema" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
        '<option selected="selected">Tipos de disfraces</option>' +
        '<option value="1">Edad</option>' +
        '<option value="2">Temática</option>' +
        '</select></div>' +
        '<button style="width: 30%;" id="btn_continuar_dis_previo" data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
        '</center>' +
        '</div>';

    htmlContent = htmlContent;
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

    $("#select_tema").attr("data-native-menu", "false");

    $('#select_tema').change(function () {

        var optionSelected = $(this).find('option:selected');
        //var optTextSelected = optionSelected.text();
        var optValueSelected = optionSelected.val();
        //console.log("Opcion seleccionada es " + optValueSelected);

        if (optValueSelected == 2) {

            $('#btn_continuar_dis_previo').click(function () {
                getNodes(idNode, nodeName, isAlgo, aux, backPage);
            });

        } else if (optValueSelected == 1) {

            $('#btn_continuar_dis_previo').click(function () {
                displayPantallaIntermediaAsistDisfra();
            });

        } else {
            $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
            $('#popupAlert').popup('open');

            $("#div_selectTalla").hide();
        }
    });


    translateButtons(idiomStore);

    //console.log("--> Arribo al if amb length: " + CART.length);


    if (CART.length < 1) { // TEMP !!!

        console.log("--> IF si: " + CART.length); // TEMP !! log

        $("#popupListItems").popup("close");
        //$("#spBtnAmountPerson").text(''); //TEMP
        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();
        $("#btn_finalizarpedido").hide();
        $("#img_cesta").attr("src", "css/icons/cesta.png");

    } else {

        console.log("--> ELSE no: " + CART.length + ' i pantalla: ' + pantallaActual); // TEMP !! log

        if (pantallaActual == 'Asistente fiestas') {

            $("#userIcoCarrito").show();
            //$("#spBtnAmountPerson").show(); //TEMP
        } else {
            $("#userIcoCarrito").hide();
            //$("#spBtnAmountPerson").hide(); //TEMP
        }

        $("#btn_finalizarpedido").show();

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }

        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        //console.log("--> CAMBIO de imagen!!"); // TEMP !! log
        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

}


function opcionesPago() { //TEMP
    
    updateOpcionCompraProducto();

    $("#btn_finalizarpedido").addClass("btn_disabled");

    $("#popupListItems").popup("close");

    pantallaActual = "opciones de pago";

    updateBackButton(999999, "Opciones de pago", "productos"); //si enviamos productos se cargan los productos del nodo

    switch (opcionCompraProductos) {
    case 1:

        OPCIONENVIO = 1;
        var html = '<div>' +
            '<center>' +
            //'<h2 style="margin: 1% 0 1% 0;color:#0197d4">' + jsonIdiomas.proceso_pago.tl_cero + '</h2>' + //'<br>' + jsonIdiomas.proceso_pago.tl_dos 
            '<h2 style="margin: 1% 0 1% 0;color:#0197d4">' + jsonIdiomas.proceso_pago.tl_uno + '<br>' + jsonIdiomas.proceso_pago.tl_dos + '</h2>' + //'<br>' + jsonIdiomas.proceso_pago.tl_dos 
            '<h4 style="margin: 0 0 1% 0;color:#0197d4">' + jsonIdiomas.proceso_pago.tl_pregunta + '</h4>' +
            '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="pagarEnCaja();">' +
            '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/tienda.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_ocho + '</label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(CART.ammount, 2, ",", ".", "€") + '</strong></label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + CART.length + ' producto disponibles</label></div></div>' +
            '</div>' +
            (CART.length - CART.productosEnWeb == 0 ?
                '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="getSendPrice(' + CART.ammount + ')">' +
                '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/camion.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_siete + '</label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(parseFloat(CART.ammount), 2, ",", ".", "€") + '</strong></label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + CART.length + ' producto disponibles</label></div></div>' +
                '</div>' : '') +
            '<div class="ui-grid-a" style="width: 50%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
            '</center>' +
            '</div>';

        break;
    case 2:
        OPCIONENVIO = 2;

        var prodTienda = CART.productosEnTienda + CART.productosSoloEnTienda;
        var prodWeb = CART.productosEnWeb + CART.productosSoloEnWeb;

        var precioTienda = CART.precioTotalProductosTienda + CART.precioTotalProductosSoloTienda;
        var precioWeb = CART.precioTotalProductosWeb + CART.precioTotalProductosSoloWeb;

        console.log("Prod tienda " + prodTienda + " Prod web " + prodWeb + " precio tienda " + precioTienda + " precio web " + precioWeb);

        var html = '<div>' +
            '<center>' +
            '<h2 style="margin: 1% 0 1% 0;color:#0197d4">' + jsonIdiomas.proceso_pago.tl_tres + ' ' + prodTienda + ' ' + jsonIdiomas.proceso_pago.tl_quatro + '<br>' + jsonIdiomas.proceso_pago.tl_tres + ' ' + prodWeb + ' ' + jsonIdiomas.proceso_pago.tl_cinco + '</h2>' +
            '<h4 style="margin: 0 0 1% 0;color:#0197d4">' + jsonIdiomas.proceso_pago.tl_pregunta + '</h4>' +
            ((parseInt(CART.productosSoloEnTienda) > 0 || parseInt(CART.productosEnTienda) > 0) ? '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="pagarEnCaja();OPCIONPEDIDO=1;">' +
            '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/tienda.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_ocho + '</label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta(solo tiene en cuenta los articulos en tienda): <strong font-size: 20px;>' + formatoNumero(precioTienda, 2, ",", ".", "€") + '</strong></label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + prodTienda + ' producto disponibles</label></div></div>' +
            '</div>' : '' ) +
            //si hay prod en solo tienda no podremos compra online
            (parseInt(CART.productosSoloEnTienda) > 0 ? '' :
                '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="getSendPrice(' + CART.ammount + ');OPCIONPEDIDO=2;">' +
                '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/camion.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_nueve + '</label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(parseFloat(CART.ammount), 2, ",", ".", "€") + '</strong></label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + CART.length + ' producto disponibles</label></div></div>' +
                '</div>') +
            ((parseInt(CART.productosSoloEnWeb) > 0 && parseInt(CART.productosEnTienda) > 0) ? '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="getSendPrice(' + CART.precioTotalProductosSoloWeb + ');OPCIONPEDIDO=3;">' +
            '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/tienda.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label style="font-size: smaller;">' + jsonIdiomas.proceso_pago.tl_diez + '</label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta(solo tiene en cuenta los articulos web): <strong font-size: 20px;>' + formatoNumero(parseFloat(CART.precioTotalProductosSoloWeb), 2, ",", ".", "€") + '</strong></label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + CART.length + ' producto disponibles</label></div></div>' +
            '</div>' : '' ) +
            '<div class="ui-grid-a" style="width: 50%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
            '</center>' +
            '</div>';
        break;

    case 3:
        OPCIONENVIO = 2;
        var html = '<div>' +
            '<center>' +
            '<h2 style="margin: 1% 0 1% 0;color:#0197d4">NO HAY DISPONIBLE NINGUN PRODUCTO EN TIENDA</h2>' +
            '<h4 style="margin: 0% 0 1% 0;color:#0197d4">' + jsonIdiomas.proceso_pago.tl_pregunta + '</h4>' +
            '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="getSendPrice(' + CART.precioTotalProductosSoloWeb + ');">' +
            '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/camion.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_once + '</label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(CART.precioTotalProductosSoloWeb, 2, ",", ".", "€") + '</strong></label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + CART.productosSoloEnWeb + '  producto/os disponibles</label></div></div>' +
            '</div>' +
            '<div class="ui-grid-a" style="width: 50%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
            '</center>' +
            '</div>';

        break;

    }

    $("#divContent").html(html);
    $("#divContent").trigger('create');

    //borramos la ultima posicion para que cargue bien al volver atras
    var position = (nodeIds.length);
    nodeIds.splice(position - 1); //TEMP
    nodeNames.splice(position - 1);
    nodeImg.splice(position - 1);


}


//function opcionesEnvio(casoEnvio, productosEnTienda, productosEnWeb) { //TEMP
function opcionesEnvio(casoEnvio, totalCesta) { //TEMP

    pantallaActual = "opciones envio";

    console.log("Estamos en la opcion " + casoEnvio + "-----------------------------------------");
    //getSendPrice();
    $("#divBack").html('<div onclick="opcionesPago();"><div class="ui-grid-b"><div class="ui-block-a" style="width: 10%;"><span class="flaticon-leftarrow" style="font-size:8px;float:left;text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 90%;"><label style="font-weight: bold;">Opciones de pago</label></div></div></div>');

    var prodTienda = CART.productosEnTienda + CART.productosSoloEnTienda;
    var prodWeb = CART.productosEnWeb + CART.productosSoloEnWeb;


    switch (casoEnvio) {
    case 1:

        OPCIONENTREGA = "dom";

        var html = '<div>' +
            '<center>' +
            '<h2 style="text-transform: uppercase;color:#0197d4;">' + jsonIdiomas.proceso_pago.tl_uno + '<br>' + jsonIdiomas.proceso_pago.tl_dos + '</h2>' +
            '<h4 style="text-transform: uppercase;color:#0197d4;">' + jsonIdiomas.proceso_pago.tl_pregunta_2 + '</h4>' +
            '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="pantallaInterLoginPago(\'' + OPCIONENTREGA + '\',' + SEND_INFO.price_dom.taxPercent + ',' + SEND_INFO.price_dom.totalPrice + ',' + SEND_INFO.price_dom.basePrice + ')">' +
            '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/camion.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_doce + '</label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(parseFloat(totalCesta) + parseFloat(SEND_INFO.price_dom.totalPrice), 2, ",", ".", "€") + '</strong></label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + parseFloat(SEND_INFO.price_dom.totalPrice).toFixed(2) + '€ gastos de envio </label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-solo"><div class="ui-block-a" style="height: 45px;text-align: right;">Envio gratuito a partir de ' + parseFloat(SEND_INFO.price_dom.minFreeShipping).toFixed(2) + ' €<img src="http://partyfiesta.youtter.com/app/alb/img/info-01.svg" style="width: 15px;margin: 0px 20px 0px 4px;"></div></div>' +
            '</div>' +
            '<div class="ui-grid-a" style="width: 50%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
            '</center>' +
            '</div>';
        break;
    case 2:

        OPCIONENTREGA = "dom";

        console.log();

        var html = '<div>' +
            '<center>' +
            '<h2 style="text-transform: uppercase;color:#0197d4;">' + jsonIdiomas.proceso_pago.tl_tres + ' ' + parseInt(prodTienda) + ' ' + jsonIdiomas.proceso_pago.tl_quatro + '<br>' + jsonIdiomas.proceso_pago.tl_tres + ' ' + parseInt(prodWeb) + ' ' + jsonIdiomas.proceso_pago.tl_cinco + '</h2>' +
            '<h4 style="text-transform: uppercase;color:#0197d4;">' + jsonIdiomas.proceso_pago.tl_pregunta_2 + '</h4>' +
            '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="pantallaInterLoginPago(\'' + OPCIONENTREGA + '\',' + SEND_INFO.price_dom.taxPercent + ',' + SEND_INFO.price_dom.totalPrice + ',' + SEND_INFO.price_dom.basePrice + ')">' +
            '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/camion.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>ENVIO A DOMICILIO 48H</label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(parseFloat(totalCesta) + parseFloat(SEND_INFO.price_dom.totalPrice), 2, ",", ".", "€") + '</strong></label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + parseFloat(SEND_INFO.price_dom.totalPrice).toFixed(2) + '€ gastos de envio </label></div></div>' +
            '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-solo"><div class="ui-block-a" style="height: 45px;text-align: right;">Envio gratuito a partir de ' + parseFloat(SEND_INFO.price_dom.minFreeShipping).toFixed(2) + ' €<img src="http://partyfiesta.youtter.com/app/alb/img/info-01.svg" style="width: 15px;margin: 0px 20px 0px 4px;"></div></div>' +
            '</div>';

        if (parseInt(STORE.deliveryStore) == 0 || parseInt(SEND_INFO.price_shop.result) == -3) {

            console.log("No tiene envio a tienda");


        } else if (parseInt(SEND_INFO.price_shop.result) == -2) {

            OPCIONENTREGA = "shop";

            //NO CUMPLE ENVIO MINIMO HA TIENDA

            html +=
                '<div class="btn_disabled" style="width: 50%;margin: 0% 25% 1% 25%;" onclick="pantallaInterLoginPago(\'' + OPCIONENTREGA + '\',' + SEND_INFO.price_shop.taxPrice + ',' + SEND_INFO.price_shop.totalPrice + ',' + SEND_INFO.price_shop.basePrice + ')">' +
                '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/tienda.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_trece + '</label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(totalCesta, 2, ",", ".", "€") + '</strong></label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-solo"><div class="ui-block-a" style="height: 45px;text-align: right;">Envio disponible a partir de ' + parseFloat(SEND_INFO.price_shop.minFreeShipping).toFixed(2) + ' €<img src="http://partyfiesta.youtter.com/app/alb/img/info-01.svg" style="width: 15px;margin: 0px 20px 0px 4px;"></div></div>' +
                '</div>';


        } else {

            OPCIONENTREGA = "shop";

            html +=
                '<div style="width: 50%;margin: 0% 0% 1% 0%;" onclick="pantallaInterLoginPago(\'' + OPCIONENTREGA + '\',' + SEND_INFO.price_shop.taxPrice + ',' + SEND_INFO.price_shop.totalPrice + ',' + SEND_INFO.price_shop.basePrice + ')">' +
                '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-a"><div class="ui-block-a" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/tienda.png" style="width: 45px;"></div><div class="ui-block-b" style="width: 90%;height: 45px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_trece + '</label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label>Total cesta: <strong font-size: 20px;>' + formatoNumero(totalCesta + parseFloat(SEND_INFO.price_shop.totalPrice), 2, ",", ".", "€") + '</strong></label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 40px;line-height: 40px;border-bottom: 2px solid #ccc;" class="ui-grid-solo"><div class="ui-block-a" style="padding-right: 20px;"><label style="font-style: italic;">' + parseFloat(SEND_INFO.price_shop.totalPrice).toFixed(2) + '€ gastos de envio </label></div></div>' +
                '<div style="background-color: #d8d8d8;color: black;text-align: right;width: 100%;height: 45px;line-height: 45px;" class="ui-grid-solo"><div class="ui-block-a" style="height: 45px;text-align: right;">Envio gratuito a partir de ' + parseFloat(SEND_INFO.price_shop.minFreeShipping).toFixed(2) + ' €<img src="http://partyfiesta.youtter.com/app/alb/img/info-01.svg" style="width: 15px;margin: 0px 20px 0px 4px;"></div></div>' +
                '</div>';

        }

        html +=
            '<div class="ui-grid-a" style="width: 50%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
            '</center>' +
            '</div>';


        break;
    }

    $("#divContent").html(html);
    $("#divContent").trigger('create');

}


function sistemasPago(soloOnline) {

    console.log('--> sistemasPago ' + soloOnline);

    pantallaActual = "sistemas pago";

    $("#divBack").html('<div onclick="opcionesEnvio(' + OPCIONENVIO + ')"><div class="ui-grid-b"><div class="ui-block-a" style="width: 10%;"><span  class="flaticon-leftarrow" style="font-size:8px;float:left;text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 90%;"><label style="font-weight: bold;">Opciones de envio</label></div></div></div>');

    //inicializamos el boton
    var paypal = '<form id="formPaypal" method="post" action="https://www.paypal.com/cgi-bin/webscr">' +
        '<input type="hidden" name="currency_code" value="EUR">' +
        '<input type="hidden" name="lc" value="ES">' +
        '<input type="hidden" name="cmd" value="_cart">' +
        '<input type="hidden" name="upload" value="1">' +
        '<input type="hidden" name="return" value="http://partyfiesta.youtter.com/app/alb/pedido_finalizado.php?email=' + INFO_USU.email.replace(/\s/g, " ") + '&idUser=' + INFO_USU.id + '&shop=' + STORE.id + '">' +
        '<input type="hidden" name="cancel_return" value="http://partyfiesta-prod.youtter.com:60780/app/alb/">' +
        '<input type="hidden" name="business" value="tiendaonline@partyfiesta.com">';

    var add = '';
    var i = 0;

    if (soloOnline == "si") {

        console.log("Solo online");
        var aux = 0;
        for (i = 0; i < CART.length; i++) {

            if (CART[i].stock_x_store == 0 || CART[i].online_quantity > 0) { //solo cargaremos los productos online

                console.log("Prod ");
                console.log(CART[i]);

                if (CART[i].online_quantity > 0) var cantidad = CART[i].online_quantity;
                else var cantidad = CART[i].quantity;


                if (aux == 0) {

                    paypal +=
                        // '<input type="hidden" name="add" value="1">' +
                        '<input type="hidden" name="item_name_' + (aux + 1) + '" value="' + CART[i].name + '">' +
                        '<input type="hidden" name="item_number_' + (aux + 1) + '" value="' + parseInt(CART[i].sku) + '">' +
                        '<input type="hidden" name="amount_' + (aux + 1) + '" value="' + CART[i].price_x_region[0].totalPrice + '">' +
                        '<input type="hidden" name="quantity_' + (aux + 1) + '" value="' + parseInt(cantidad) + '">';

                } else {

                    paypal += //'<input type="hidden" name="upload" value="1">' +
                        '<input type="hidden" name="item_name_' + (aux + 1) + '" value="' + CART[i].name + '">' +
                        '<input type="hidden" name="item_number_' + (aux + 1) + '" value="' + parseInt(CART[i].sku) + '">' +
                        '<input type="hidden" name="amount_' + (aux + 1) + '" value="' + CART[i].price_x_region[0].totalPrice + '">' +
                        '<input type="hidden" name="quantity_' + (aux + 1) + '" value="' + parseInt(cantidad) + '">';

                }
                aux++;

            }
        }

        paypal += //'<input type="hidden" name="upload" value="1">' +
            '<input type="hidden" name="item_name_' + (aux + 1) + '" value="Gastos de envio">' +
            //'<input type="hidden" name="item_number_' + i + '" value="00000">' +
            '<input type="hidden" name="amount_' + (aux + 1) + '" value="' + parseFloat(SEND_INFO.price_dom.totalPrice).toFixed(2) + '">' +
            '<input type="hidden" name="quantity_' + (aux + 1) + '" value="1">' +
            //'<input type="image" src="" border="0" name="submit" alt="Realice pagos con PayPal: es rápido, gratis y seguro.">' +
            '</form>'; //https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png


    } else {

        for (i = 0; i < CART.length; i++) {

            if (parseInt(CART.length) == 1) {

                paypal +=
                    // '<input type="hidden" name="add" value="1">' +
                    '<input type="hidden" name="item_name_' + (i + 1) + '" value="' + CART[i].name + '">' +
                    '<input type="hidden" name="item_number_' + (i + 1) + '" value="' + parseInt(CART[i].sku) + '">' +
                    '<input type="hidden" name="amount_' + (i + 1) + '" value="' + CART[i].price_x_region[0].totalPrice + '">' +
                    '<input type="hidden" name="quantity_' + (i + 1) + '" value="' + parseInt(CART[i].quantity) + '">';

            } else {

                paypal += //'<input type="hidden" name="upload" value="1">' +
                    '<input type="hidden" name="item_name_' + (i + 1) + '" value="' + CART[i].name + '">' +
                    '<input type="hidden" name="item_number_' + (i + 1) + '" value="' + parseInt(CART[i].sku) + '">' +
                    '<input type="hidden" name="amount_' + (i + 1) + '" value="' + CART[i].price_x_region[0].totalPrice + '">' +
                    '<input type="hidden" name="quantity_' + (i + 1) + '" value="' + parseInt(CART[i].quantity) + '">';

            }

        }

        var precio_envio = 0;

        if (OPCIONENTREGA == 'shop') {

            if (SEND_INFO.price_shop.taxPrice == undefined) {
                var precio_envio = SEND_INFO.price_dom.totalPrice;
            } else {
                var precio_envio = SEND_INFO.price_shop.totalPrice;
            }

        } else {

            var precio_envio = SEND_INFO.price_dom.totalPrice;

        }

        paypal += //'<input type="hidden" name="upload" value="1">' +
            '<input type="hidden" name="item_name_' + (i + 1) + '" value="Gastos de envio">' +
            //'<input type="hidden" name="item_number_' + i + '" value="00000">' +
            '<input type="hidden" name="amount_' + (i + 1) + '" value="' + parseFloat(precio_envio).toFixed(2) + '">' +
            '<input type="hidden" name="quantity_' + (i + 1) + '" value="1">' +
            //'<input type="image" src="" border="0" name="submit" alt="Realice pagos con PayPal: es rápido, gratis y seguro.">' +
            '</form>'; //https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png


    }

    var html = '<div>' +
        '<center>' +
        '<h2 style="text-transform: uppercase;color:#0197d4;">' + jsonIdiomas.proceso_pago.tl_catorce + '</h2>' +
        '<div id="caja" style="width: 50%;margin: 0% 0% 1% 0%;" onclick="">' +
        '<div style="background-color: #0197d4;color:white;text-align:left;width:100%;height:60px;line-height:60px;" class="ui-grid-a"><div class="ui-block-a" style="width: 15%;height: 60px;"><img src="http://partyfiesta.youtter.com/app/alb/img/caja_registradora.png" style="width: 60px;"></div><div class="ui-block-b" style="width: 85%;height: 60px;text-align: left;"><label>' + jsonIdiomas.proceso_pago.tl_quince + '</label></div></div>' +
        '</div>' +
        '<div id="paypal" style="width: 50%;margin: 0% 0% 1% 0%;">' +
        '<div style="background-color: #0197d4;color: white;text-align: left;width: 100%;height: 60px;line-height: 60px;" class="ui-grid-c">' +
        '<div class="ui-block-a" style="width: 15%;height: 60px;"><img src="http://partyfiesta.youtter.com/app/alb/img/caja_registradora.png" style="width: 60px;"></div>' +
        '<div class="ui-block-b" style="width: 45%;height: 60px;text-align: left;"><label>' + jsonIdiomas.btn_paypal + '</label></div>' +
        '<div class="ui-block-c" style="width: 40%;height: 60px;text-align: left;"><img src="img/logotipo_paypal_tarjetas.png" style="margin-top: 13px;"></div>' +
        '</div>' +
        paypal +
        '</div>' +
        '<br>' +
        '<div class="ui-grid-a" style="width: 50%;background-color:#dd3324;margin; 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
        '</center>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');


    $("#paypal").click(function () {
        $("#popupCargando").popup("open");
        //sendBasketAndOrder('cash register');
        $("#formPaypal").submit();
    });

    $("#caja").click(function () {

        $("#popupCargando").popup("open");
        sendBasketAndOrder('cash register');

        /*html = '<center>' +
            '<div style="margin-top:10%;width: 50%;" onclick="getNodes(0);">' +
            '<div class="ui-grid-solo" style="color:#0197d4;">' +
            '<label style="font-size:x-large;">' + jsonIdiomas.pago_caja + '</label>' +
            '</div>' +
            '<div class="ui-grid-b" style="height:58px;background-color:#0197d4;">' +
            '<div class="ui-block-a" style="width:10%;padding-top: 6px;"><img src="img/check.png" style="width:45px"></div>' +
            '<div class="ui-block-b" style="width:90%;"><label style="color:white;line-height: normal;font-size: x-large;">' + jsonIdiomas.proceso_pago.tl_diezyseis + '</label></div>' +
            '</div>' +
            '</div>' +
            '</center>';

        $("#divContent").html(html);
        $("#divContent").trigger('create');

        setTimeout(function () {
            getNodes(0);
        }, 10000);*/

    });


}

function formularioTiendaDestino() {

    console.log('-> formularioTiendaDestino()'); // TEMP !!

    // TEMP !!!!!
    var html = '<div>' +
        '<br><br><center>' +
        '<h2>SELECCIONE TIENDA DE DESTINO</h2>' +
        '<div id="div_select_provincia" style="width: 50%;"></div>' +
        '<div id="div_select_tienda_pago" style="width: 50%;"><select data-corners="false" id="selectShop" data-native-menu="false" data-theme="b" style=""></select></div>' +
        '<a data-corners="false" style="width:47%;" onclick="" data-role="button" data-theme="b" ><label>SELECCIONAR</label></a>' +
        '</center>';


    $("#divContent").html(html);
    $("#divContent").trigger('create');

    $('#div_select_tienda_pago').css('display', 'none');

    //loadSelectShopsFromProvince(STORE.province);

    loadSelectProvincias();

    $("#selectProvince").change(function () {

        idProvince = $("#selectProvince").val();
        console.log("Provincia " + idProvince);

        loadSelectShopsFromProvince(idProvince);

    });

}

function loadSelectProvincias() {

    getProvinces();

    //console.log('-> loadSelectProvincias() con language: ' + language + ' i provincias: ' + PROVINCIAS.length); // TEMP !!

    var html = '<select data-corners="false" id="selectProvince" data-native-menu="false" data-theme="b" style="">';

    for (var i = 0; i < PROVINCIAS.length; i++) {

        var val = PROVINCIAS[i].id;
        var text = '';

        switch (language) {
        case 1:
            text = PROVINCIAS[i].name_ca;
            break;

        case 2:
            text = PROVINCIAS[i].name_es;
            break;

        case 3:
            text = PROVINCIAS[i].name_en;
            break;

        case 4:
            text = PROVINCIAS[i].name_ge;
            break;

        case 5:
            text = PROVINCIAS[i].name_pt;
            break;

        case 6:
            text = PROVINCIAS[i].name_fr;
            break;

        case 9:
            text = PROVINCIAS[i].name_it;
            break;

        default:
            text = PROVINCIAS[i].name_es;
        }

        html = html + '<option value="' + val + '"><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

    }

    html = html + '</select>';

    //console.log('-> Incluyendo html: ' + html); // TEMP !!

    $("#div_select_provincia").html(html);
    $("#div_select_provincia").trigger('create');
    //$("#div_select_provincia").css('font-size', '20px');
}


function loadSelectProvinciasFromCountry(divName, idCountry, idSelect) {

    getProvincesFromCountry(idCountry);

    //console.log('-> loadSelectProvincias() con language: ' + language + ' i provincias: ' + PROVINCIAS.length); // TEMP !!

    //var provincias = getProvinces();
    //getProvinces();

    var html = '<select data-corners="false" id="' + idSelect + '" data-native-menu="false" data-theme="b" style="">';

    html = html + '<option value="vacio"><label style="color:white;text-transform: uppercase;"></label></option>';

    for (var i = 0; i < PROVINCIAS.length; i++) {

        var val = PROVINCIAS[i].id;
        var text = '';

        switch (language) {
        case 1:
            text = PROVINCIAS[i].name_ca;
            break;

        case 2:
            text = PROVINCIAS[i].name_es;
            break;

        case 3:
            text = PROVINCIAS[i].name_en;
            break;

        case 4:
            text = PROVINCIAS[i].name_ge;
            break;

        case 5:
            text = PROVINCIAS[i].name_pt;
            break;

        case 6:
            text = PROVINCIAS[i].name_fr;
            break;

        case 9:
            text = PROVINCIAS[i].name_it;
            break;

        default:
            text = PROVINCIAS[i].name_es;
        }

        html = html + '<option value="' + val + '"><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

    }

    html = html + '</select>';

    //console.log('-> Incluyendo html: ' + html); // TEMP !!

    var idDiv = '#' + divName;

    $(idDiv).html(html);
    $(idDiv).trigger('create');
    //$("#div_select_provincia").css('font-size', '20px');
}

function loadSelectPaises(divName, idSelect) {

    getCountrys();

    //console.log('-> loadSelectProvincias() con language: ' + language + ' i provincias: ' + PROVINCIAS.length); // TEMP !!

    //var provincias = getProvinces();
    //getProvinces();

    var html = '<select data-corners="false" id="' + idSelect + '" data-native-menu="false" style="">';

    for (var i = 0; i < PAISES.length; i++) {

        var val = PAISES[i].id;
        var text = '';

        switch (language) {
        case 1:
            text = PAISES[i].name_ca;
            break;

        case 2:
            text = PAISES[i].name_es;
            break;

        case 3:
            text = PAISES[i].name_en;
            break;

        case 4:
            text = PAISES[i].name_ge;
            break;

        case 5:
            text = PAISES[i].name_pt;
            break;

        case 6:
            text = PAISES[i].name_fr;
            break;

        case 9:
            text = PAISES[i].name_it;
            break;

        default:
            text = PAISES[i].name_es;
        }

        html = html + '<option value="' + val + '"><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

    }

    html = html + '</select>';

    //console.log('-> Incluyendo html: ' + html); // TEMP !!

    var idDiv = '#' + divName;

    $(idDiv).html(html);
    $(idDiv).trigger('create');
    //$("#div_select_provincia").css('font-size', '20px');
}

function loadSelectShopsFromProvince(idProvince) {

    getShopsFromProvince(idProvince);

    console.log("SHOPSSSSSS");
    console.log(SHOPS);

    var select = $('#selectShop');

    setTimeout(function () {


        for (var i = 0; i < SHOPS.length; i++) {

            var val = SHOPS[i].id;
            var text = SHOPS[i].name;

            //html = html + '<option value="' + val + '" style=""><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';

            select.append($('<option>', {
                value: val,
                text: text
            }));

            select.selectmenu('refresh', true);

        }

    }, 250);

    $('#div_select_tienda_pago').css('display', 'block');

}

function changeFormRegUser(html_register_user) {

    var html_register_user = '<h2>Registro Usuario</h2>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">email *</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_email" type="email" name="input_email" required  placeholder="nombre@email.com" autofocus data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Repetir email *</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input size="48" id="input_repetir_email" name="input_repetir_email" required="required" type="email" placeholder="nombre@email.com" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Contraseña *</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_pass" name="input_pass" required="required" type="password" placeholder="" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Repetir contraseña *</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_repetir_pass" name="input_repetir_pass" required="required" type="password" placeholder="" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Código postal *</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_cp" name="input_cp" data-type="user_reg" required="required" type="text" placeholder="00000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +

        '</div>' +
        '</div>';


    var div_form_reg_user = $('#div_form_reg_user');

    div_form_reg_user.empty();

    div_form_reg_user.html(html_register_user);
    div_form_reg_user.trigger('create');


    function ValidateEmail(email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    };

    $("#input_email").focusout(function () {
        if (!ValidateEmail($("#input_email").val())) {
            console.log("Email invalido");
            $("#input_email").val("");
            $("#input_email").attr("placeholder", "El correo no es válido");
            $("#input_email").text("");
        } else {
            console.log("Email valido");
        }
    });

    /* $("#input_repetir_email").focusout(function () {

         if (!ValidateEmail($("#input_repetir_email").val())) {
             console.log("Email invalido");
             $("#input_repetir_email").attr("placeholder", "Correo no es válido").placeholder();
             $("#input_repetir_email").val("");
         } else {
             console.log("Email valido");
         }

     });*/



}

function displayDomicilioFacturacionForm() {

    console.log("Cargamos el form de facturacion");

    var html_login_user = '<div id="contenedorInfoUsuario"><h2>Info Usuario</h2>' +
        '<center>' +
        '<div style="height: 35px;">Es necesario <a id="login2" onclick="displayLogin();" style="margin:10px;color: blue;" class="ui-link">Identificarse</a> o <a id="registrarse_reg_domicilio" onclick="changeFormRegUser();" style="margin:10px;color: green;" class="ui-link">Registrarse</a></div>' +
        '</center></div>';

    html = //'<div id="div_registrarse" style="width:80%; margin:0 auto;">' +
        //'<form id="formFacturacion" autocomplete="on"><div id="div_form_reg_user">' +
        //(INFO_USU.id != undefined ? '<div id="contenedorInfoUsuario"></div>' : html_login_user) +
        //html_login_user +
        //'</div>' +
        '<div id="div_direcion_facturacion">' + // --> FORMULARIO DIRECCION FACTURACION !!!!    **********
        '<h2>Dirección de Facturación</h2>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Nombre</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_nombreUsuario_2" name="input_nombreUsuario_2" data-type="facturacion" required="required" type="text" placeholder="Nombre" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Apellidos</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_apellidos_2" name="input_apellidos_2" data-type="facturacion" required="required" type="text" placeholder="Apellido1 Apellido2" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u">Tel&eacute;fono</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_telefono_2" name="input_telefono_2" data-type="facturacion" required="required" type="text" placeholder="930000000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">DNI/CIF</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_dni_cif_2" name="input_dni_cif_2" data-type="facturacion" required="required" type="text" placeholder="45444444T" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">Dirección</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_direccion_2" name="input_direccion_2" data-type="facturacion" required="required" type="text" placeholder="Dirección" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p">Número</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_num_direccion_2" name="input_num_direccion_2" data-type="facturacion" required="required" type="text" placeholder="Número" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +

        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">Código postal</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_postal_2" name="input_postal_2" data-type="facturacion" required="required" type="text" placeholder="00000" data-clear-btn="true"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u">Ciudad</label>' +
        '<div class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_ciudad_2" name="input_ciudad_2" data-type="facturacion" required="required" type="text" placeholder="Barcelona" data-clear-btn="true"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p">País</label>' +
        //'<div id="div_input_pais_2" class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"><input id="input_pais_2" name="input_pais_2" data-type="facturacion" required="required" type="text" placeholder="España" data-clear-btn="true"></div>' +

        '<div id="div_input_pais_2" class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"></div>' +

        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u">Provincia</label>' +

        '<div id="div_input_provincia_2" class="ui-body-inherit ui-corner-all" style="width:80%; margin:0 auto;"></div>' +

        '</div>' +
        '</div>' +

        '</div>' +

        '<button type="button" id="button_continuar_direcciones" class="ui-btn ui-shadow ui-corner-all" >Continuar</button>' + //onclick="if(checkForm()){registroUsuarioDomicilio(1);}"

        '</form>' +
        '</div>' +

        '<center>' +
        '<br/>' +
        '<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
        '</center>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');

    $("#button_continuar_direcciones").click(function () {

        if (OPCIONPEDIDO == 3) {
            console.log("Entra 3 formulario");
            if (checkForm()) {
                
                console.log('ProdEnTienda: ' + CART.productosEnTienda + ' ProdSoloEnTienda: ' + CART.productosSoloEnTienda + 'ProdEnWeb: ' + CART.ProdEnWeb + ' ProdSoloEnWeb: ' + CART.ProdSoloEnWeb);
                if ( CART.productosEnTienda > 0 || CART.productosSoloEnTienda > 0 )	{
                	console.log('-> pagarEnCajaPrevioPago');
					pagarEnCajaPrevioPago();
				}
				else	{
					console.log('-> sistemasPago');
					sistemasPago('si');
				}
                
                //OPCIONPEDIDO = 0;
            }

        } else {
            console.log("Entra no es 3");
            if (checkForm()) {
                registroUsuarioDomicilio(1);
                //OPCIONPEDIDO = 0;
            }
        }


    });


    if (INFO_USU.id != undefined) { //  ------- Si el susuario esta logado no muestro cuadro de opciones de registro
        $("#contenedorInfoUsuario").hide();
    }

    if (INFO_USU.id != undefined) { // si el usuario ha hecho login rellenar campos

        console.log('--> Cargando datos de sesion en formulario:'); // TEMP !!
        console.log(INFO_USU); // TEMP !!

        cargaDatosUsuarioAFormularioRegistro();
    } else { // TEMP !!
        console.log('-->Usuario no logueado, no se cargaran datos de sesion en formulario:'); // TEMP !!   
    }


    loadSelectPaises('div_input_pais_2', 'selectCountry');


    $("#selectCountry").change(function () {

        console.log('Cambio de pais, ahora es:' + $("#selectCountry").val());

        loadSelectProvinciasFromCountry('div_input_provincia_2', $("#selectCountry").val(), 'selectProvince_2');

    });

}



function displayDomicilioForm(destinoEnvio, taxPrice, totalPrice, basePrice) {

    PRECIOSENVIO = {
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        basePrice: basePrice
    };

    if (PRECIOSENVIO.taxPrice == undefined) PRECIOSENVIO.taxPrice = 0;
    if (PRECIOSENVIO.totalPrice == undefined) PRECIOSENVIO.totalPrice = 0;
    if (PRECIOSENVIO.basePrice == undefined) PRECIOSENVIO.basePrice = 0;

    console.log("Precios envio ")
    console.log(PRECIOSENVIO);

    var html_login_user = '<div id="contenedorInfoUsuario"><h2>Info Usuario</h2>' +
        '<center>' +
        '<div style="height: 35px;">Es necesario <a id="login2" onclick="displayLogin();" style="margin:10px;color: blue;" class="ui-link">Identificarse</a> o <a id="registrarse_reg_domicilio" onclick="changeFormRegUser();" style="margin:10px;color: green;" class="ui-link">Registrarse</a></div>' +
        '</center></div>';

    html = '<div id="div_registrarse" style="width:80%; margin:0 auto;">' +
        //'<form id="formDirecciones" autocomplete="on"><div id="div_form_reg_user">' +

        //(INFO_USU.id != undefined ? '<div id="contenedorInfoUsuario"></div>' : html_login_user) +

        //html_login_user +

        //'</div>' +
        '<h2 id="h2_direccion" style="margin: 0 0 0 0;color:#0197d4;">' + jsonIdiomas.dir_facturacion.tl_direccion + '</h2><hr style="border-color:#0197d4;">' +
        '<div class="ui-grid-a" style="margin-top: 10px;height: 25px;">' + // --> CHECK DIRECCION !!!!    **********
        '<div class="ui-block-a" style="width: 40%;">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.sel_dir_fac_envio + '</label>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<input id="check_misma_direccion" style="margin-top: -7px;" type="checkbox" value="Click me" onclick="" data-cacheval="false" checked>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.nombre + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_nombreUsuario" name="input_nombreUsuario" data-type="entrega" required="required" type="text" placeholder="""></div>' + //autofocus   data-clear-btn="true
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.apellidos + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_apellidos" name="input_apellidos" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.telf + ' *</label>' +
        '<div class="" style="width:80%;"><input data-corners="false" style="width: 100%;border:1px solid #0197d4" id="input_telefono" name="input_telefono" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.dni + ' *</label>' +
        '<div class="" style="width:80%;"><input data-corners="false" style="width: 100%;border:1px solid #0197d4" id="input_dni_cif" name="input_dni_cif" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.tl_direccion + ' *</label>' +
        '<div class="" style="width:80%;"><input data-corners="false" style="width: 100%;border:1px solid #0197d4" id="input_direccion" name="input_direccion" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.numero + ' *</label>' +
        '<div class="" style="width:80%;"><input data-corners="false" style="width: 100%;border:1px solid #0197d4" id="input_num_direccion" name="input_num_direccion" data-type="entrega" required="required" type="text" placeholder="" ></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.codPos + '</label>' +
        '<div class="" style="width:80%;"><input data-corners="false" style="width: 100%;border:1px solid #0197d4" id="input_postal" name="input_postal" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.ciudad + '</label>' +
        '<div class="" style="width:80%;"><input data-corners="false" style="width: 100%;border:1px solid #0197d4" id="input_ciudad" name="input_ciudad" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.pais + ' *</label>' +
        '<div id="div_input_pais" class="" data-corners="false" style="width:80%;"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.prov + ' *</label>' +
        '<div id="div_input_provincia" class="" data-corners="false" style="width:80%;"></div>' +
        '</div>' +
        '</div>' +
        '<div id="div_direcion_facturacion" style="display:none;">' + // ----------------------------------------> FORMULARIO DIRECCION FACTURACION !!!!    **********
        '<h2 style="margin: 0 0 0 0;color:#0197d4;">' + jsonIdiomas.dir_facturacion.tl_dir_fac + '</h2><hr style="border-color:#0197d4;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.nombre + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_nombreUsuario_2" name="input_nombreUsuario_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.apellidos + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_apellidos_2" name="input_apellidos_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.telf + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_telefono_2" name="input_telefono_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.dni + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_dni_cif_2" name="input_dni_cif_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.telf + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_direccion_2" name="input_direccion_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.numero + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_num_direccion_2" name="input_num_direccion_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.codPos + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_postal_2" name="input_postal_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.ciudad + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="input_ciudad_2" name="input_ciudad_2" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.pais + ' *</label>' +
        '<div id="div_input_pais_2" class="" style="width:80%;"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.dir_facturacion.prov + ' *</label>' +
        '<div id="div_input_provincia_2" class="" style="width:80%;"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        //'</form>' +
        '<button type="button" data-corners="false" id="button_continuar_direcciones" class="" style="width: 90%;text-transform: uppercase;background-color:#0197d4;">' + jsonIdiomas.dir_facturacion.continuar + '</button>' +
        //'<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
        //'<center>' +
        '<div class="ui-grid-a" style="width: 90%;background-color:#dd3324;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="padding-left: 290px;width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">' + jsonIdiomas.dir_facturacion.cancelar + '</div><div class="ui-block-b" style="width:10%;height:45px;padding-left: 20px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
        //'</center>' +
        '</div>';

    //'<center>' +
    //'<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
    //'</center>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');

    $("#button_continuar_direcciones").click(function () {

        if (OPCIONPEDIDO == 3) {
            console.log("Entra 3");
            if (checkForm()) {
                
                console.log('ProdEnTienda: ' + CART.productosEnTienda + ' ProdSoloEnTienda: ' + CART.productosSoloEnTienda + 'ProdEnWeb: ' + CART.ProdEnWeb + ' ProdSoloEnWeb: ' + CART.ProdSoloEnWeb);
                if ( CART.productosEnTienda > 0 || CART.productosSoloEnTienda > 0 )	{
                	console.log('-> pagarEnCajaPrevioPago');
					pagarEnCajaPrevioPago();
				}
				else	{
					console.log('-> sistemasPago');
					sistemasPago('si');
				}
                
                //OPCIONPEDIDO = 0;
            }

        } else {
            console.log("Entra no es 3");
            if (checkForm()) {
                registroUsuarioDomicilio();
                //OPCIONPEDIDO = 0;
            }
        }


    });


    /*if (INFO_USU.id != undefined) { //  ------- Si el susuario esta logado no muestro cuadro de opciones de registro
        $("#contenedorInfoUsuario").hide();
    }*/

    loadSelectPaises('div_input_pais', 'selectCountry');
    loadSelectProvinciasFromCountry('div_input_provincia', 1, 'selectProvince');

    loadSelectPaises('div_input_pais_2', 'selectCountry_2');
    loadSelectProvinciasFromCountry('div_input_provincia_2', 1, 'selectProvince_2');

    $("#selectCountry").change(function () {

        console.log('Cambio de pais, ahora es:' + $("#selectCountry").val());

        loadSelectProvinciasFromCountry('div_input_provincia', $("#selectCountry").val(), 'selectProvince');

    });

    $("#selectCountry_2").change(function () {

        console.log('Cambio de pais, ahora es:' + $("#selectCountry_2").val());

        loadSelectProvinciasFromCountry('div_input_provincia_2', $("#selectCountry_2").val(), 'selectProvince_2');

    });

    $("#check_misma_direccion").click(function () { //  ---------------     evento de click en el checkbox  --------

        console.log('--> click!!');

        var chk = $("#check_misma_direccion");

        if (chk.prop('checked')) { // Las direcciones de entrega y facturación son las mismas
            $("#div_direcion_facturacion").hide();

            $("#h2_direccion").text('Dirección');

            console.log('---> checked');
        } else { // Las direcciones de entrega y facturación son diferentes (2 formularios)
            $("#div_direcion_facturacion").show();

            $("#h2_direccion").text('Dirección de entrega');

            console.log('---> NO checked');

            cargaDatosDeDirecciónEntregaAFacturacion();
        }

    });


    if (INFO_USU.id != undefined) { // si el usuario ha hecho login rellenar campos

        console.log('--> Cargando datos de sesion en formulario:'); //TEMP !!
        console.log(INFO_USU); // TEMP !!

        cargaDatosUsuarioAFormularioRegistro();

    } else { // TEMP !!
        console.log('-->Usuario no logueado, no se cargaran datos de sesion en formulario:'); // TEMP !!   
    }
}

function checkForm() {

    var chk = $("#check_misma_direccion");

    var link_reg_usuario = $("#registrarse_reg_domicilio");

    if (link_reg_usuario.length > 0 && link_reg_usuario.is(":visible")) { // El usuario NO ha clicado en registrarse

        console.log('-->Realizar control registro Usuario.');

        if (chk.length > 0) {

            if (chk.prop('checked')) {
                console.log('-->Control Form Entrega.');

                return (checkFormRegUser() && checkFormDireccion('entrega'));
            } else {
                console.log('-->Control Form Entrega y facturación.');

                return (checkFormRegUser() && checkFormDireccion('entrega') && checkFormDireccion('facturacion'));
            }

        } else {
            return (checkFormRegUser() && checkFormDireccion('facturacion'));
        }

    } else { // El usuario ha clicado en registrarse, se muestra el formulario.

        console.log('-->NO Realizar control registro Usuario.');

        if (chk.length > 0) {

            if (chk.prop('checked')) {
                console.log('-->Control Form Entrega.');

                return (checkFormDireccion('entrega')); //checkFormRegUser() &&
            } else {
                console.log('-->Control Form Entrega y facturación.');

                return (checkFormDireccion('entrega') && checkFormDireccion('facturacion')); //checkFormRegUser() && 
            }

        } else {
            return (checkFormDireccion('facturacion')); //checkFormRegUser() &&
        }

    }
}

/**
 *       checkFormDireccion
 *
 *       checkea formulario de direcciones
 *       param: tipoDireccion ( 'entrega' | 'facturacion' )
 */

var E; // TEMP !!

function checkFormDireccion(tipoDireccion) {

    /*var field = $('input_nombreUsuario');
    
                        if (  field.val().localeCompare('') == 0 )	{
                            field.focus();
                            
                            $("#texto_popup").text('Campo Vacio');
                            $('#popupAlert').popup('open');
                            
                            return false;
                        }*/

    console.log('--> Address forms para tipoDireccion: ' + tipoDireccion);

    var valor = true;

    var formDirecciones = (tipoDireccion == 'entrega' ? $("#formDirecciones") : $("#formFacturacion"));


    //$("#formDirecciones").find(':text').each(function() {   // itera sobre todos los campos de tipo text
    formDirecciones.find(':text').each(function () { // itera sobre todos los campos de tipo text

        var elemento = $(this);

        E = elemento; // TEMP !!

        var bla = $(this).data('type'); // temp !!

        console.log('-----> BLA!!: ' + bla); // TEMP !!
        //alert("elemento.id="+ elemento.id + ", elemento.value=" + elemento.value);

        console.log('-----> Checking: ' + elemento.id); // TEMP !!

        //if ( $(this).data("type").localeCompare( tipoDireccion ) == 0 )   {
        if (elemento.data('type').localeCompare(tipoDireccion) == 0) {

            if (elemento.val() == undefined || elemento.val() == '') {
                elemento.focus();

                $("#texto_popup").text('Campo Vacio');
                $('#popupAlert').popup('open');

                console.log('--> returning false.'); // TEMP !!

                console.log('-> El campo es false!! ----------------------------.'); // TEMP !!

                valor = false;

                return false;
            }

        }

    });

    return valor;
}

function checkFormRegUser() {

    console.log('--> Checking user form');

    $mail_1 = $('#input_email').val();
    $mail_2 = $('#input_repetir_email').val();

    if ($mail_1 == undefined || $mail_1.localeCompare('') == 0) {

        $('#input_email').focus();

        $("#texto_popup").text('Campo Vacio');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 1 $mail_1 false.'); // TEMP !!

        return false;

    } else if ($mail_1.search("@") == -1) {

        $('#input_email').focus();

        $("#texto_popup").text('Email incorrecto');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 2 $mail_1 no @ false.'); // TEMP !!

        return false;
    }

    if ($mail_2 == undefined || $mail_2.localeCompare('') == 0) {

        $('#input_repetir_email').focus();

        $("#texto_popup").text('Campo Vacio');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 3 $mail_2 false.'); // TEMP !!

        return false;
    } else if ($mail_2.search("@") == -1) {

        $('#input_repetir_email').focus();

        $("#texto_popup").text('Email incorrecto');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 4 $mail_2 no @ false.'); // TEMP !!

        return false;
    }

    $compare = $mail_1.localeCompare($mail_2);

    if ($compare != 0) {

        $('#input_email').focus();

        $("#texto_popup").text('Los campos de email no coinciden');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 5 No coinciden false.'); // TEMP !!

        return false;
    }


    $pass_1 = $('#input_pass').val();
    $pass_2 = $('#input_repetir_pass').val();

    if ($pass_1 == undefined || $pass_1.localeCompare('') == 0) {

        $('#input_pass').focus();

        $("#texto_popup").text('Campo Vacio');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 6 $pass_1 false.'); // TEMP !!

        return false;
    }

    if ($pass_2 == undefined || $pass_2.localeCompare('') == 0) {

        $('#input_repetir_pass').focus();

        $("#texto_popup").text('Campo Vacio');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 7 $pass_2 false.'); // TEMP !!

        return false;
    }

    $compare = $pass_1.localeCompare($pass_2);

    if ($compare != 0) {

        $('#input_pass').focus();

        $("#texto_popup").text('Los campos de password no coinciden');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 8 $pass no coinciden false.'); // TEMP !!

        return false;
    }

    $cp_user = $('#input_cp').val();

    if ($cp_user == undefined || $cp_user.localeCompare('') == 0) {

        $('#input_cp').focus();

        $("#texto_popup").text('Campo Vacio');
        $('#popupAlert').popup('open');

        console.log('------------------------------> 9 $cp_user false.'); // TEMP !!

        return false;
    }

    return true;
}

function cargaDatosDeDirecciónEntregaAFacturacion() {

    console.log('--> Cargando datos de direccion a facturacion'); // TEMP !!

    $('#input_nombreUsuario_2').val($('#input_nombreUsuario').val()) // ----> Click and collect
    $('#input_apellidos_2').val($('#input_apellidos').val());
    $('#input_telefono_2').val($('#input_telefono').val());
    $('#input_dni_cif_2').val($('#input_dni_cif').val());
    $('#input_direccion_2').val($('#input_direccion').val());
    $('#input_num_direccion_2').val($('#input_num_direccion').val()); // --> falta modificar el webservice login.php
    $('#input_postal_2').val($('#input_postal').val());
    $('#input_ciudad_2').val($('#input_ciudad').val());
    $('#input_num_direccion_2').val($('#input_num_direccion').val());

    /*$('#selectCountry_2 option').each(function () {
        if (this.value == $('#selectCountry').val()) {
            console.log('- Valor encontrado en selectCountry_2 marcada opcion: ' + this.value + ' - ' + this.text); // TEMP!!
            this.selected = true;
        } else {
            this.selected = false;
        }
    });*/

    $('#selectCountry_2 option[value="' + $("#selectCountry").val() + '"]').attr('selected', 'selected');
    $("#selectCountry_2").selectmenu('refresh', true);

    //$('#input_pais_2').val( $('#input_pais').val() );

    /*$('#selectProvince_2 option').each(function () {
        if (this.value == $('#selectProvince').val()) {
            console.log('- Valor encontrado en selectProvince_2 marcada opcion: ' + this.value + ' - ' + this.text); // TEMP!!
            this.selected = true;
        } else {
            this.selected = false;
        }
    });*/

    //$('#selectProvince_2 option[value="'+$("#selectProvince").val()+'"]').attr('selected', 'selected');
    //$( "#selectProvince_2").selectmenu('refresh', true);

    loadSelectProvinciasFromCountry('div_input_provincia_2', $("#selectCountry_2").val(), 'selectProvince_2');

    $('#selectProvince_2 option[value="' + $("#selectProvince").val() + '"]').attr('selected', 'selected');
    $("#selectProvince_2").selectmenu('refresh', true);

    //$('#input_provincia_2').val( $('#input_provincia').val() );

}

function cargaDatosUsuarioAFormularioRegistro() {

    if ($("#input_nombreUsuario").length > 0) { // ----> Envio a domicilio

        console.log('Cargando datos de usuario en Direccion entrega');

        $('#input_nombreUsuario').val(INFO_USU.name);
        $('#input_apellidos').val(INFO_USU.surname);
        $('#input_telefono').val(INFO_USU.phone);
        $('#input_dni_cif').val(INFO_USU.NIN);
        $('#input_direccion').val(INFO_USU.address);
        $('#input_num_direccion').val(INFO_USU.NIN); // --> falta modificar el webservice login.php
        $('#input_postal').val(INFO_USU.postalCode);
        $('#input_ciudad').val(INFO_USU.city);
        $('#input_num_direccion').val(INFO_USU.addressNumber);

        //$('#selectCountry option[value="' + INFO_USU.country + '"]').attr('selected', 'selected');
        $('#selectCountry option[value="' + INFO_USU.country + '"]').prop("selected", true);
        $("#selectCountry").selectmenu('refresh', true);

        loadSelectProvinciasFromCountry('div_input_provincia', INFO_USU.country, 'selectProvince');

        //$('#selectProvince > option[value="' + INFO_USU.province + '"]').attr('selected', 'selected');
        $('#selectProvince > option[value="' + INFO_USU.province + '"]').prop("selected", true);
        $("#selectProvince").selectmenu('refresh', true);


    } else {

        console.log('Cargando datos de usuario en Direccion Facturación');

        $('#input_nombreUsuario_2').val(INFO_USU.name) // ----> Click and collect
        $('#input_apellidos_2').val(INFO_USU.surname);
        $('#input_telefono_2').val(INFO_USU.phone);
        $('#input_dni_cif_2').val(INFO_USU.NIN);
        $('#input_direccion_2').val(INFO_USU.address);
        $('#input_num_direccion_2').val(INFO_USU.NIN); // --> falta modificar el webservice login.php
        $('#input_postal_2').val(INFO_USU.postalCode);
        $('#input_ciudad_2').val(INFO_USU.city);
        $('#input_num_direccion_2').val(INFO_USU.addressNumber);

        $('#selectCountry_2 option[value="' + INFO_USU.country + '"]').prop("selected", true);
        $("#selectCountry_2").selectmenu('refresh', true);

        //getProvincesFromCountry(idCountry);

        loadSelectProvinciasFromCountry('div_input_provincia_2', INFO_USU.country, 'selectProvince_2');


        $('#selectProvince_2 option[value="' + INFO_USU.province + '"]').prop("selected", true);
        $("#selectProvince_2").selectmenu('refresh', true);


    }
}

/**
 *
 *   funcion pagarEnCaja
 *
 *   Muesta opciones de Enviar correo, imprimir en tienda y cancelar pedido.
 */
function pagarEnCaja() {

    pantallaActual = "pagar caja";

    $("#divBack").html('<div onclick="opcionesPago()"><div class="ui-grid-b"><div class="ui-block-a" style="width: 10%;"><span  class="flaticon-leftarrow" style="font-size:8px;float:left;text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 90%;"><label style="font-weight: bold;">Opciones de pago</label></div></div></div>');

    var html = '<div>' +
        '<center>' +
        '<h3 style="text-transform: uppercase;color:#0197d4;">' + jsonIdiomas.pan_pago_tienda.tl_tienda + '</h3>' +
        '<br>' +
        '<a  data-corners="false" style="width:35%" onclick="sendEmail();" data-role="button" data-icon="mail" data-iconpos="right" data-theme="b">' + jsonIdiomas.pan_pago_tienda.envio_email + '</a>' +
        '<br>' +
        '<a  data-corners="false" style="width:35%" onclick="imprimirPedido();" data-role="button" data-icon="home" data-iconpos="right" data-theme="b">' + jsonIdiomas.pan_pago_tienda.imprimir + '</a>' +
        '<br>' +
        //'<a  data-corners="false" style="width:300px" onclick="pedidoOnline();" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b"> Pedido online </a>' +
        //'<br>' +
        //'<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
        '<div class="ui-grid-a" style="width:41%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">' + jsonIdiomas.pan_pago_tienda.cancelar + '</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
        '</center>' +
        '</div>';
    $("#divContent").html(html);
    $("#divContent").trigger('create');
}



function pagarEnCajaPrevioPago() {

    $("#divBack").html('<div onclick="opcionesPago();"><div class="ui-grid-b"><div class="ui-block-a" style="width: 10%;"><span  class="flaticon-leftarrow" style="font-size:8px;float:left;text-transform:uppercase;"></span></div><div class="ui-block-b" style="width: 90%;"><label style="font-weight: bold;">Opciones de pago</label></div></div></div>');

    var html = '<div>' +
        '<center>' +
        '<h3 style="text-transform: uppercase;color:#0197d4;"> ¿Qué deseas hacer con los productos que están en tienda?</h3>' +
        '<br>' +
        '<a  data-corners="false" style="width:35%" onclick="sendEmail(1);" data-role="button" data-icon="mail" data-iconpos="right" data-theme="b">' + jsonIdiomas.pagina_pago.envio_email + '</a>' +
        '<br>' +
        '<a  data-corners="false" style="width:35%" onclick="imprimirPedido(1);" data-role="button" data-icon="home" data-iconpos="right" data-theme="b"> Imprimir en tienda </a>' +
        '<br>' +
        '<a  data-corners="false" style="width:35%" onclick="sistemasPago(\'si\');" data-role="button" data-icon="shop" data-iconpos="right" data-theme="b"> Omitir este paso </a>' +
        '<br>' +
        //'<a  data-corners="false" style="width:300px" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');" data-role="button" data-icon="delete" data-iconpos="right" data-theme="b"> Cancelar pedido </a>' +
        '<div class="ui-grid-a" style="width:41%;background-color:#dd3324;margin: 1% 0 0 0;" onclick="$(\'#popupConfirmacionCancelarPedido\').popup(\'open\');"><div class="ui-block-a" style="width: 90%;height: 45px;color:white;text-transform: uppercase;line-height: 45px;">Cancelar pedido</div><div class="ui-block-b" style="width: 10%;height: 45px;"><img src="http://partyfiesta.youtter.com/app/alb/img/X.png" style="width: 45px;"></div></div>' +
        '</center>' +
        '</div>';
    $("#divContent").html(html);
    $("#divContent").trigger('create');
}

function pantallaInterLoginPago(destinoEnvio, taxPrice, totalPrice, basePrice) {

    OPCIONENTREGA = destinoEnvio;

    console.log(destinoEnvio + "," + taxPrice + "," + totalPrice + "," + basePrice + " datos del envio ----------------------- ");

    if (INFO_USU.id != undefined) {

        console.log("Logado mostramos form de envio");
        displayDomicilioForm(destinoEnvio, taxPrice, totalPrice, basePrice);

    } else {

        var html = '<div style="width: 30%;margin: 0 auto;">' +
            '<div style="background-color:#0197d4;text-transform:uppercase;height: 50px;line-height: 50px;margin-bottom: 10px;"><label style="font-size: x-large;text-align: center;color:white;">' + jsonIdiomas.pt_inter_pago_login.titulo + '</label></div>' +
            '<div style="background-color:white;height: 30px;line-height: 30px;margin-bottom: 10px;"><label style="font-size: larger;text-align: center;text-align: center;color:#0197d4;">Es necesario:</label></div>' +
            '<div class="ui-grid-a" style="">' +
            '<div class="ui-block-a" onclick="displayLogin();" style="border: 1px solid rgb(1, 151, 212);width: 49%;color:white;line-height: 45px;float: left;"><label style="text-align: center;text-align: center;color:#0197d4;margin-bottom: 0px;">' + jsonIdiomas.pt_inter_pago_login.Identificarse + '</label></div>' +
            '<div class="ui-block-b" onclick="pantallaRegistroPago();" style="border: 1px solid rgb(1, 151, 212);width: 49%;color:white;line-height: 45px;float: right;"><label style="text-align: center;text-align: center;color:#0197d4;margin-bottom: 0px;">' + jsonIdiomas.pt_inter_pago_login.Registrarse + '</label></div>' +
            '</div>' +
            '</div>';

        $("#divContent").html(html);
        $("#divContent").trigger('create');

    }

}


function pantallaRegistroPago() {

    var displayNone = "";
    var displayNoneReg = "display:none;";
    if (OPCIONENTREGA == 'shop' && (OPCIONPEDIDO == 3 || OPCIONPEDIDO == 2)) {
        displayNone = "display:none;";
        displayNoneReg = "";
    }

    console.log("Se muestra o no? " + displayNone);

    var html = '<h2 id="h2_direccion" style="margin: 0 0 0 0;color:#0197d4;text-transform:uppercase;">' + jsonIdiomas.reg_pant_pedido.tl_uno + '</h2><hr style="border-color:#0197d4;">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.email + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_email" name="in_email" data-type="entrega" required="required" type="text" placeholder="""></div>' + //autofocus   data-clear-btn="true
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.rep_email + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_email_re" name="in_email_re" data-type="entrega" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.contra + ' *</label>' +
        '<div class="" style="width:80%;"><input required data-corners="false" style="width: 100%;border:1px solid #0197d4" id="in_pass" name="in_pass" data-type="entrega" required="required" type="password" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.rep_contra + ' *</label>' +
        '<div class="" style="width:80%;"><input required data-corners="false" style="width: 100%;border:1px solid #0197d4" id="in_pass_re" name="in_pass_re" data-type="entrega" required="required" type="password" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a" style="' + displayNoneReg + '">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.codPos + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_postal_2" name="in_postal" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        //direccion de envio
        '<h2 style="margin: 0 0 0 0;color:#0197d4;text-transform:uppercase;' + displayNone + '">' + jsonIdiomas.reg_pant_pedido.direcc + '</h2><hr style="border-color:#0197d4;' + displayNone + '">' +
        '<div class="ui-grid-a" style="' + displayNone + '">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.nombre + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_name" name="in_name" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.apellido + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_apellidos" name="in_apellidos" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a" style="' + displayNone + '">' +
        '<div class="ui-block-a">' +
        '<label class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.telf + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_tel" name="in_tel" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.dni + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_dni" name="in_dni" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a" style="' + displayNone + '">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.direcc + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_direc" name="in_direc" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.numero + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_num_direc" name="in_num_direc" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a" style="' + displayNone + '">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.codPos + ' *</label>' +
        '<div class="" style="width:80%;"><input required style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_postal" name="in_postal" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.ciudad + ' *</label>' +
        '<div class="" style="width:80%;"><input style="width: 100%;border:1px solid #0197d4" data-corners="false" id="in_ciudad" name="in_ciudad" data-type="facturacion" required="required" type="text" placeholder=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-a" style="' + displayNone + '">' +
        '<div class="ui-block-a">' +
        '<label class="youpasswd" data-icon="p" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.pais + ' *</label>' +
        '<div id="div_input_pais" class="" style="width:80%;"></div>' +
        '</div>' +
        '<div class="ui-block-b">' +
        '<label id="usernamesignup" class="uname" data-icon="u" style="color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.prov + ' *</label>' +
        '<div id="div_input_provincia_2" class="" style="width:80%;"></div>' +
        '</div>' +
        '</div>' +
        '<button type="button" data-corners="false" id="btn_registro_pago" class="" style="width: 90%;text-transform: uppercase;background-color:#0197d4;">' + jsonIdiomas.reg_pant_pedido.continuar + '</button>';

    $("#divContent").html(html);
    $("#divContent").trigger('create');

    $("#btn_registro_pago").click(function () {

        if (OPCIONENTREGA == 'shop' && OPCIONPEDIDO == 3) {

            var email = $('#in_email').val();
            var email_re = $('#in_email_re').val();
            var pass = $('#in_pass').val();
            var pass_re = $('#in_pass_re').val();
            var postal = $('#in_postal').val();

            if (email == email_re && pass == pass_re && pass.length >= 8 && postal != "") {

                getRegistro(email, pass, postal, "pago");

            } else {

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.form_imcompleto,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            }

        } else {

            console.log("Nos registramos en la pantalla del pedido");
            //sendBasketAndOrder('cash register');
            //$("#formulario_reg_pago").submit();

            var email = $('#in_email').val();
            var email_re = $('#in_email_re').val();
            var pass = $('#in_pass').val();
            var pass_re = $('#in_pass_re').val();
            //var codpos = $('#in_codpos').val();
            var name = $('#in_name').val();
            var apellidos = $('#in_apellidos').val();
            var tel = $('#in_tel').val();
            var dni = $('#in_dni').val();
            var direc = $('#in_direc').val();
            var num_direc = $('#in_num_direc').val();
            var postal = $('#in_postal').val();
            var ciudad = $('#in_ciudad').val();
            var selectCountry = $('#selectCountry').val();
            var selectProvince_2 = $('#selectProvince_2').val();

            console.log("");

            if (email == email_re && pass == pass_re && name != "" && apellidos != "" && tel != "" && dni != "" && direc != "" && num_direc != "" && postal != "" && ciudad != "" && selectCountry != "" && selectProvince_2 != "vacio") { //codpos != "" &&

                console.log("Todos los campos ok");
                sendRegistroDomicilio(email, pass, postal,
                    name, apellidos, tel, dni, direc, num_direc, ciudad, selectProvince_2, postal, selectCountry,
                    name, apellidos, tel, dni, direc, num_direc, postal, ciudad, selectCountry, selectProvince_2, 2);


            } else {

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.form_imcompleto,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            }

        }

    });

    loadSelectPaises('div_input_pais', 'selectCountry');
    loadSelectProvinciasFromCountry('div_input_provincia_2', $("#selectCountry_2").val(), 'selectProvince_2');

    $("#selectCountry").change(function () {

        console.log('Cambio de pais, ahora es:' + $("#selectCountry").val());

        loadSelectProvinciasFromCountry('div_input_provincia_2', $("#selectCountry").val(), 'selectProvince_2');

    });

}