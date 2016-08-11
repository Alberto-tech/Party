// request.abort(); // Esto aborta la conexión al webservice (Por si se necesitara)

//WS de login en la app
function getLogin(usario, contraseña) {

    // Datos que se van a enviar
    var dataSend = {
        user: usario,
        password: contraseña

    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'login.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log(response);

            if (response.result == 1) {

                console.log("Todo ok");
                console.log(response);
                LOGGED = true;

                INFO_USU = response.info;
                $('#popupLogin').popup('close');
                $("#login").text("Bienvenido/a " + response.info.name + ","); // + usario + "
                $('#login').attr('onclick', "logout()");
                $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');

                if (pantallaActual == "opciones envio") {

                    if (OPCIONENTREGA == "dom") {

                        displayDomicilioForm(OPCIONENTREGA, SEND_INFO.price_dom.taxPrice, SEND_INFO.price_dom.totalPrice, SEND_INFO.price_dom.basePrice);
                        cargaDatosUsuarioAFormularioRegistro();

                    } else if ((OPCIONPEDIDO == 3 && OPCIONENTREGA == 'shop' && OPCIONENVIO == 2) || (OPCIONPEDIDO == 2 && OPCIONENTREGA == 'shop' && OPCIONENVIO == 2)) {

                        pagarEnCajaPrevioPago();

                    } else {
                        displayDomicilioForm(OPCIONENTREGA, SEND_INFO.price_shop.taxPrice, SEND_INFO.price_shop.totalPrice, SEND_INFO.price_shop.basePrice);
                    }



                }

                if (REDIRECT) {
                    console.log("Redirigeme");
                    REDIRECT = false;
                    checkOut();
                }

            } else if (response.result == -1) {

                console.log("No exite");

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_login,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            } else if (response.result == -2 || response.result == 0) {

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_login,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_timeout,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_ws,
                    'theme': 'black',
                    'size': 'xsm'
                });

            }
        },
    });
}


//WS para realizar el registro del usuario
function getRegistro(usario, contraseña, cod_pos, pago) {

    // Datos que se van a enviar
    var dataSend = {
        user: usario,
        password: contraseña,
        codigo: cod_pos
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'signup.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                console.log(response);
                //displayLogin();
                //$("#usrnm").val(usario);

                if (pago == "pago") {
                    $("#login").text("Bienvenido/a " + usario + ","); // + usario + "
                    $('#login').attr('onclick', "logout()");
                    $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');

                    pagarEnCajaPrevioPago();

                } else {
                    console.log(response);
                    displayLogin();
                    $("#usrnm").val(usario);
                }

            } else if (parseInt(response.result) == -2) {

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_usr,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            } else if (parseInt(response.result) == -1) {

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_login,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_timeout,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");

                $.jAlert({
                    'title': 'Alerta',
                    'content': jsonIdiomas.alertas.error_ws,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            }
        },
    });

}

function getFlags() {

    console.log("Pedimos los idiomas");


    var request = $.ajax({
        url: urlServices + 'getFlags.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Los paises nos han llegado, cargamos el popup");
            //console.log("La respuesta es ");
            console.log(response);

            displayFlags(response);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}

/* Función que solicita la información al webservice de Nodos
    - idNode: id del nodo que se esta solicitando
    - nodeName: el nombre del nodo al que estamos accediento (Necesario para pintar en el botón de atrás el titulo);
    -isAlgo: variable para saber si es el asis de fiestas o disfraces
    */
function getNodes(idNode, nodeName, isAlgo, aux, backPage) {

    console.log('-> getNodes ' + idNode + '| pantalla actual: ' + pantallaActual + ' AUX: ' + AUX + ' CANRT length ' + CART.length);

    ID_NODE = idNode;

    $("#userIcoCarrito").hide();

    if (CART.length < 1) {

        $("#popupListItems").popup("close");

        $("#circuloCantidad").hide();
        $("#spBtnPopupCartAmmount").hide();
        $("#userIcoCarrito").hide();

        $("#btn_finalizarpedido").hide();

        $("#img_cesta").attr("src", "css/icons/cesta.png");

    } else {

        var totalRefresh = 0;

        for (var i = 0; i < CART.length; i++) {
            totalRefresh = totalRefresh + CART[i].quantity;
        }
        $("#spBtnPopupCartProducts").text(totalRefresh);
        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        $("#circuloCantidad").show();
        $("#spBtnPopupCartAmmount").show();

        $("#img_cesta").attr("src", "img/cesta_parpadea.gif");
    }

    if (idNode != 0) {
        $("#banderas").hide();
    }
    /* else {
            PRODUCTS = [];
        }*/

    PAGINA = 0; //se reinicia la pagina del catalogo

    if (aux == 1) {
        nodeIds = [];
        nodeNames = [];
        nodeImg = [];
        openMenu();
    }

    if (STORE == "") {
        $("#divTienda").hide();
        $("#divContent").show();
        STORE = JSON.parse(localStorage['tiendas']);
    }

    //language = 1;
    // Datos que se van a enviar
    var dataSend = {
        lang: parseInt(language),
        origin: origin,
        id: idNode,
        store: STORE.id
    };

    //console.log("Info enviar ws");
    //console.log(dataSend);

    if (isAlgo != undefined && isAlgo > 0) { //estamos en el asistente de disfraces o fiestas?????
        ISFIESTA = isAlgo;
    }

    //console.log("Is algo es " + isAlgo);

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodes.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                //console.log("Respuesta del nodo");
                //console.log(response);

                if (idNode == 0) {
                    node_cero = response;
                    $("#banderas").show();
                    pantallaActual = "menu principal";
                }

                restOk(response, "nodes", idNode, nodeName, aux, backPage);

            } else if (response.result == 0) { //ya no tenemos mas nodos que mostrar, ahora se mostratan los productos

                //console.log("Resultado del nodo es cero");
                //console.log(response);

                if (ISFIESTA == 4) {

                    console.log("Asistentes de disfraces");
                    var info = getInfoNode(idNode);

                    if (info != "undefined") {
                        //console.log("DisplayPantalla intermadia");
                        //updateBackButton(idNode, nodeName, aux);
                        pantallaActual = "Asistente disfraces";
                        $("#divHeader_catalogo").show();
                        $("#divHeader_menuInicial").hide(); // TEMP !!
                        $("#popupCargando").popup("open");
                        displayPantallaIntermediaAsistDisfra(info);
                        //getProductsClassified(idNode, nodeName);

                    } else {
                        $("#texto_popup").text("Ocurrio un problema. Contacte con el administrador de la app");
                        $('#popupAlert').popup('open');
                    }

                } else if (ISFIESTA == 3) { //3 asist. fiestas

                    console.log("Asistentes de fiestas. Pedimos info del nodo");
                    var info = getInfoNode(idNode);

                    //console.log("Enviar info es 4");
                    //console.log(info);
                    pantallaActual = "Asistente fiestas";

                    if (CART.length > 0 && num_personas_fiesta > 0) {

                        var precio_persona = formatoNumero((CART.ammount / num_personas_fiesta), 2, ",", ".", "€");

                        $("#userIcoCarrito").show();

                    }

                    if (info != undefined) {

                        console.log("DisplayPantalla intermadia");
                        console.log(info);
                        displayPantallaIntermediaAsistFiestas(info.node);

                    } else {

                        console.log("Dame productos del catalogo" + nodeName);
                        getCostumes(idNode, nodeName);

                    }

                } else if (ISFIESTA == 1) { //1 catalogo

                    $('#popupCargando').popup('open');
                    pantallaActual = "catalogo";
                    getNodesProducts(idNode, nodeName);

                } else {

                    console.log("Error nodes en getNodes...");

                }

            } else if (response.result == -1) {

                console.log("Error en el envio de parametros");

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });

}

/* Función que controla que la petición Ajax ha ido bien
    - res: Respuesta del webservice
    - typ: tipo de solicitud del webservice
    - param: parametro extra que queramos pasar
    - param2: idem
    */
function restOk(res, typ, param, param2, aux, backPage) {

    //console.log("Cargamos nuevos nodos " + typ);
    //console.log("La respuesta es ");
    //console.log(res);

    switch (typ) {
    case "lang":

        displayFlags(res);
        break;

    case "nodes":
        //console.log("El aux " + aux);
        displayNode(res, param, param2, aux, backPage);
        break;

    default:

        console.log(res);
        break;

    }


}

function getAlternativeProducts(idnode, idproduct, cantidad) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        product: idproduct,
        store: STORE.id,
        id: idnode
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getAlternativeProducts.php',
        dataType: 'json',
        async: false,
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Datos alternativos");
            console.log(response);

            PRODUCTS_ALTER = response.alternativeProducts;

            displayAlternativeProducts(idnode, idproduct, cantidad);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });

}

function getNodesProducts(idNode, nodeName) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: parseInt(language),
        origin: origin,
        id: idNode,
        store: STORE.id
            //page: parseInt(PAGINA)
    };

    console.log("Post catalogo");
    console.log(dataSend);

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getNodeProducts.php',
        dataType: 'json',
        type: 'POST',
        timeout: 60000, //10 seg
        success: function (response) {

            console.log("Respueta");
            console.log(response);

            if (response.result == 1) { //todo bien cargamos productos

                pantallaActual = "catalogo";
                if (PAGINA == 0) {
                    displayProducts(response, idNode, nodeName);
                } else {
                    añadirMasProductos(response, idNode, nodeName);
                }


            } else {

                setTimeout(function () {
                    $('#popupCargando').popup('close');
                }, 500);

                $("#texto_popup").text("Esta categoría no tiene artículos");
                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 750);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("La red esta satura vuelva a intentarlo");
                $('#popupAlert').popup('open');

                setTimeout(function () {
                    $("#popupAlert").popup("open");
                }, 500);

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("La red esta satura vuelva a intentarlo");
                $('#popupAlert').popup('open');

                setTimeout(function () {
                    $("#popupAlert").popup("open");
                }, 500);

            }
        },
    });


}

function getInfoNode(idNode) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        id: idNode
    };

    var enviarInfo = new Array();

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getInfoNode.php',
        dataType: 'json',
        async: false,
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            enviarInfo = response;

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });


    return enviarInfo;

}

//WS que devuelve el listado de productos para un nodo
function getProducts(idNode, nodeName, info_aux) {

    $("#popupCargando").popup("open");

    if (info_aux != undefined) { // asist. de disfraces

        console.log("Venimos del asist. de disfraces getProducts");
        pantallaActual = "Asistente disfraces";
        var dataSend = {
            lang: language,
            origin: origin,
            store: STORE.id,
            //gender: info_aux.sexo,// no se utiliza filtramos nosotros
            //size: info_aux.talla,// no se utiliza filtramos nosotros
            id: idNode
        };


    } else {

        console.log("Estamos en el asist. de fiestas getProducts");
        pantallaActual = "Asistente fiestas";
        // Datos que se van a enviar
        var dataSend = {
            lang: language,
            origin: origin,
            store: STORE.id,
            id: idNode
        };
        console.log("Datos para enviar");
        console.log(dataSend);

    }

    //console.log("Enviamos el ajax");

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getProducts.php',
        dataType: 'json',
        type: 'POST',
        //async:false,
        timeout: 25000, //10 seg
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);
                restOk_products(response, "nodes", idNode, nodeName, info_aux);

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("No hay productos...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            } else if (response.result == -1) {

                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error... Resultado -1");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error de TimeOut...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Sin conexion a internet");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }
        },
    });
}

function getCostumes(info_aux) {

    $("#popupCargando").popup("open");

    console.log("Venimos del asist. de disfraces getCostumes");
    pantallaActual = "Asistente disfraces";
    var dataSend = {
        id: INFO_AUX.id,
        lang: language,
        origin: origin,
        store: STORE.id,
        gender: INFO_AUX.gender,
        size: SIZE
    };

    console.log("Enviamos el ajax");
    console.log(dataSend);

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getCostumes.php',
        dataType: 'json',
        type: 'POST',
        //async:false,
        timeout: 25000, //10 seg
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);
                restOk_products(response, "nodes", INFO_AUX.id, INFO_AUX.name, "");

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("No hay productos...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else if (response.result == -1) {

                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error... Resultado -1");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error de TimeOut...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Sin conexion a internet");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }
        },
    });
}

function getProductsClassified(idNode, nodeName, info_aux) {

    $("#popupCargando").popup("open");

    console.log("Estamos en el asist. de fiestas");
    //pantallaActual = "Asistente fiestas";
    //Datos que se van a enviar
    var dataSend = {
        lang: language,
        origin: origin,
        store: STORE.id,
        id: idNode
    };

    console.log("Datos para enviar");
    console.log(dataSend);


    request = $.ajax({
        data: dataSend,
        //url: urlServices + 'getProductsClassified.php',
        url: urlServices + 'getProductsClassifiedCategory.php',
        dataType: 'json',
        type: 'POST',
        //async:false,
        timeout: 40000, //10 seg
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1 && response.products.length > 0) {

                console.log(response);
                restOk_products(response, "nodes", idNode, nodeName, info_aux, "getProductsClassified");

            } else if (response.result == 0 || response.products.length == 0) {

                //console.log("No hay productos para este nodo");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("No hay productos...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            } else if (response.result == -1) {

                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Error de TimeOut...");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#popupCargando").popup("close");
                $("#texto_popup").text("Sin conexion a internet");

                setTimeout(function () {
                    $('#popupAlert').popup('open');
                }, 250);

            }
        },
    });
}

function restOk_products(res, typ, param, param2, param3) {
    //console.log("Todo bien desde " + typ);
    //console.log("La respuesta es ");
    //console.log(res);

    switch (typ) {
    case "lang":

        displayFlags(res);
        break;

    case "nodes":

        //displayProducts(res, param, param2, param3);
        //console.log("Type " + res.products[0].typeproducts);
        if (res.products[0].typeproducts == undefined) {
            displayProducts(res, param, param2, param3, "");
        } else {
            displayProducts(res, param, param2, param3, "getProductsClassified");
        }
        break;

    default:
        console.log(res);
        break;
    }


}

//Nos devuelve el listados de tiendas disponibles antes de cargar la ventana principal
function getTiendas() {

    console.log("Pedimos las tiendas");

    var request = $.ajax({
        url: urlServices + 'getShops.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Cargamos las tiendas en el select");
            restOk_tiendas(response, "tiendas");

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                //console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //console.log(response);
                $("#texto_popup").text("Error de conexión...");
                $('#popupAlert').popup('open');

            }

        },
    });
}


function restOk_tiendas(res, typ, param, param2) {

    console.log("Las tiendas nos han llegado, cargamos el select" + typ);
    console.log("La respuesta es ");
    console.log(res);

    var count = res.stores.length;

    TIENDAS = res; //array con todas las tiendas

    //var html = '<div class="ui-nodisc-icon"><select data-corners="false" id="select_tienda" data-native-menu="false" data-theme="b" style="border: 0px;padding: 0 0 0 20px;">';
    var html = '<div class="ui-nodisc-icon"><select data-corners="false" id="select_tienda" data-native-menu="false" data-theme="b" style="">';

    for (var i = 0; i < count; i++) {

        var val = res.stores[i].id;
        var text = res.stores[i].name;

        if (i == 0) {
            html = html + '<option selected="selected" value=' + val + ' style=""><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';
            OPCIONSELECTED = val;
        } else {
            html = html + '<option value=' + val + ' style=""><label style="color:white;text-transform: uppercase;">' + text + '</label></option>';
        }

    }

    html = html + '</select></div>';

    $("#div_select_tienda").html(html);

    $("#div_select_tienda").trigger('create');
    $("#div_select_tienda").css('font-size', '20px');

    /*var select = $('#select_tienda');

    select.selectmenu({
        icon: "ui-icon-carat-d"
    });
    select.selectmenu({
        iconshadow: "false"
    });*/
    $('#select_tienda-button').css({
        border: "0px"
    });

    //console.log(html);


}


/* Función que controla que la petición Ajax ha ido mal
    - res: Respuesta del webservice
    - typ: tipo de solicitud del webservice
    */
function restError(res, typ) {

    console.log("fallo de ws, tipo " + typ);
    console.log(res);
    /*
    switch (tipo) {
    case "comprarCreditos":
        {
            notificacion("Compruebe su conexión");
            //abrirPopupAviso("Compruebe su conexión");
            $('#submitPaypal').prop('disabled', false);
            break;
        };
    default:
        notificacion("Intentelo de nuevo");
        break;
    }
    */
}


function sendSugerencias(info) {


    //sugerencias@partyfiesta.com
    console.log("WS");
    console.log(info);

    var request = $.ajax({
        data: info,
        url: urlServices + 'sendSuggestion.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                console.log(response);
                getNodes(0);


            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                //console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function sendContra(usuario) {

    //console.log("Funcion enviar contra");

    var dataSend = {
        user: usuario
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'changePassword.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                console.log(response.password);


            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

//WS que devuelve el listado de sexo mas-feme
function getGender() {

    var dataSend = {
        lang: language
    };

    var request = $.ajax({
        url: urlServices + 'getGender.php',
        data: dataSend,
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);

                var count = response.genders.length;
                var select = $('#select_sexo');

                select.append($('<option>', {
                    value: 0,
                    text: jsonIdiomas.asistente_disfraces.select_sexo_button
                }));

                for (var i = 0; i < count; i++) {

                    var val = response.genders[i].nombre;

                    //console.log("Val es " + val);

                    select.append($('<option>', {
                        value: val,
                        text: val
                    }));

                    select.selectmenu('refresh', true);

                }


                //var option1 = $($("option", select).get(1));
                //option1.attr('selected', 'selected');
                select.selectmenu();

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

//WS que devuelve el listado de tallas      
function getSize(gender) {

    var dataSend = {
        sex: gender,
        lang: language,
        origin: origin,
        store: STORE.id,
        id: ID_NODE
    };

    console.log("Get size " + gender);

    var request = $.ajax({
        data: dataSend,
        async: false,
        url: urlServices + 'getSize.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            //console.log(response);

            if (response.result == 1) {

                console.log(response);

                //$('#select_edad  option').remove();

                var count = response.sizes.length;
                var select = $('#select_edad');

                select.append($('<option>', {
                    value: -1,
                    text: jsonIdiomas.asistente_disfraces.talla
                }));

                select.append($('<option>', {
                    value: 0,
                    text: "Mostrar todas"
                }));


                for (var i = 0; i < count; i++) {

                    var val = response.sizes[i].nombre;

                    //console.log("Val es " + val);

                    select.append($('<option>', {
                        value: val,
                        text: val
                    }));

                    select.selectmenu('refresh', true);

                }

                select.selectmenu();

                setTimeout(function () {
                    $("#popupCargando").popup("close");
                }, 500);



            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No tenemos tallas...");
                $('#popupAlert').popup('open');
                console.log(response);

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');
                console.log(response);

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

//WS que devuelve el listado edades
function getAge() {

    var request = $.ajax({
        url: urlServices + 'getAge.php',
        dataType: 'json',
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {
            //console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                //console.log(response);

                var count = response.age.length;
                var select = $('#select_edad');

                for (var i = 0; i < count; i++) {

                    if (i == 0) {

                        select.append($('<option>', {
                            value: 0,
                            text: "¿Que edad tiene?"
                        }));


                    } else {

                        var val = response.age[i].nombre;

                        console.log("Val es " + val);

                        select.append($('<option>', {
                            value: val,
                            text: val
                        }));

                        select.selectmenu('refresh', true);

                    }

                }

                select.selectmenu();

            } else if (response.result == 0) {

                //console.log("No hay productos para este nodo");
                $("#texto_popup").text("No hay productos...");
                $('#popupAlert').popup('open');

            } else if (response.result == -1) {

                $("#texto_popup").text("Error...");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function getTraduccion(idioma) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    var aux = {};

    // Datos que se van a enviar
    for (var i = 0; i < CART.length; i++) {
        aux[i] = {
            id: CART[i].id
        };
    }

    console.log("Datos del carrito");
    console.log(aux);

    var dataSend = {
        language: idiomStore,
        products: aux
    };

    console.log("Datos del carrito2");
    console.log(dataSend);


    var request = $.ajax({
        data: dataSend,
        async: false,
        url: urlServices + 'getProductLanguage.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            console.log("Respuesta: ");
            console.log(response);

            if (response.result == 1) {

                for (var i = 0; i < CART.length; i++) {
                    if (response[i].id == CART[i].id) {
                        CART[i].definition = response[i].definition;
                        CART[i].name = response[i].name;
                        CART[i].short_name = response[i].short_name;
                        CART[i].suggestions = response[i].suggestions;
                    }
                }

            } else {

                $.jAlert({
                    'title': 'Alerta',
                    'content': 'Error al cambiar de idioma. Respuesta ' + response.result,
                    'theme': 'gray',
                    'size': 'xsm'
                });

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });


}

/**************************************************************************
  WS para enviar el correo con el listado de articulos del carrito
***************************************************************************/
function sendEmail(pantallaIntermediaPago) {

    console.log("Email es " + EMAIL_USER);

    if (EMAIL_USER == "") {

        setTimeout(function () {
            $("#popupEmail").popup("open");
        }, popupTimeout);

    } else {

        var prodAux = [];

        if (OPCIONPEDIDO == 3) {
            var aux = 0;
            for (var i = 0; i < CART.length; i++) {

                if (parseInt(CART[i].stock_x_store) > 0) { //se envian solo los articulos que se tienen que recoger en tienda
                    //console.log(CART[i]);
                    if (CART[i].online_quantity > 0) {
                        prodAux[aux] = CART[i];
                        prodAux[aux].quantity = prodAux[aux].store_quantity;
                    } else {
                        prodAux[aux] = CART[i];
                    }
                    aux++;
                }
            }

        } else {
            var aux = 0;
            for (var i = 0; i < CART.length; i++) {

                if (parseInt(CART[i].stock_x_store) > 0) { //se envian solo los articulos que se tienen que recoger en tienda
                    if (CART[i].online_quantity > 0) {
                        prodAux[aux] = CART[i];
                        prodAux[aux].quantity = prodAux[aux].store_quantity;
                    } else {
                        prodAux[aux] = CART[i];
                    }
                    aux++;
                }
            }
        }

        console.log("Prod a enviar");
        console.log(prodAux);

        $("#popupEmail").popup("close");

        var dataSend = {
            email: EMAIL_USER,
            carrito: prodAux,
            store_email: STORE.email
        };

        var request = $.ajax({
            data: dataSend,
            //async: false,
            url: urlServices + 'sendEmail.php',
            dataType: 'json',
            type: 'POST',
            success: function (response) {

                console.log("Respuesta es:");
                console.log(response);

                if (parseInt(response.result) == parseInt(1)) {

                    if (pantallaIntermediaPago == 1) {
                        $("#texto_popup").text("Correo enviado a " + EMAIL_USER + ".\nA continuación finalizaremos el pedido online.");
                        $('#popupAlert').popup('open');
                        console.log("Enviamos email");
                        setTimeout(function () {
                            $('#popupAlert').popup('close');
                            sistemasPago("si");
                        }, 5000);
                    } else {
                        $("#texto_popup").text("Correo enviado a " + EMAIL_USER);
                        $('#popupAlert').popup('open');
                        console.log("Enviamos email");
                        EMAIL_USER = "";
                        INFO_USU = "";
                        $('#popupAlert').popup('open');
                        $('#email').val('');
                        //$("#spBtnAmountPerson").text(''); //TEMP
                        $("#circuloCantidad").hide();
                        $("#spBtnPopupCartAmmount").hide();
                        $("#userIcoCarrito").hide();
                        $("#btn_finalizarpedido").hide();
                        CART = [];
                        nodeNames = [];
                        nodeIds = [];
                        nodeImg = [];
                        EMAIL_USER = "";
                        logout();
                        setTimeout(function () {
                            $('#popupAlert').popup('close');
                            getNodes(0);
                        }, 1500);
                    }



                } else if (parseInt(response.result) == parseInt(0)) {

                    $("#texto_popup").text("No se ha podido enviar el correo a " + EMAIL_USER);
                    $('#popupAlert').popup('open');

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                    }, 1500);

                    setTimeout(function () {
                        $("#popupEmail").popup("open");
                    }, popupTimeout);

                } else if (parseInt(response.result) == parseInt(2)) {

                    $("#texto_popup").text("Problemas al generar el correo");
                    $('#popupAlert').popup('open');

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                    }, 1500);

                    setTimeout(function () {
                        $("#popupEmail").popup("open");
                    }, popupTimeout);

                } else if (parseInt(response.result) == parseInt(0)) {

                    $("#texto_popup").text("Faltan datos para poder enviar el correo");
                    $('#popupAlert').popup('open');

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                    }, 1500);

                    setTimeout(function () {
                        $("#popupEmail").popup("open");
                    }, popupTimeout);

                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

                if (textStatus === "timeout") {

                    console.log("Timeout");
                    $("#texto_popup").text("Error de TimeOut... compruebe su conexion de internet");
                    $('#popupAlert').popup('open');

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                    }, 1500);

                    setTimeout(function () {
                        $("#popupEmail").popup("open");
                    }, popupTimeout);

                } else {

                    restError(jqXHR, "tiendas");
                    console.log("Sin conexion");
                    //alert("Sin conexion a internet...");
                    $("#texto_popup").text("Error de TimeOut... compruebe su conexion de internet");
                    $('#popupAlert').popup('open');

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                    }, 1500);

                    setTimeout(function () {
                        $("#popupEmail").popup("open");
                    }, popupTimeout);

                }
                INFO_USU = "";
            },
        });
    }
}

/**************************************************************************
  WS para imprimir listado de articulos del carrito
***************************************************************************/
function imprimirPedido(pantallaIntermediaPago) {

    STORE.currencySymbol = "20AC";

    var dataSend = {
        carrito: CART,
        tienda: STORE.code,
        currencySymbol: STORE.currencySymbol,
        lang: language
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'convert_pdf.php',
        type: 'POST',
        success: function (response) {

            console.log("Respuesta de imprimir es:");
            console.log(response);

            console.log("Enviamos a imprimir");

            if (parseInt(response[10]) == 1) {

                if (pantallaIntermediaPago == 1) {

                    $("#texto_popup").text("Pedido enviado para imprimir");
                    $('#popupAlert').popup('open');

                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                        sistemasPago();
                    }, 1500);

                } else {

                    //temp para puesta en tienda
                    $("#texto_popup").text("Pedido enviado para imprimir");
                    $('#popupAlert').popup('open');
                    EMAIL_USER = "";
                    INFO_USU = "";

                    $('#email').val('');
                    //$("#spBtnAmountPerson").text(''); //TEMP
                    $("#circuloCantidad").hide();
                    $("#spBtnPopupCartAmmount").hide();
                    $("#userIcoCarrito").hide();
                    $("#btn_finalizarpedido").hide();
                    CART = [];
                    nodeNames = [];
                    nodeIds = [];
                    nodeImg = [];
                    EMAIL_USER = "";
                    logout();
                    setTimeout(function () {
                        $('#popupAlert').popup('close');
                        getNodes(0);
                    }, 1500);

                }

            } else if (parseInt(response.result) == parseInt(0)) {

                $("#texto_popup").text("No se ha podido enviar el correo a " + EMAIL_USER);
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(2)) {

                $("#texto_popup").text("Problemas al generar el correo");
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(0)) {

                $("#texto_popup").text("Faltan datos para poder enviar el correo");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                //restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }

        }
    });

}

/**
 *   pedidoOnline
 *
 *   funcion que envia los datos del carrito al webservice de pedido online
 */
function pedidoOnline() {

    var dataSend = {
        carrito: CART,
        tienda: STORE.code
    };

    var request = $.ajax({
        data: dataSend,
        //async: false,
        url: urlServices + 'pedidoOnline.php',
        //dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Respuesta de pedidoOnline es:");
            console.log(response);

            //temp para puesta en tienda
            $("#texto_popup").text("Pedido enviado online");
            EMAIL_USER = "";
            INFO_USU = "";
            $('#popupAlert').popup('open');
            $('#email').val('');
            //$("#spBtnAmountPerson").text(''); //TEMP
            $("#circuloCantidad").hide();
            $("#spBtnPopupCartAmmount").hide();
            $("#userIcoCarrito").hide();
            $("#btn_finalizarpedido").hide();
            CART = [];
            nodeNames = [];
            nodeIds = [];
            nodeImg = [];
            EMAIL_USER = "";
            logout();
            console.log("Enviamos el pedido online");


            setTimeout(function () {
                $('#popupAlert').popup('close');
                getNodes(0);
            }, 1500);

            if (parseInt(response.result) == parseInt(1)) {


                setTimeout(function () {
                    $('#popupAlert').popup('close');
                    getNodes(0);
                }, 1500);

            } else if (parseInt(response.result) == parseInt(0)) { // ***** Cambiar en funcion del webservice a utilizar !!!!! ****

                $("#texto_popup").text("No se ha podido enviar el pedido");
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(2)) {

                $("#texto_popup").text("Problemas al generar el pedido");
                $('#popupAlert').popup('open');

            } else if (parseInt(response.result) == parseInt(0)) {

                $("#texto_popup").text("Faltan datos para poder enviar el pedido");
                $('#popupAlert').popup('open');

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                //restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }

        }
    });
}

function guardarCarrito() {

    console.log("Guardamos la cesta");
    var prod = [];

    var aux = {};

    for (var i = 0; i < CART.length; i++) {

        aux.id = CART[i].id;
        aux.qty = CART[i].quantity;

        prod[i] = aux;

    }

    console.log("Productos");
    console.log(prod);

    var dataSend = {
        idClient: INFO_USU.id,
        products: prod
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'sendBasket.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Cesta enviada correctamente");
            console.log(response);

            if (parseInt(response.result) == parseInt(1)) {
                console.log("Carrito guardado correctamente");
                ID_BASKET = response.idBasket;
            } else if (parseInt(response.result) == parseInt(0)) {
                console.log("Problemas con la cesta");
                console.log(response);
            } else {
                console.log("Problemas con la cesta");
                console.log(response);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}



function sendOrder() {

    console.log("Guardamos la cesta");

    var dataSend = {
        origin: origin,
        type: prod,
        sector: PENDIENTE,
        billingName: INFO_USU.name,
        billingNIN: INFO_USU.name,
        paymentMethod: INFO_USU.name,
        region: INFO_USU.name,
        deliveryAddress: INFO_USU.name,
        deliveryPostalCode: INFO_USU.name,
        deliveryCity: INFO_USU.name,
        deliveryProvince: INFO_USU.name,
        deliveryCountry: INFO_USU.name,
        deliveryPhone: INFO_USU.name,
        billingAddress: INFO_USU.name,
        billingPostalCode: INFO_USU.name,
        billingCity: INFO_USU.name,
        billingProvince: INFO_USU.name,
        billingCountry: INFO_USU.name,
        billingPhone: INFO_USU.name,
        productsBasePrice: INFO_USU.name,
        productsTaxPrice: INFO_USU.name,
        productsTotalPrice: INFO_USU.name,
        shippingBasePrice: INFO_USU.name,
        shippingTaxPrice: INFO_USU.name,
        shippingTotalPrice: INFO_USU.name,
        basePrice: INFO_USU.name,
        taxPrice: INFO_USU.name,
        totalPrice: INFO_USU.name,
        internalShippingCost: INFO_USU.name,
        userId: INFO_USU.id,
        shopId: STORE.id,
        //idBasket: ID_BASKET,
        lang: language
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'sendOrder.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Cesta enviada correctamente");
            console.log(response);

            if (parseInt(response.result) == parseInt(1)) {
                console.log("Order guardado correctamente");
                ID_ORDER = response.idOrder;
            } else if (parseInt(response.result) == parseInt(0)) {
                console.log("Problemas con la cesta");
            } else {
                console.log("Problemas con la cesta");
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}

function updateOrder() {

    console.log("Actualizamos la cesta");

    var dataSend = {
        idOrder: ID_ORDER,
        status: PAGADO,
        origin: origin
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'updateOrder.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {

            console.log("Cesta enviada correctamente");
            console.log(response);

            if (parseInt(response.result) == parseInt(1)) {
                console.log("Carrito guardado correctamente");
            } else if (parseInt(response.result) == parseInt(0)) {
                console.log("Problemas con la cesta");
            } else {
                console.log("Problemas con la cesta");
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                $("#texto_popup").text('Error de TimeOut... compruebe su conexion de internet');
                $('#popupAlert').popup('open');


            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion.........");
                //$("#texto_popup").text('Sin conexion a internet...');
                //$('#popupAlert').popup('open');

            }
        },
    });

}

/**
 *   getShopsFromProvince
 *
 *   funcion que llama al webservice para conseguir las tiendas en funcion del identificador de provincia.
 */
function getShopsFromProvince(idProvince) {

    console.log("getShopsFromProvince con id: " + idProvince);

    var dataSend = {
        province: idProvince
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'getShopsProvince.php',
        dataType: 'json',
        async: false,
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Respuesta de tiendas para la provincia");
            console.log(response);

            if (response.result == 1) {

                SHOPS = response.stores;

            } else {

                console.log("-> No se encontraron tiendas");
                $("#texto_popup").text("No se encontraron tiendas");
                $('#popupAlert').popup('open');

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            return [];

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

/**
 *   getProvinces
 *
 *   funcion que llama al webservice que devuelve todas las provincias.
 */
function getProvinces() {

    console.log("-> Llamando al webservice getProvinces.php");

    var request = $.ajax({
        url: urlServices + 'getProvinces.php',
        dataType: 'json',
        async: false,
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                //var provinces = JSON.parse(response.provinces);

                PROVINCIAS = response.provinces;

                //console.log('response.provinces: ' + response.provinces);

                console.log("-> Encontradas " + PROVINCIAS.length + " provincias");
                //console.log("-> provincias " + PROVINCIAS);

                //return provinces;

            } else {
                console.log("-> No se encontraron provincias");
                $("#texto_popup").text("No se encontraron provincias");
                $('#popupAlert').popup('open');

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            return [];

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

/**
 *   getCountrys
 *
 *   funcion que llama al webservice que devuelve todos los paises.
 */
function getCountrys() {

    console.log("-> Llamando al webservice getCountrys.php");

    var request = $.ajax({
        url: urlServices + 'getCountrys.php',
        dataType: 'json',
        async: false,
        type: 'GET',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                //var provinces = JSON.parse(response.provinces);

                PAISES = response.countrys;

                //console.log('response.provinces: ' + response.provinces);

                console.log("-> Encontrados " + PAISES.length + " paises");
                //console.log("-> provincias " + PROVINCIAS);

                //return provinces;

            } else {
                console.log("-> No se encontraron paises");
                $("#texto_popup").text("No se encontraron paises");
                $('#popupAlert').popup('open');

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            return [];

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

/**
 *   getProvincesFromCountry
 *
 *   funcion que llama al webservice para conseguir las provincias en funcion del identificador de pais.
 */
function getProvincesFromCountry(idCountry) {

    console.log("getProvincesFromCountry con id: " + idCountry);

    var dataSend = {
        country: idCountry
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'getProvinces.php',
        dataType: 'json',
        async: false,
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Respuesta de provincias para el pais");
            console.log(response);

            if (response.result == 1) {

                PROVINCIAS = response.provinces;

            } else {

                console.log("-> No se encontraron provincias");
                $("#texto_popup").text("No se encontraron provincias");
                $('#popupAlert').popup('open');

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            return [];

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function sendBasketAndOrder(paymentMethod) { //esta funcion nos devuelve la info de un nodo pasandole como parametro el id_nodo

    // Datos que se van a enviar
    var basePriceCount = 0;
    var taxPriceCount = 0;
    var totalPriceCount = 0;

    var price = {};
    //price = PRECIOSENVIO;

    if (OPCIONENTREGA == 'dom') {

        price = SEND_INFO.price_dom;

    } else {

        if (SEND_INFO.price_shop.result < 0) { //no hay gastos de envio xq no llega al pedido minimo

            price = SEND_INFO.price_dom;

        } else {
            price = SEND_INFO.price_shop;
        }

    }

    PRECIOSENVIO = price;

    var type = "";

    if (parseFloat(PRECIOSENVIO.totalPrice) > 0) {
        type = "normal";
    } else {
        type = "freeOfCharge";
    }

    console.log("Info usu " + INFO_USU);

    var prodAux = [];

    if ((OPCIONPEDIDO == 3) || (OPCIONPEDIDO == 2 && OPCIONENTREGA == 'shop')) { //recoge los articulos de tienda y paga el online solo enviamos los articulos online

        var aux = 0;

        for (var i = 0; i < CART.length; i++) {

            if (parseInt(CART[i].price_x_region[0].exclusiveWeb) == 0) {

                if (parseInt(CART[i].stock_x_store) == 0 && parseInt(CART[i].stock_x_central_store) > 0) {

                    prodAux[aux] = CART[i];
                    aux++;

                } else {

                    if (parseInt(CART[i].online_quantity) > 0) { //se añaden tambien los prod que tienen parte online
                        prodAux[aux] = CART[i];
                        prodAux[aux].quantity = CART[i].online_quantity;
                        aux++;
                    }

                }

            } else {

                prodAux[aux] = CART[i];
                aux++;

            }
        }

    } else {

        prodAux = CART;

    }

    for (var i = 0; i < prodAux.length; i++) {

        console.log("Prod a enviar");
        console.log(prodAux[i]);
        basePriceCount += parseFloat(prodAux[i].price_x_region[0].basePrice) * prodAux[i].quantity;
        taxPriceCount += parseFloat(prodAux[i].price_x_region[0].taxPrice) * prodAux[i].quantity;
        totalPriceCount += parseFloat(prodAux[i].price_x_region[0].totalPrice) * prodAux[i].quantity;

    }

    console.log("Productos a enviar es:");
    console.log(prodAux);

    if (OPCIONENVIO == 2 && OPCIONENTREGA == "shop") {

        var deliveryAddress = STORE.address;
        var deliveryNumber = INFO_USU.addressNumber;
        var deliveryPostalCode = STORE.postalCode;
        var deliveryCity = STORE.city;
        var deliveryProvince = STORE.province;
        var deliveryCountry = STORE.country;
        var deliveryPhone = STORE.phone;
        var billingAddress = STORE.address;
        var billingPostalCode = STORE.postalCode;
        var billingCity = STORE.city;
        var billingProvince = STORE.province;
        var billingCountry = STORE.country;
        var billingPhone = STORE.phone;


    } else {

        var deliveryAddress = INFO_USU.address;
        var deliveryNumber = INFO_USU.addressNumber;
        var deliveryPostalCode = INFO_USU.postalCode;
        var deliveryCity = INFO_USU.city;
        var deliveryProvince = INFO_USU.province;
        var deliveryCountry = INFO_USU.country;
        var deliveryPhone = INFO_USU.phone;
        var billingAddress = INFO_USU.billingAddress;
        var billingPostalCode = INFO_USU.billingPC;
        var billingCity = INFO_USU.billingCity;
        var billingProvince = INFO_USU.billingProvince;
        var billingCountry = INFO_USU.billingCountry;
        var billingPhone = INFO_USU.billingPhone;

    }

    var dataSend = {
        products: prodAux,
        origin: origin,
        type: type, //normal freeOfCharge
        sector: "null",
        billingName: INFO_USU.billingName,
        billingNIN: INFO_USU.billingNIN,

        paymentMethod: paymentMethod, //metodo de pago (creditCard, paypal, bankTransfer, Caja)
        region: INFO_USU.region,

        deliveryAddress: deliveryAddress,
        deliveryPostalCode: deliveryPostalCode,
        deliveryCity: deliveryCity,
        deliveryProvince: deliveryProvince,
        deliveryCountry: deliveryCountry,
        deliveryPhone: deliveryPhone,
        billingAddress: billingAddress,
        billingPostalCode: billingPostalCode,
        billingCity: billingCity,
        billingProvince: billingProvince,
        billingCountry: billingCountry,
        billingPhone: billingPhone,

        productsBasePrice: parseFloat(basePriceCount),
        productsTaxPrice: parseFloat(taxPriceCount),
        productsTotalPrice: parseFloat(totalPriceCount),

        shippingBasePrice: parseFloat(price.basePrice),
        shippingTaxPrice: parseFloat(price.taxPrice),
        shippingTotalPrice: parseFloat(price.totalPrice),

        basePrice: parseFloat(basePriceCount) + parseFloat(price.basePrice),
        taxPrice: parseFloat(taxPriceCount) + parseFloat(price.taxPrice),
        totalPrice: parseFloat(totalPriceCount) + parseFloat(price.totalPrice),

        internalShippingCost: "null",

        userId: INFO_USU.id,
        shopId: STORE.id,
        //idBasket: ID_BASKET,
        lang: language

    };

    console.log("Mis datos son");
    console.log(dataSend);

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'sendBasketAndOrder.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log('-- Bascket enviada --');
            console.log(response);

            if (response.result == -1) {

                $("#popupCargando").popup("close");
                console.log("Faltan parametros");

            } else {

                $("#popupCargando").popup("close");

                html = '<center>' +
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
                    CART = [];
                    nodeNames = [];
                    nodeIds = [];
                    nodeImg = [];
                    EMAIL_USER = "";
                    logout();
                }, 10000);


            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                //console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                console.log(response);

                $("#texto_popup").text("Error de ws");
                $('#popupAlert').popup('open');

            }
        },
    });

}


/*Esta funcion sirve para obtener el precio de envio. La respuesta es -1 faltan parametros y si es -2 no llegamos al precio min de envio*/
function getSendPrice(precio) {

    // Datos que se van a enviar
    var dataSend = {
        totalPrice: precio,
        lang: language,
        idShop: STORE.id,
        origin: origin
    };

    request = $.ajax({
        data: dataSend,
        url: urlServices + 'getSendPrice.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            console.log("Respuesta");
            console.log(response);

            SEND_INFO = response;

            //opcionesPago();

            opcionesEnvio(OPCIONENVIO, precio);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {

                //console.log("Timeout");
                $("#texto_popup").text("Timeout");
                $('#popupAlert').popup('open');

            } else {

                restError(jqXHR, "tiendas");
                $("#texto_popup").text("Error de ws");
                $('#popupAlert').popup('open');

            }
        },
    });

}


function updateRegistroUser(user,
    sendName, sendSurname, sendPhone, sendNIN, sendAddress, sendNumber, sendCity, sendProvince, sendPC, sendCountry,
    facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, pantallaSiguiente) {

    console.log('Arguments update: ' + arguments); // TEMP
    // Datos que se van a enviar
    var dataSend = {
        user: user,

        sendName: sendName,
        sendSurname: sendSurname,
        sendPhone: sendPhone,
        sendNIN: sendNIN,
        sendAddress: sendAddress,
        sendNumber: sendNumber,
        sendCity: sendCity,
        sendProvince: sendProvince,
        sendPC: sendPC,
        sendCountry: sendCountry,
        //userPostalCode: userPostalCode,

        facName: facName,
        facSurname: facSurname,
        facPhone: facPhone,
        facNIN: facNIN,
        facAddress: facAddress,
        facNumber: facNumber,
        facCity: facCity,
        facProvince: facProvince,
        facPC: facPC,
        facCountry: facCountry
    };

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'updateUser.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                console.log("Todo ok");
                console.log(response);
                LOGGED = true;
                //console.log(response.info);
                INFO_USU = response.info;
                //$('#popupLogin').popup('close');
                $("#login").text("Bienvenido/a " + response.info.name + ","); // + usario + "
                $('#login').attr('onclick', "logout()");
                $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');

                /*if (REDIRECT) {
                    console.log("Redirigeme");
                    REDIRECT = false;
                    checkOut();
                }*/

                switch (pantallaSiguiente) {
                case 0:
                    sistemasPago();
                    break;

                case 1:
                    formularioTiendaDestino();
                    break;
                }

            } else if (response.result == -1) {

                console.log("Número de parametros incorrecto");
                $("#texto_popup").text("Número de parametros incorrecto");
                $('#popupAlert').popup('open');

            } else if (response.result == -2) {

                $("#texto_popup").text("El usuario no existe");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}

function sendRegistroDomicilio(user, password, userPostalCode,
    sendName, sendSurname, sendPhone, sendNIN, sendAddress, sendNumber, sendCity, sendProvince, sendPC, sendCountry,
    facName, facSurname, facPhone, facNIN, facAddress, facNumber, facPC, facCity, facCountry, facProvince, pantallaSiguiente) {

    console.log('Arguments update: ' + arguments); // TEMP

    // Datos que se van a enviar
    var dataSend = {
        user: user,
        password: password,
        userPostalCode: userPostalCode,

        sendName: sendName,
        sendSurname: sendSurname,
        sendPhone: sendPhone,
        sendNIN: sendNIN,
        sendAddress: sendAddress,
        sendNumber: sendNumber,
        sendCity: sendCity,
        sendProvince: sendProvince,
        sendPC: sendPC,
        sendCountry: sendCountry,

        facName: facName,
        facSurname: facSurname,
        facPhone: facPhone,
        facNIN: facNIN,
        facAddress: facAddress,
        facNumber: facNumber,
        facCity: facCity,
        facProvince: facProvince,
        facPC: facPC,
        facCountry: facCountry
    };

    console.log('Arguments update2: ' + dataSend); // TEMP

    var request = $.ajax({
        data: dataSend,
        url: urlServices + 'register.php',
        dataType: 'json',
        type: 'POST',
        timeout: 10000, //10 seg
        success: function (response) {

            if (response.result == 1) {

                console.log("Todo ok - register");
                console.log(response);
                LOGGED = true;
                //console.log(response.info);
                INFO_USU = response.info;
                //$('#popupLogin').popup('close');
                $("#login").text("Bienvenido/a " + response.info.name + ","); // + usario + "
                $('#login').attr('onclick', "logout()");
                $("#login").append('<img src="http://partyfiesta.youtter.com/webservices/img/nodos/salir.jpg" style="width: 15px;margin-top: 0px;">');

                /*if (REDIRECT) {
                    console.log("Redirigeme");
                    REDIRECT = false;
                    checkOut();
                }*/

                switch (pantallaSiguiente) {
                case 0:
                    sistemasPago();
                    break;

                case 1:
                    formularioTiendaDestino();
                    break;
                case 2:

                    if (OPCIONENTREGA == "dom") { //mostramos el formulario de direccion de facturacion
                        displayDomicilioForm(OPCIONENTREGA, SEND_INFO.price_dom.totalPrice, SEND_INFO.price_dom.totalPrice, SEND_INFO.price_dom.basePrice);
                    } else {
                        displayDomicilioForm(OPCIONENTREGA, SEND_INFO.price_shop.totalPrice, SEND_INFO.price_shop.totalPrice, SEND_INFO.price_shop.basePrice);
                    }

                    cargaDatosUsuarioAFormularioRegistro(); //cargamos los datos del cliente automaticamente

                    break;
                }


            } else if (response.result == -1) {

                console.log("Número de parametros incorrecto");
                $("#texto_popup").text("Número de parametros incorrecto");
                $('#popupAlert').popup('open');

            } else if (response.result == -2) {

                $("#texto_popup").text("El usuario ya existe");
                $('#popupAlert').popup('open');

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (textStatus === "timeout") {
                //do something on timeout
                console.log("Timeout");
                alert("Error de TimeOut... compruebe su conexion de internet");

            } else {

                restError(jqXHR, "tiendas");
                console.log("Sin conexion");
                //alert("Sin conexion a internet...");
                $("#texto_popup").text("Sin conexion a internet");
                $('#popupAlert').popup('open');

            }
        },
    });
}