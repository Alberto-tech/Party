/* Función que parse la respuesta en JSON y la pinta por pantalla
    - data: json a parsear con la información
    - originNode: id del nodo Anterior (Del que venimos)
    - originName: nombre del nodo Anterior (Del que venimos)
    */

function displayNode(data, originNode, originName, linkImg, isback) {

    //console.log("DisplayNode-> Nodes es " + data.result + " link " + linkImg);

    console.log("Cargamos nuevos los nodos");
    console.log(data);

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
        var heigth = (W_WIDTH * (0.93));
    } else {
        var heigth = (W_WIDTH * (0.915));
    }
    //var heigth = (W_WIDTH * (0.93));
    var heigth2 = (W_WIDTH * (0.04)); //se utiliza para el margen de separacion de las cajas

    var heig_block = parseInt(heigth / data.columns); // valor de cada caja
    var he_b_margin = parseInt(heigth2 / (data.columns - 1)); // valor de cada caja

    //var heigth_img = parseInt(alturaMin * 0.35);

    //console.log("Comprobamos las alturas");
    //console.log("alturaMin " + alturaMin + " filas " + filas + " heig_block " + heig_block + " alturaBox " + alturaBox + "");

    console.log("*Filas " + filas + " Altura min " + alturaMin + "  Altura es : " + alturaBox + " aux_altura " + aux_altura);

    if (data.result == 1) { // Hay resultados
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;


        if (originNode == 0) {
            loadMenu(data);
            CART = [];
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
        } else { //if (isback == "back")
            console.log("Nodo origen " + originNode + " nombre " + originName + " link " + linkImg + "--------------------------------------------");
            updateBackButton(originNode, originName, linkImg);
        }

        console.log("Seguimos despus de guardar la pantalla  " + data.columns);

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
                            break;
                        case 5: // sugerencias
                            extra = 'displayPantallaSugerencias()';
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
                            //block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            /* block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';*/
                            block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right: 1%;margin-bottom:1%;margin-left: 1%;">';
                            break;
                        case 1:
                            //block = '<div class="ui-block-b"  data-corners="false" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">'; //style="height:' + alturaBox + '%"
                            block = '<div class="ui-block-b"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;width:' + heig_block + 'px;margin-right: 1%;margin-bottom:1%">'; //style="height:' + alturaBox + '%"
                            break;
                        case 2:
                            //block = '<div class="ui-block-c"  data-corners="false" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            block = '<div class="ui-block-c"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;width:' + heig_block + 'px;margin-right: 1%;margin-bottom:1%">';
                            break;
                        case 3:
                            //block = '<div class="ui-block-d"  data-corners="false" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            block = '<div class="ui-block-d"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        case 4:
                            //block = '<div class="ui-block-e"  data-corners="false" onclick="' + extra + '" style="height:' + alturaBox + 'px;width:' + heig_block + 'px;margin-right: ' + he_b_margin + 'px;margin-bottom:1%">';
                            block = '<div class="ui-block-e"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%">';
                            break;
                        }

                    } else {

                        position = 0;
                        block = '<div class="ui-block-a"  data-corners="false" onclick="' + extra + '" style="' + altura_menu + 'width:' + heig_block + 'px;margin-right:1%;margin-bottom:1%;margin-left: 1%;">';


                    }
                    
                    var imgLinkExt = data.nodes[i].linkext.replace("wide", "bigPreview");

                    if (valorSwitch == 7) { //despues de la primera fila se mostrara el elemento principal

                        var element2 = '<div class="ui-block-a" style="width: 25%;height:' + alturaBox + 'px"></div><div class="ui-block-b" style="width: ' + heig_block + 'px;height:' + alturaBox + 'px"><a  data-corners="false" data-role="button" data-theme="f" style="background-color: lightgray;"><img src="' + imgLinkExt + '" style="width: 100px;height: 100px;" ><br><strong>' + data.nodes[i].name +
                            '</strong></a></div><div class="ui-block-c" style="width: 25%;height:' + alturaBox + 'px"></div>';

                        var element = block + '<div><a  data-corners="false" data-role="button" data-theme="f"><img src="' +
                            imgLinkExt + '" style="width: 150px;height:' + alturaBox + 'px"><br><strong>' + data.nodes[i].name +
                            '</strong></a></div></div>';

                        count++;
                        htmlContent = htmlContent + element + element2;

                    } else {

                        if (parseInt(originNode) == 0) { //se carga el menu cuando se hace un getNodes(0)

                            // Adaptado para el iPad - 20150113
                            /*var element = block + '<div style="display: table; height:' + alturaBox + 'px;width:' + heig_block + 'px;background-image:url(\'' + data.nodes[i].linkext + '\');background-size:cover;background-position: top center; background-repeat: no-repeat;">' +
                                '<label style="font-size:35px;color: white; text-align: center; display: block; margin-top:84%;">' + data.nodes[i].name + '</label></div>' +
                                '</div>';*/

                            /*var element = block + '<div style="position:absolute; display: table; height:' + alturaBox + 'px;width:' + heig_block + 'px;background-image:url(\'' + data.nodes[i].linkext + '\'); background-size:cover; background-position: top center; background-repeat: no-repeat;">' +
                                '<label style="position:absolute; bottom:0; font-size:35px;color: white; text-align: center; display: block;">' + data.nodes[i].name + '</label></div>' +
                                '</div>';*/
                            
                            var element = block + '<div style="position:absolute; display: table; height:' + alturaBox + 'px;width:' + heig_block + 'px;background-image:url(\'' + imgLinkExt + '\'); background-size:cover; background-position: top center; background-repeat: no-repeat;">' +
                                '<div style="width:' + heig_block + 'px;position:absolute; bottom:0; font-size:30px;color: white; text-align: center; display: block;">' + data.nodes[i].name + '</div></div>' +
                                '</div>';

                            //<div class="ui-block-a" data-corners="false" onclick="getNodes(1, 'CATÁLOGO',1,'http://partyfiesta.youtter.com/webservices/img/nodos/catalogo.jpg')" style="width:307px;margin-right: 30px;margin-bottom:1%"><div style="display: table; height:211px;width:307px;background-image:url('http://partyfiesta.youtter.com/webservices/img/nodos/catalogo.jpg');  background-position: top center; background-repeat: no-repeat;"><label style="font-size:35px;color: white; text-align: center; display: block; margin-top:84%;">CATÁLOGO</label></div></div>

                        } else {

                            /*var element = block + '<a  data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);"><img src="' +
                                data.nodes[i].linkext + '" style="width: ' + (heig_block * 0.85) + 'px;height:' + (heig_block * 0.85) + 'px"><br><label style="width: 100%;text-align:center;line-height: ' + (heig_block * 0.15) + 'px;height: ' + (heig_block * 0.15) + 'px;margin-top: 5px;font-weight: bold;background-color: rgb(23, 152, 209);color: rgb(255, 255, 255);">' + data.nodes[i].name +
                                '</label></a></div>';*/
                            
                            var element = block + '<a  data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgba(23,152,209,1);">' +
                                '<center><div style="height:' + (heig_block * 0.7) + 'px;min-width: ' + (heig_block * 0.8) + 'px;display: table-cell;vertical-align: middle;"><img src="' + imgLinkExt + '" style="max-width:' + (heig_block * 0.8) + 'px;"></div></center>' +
                                '<br>' +
                                '<label style="width: 100%;text-align:center;line-height: ' + (heig_block * 0.15) + 'px;height: ' + (heig_block * 0.15) + 'px;margin-top: 5px;overflow: hidden;text-overflow: ellipsis;background-color: rgb(23, 152, 209);color: rgb(255, 255, 255);">' + data.nodes[i].name +
                                '</label></a></div>';

                        } //max-width: ' + (heig_block * 0.8) + 'px;

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

        console.log("Error en el envio de parametros");

    }

    translateButtons(idiomStore);

}

function refreshDisplayProducts() {

    console.log("Refresh DisplayProducts");
    console.log(CART);
    var aux_carac = 0;


    var htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;

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

        var data = CART;

        for (var i = 0; i < data.length; i++) {

            var heigth = (W_WIDTH * (0.96));
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


            if (data[i].price_x_region.length == 0) { // si no tiene precio continuamos
                continue;
            } else {
                precio = data[i].price_x_region[0].totalPrice;
            }

            var count = data[i].caracteristics.length;
            var caracteristicas = data[i].caracteristics;


            for (var j = 0; j < count; j++) {

                if (caracteristicas[j].type == "9") {

                    unidades = caracteristicas[j].name;
                    aux_carac = 0;
                    break;

                } else {

                    aux_carac = 1;
                    continue;

                }
            }

            if (aux_carac == 1) { //no tiene unidades pasamos al siguiente product
                unidades = "1 " + jsonIdiomas.cajas.unidades;
            }

            if (data[i].name == "") {
                continue;
            } else {
                var titulo = data[i].name;
            }
            
            var imgLinkExt = data[i].linkext.replace("wide", "bigPreview");
            
            // TEMP !!
            var element = block +
                '<a  data-corners="false" data-role="button" data-theme="f">' +
                '<div id="circulo' + data[i].id + '"  class="circulo" style="width: 40px;height: 40px;position: absolute;">' +
                '<label id="quantity' + data[i].id + '" style="display:block; margin-top:9px; font-size:22px; color: white;">10</label>' + //dev
                '</div>' +
                //'<div id="warning' + data.products[i].id + '" class="circulo" style="width: 40px; height: 40px; position: absolute;">' +
                //'<img src="/img/warning.png" style="width: 40px; height: 40px; float: right;" />' +
                //'</div>' +
                '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + ID_NODE + ',\'PRODUCTOS\',' + data[i].id + ')" style="width: 200px;height: 200px;">' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;font-size:12px;z-index:5;">' +
                '<div class="contenedor">' + titulo + '</div>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;font-size:20px;z-index:6;">' +
                '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                '<strong><label id="labelPrecioTotalProducto' + data[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;">' +
                '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data[i].id + '" onclick="addToCart(' + data[i].id + ',1);">Añadir</button>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-b" id="grid' + data[i].id + '" style="display:none;">' +
                '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data[i].id + ',-1);" >-</button></div>' +
                '<div class="ui-block-b" style="width:10%;"></div>' +
                '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data[i].id + ',1);">+</button></div>' +
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

        // calculo del numero de articulos por producto
        for (var k = 0; k < data.length; k++) {

            displayItemOperations(data[k].id, data[k].quantity);

        }

        $('#popupListItems').popup('close');

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
        break;

    }

    translateButtons(idiomStore);

}



function displayProducts(data, originNode, originName, param) {

    console.log("DisplayProducts-> Nodo Origen Id" + originNode);
    var aux_carac = 0;

    if (data.result == 1 && pantallaActual == "Asistente fiestas") { // Hay resultados

        AUX = 1;
        PRODUCTS = data.products;
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

            console.log("Productos que tenemos");
            console.log(data.products);

            for (var i = 0; i < data.products.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

                var heigth = (W_WIDTH * (0.96));
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


                var imgStock = "";
                var stock = data.products[i].stock_x_store;

                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                if (aux_carac == 1) { //no tiene unidades pasamos al siguiente producto
                    //console.log("No tiene unidades saltamos el producto")
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                }

                if (data.products[i].name == "") {
                    continue;
                } else {
                    var titulo = data.products[i].name;
                }

                if (data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("wide", "bigPreview");
                
                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>'
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
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';

                //console.log(element);

                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';

            $("#divContent").html(htmlContent);
            $("#divContent").trigger('create');
            $("#btn_finalizarpedido").show();

            var aux = 0;
            // calculo del numero de articulos por producto
            for (var k = 0; k < data.products.length; k++) {

                console.log("Calculamos los articulos para el carrito------------------------------------------------");
                aux = 0;
                var count = data.products[k].caracteristics.length;
                var caracteristicas = data.products[k].caracteristics;

                for (var j = 0; j < count; j++) {

                    if (caracteristicas[j].type == "9" && data.products[k].name != "" && data.products[k].price_x_region.length > 0) {

                        var num_uni = caracteristicas[j].name;
                        var units = num_uni.split(' ');

                        console.log("Encontrada car. Unidades es " + units[0]);

                        if (parseInt(units[0]) >= parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) { //el articulo tiene suficientes para el grupo

                            console.log("Unidades es1 " + units[0] + " se añade 1");
                            addToCart(data.products[k].id, 1);
                            aux = 1;

                        } else if (parseInt(units[0]) < parseInt(num_personas_fiesta) && parseInt(units[0]) > 1) {

                            addToCart(data.products[k].id, Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                            console.log("Math " + Math.ceil(parseInt(num_personas_fiesta) / parseInt(units[0])));
                            aux = 1;

                        } else { //mas personas que unidades del articulo
                            addToCart(data.products[k].id, 1);
                            aux = 1;
                        }

                        break;

                    }

                }

                console.log("Aux es " + aux); // si es cerno no tiene unidades pondremos que es uno

                if (aux == 0 && data.products[k].name != "" && data.products[k].price_x_region.length > 0) { //en el caso que no tengamos unidades se añade uno solo
                    addToCart(data.products[k].id, 1);

                }


            }

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
            break;

        }

    } else if (data.result == 1 && pantallaActual == "Asistente disfraces") {

        PRODUCTS = data.products;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;

        console.log("Productos para el asistente de disfraces");
        //console.log(data);


        if (originNode == 0) {
            loadMenu(data);
        } else {
            updateBackButton(originNode, originName);
        }

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

            var sexo = param.sexo;
            var talla = param.talla;

            //console.log("Sexo " + sexo + " talla " + talla);

            for (var i = 0; i < data.products.length; i++) {

                var heigth = (W_WIDTH * (0.96));
                var heig_block = heigth / parseInt(data.columns);

                var count_carac = data.products[i].caracteristics.length;
                var caracteristicas = data.products[i].caracteristics;
                var generoDisfraz = 0; //sexo del disfraz no es el seleccioando

                var count_uses = data.products[i].uses.length;
                var uses = data.products[i].uses;

                for (var k = 0; k < count_uses; k++) {

                    if (parseInt(uses[k].id) == parseInt(1)) { //si el articulo no es un disfraz se muesta, ya que sera un complemento

                        for (var j = 0; j < count_carac; j++) { // comprobamos que la talla y sexo sea el escogido en los selects

                            if (caracteristicas[j].name == sexo) {

                                for (var m = 0; m < count_carac; m++) {

                                    if (caracteristicas[m].name == talla) {
                                        generoDisfraz = 1;
                                    } else {
                                        continue;
                                    }
                                }
                            }
                        }
                    } else {
                        generoDisfraz = 1;
                    }
                }

                if (generoDisfraz == 0) { //sexo no valido lo saltamos
                    continue;
                }

                for (var j = 0; j < count_carac; j++) {
                    console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        break;
                    } else {
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        continue;
                    }

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


                if (data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }


                if (data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("wide", "normalPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>'
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
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
                    '</div></a></div>';



                htmlContent = htmlContent + element;
                if (position == "c") {
                    htmlContent = htmlContent + grid;
                }
                position++;

            }

            htmlContent = htmlContent + '</div>';


            setTimeout(function () {

                $("#divContent").html(htmlContent);
                $("#divContent").trigger('create');

            }, 50);


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

            break;

        }


    } else if (data.result == 1 && pantallaActual == "catalogo") {

        AUX = 1;
        PRODUCTS = data.products;
        COLUMS = parseInt(data.columns);
        ID_NODE = originNode;
        var htmlContent = '';
        var grid = '';
        var block = '';
        var position = 0;
        var type;
        
        updateBackButton(originNode, originName);

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

            console.log("Productos que tenemos");
            console.log(data.products);

            for (var i = 0; i < data.products.length; i++) {

                //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

                var heigth = (W_WIDTH * (0.96));
                var heig_block = heigth / parseInt(data.columns);

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


                if (generoDisfraz == 0) { //sexo no valido lo saltamos
                    continue;
                }

                for (var j = 0; j < count_carac; j++) {
                    console.log("Caracteristica " + caracteristicas[j].type);
                    if (caracteristicas[j].type == "9") {
                        unidades = caracteristicas[j].name;
                        break;
                    } else {
                        unidades = "1 " + jsonIdiomas.cajas.unidades;
                        continue;
                    }

                }

                var imgStock = "";
                var stock = data.products[i].stock_x_store;

                if (stock == 0) {
                    stock = data.products[i].stock_x_central_store;
                }

                if (stock > data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraVerde.png";
                } else if (stock <= data.products[i].stock_min) {
                    imgStock = "css/maqueta/barraAmarilla.png";
                } else if (stock == 0) {
                    imgStock = "css/maqueta/barraRojo.png";
                }

                if (data.products[i].stock_x_store == 0) {
                    var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                        '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                        '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                        '</div>';
                } else {
                    var displayWarning = "";
                }

                var imgLinkExt = data.products[i].linkext.replace("wide", "normalPreview");

                var element = block +
                    '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
                    '<div style="position: relative;overflow:hidden">' +
                    '<div id="circulo' + data.products[i].id + '" class="circulo" style="width: 40px;height: 40px;display: none;position: absolute;">' +
                    '<label id="quantity' + data.products[i].id + '" style="display:block;margin-top: 9px;font-size: 22px;color: white;">10</label>' +
                    '</div>' +
                    '<div style="float:right;width: 50px;padding-right: 10px;overflow:hidden"><img src="' + imgStock + '" style="width: 50px;position:absolute;float:right;"></div>'
                    //'<img src="' + imgStock + '" style="position:absolute;float:right;width: 40px;height: 40px;">'
                    + displayWarning +
                    '<img src="' + imgLinkExt + '" onclick="displayPopupItemDetail(' + originNode + ',\'PRODUCTOS\',' + data.products[i].id + ')" style="width: 200px;height: 200px; z-index: -3;">' +
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
                    '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                    '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-a">' +
                    '<div class="ui-block-a" style="width: 100%;">' +
                    '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                    '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                    '<div class="ui-block-b" style="width:10%;"></div>' +
                    '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
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
            break;

        }

    } else {

        console.log("Error...");

    }


    $("#popupCargando").popup("close");



    translateButtons(idiomStore);

}

function añadirMasProductos(data, originNode, originName, param) {

    AUX = 1;
    PRODUCTS = data.products;
    COLUMS = parseInt(data.columns);
    ID_NODE = originNode;
    var htmlContent = '';
    var grid = '';
    var block = '';
    var position = 0;
    var type;


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

        console.log("Productos que tenemos");
        console.log(data.products);

        for (var i = 0; i < data.products.length; i++) {

            //console.log("Miramos el producto " + data.products[i].id + "-----------------------------------");

            var heigth = (W_WIDTH * (0.96));
            var heig_block = heigth / parseInt(data.columns);

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


            if (generoDisfraz == 0) { //sexo no valido lo saltamos
                continue;
            }

            for (var j = 0; j < count_carac; j++) {
                console.log("Caracteristica " + caracteristicas[j].type);
                if (caracteristicas[j].type == "9") {
                    unidades = caracteristicas[j].name;
                    break;
                } else {
                    unidades = "1 " + jsonIdiomas.cajas.unidades;
                    continue;
                }

            }

            var imgStock = "";
            var stock = data.products[i].stock_x_store;

            if (stock == 0) {
                stock = data.products[i].stock_x_central_store;
            }

            if (stock > data.products[i].stock_min) {
                imgStock = "css/maqueta/barraVerde.png";
            } else if (stock <= data.products[i].stock_min) {
                imgStock = "css/maqueta/barraAmarilla.png";
            } else if (stock == 0) {
                imgStock = "css/maqueta/barraRojo.png";
            }

            if (data.products[i].stock_x_store == 0) {
                var displayWarning = '<div style="position: absolute; bottom: 0px;">' +
                    '<img src="http://partyfiesta.youtter.com/app/alb/css/exclusivoweb.png" style="width: 200px;height: 20px;bottom: 0px;">' +
                    '<div style="text-transform: uppercase;z-index: 3; width:200px; height:20px; position: absolute; bottom: 0px; font-size:15px; padding-bottom:5px; color: #fff; text-align:center; font-weight:bold;">' + jsonIdiomas.exclusivoWeb + '</div>' +
                    '</div>';
            } else {
                var displayWarning = "";
            }


            var element = block +
                '<a data-corners="false" data-role="button" data-theme="f" style="border: 1px solid rgb(23, 152, 209);box-shadow: 0px 0px 1px 1px rgb(23, 152, 209);">' +
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
                '<strong style="vertical-align:sub;">' + formatoNumero(precio, 2, ",", ".", "€") + ' x ' + unidades + '</strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;z-index:7;">' +
                '<strong><label id="labelPrecioTotalProducto' + data.products[i].id + '" style="color:green;margin-top:5px;"></label></strong>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-a">' +
                '<div class="ui-block-a" style="width: 100%;">' +
                '<button  data-corners="false" data-theme="b" id="btnAddProduct' + data.products[i].id + '" onclick="addToCart(' + data.products[i].id + ',1);">Añadir</button>' +
                '</div>' +
                '</div>' +
                '<div class="ui-grid-b" id="grid' + data.products[i].id + '" style="display:none;">' +
                '<div class="ui-block-a" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="restar" onclick="addToCart(' + data.products[i].id + ',-1);" >-</button></div>' +
                '<div class="ui-block-b" style="width:10%;"></div>' +
                '<div class="ui-block-c" onclick="" style="width: 45%;"><button  data-corners="false" data-theme="b" id="sumar" onclick="addToCart(' + data.products[i].id + ',1);">+</button></div>' +
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
        break;

    }



}

/******************************************************************
    Enseña o esconde los botones de añadir o restar productos 
    Parametros:
    -0: mostrar botones de restar y sumas
    -else: esconderlos
******************************************************************/
function displayItemOperations(id, param, position) {

    if (param > 0) {
        //console.log("La cantidad que llega es " + param);
        $("#btnAddProduct" + id).hide();
        $("#grid" + id).show();
        $("#quantity" + id).text(param);
        $("#circulo" + id).show();

    } else {
        $("#btnAddProduct" + id).show();
        $("#grid" + id).hide();
        $("#circulo" + id).hide();
        $("#labelPrecioTotalProducto" + id).hide();
        CART.splice(position, 1);
        //deleteItemCart(position);        
    }

    var total = 0;
    for (var i = 0; i < CART.length; i++) {
        total = total + CART[i].quantity;
    }

    var precio_persona = formatoNumero((CART.ammount / num_personas_fiesta), 2, ",", ".", "€");

    //console.log("Precio x persona "+precio_persona+" precio total "+CART.ammount+" num personas "+num_personas_fiesta);

    $("#spBtnPopupCartProducts").text(total);
    $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    $("#spPopupCartCount").text(total);
    $("#spPopupTotalAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));
    //$("#spBtnAmountPerson").text(precio_persona + " x per");
    //$("#spBtnAmountPerson").text(precio_persona + " x");


    if (CART.length < 1) {
        $("#popupListItems").popup("close");

        $("#spBtnAmountPerson").text('');

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();
    } else {
        
        if ( pantallaActual == 'Asistente fiestas' )   {
            $("#spBtnAmountPerson").text(precio_persona + " x");
            $("#userIcoCarrito").show();    
        }
        
        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();
        
    }

    translateButtons(idiomStore);


}

function openPopupAction(param) {

    $("#lbpopupAction").text(param);
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

function openPopUpConfirmacionVaciarCarrito()   {
    
    //console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    $("#popupListItems").popup("close");
    
    setTimeout(function () {
        $("#popupConfirmacionVaciarCarrito").popup("open");
    }, popupTimeout);
}

function getImgDisponibilidad(product) {
    var imgAvailability = "";
    var stock = CART[product].stock_x_store;

    if (stock == 0) {
        stock = CART[product].stock_x_central_store;
    }

    if (stock > CART[product].stock_min) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock <= CART[product].stock_min) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }

    return imgAvailability;
}

function displayPopupItemList() { //cambios jordi

    var html = '';

    //var tituloPopUp = '<div data-role="header" data-theme="a" style="background: rgb(154, 205, 50);"><h1>' + jsonIdiomas.popup_errores.tituloPopUp + '</h1></div>';
    var tituloPopUp = '<div data-role="header" data-theme="a" style="background-color:#0097d3;"><h1 style="font-size:20px;text-transform: uppercase;color:white;">' + jsonIdiomas.popup_errores.tituloPopUp + '</h1><div onclick="openPopUpConfirmacionVaciarCarrito();" class="btnPopUp"><img src="img/empty_cart.png" style="width:32px; heigth:30px;" /></div></div>';


    for (var i = 0; i < CART.length; i++) {
        var src = getImgDisponibilidad(i);
        
        var imgLinkExt = CART[i].linkext.replace("wide", "bigPreview");

        html = html +
            '<li style="border: 1px solid #AAAAAA;list-style-type: none;padding:1% 0% 1% 0%;"> ' + //margin-left: 2%;
            '<div class="ui-grid-b">' +
            '<div class="ui-block-a" style="width:10%;margin-left:2%"><img class="thumb" src="' + imgLinkExt + '"></div>' +
            '<div class="ui-block-b" style="width:45%;" onclick="displayPopupItemDetail(' + i + ',\'CART\');"><label style="text-align: center;padding-top: 5%;">' + CART[i].name + '</label></div>' +
            '<div class="ui-block-c" style="width:40%;">' +
            '<div class="ui-grid-d">' +
            '<div class="ui-block-a" style="width:16%;"><a style="" data-icon="minus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',-1); setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
            '<div class="ui-block-b" style="width:16%;"><label id="labelPopUpItemListQuant" style="text-align: center;padding-top: 35%;">' + parseInt(CART[i].quantity) + '</label></div>' +
            '<div class="ui-block-c" style="width:16%;"><a style="" data-icon="plus" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCart(' + CART[i].id + ',1);setTimeout(function () {displayPopupItemList();}, 250);"></a></div>' +
            '<div class="ui-block-d" style="width:22%;"><label id="labelPopUpItemListPrice" style="text-align: center;padding-top: 19%;">' + parseFloat(parseInt(CART[i].quantity) * parseFloat(CART[i].price_x_region[0].totalPrice)).toFixed(2) + ' €</label></div>' +
            //'<div class="ui-block-e" style="width:16%"><a data-role="button" data-theme="f" style="background-color: red;" data-iconpos="notext" onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"></a></div>' +
            '<div class="ui-block-e" style="width:40px; height:40px;"><a onclick="openPopupAction(\'deleteItem\'); $(\'#lbpopupAction\').val(' + i + '); displayPopupItemList();"><img src="img/bin.png" /></a></div>' +
            '<div class="ui-block-e" style="width:15%;"><img style="display:block;width:40px;margin-top:15px;margin-left:10px;" src="' + src + '" /></div>' +
            '</div>' +
            '</div>' +
            '</li>';
    }

    //html = '<div style="width: 100%; height:400px; overflow: scroll;">' + html + '</div><li style="list-style-type: none;"><center><a data-corners="false" data-role="button" data-theme="b" onclick="checkOut();" style="width:100%;"><label id="label_checkOut" style="font-size:20px;">' + jsonIdiomas.pop_checkOut.realizar_pedido + '</label></a><center></li>';
    html = '<div style="width: 100%; height:400px; overflow: scroll;">' + html + '</div><div style="list-style-type: none; padding-top: 15px;background-color: #0097d3;height: 100%;"  onclick="checkOut();"><label id="label_checkOut" style="font-size:20px; text-transform: uppercase;color:white;"><center>' + jsonIdiomas.pop_checkOut.realizar_pedido + '</center></label></div>';


    $("#lbPopupListItems").text("Total : " + parseFloat(CART.ammount).toFixed(2) + " €");


    $("#contentPopupListItems").html(tituloPopUp + html);
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
        //$('#contentPopupListItems').css('overflow-y', 'scroll');
    }
    translateButtons(idiomStore);
}

function displayItemAlter(id_prod_alter, id_product, idnode) {

    var aux_prod;
    var aux_cart;

    for (var i = 0; i < PRODUCTS_ALTER.alternativeProducts.length; i++) {

        if (parseInt(PRODUCTS_ALTER.alternativeProducts[i].id) == parseInt(id_prod_alter)) {

            aux_prod = PRODUCTS_ALTER.alternativeProducts[i];
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
    var stock = aux_prod.stock_x_store;

    if (stock == 0) {
        stock = aux_prod.stock_x_central_store;
    }

    if (stock > aux_prod.stock_min) {
        imgAvailability = "css/maqueta/barraVerde.png";
    } else if (stock <= aux_prod.stock_min) {
        imgAvailability = "css/maqueta/barraAmarilla.png";
    } else if (stock == 0) {
        imgAvailability = "css/maqueta/barraRojo.png";
    }

    //var tituloPopUp = '<div data-role="header" data-theme="a" style="background: blue"><h1>' + aux_prod.name + ' - ' + aux_prod.sku + '</h1></div>';

    var html = '';

    if (aux_prod.definition == "NULL") {
        var definition = aux_prod.short_name;
    } else {
        var definition = aux_prod.definition;
    }

    var imgLinkExt = aux_prod.linkext.replace("wide", "normalPreview");
    
    html = '<ul data-role="listview" data-inset="true">' +
        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + aux_prod.name + ' - ' + aux_prod.sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + CART[i].quantity + '</span></li>' +
        '<li>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;;width: 100%;"></div>' +
        '<div class="ui-block-b">' +
        '<br><label style="font-size: 20px;margin-top:5px;font-family: Arial, sans-serif !important;color:red;"><h1>Precio: ' + parseFloat(aux_prod.price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
        '<p><strong style="font-size: 15px;margin-top:5px;font-family: Arial, sans-serif !important;color:red;"> Ubicación: ' + aux_prod.position_x_store.section + ' ' + aux_prod.position_x_store.module + ' ' + aux_prod.position_x_store.position + ' </strong></p>' +
        '<p><strong style="font-size: 15px;margin-top:5px;font-family: Arial, sans-serif !important;color:red;"> Descripción: </strong></p>' +
        '<strong style=""><p style="white-space: initial;font-size: 15px;margin-top:5px;font-family: Arial, sans-serif !important;color:red;">' + definition + '</p></strong>' +
        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
        '</div></div>' +
        '</ul>' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:50%;"><a data-corners="false" data-role="button" data-theme="b" data-iconpos="notext" onclick="volver(' + id_product + ',' + idnode + ');">VOLVER</a></div>' +
        '<div class="ui-block-b" style="width:50%;"><a data-corners="false" data-role="button" data-theme="b" data-iconpos="notext" onclick="addToCartAlter(' + aux_prod.id + ',' + id_product + ');">Sustituir</a></div>' +
        '</div>';

    $("#contentPopupListItems").html(html);
    $("#contentPopupListItems").trigger("create");

    $("#cantidad_prod_alter").text(aux_cart.quantity);

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

function displayAlternativeProducts(idnode, idproduct) {

    console.log("Productos alternativos");
    console.log(PRODUCTS_ALTER);

    var productList = PRODUCTS_ALTER.alternativeProducts;

    var carrusel = "";


    if (productList != null) {

        for (var i = 0; i < productList.length; i++) {

            var prod_alt = productList[i];

            var aux = jQuery.isEmptyObject(prod_alt.linkext); // si es false es que no esta vacio

            if (aux == false && prod_alt.price_x_region[0] != "undefined") {

                if (prod_alt.price_x_region.length > 0) {
                    
                    var imgLinkExt = prod_alt.linkext.replace("wide", "normalPreview");

                    carrusel = carrusel + '<div class="swiper-slide" style="height: 175px;"><ul>' +
                        '<li style="list-style-type: none;">' +
                        '<img onclick="displayItemAlter(' + prod_alt.id + ',' + idproduct + ',' + idnode + ');" src="' + imgLinkExt + '" style="max-width: 75px;max-height: 75px;">' +
                        '</li>' +
                        '<li style="list-style-type: none;" >' +
                        '<label onclick="displayItemAlter(' + prod_alt.id + ',' + idproduct + ',' + idnode + ');" style="color:rgb(0, 128, 0);">' + formatoNumero(prod_alt.price_x_region[0].totalPrice, 2, ",", ".", "€") + '</label>' +
                        '</li>' +
                        '<li style="list-style-type: none;">' +
                        '<div onclick="displayItemAlter(' + prod_alt.id + ',' + idproduct + ',' + idnode + ');"  style="white-space: normal;font-size: 14px;"><strong>' + prod_alt.name + '</strong></div>' +
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
                    var stock = PRODUCTS[i].stock_x_store;

                    if (stock == 0) {
                        stock = PRODUCTS[i].stock_x_central_store;
                    }

                    if (stock > PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock <= PRODUCTS[i].stock_min) {
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

                    var imgLinkExt = PRODUCTS[i].linkext.replace("wide", "normalPreview");

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:5px;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:5px;"> Ubicación: ' + PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.module + ' ' + PRODUCTS[i].position_x_store.position + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;vertical-align:sub;margin-top:5px;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;vertical-align:sub;margin-top:5px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
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
            }, 200);

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
                    var stock = PRODUCTS[i].stock_x_store;

                    if (stock == 0) {
                        stock = PRODUCTS[i].stock_x_central_store;
                    }

                    if (stock > PRODUCTS[i].stock_min) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock <= CART[i].stock_min) {
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

                    var imgLinkExt = PRODUCTS[i].linkext.replace("wide", "normalPreview");

                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + PRODUCTS[i].name + ' - ' + PRODUCTS[i].sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:10px;font-family: Arial, sans-serif !important;color:red;"><h1>Precio: ' + parseFloat(PRODUCTS[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:10px;font-family: Arial, sans-serif !important;color:red;"> Ubicación: ' + PRODUCTS[i].position_x_store.section + ' ' + PRODUCTS[i].position_x_store.position + ' ' + PRODUCTS[i].position_x_store.module + ' </strong></p>' +
                        '<p><strong style="font-size: 15px;margin-top:5px;margin-top:10px;font-family: Arial, sans-serif !important;color:red;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;margin-top:5px;margin-top:10px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
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

            for (var i = 0; i < CART.length; i++) {

                if (CART[i].id == idproduct) {

                    var imgAvailability = "";
                    var stock = CART[i].stock_x_store;

                    if (stock == 0) {
                        stock = CART[i].stock_x_central_store;
                    }

                    if (stock > CART[i].stock_min) {
                        imgAvailability = "css/maqueta/barraVerde.png";
                    } else if (stock <= CART[i].stock_min) {
                        imgAvailability = "css/maqueta/barraAmarilla.png";
                    } else if (stock == 0) {
                        imgAvailability = "css/maqueta/barraRojo.png";
                    }


                    var html = '';

                    if (CART[i].definition == "NULL") {
                        var definition = CART[i].short_name;
                    } else {
                        var definition = CART[i].definition;
                    }

                    if (CART[i].quantity > 0) {
                        var cantidad = PRODUCTS[i].quantity;

                    } else {
                        var cantidad = 0;
                    }

                    div_carrusel = '<li data-role="list-divider" data-theme="c"><span>' + jsonIdiomas.popup_info_item.alternativos + '</span></li>' +
                        '<li style="height: 175px;" id="img_prod_alter"><div class="ui-grid-a" style="height: 175px;">' +
                        '<div id="imgBarraCarga"><center><label>' + jsonIdiomas.popup_errores.labelCargando + '</label></center></div>' +
                        '<div id="swiper" style="height: 175px;"></div>' +
                        '</div>' +
                        '</li>';

                    var imgLinkExt = CART[i].linkext.replace("wide", "normalPreview");
                    
                    html = html +
                        '<ul data-role="listview" data-inset="true">' +
                        '<li data-role="list-divider" data-theme="c"><h2 style="margin:5px">' + CART[i].name + ' - ' + CART[i].sku + '</h2><span class="ui-li-count" style="margin-right: 3%;">' + cantidad + '</span></li>' +
                        '<li>' +
                        '<div class="ui-grid-a">' +
                        '<div class="ui-block-a"><img src="' + imgLinkExt + '" style="max-width: 325px;width: 100%;"></div>' +
                        '<div class="ui-block-b">' +
                        '<br><label style="font-size: 20px;margin-top:10px;font-family: Arial, sans-serif !important;color:red;"><h1>Precio: ' + parseFloat(CART[i].price_x_region[0].totalPrice).toFixed(2) + ' €</h1></label>' +
                        '<p><strong><p style="font-size: 15px;margin-top:10px;font-family: Arial, sans-serif !important;color:red;"> Ubicación: ' + CART[i].position_x_store.section + ' ' + CART[i].position_x_store.position + ' ' + CART[i].position_x_store.module + ' </strong></p>' +
                        //'<p><strong>    Modulo: ' + CART[i].position_x_store.module + '</strong></p>' +
                        //'<p><strong>    Posición: ' + CART[i].position_x_store.position + '</strong></p>' +
                        //'<p><strong>    Sección: ' + CART[i].position_x_store.section + '</strong></p>' +
                        //'<br>'+
                        '<p><strong style="font-size: 15px;margin-top:5px;margin-top:10px;font-family: Arial, sans-serif !important;color:red;"> Descripción: </strong></p>' +
                        '<strong style="font-size: 15px;margin-top:5px;margin-top:10px;"><p style="white-space: initial;font-size: 15px;">' + definition + '</p></strong>' +
                        '<p class="ui-li-aside"><img src="' + imgAvailability + '"></p>' +
                        '</div>' +
                        '</li>' + div_carrusel +
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
            }, 200);

        }

        translateButtons(idiomStore);


    }



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
            
            var imgLinkExt = node[i].linkext.replace("wide", "normalPreview");

            if (parseInt(data.nodes[i].isMain) == 1) {
                //console.log("este es el principal " + node[i].isMain);
                var valorSwitch = 7;
            } else {
                var valorSwitch = parseInt(node[i].type);
            }

            switch (valorSwitch) {
                case 1: //catalogo
                    extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\')';
                    break;
                case 2: //promos
                    extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\')';
                    break;
                case 3: // asis fistas
                    extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                    break;
                case 4: // asis disfra
                    extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',' + data.nodes[i].type + ',\'' + data.nodes[i].linkext + '\')';
                    break;
                case 5: // sugerencias
                    extra = 'displayPantallaSugerencias()';
                    break;
                case 6: // fuera tienda
                    extra = 'getNodes(' + data.nodes[i].id + ', \'' + data.nodes[i].name + '\',0,\'' + data.nodes[i].linkext + '\')';
                    break;
                case 7: // caso elemento principal no esta definido en la BB.DD esta puesto con codigo mas arriba
                    extra = 'getNodes(' + node[i].id + ', \'' + node[i].name + '\',' + node[i].type + ',\'' + data.nodes[i].linkext + '\')';
                    break;
            }

            options = options + '<li onclick="' + extra + ';"; openMenu()"><img src="' + imgLinkExt + '" style="width:12em">' + node[i].name + '</li>';
        }

    }

    options = options + '<li onclick="getNodes(0);"><center><a data-role="button" data-icon="home" data-theme="e">' + jsonIdiomas.menu_lateral.menu + '</a></center></li>';
    $("#options").html(options);
    $("#options").listview('refresh');
    $("#lateralMenu").trigger('create');


    var cart = '<a href="#" onclick="displayPopupItemList();" data-position-to="origin">' + //displayCar();
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a" style="width:30%"><img src="css/icons/cesta.png" width="75%" style="margin-top:10px;margin-left: 20%"></div>' +
        '<div class="ui-block-b" style="width: 70%;margin-top:5px;"><div id="circuloCantidad" class="circulo" style="width: 25px; height: 25px; position: absolute; margin-left:-20px;z-index:5; display:none">' +
        '<label id="spBtnPopupCartProducts" style="display:block;margin-top:1px;font-size: 18px;color: white;">0</label>' +
        '</div><span style="margin:15px;display:none;" id="spBtnPopupCartAmmount">0 €</span><br><span style="margin:15px" id="spBtnAmountPerson"></span>' +
        '<img id="userIcoCarrito" style="display:none;" src="img/user_carrito.png" style="margin-left:-8px; margin-top:4px;"></div>' +
        '</div></a>';


    /*HEADER  de la pantalla*/

    htmlHeaderMenuInicial = '<div class="ui-grid-d">' +
        '<div class="ui-block-b" style="margin-top:10px;margin-left: 41%; width:22%;"><img src="css/icons/logo.png" onclick="getNodes(0);" width="75%"></div>' +
        '</div>';

    htmlHeader = '<div class="ui-grid-d">' +
        '<div class="ui-block-a" style="margin-top:10px; width:32%;color: rgb(70, 130, 180);" id="divBack"></div>' +
        '<div class="ui-block-b" style="margin-top:10px; width:22%;"><img src="css/icons/logo.png" onclick="getNodes(0);" width="75%" style="float: right;"> </div>' +
        '<div class="ui-block-c" style="margin-top:15px;width:21%" id="session" onclick="displayLogin();">' +
        '<center><a id="login" onclick="displayLogin();" style="width:10%;text-transform: uppercase;"><span>' + jsonIdiomas.header.login + '</span></a>' +
        '</div>' +
        '<div class="ui-block-d" style="width:18%; margin-top:3px;" id="car_compra">' + cart +
        '</div>' +
        '<div class="ui-block-e" style="margin-top:10px; width:4%">' +
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

    translateButtons(idiomStore);


}


function displayPantallaIntermediaAsistDisfra(data) {

    $("#divHeader_catalogo").show();
    $("#divHeader_menuInicial").hide();
    //console.log(data);
    var info = data.node;

    htmlContent = '<div id="page_count" style="display: block;padding-top: 1%;">' +
        '<center>' +
        '<img src="' + info.linkint + '" style="max-width: 30%;">' +
        '<div style="width: 30%"><select id="select_sexo" data-theme="f" data-native-menu="false" style="background-color:green;" data-corners="false">' +
        '</select></div>' +
        '<div id="div_selectTalla" style="width: 30%;display:none"><select id="select_talla" data-theme="f" data-native-menu="false" data-corners="false">' +
        '</select></div>' +
        '<button style="width: 30%;" id="btn_continuar_dis" onclick="displayProductos(' + info.id + ',\'' + info.name + '\')" data-role="button" data-theme="b" data-corners="false">' + jsonIdiomas.asistente_disfraces.btn_continuar + '</button>' +
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
        //var optTextSelected = optionSelected.text();
        var optValueSelected = optionSelected.val();
        //console.log("Opcion seleccionada es " + optValueSelected);

        if (optValueSelected != 0) {

            getSize(optValueSelected);
            $("#div_selectTalla").show();

        } else {
            $("#texto_popup").text(jsonIdiomas.popup_errores.opcion_no_valida);
            $('#popupAlert').popup('open');

            $("#div_selectTalla").hide();
        }
    });

    translateButtons(idiomStore);


}


function displayPantallaIntermediaAsistFiestas(data) {

    //console.log(data);
    console.log("Asistente de fiestas");
    console.log(data);

    htmlContent = '<div id="page_count" style="display: block;">' +
        '<center>' +
        '<br>' +
        '<img src="' + data.linkint + '" style="max-width:30%;width:22%;">' +
        '<h4><label id="label_num_per_fiesta" style="font-size:20px">' + jsonIdiomas.asistente_fiestas.label_num_per_fiesta + '</label></h4>' +
        '<div class="ui-grid-b" style="max-width:25%;">' +
        '<div class="ui-block-a" style="width:30%;margin-right:3%;"><a  data-corners="false" id="menos_fiesta" onclick="addPeople(0);" data-role="button" data-theme="b">-</a></div>' +
        '<div class="ui-block-b" style="width:30%;margin-right:3%;margin-top: 4px;"><input data-corners="false" type="number" id="personas_fiesta" value="2" min="2" max="200" data-clear-btn="true"></div>' +
        '<div class="ui-block-c" style="width:30%;"><a data-corners="false" id="mas_fiesta" data-role="button" data-theme="b">+</a></div>' +
        '</div>' +
        '<a data-corners="false" style="max-width:15%;" id="btn_continuar" onclick="displayProductos(' + data.id + ',\'' + data.name + '\');" data-role="button" data-theme="b">' + jsonIdiomas.asistente_fiestas.btn_continuar + '</a>' +
        '</center>' +
        '</div>';
    htmlContent = htmlContent + '</div>';
    $("#divContent").html(htmlContent);
    $("#divContent").trigger('create');

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
    });

    translateButtons(idiomStore);

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
    html = '<div id="session" style="float: right;"><center><a id="login" onclick="displayLogin();" style="margin:10px"><span>' + jsonIdiomas.header.login + '</span></a></center> </div>';
    $("#session").html(html);
    INFO_USU = "";
    LOGGED = false;
    $('#usrnm').val("");
    $('#pswd').val("");

    translateButtons(idiomStore);


}

function displayScreenSaver() { //muestra el pop up de inicio de session

    /*if (idleTimeActive == true) {

        idleTimeActive = false;

        //$('#contentPopupScreenSaver').fadeIn();
        $('#contentPopupScreenSaver').hide();

        setTimeout(function () {
            $('#principal').show();
        }, 100);

    } else {*/

    $('.ui-popup').popup('close');
    idleTimeActive = true;
    console.log("Protector de pantalla activado");
    $('#principal').hide();
    $('#contentPopupScreenSaver').show();

    //}

    translateButtons(idiomStore);


}



function displayPantallaSugerencias() {

    console.log("Entramos en la pantalla de sugerencias");
    $("#banderas").hide();
    nodeIds = [];
    nodeNames = [];
    loadMenu(node_cero);

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