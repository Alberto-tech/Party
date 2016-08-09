/******************************************
Esto se ejecuta antes que la app se inicie  
******************************************/
$(document).bind("mobileinit", function () {

    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    //$.mobile.selectmenu.prototype.options.nativeMenu = false;

    // Configuración de Ajax
    $.ajaxSetup({
        timeout: 10000, //Time in milliseconds
        crossDomain: true
    });

    // Obtenermos el listado banderas y tiendas
    getFlags();
    getTiendas();

    if (localStorage['tiendas'] != undefined) {
        $("#headerMenuIniical").hide();
        getNodes(0);
    }

    //Cargamos el idioma por defecto de la app
    translateButtons("ca");


});

document.onclick = function (event) {

    //console.log("Reiniciamos el salvapantallas");
    clearTimeout(protector);

    //protector = setInterval(function () {
    protector = setTimeout(function () {
        logout();
        displayScreenSaver();
    }, idleTime);

};


/******************************************
Esto se ejecuta antes que la app se inicie
******************************************/
$(document).ready(function () {


    $(window).scroll(function () {

        //console.log("Mas scroll y reinicar tiempo salvapantallas");
        //clearInterval(protector);

        $('#principal').show();
        $('#contentPopupScreenSaver').hide();

        //clearInterval(protector);
        //console.log("Reiniciamos el salvapantallas");
        clearTimeout(protector);

        //protector = setInterval(function () {
        protector = setTimeout(function () {
            logout();
            displayScreenSaver();
        }, idleTime);

        if ($(window).scrollTop() == $(document).height() - $(window).height() && pantallaActual == "catalogo") { //carga mas productos en el catalogo cuando se acabe la pagina

            //PAGINA++;
            //getNodesProducts(nodeIds[nodeIds.length - 1], nodeNames[nodeNames.length - 1]);

        }

    });

    $(document).on("scrollstart", function () {

        //console.log("Limpiamos el salva con el scroll");
        //console.log("Reiniciamos el salvapantallas");
        clearTimeout(protector);

        //protector = setInterval(function () {
        protector = setTimeout(function () {
            //console.log("Reiniciamos el salvapantallas");
            logout();
            displayScreenSaver();
        }, idleTime);

    });


    $(this).bind('touchstart', function preventZoom(e) {

        //console.log("-----------------> Hola soy un log!! -------------------------------------"); // TEMP !!
        console.log("Reiniciamos el salvapantallas mobil");
        clearTimeout(protector);

        //protector = setInterval(function () {
        protector = setTimeout(function () {
            console.log("Reiniciamos el salvapantallas");
            logout();
            displayScreenSaver();
        }, idleTime);


        if ($('#contentPopupScreenSaver').is(':hidden')) { //escondido

            //console.log('Hola2');
            var t2 = e.timeStamp,
                t1 = $(this).data('lastTouch') || t2,
                dt = t2 - t1,
                fingers = e.originalEvent.touches.length;
            $(this).data('lastTouch', t2);
            if (!dt || dt > 500 || fingers > 1) return; // not double-tap

            e.preventDefault(); // double tap - prevent the zoom
            // also synthesize click events we just swallowed up
            $(this).trigger('click').trigger('click');

        } else {

            //console.log('Hola');
            e.preventDefault();
            $('#principal').show();
            $('#contentPopupScreenSaver').hide();
            getNodes(0);
            setTimeout(function () {
                getNodes(0);
            }, 50);

        }

    });


    $('#popupCargando').on('popupafteropen', function () {

        console.log("Abrimos el popup de cargando");

        setTimeout(function () {
            $('#popupCargando').popup('close');
        }, 65000);

    }).on('popupafterclose', function () {

    });

    $("#contentPopupScreenSaver").click(function () {

        $('#principal').show();
        $('#contentPopupScreenSaver').hide();
        getNodes(0);
        setTimeout(function () {
            getNodes(0);
        }, 50);
    });

    $("#popupListItems").bind({
        popupafterclose: function (event, ui) {
            console.log("Hemos cerrado el popup");
        }
    });


    //Guardamos el alto y ancho de la pantalla
    W_WIDTH = $(window).width();
    W_HEIGTH = $(window).height();

    $("#popupCargando").popup({
        beforeposition: function () {
            $(this).css({
                width: W_WIDTH,
                height: W_HEIGTH
            });
        },
        x: 0,
        y: 0
    });


    //Detectamos la orientacion de la pantalla
    $(window).bind("orientationchange", function (event) {
        if (event.orientation) {
            console.log("Me han reorientado a " + event.orientation);
            W_WIDTH = $(window).width();
            W_HEIGTH = $(window).height();
        }
    });

    //Protector de pantalla de la app
    protector = setTimeout(function () {
        logout();
        displayScreenSaver();
    }, idleTime);


    var htmlHeader_menu = '<div id="barra_sup" style="position:relative" onclick="changeIdiomPopUp();">' +
        '<img src="css/icons/header.png" width="100%" style="height: 38px;"><div id="banderas" style="position:absolute; top:0px;right: 0px;margin-top: .5%;margin-right: 3%;">' +
        /*'<a onclick="changeIdiomPopUp();"><img id="img_banderas" src="css/banderas/idioma_codigo.png"  style="width: 30px;margin-right: 5px;height: 20px;margin-top: 5px;"></a>' +*/
        '<a onclick="changeIdiomPopUp();"><label id="label_idioma" style="color: rgb(255, 255, 255);text-transform:uppercase;" >ES</label></a>' +
        '</div>';
    $("#divHeader_menu").html(htmlHeader_menu);
    $("#divHeader_menu").trigger('create');

    // Obtenermos el listado banderas y tiendas
    getFlags();
    getTiendas();

    //Cargamos el idioma por defecto de la app
    translateButtons("es");

    if (localStorage['tiendas'] != undefined) {
        $("#headerMenuIniical").hide();
        getNodes(0);
    }

    //Boton de acceso a la app
    $("#btn_acceder").click(function () {

        //var seleccion = $("#select_tienda option:selected").val();
        console.log("Seleccion es " + seleccion);

        //$('#select_tienda').val(OPCIONSELECTED).selectmenu('refresh');

        var seleccion = $("#select_tienda option:selected").val();


        if (seleccion != undefined) {

            $("#divTienda").hide();
            $("#divContent").show();

            STORE = $("#select_tienda option:selected").val();

            var countTiendas = TIENDAS.stores.length;

            for (var i = 0; i < countTiendas; i++) {

                if (TIENDAS.stores[i].id == STORE) {

                    SHOPDELIVERY = TIENDAS.stores[i].deliveryStore;
                    //language = TIENDAS.stores[i].language;  
                    STORE = TIENDAS.stores[i];

                    localStorage['tiendas'] = JSON.stringify(STORE); // para recuperar info JSON.parse(localStorage['tiendas']);

                    TIENDAS = "";
                    break;
                }
            }

            //console.log("Item seleccionado " + STORE + " y tiene entraga en tienda? " + SHOPDELIVERY);
            //$("#logo_inicio").hide();
            getNodes(0);

        } else {

            console.log("!Seleccione una tienda!");

            $.jAlert({
                'title': 'Alerta',
                'content': jsonIdiomas.alertas.select_tienda,
                'theme': 'gray',
                'size': 'xsm'
            });

        }

    });

    //Boton de login de la app
    $("#iniciar_session").click(function () {

        //console.log("Logandose");
        var usuario = $('#usrnm').val();
        var contraseña = $('#pswd').val();

        if (usuario == "" || contraseña == "") {
            /*$('.ui-popup').popup('close');
            $("#texto_popup").text(jsonIdiomas.popup_errores.evento_click.iniciar_session);
            $('#popupAlert').popup('open');*/
            if (usuario == "" && contraseña != "") {
                $("#usrnm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#usrnm').addClass('colorText');
            } else if (usuario != "" && contraseña == "") {
                $("#pswd").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#pswd').addClass('colorText');
            } else {
                $("#usrnm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#usrnm').addClass('colorText');
                $("#pswd").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
                $('#pswd').addClass('colorText');
            }


        } else {

            $('#usrnm').removeClass('colorText');
            $('#pswd').removeClass('colorText');
            EMAIL_USER = usuario;
            getLogin(usuario, contraseña);

        }

    });

    //Boton de login de la app
    $("#enviar_correo").click(function () {

        //console.log("Logandose");
        var email = $('#email').val();
        EMAIL_USER = email;
        INFO_USU = email;

        if (email == "") {

            $("#email").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#email').addClass('colorText');

        } else {

            $('#email').removeClass('colorText');
            sendEmail();


        }

    });

    //Boton de registro de la app
    $("#enviar_registro").click(function () {

        //console.log("registrandose");
        var usuario = $('#emailsignup').val();
        var contraseña = $('#passwordsignup').val();
        var rep_contraseña = $('#passwordsignup_confirm').val();
        var cod_pos = $('#cod_pos').val();
        console.log("Contra " + contraseña + " dos " + rep_contraseña + " mas " + cod_pos);

        if (contraseña != rep_contraseña) { //usuario == "" || contraseña == "" || rep_contraseña == "" || cod_pos == ""

            //console.log("AQUI333");
            $('#passwordsignup').val("");
            $('#passwordsignup_confirm').val("");
            $("#passwordsignup").attr("placeholder", jsonIdiomas.popup_errores.evento_click.contra_nocoinciden);
            $('#passwordsignup').addClass('colorText');
            $("#passwordsignup_confirm").attr("placeholder", jsonIdiomas.popup_errores.evento_click.contra_nocoinciden);
            $('#passwordsignup_confirm').addClass('colorText');

        } else if (!revisarDireccionCorreo('emailsignup')) {

            $('#emailsignup').val("");
            $('#emailsignup').attr("placeholder", jsonIdiomas.popup_errores.evento_click.mail_no_valido);
            $('#emailsignup').addClass('colorText');

        } else if (usuario != "" && contraseña == rep_contraseña && cod_pos != "" && contraseña.length >= 8) {

            //console.log("AQUI222");
            $('#emailsignup').removeClass('colorText');
            $('#passwordsignup').removeClass('colorText');
            $('#passwordsignup_confirm').removeClass('colorText');
            $('#cod_pos').removeClass('colorText');
            getRegistro(usuario, contraseña, cod_pos);

        } else if (contraseña.length <= 8 && rep_contraseña.length <= 8) {

            console.log("AQUI222");
            $('#passwordsignup').val("");
            $('#passwordsignup_confirm').val("");
            $("#passwordsignup").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio_oass);
            $('#passwordsignup').addClass('colorText');
            $("#passwordsignup_confirm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio_oass);
            $('#passwordsignup_confirm').addClass('colorText');

        } else {
            //console.log("AQUI");
            $('#passwordsignup').val("");
            $('#passwordsignup_confirm').val("");
            $('#emailsignup').val("");
            $('#cod_pos').val("");
            $("#emailsignup").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#emailsignup').addClass('colorText');
            $("#passwordsignup").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#passwordsignup').addClass('colorText');
            $("#passwordsignup_confirm").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#passwordsignup_confirm').addClass('colorText');
            $("#cod_pos").attr("placeholder", jsonIdiomas.popup_errores.campo_vacio);
            $('#cod_pos').addClass('colorText');

        }

    });


    $("#btnPopupActionLeft").click(function () {

        var action = $("#lbpopupAction").text();
        switch (action) {
        case "deleteItem":

            displayPopupItemList();

            break;
        }
    });


    $("#btnPopupActionRight").click(function () {

        var action = $("#lbpopupAction").text();
        switch (action) {
        case "deleteItem":

            var id = $("#lbpopupAction").data('id');
            console.log("Clicamos en si y eliminamos id " + id);
            var i = 0;
            for (i = 0; i < CART.length; i++) {
                console.log("ID cart " + CART[i].id + " id pasada " + id);
                if (parseInt(CART[i].id) == parseInt(id)) {
                    console.log("Encontrado el elemnto a restar del ammount");
                    CART.ammount = CART.ammount - (CART[i].price_x_region[0].totalPrice * CART[i].quantity);
                    break;
                }

            }

            updateOpcionCompraProducto();

            $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

            updateVariblesTiposDeProducto(CART[i], false); // TEMP !! actulizamos variables.

            setTimeout(function () {
                deleteItemCart($("#lbpopupAction").val());
            }, 250);

            setTimeout(function () {
                displayPopupItemList();
                updateOpcionCompraProducto();
            }, 250);

            break;
        }
    });

    $("#cam_contraseña").click(function () { // botton de login de la app

        //console.log("Cambio passwrod");
        var usuarioCambio = $('#usuarioCambio').val();

        //console.log("Email " + usuarioCambio);

        if (usuarioCambio != "") {
            //console.log("Procedemos...")
            sendContra(usuarioCambio);
        } else {
            $("#texto_popup").text("Escriba un usuario");
            $('#popupAlert').popup('open');
        }

    });



});


// FUNCIÓN QUE ABRE/CIERRA EL MENÚ LATERAL
function openMenu() {

    if ($("#lateralMenu").hasClass("ui-panel-open") == true) {
        $("#lateralMenu").panel("close");
    } else {
        $("#lateralMenu").panel("open");
    }

}

// FUNCIÓN QUE EMULA EL BOTÓN DE ATRÁS DE LA APLICACIÓN
function backPage(idNode, nodeName, linkint) {

    //console.log("Imagen: " + linkint);

    if (linkint == "productos") {

        displayProductos(idNode, nodeName);

    } else {

        if (pantallaActual != "opciones de pago" || pantallaActual != "opciones envio" || pantallaActual != "sistemas pago") {

            $("#btn_finalizarpedido").removeClass("btn_disabled");

        }

        //PRODUCTS = [];
        //TEMP_PRODUCTS = [];

        translateButtons(idiomStore);

        /*if (pantallaActual == "Asistente fiestas" && AUX == 1 && CART.length > 0) { //mostramos el popup para poder vaciar el cart

            setTimeout(function () {
                $("#popupPregunta").popup("open");
            }, popupTimeout);

            AUX = 0;

        } else {*/

        var position = (nodeIds.length);
        console.log("Posicion " + position);

        if (position > 2 && idNode != 0) {

            //console.log("Tenemos cola");
            //console.log(nodeIds);
            console.log("Antes de borrar " + position);
            nodeIds.splice(position - 2); //borramos el ultimo nodo
            nodeNames.splice(position - 2);
            nodeImg.splice(position - 2);
            console.log(nodeIds);
            position = nodeIds.length; //despues de borrar
            console.log("Despues de borrar " + position);
            getNodes(idNode, nodeName, 0, linkint, "back");
            //getNodes(nodeIds[position - 2], nodeNames[position - 2], 0, nodeImg[position - 2], "back");

        } else {
            getNodes(0);
            nodeIds = [];
            nodeNames = [];
            nodeImg = [];
        }
    }
    //}
}

/*********************************************************************************************
  Esta funcion carga la lista de productos una vez que no hay mas nodos que mostrar. Segun en 
  que pantalla estemos muestra una cosa o otra.
  Parametros:
  idNode: id del node del cual venimos.
  nodeName: nombre del nodo del cual venimos.  
**********************************************************************************************/
function displayProductos(idNode, nodeName) {

    if (ISFIESTA == 4) { //por aqui se accede al asistente de disfraces

        var sexo = $("select#select_sexo option").filter(":selected").val(); // en los dos selects en caso de que no haya seleccionado nada sera cero
        var talla = $("select#select_talla option").filter(":selected").val();

        if (sexo != 0 && talla != 0) {

            var info_aux = {
                talla: talla,
                sexo: sexo
            }
            pantallaActual = "Asistente disfraces";
            console.log("Todos los selects ok. Entramos en el asistente de disfraces.");
            //getProducts(idNode, nodeName, info_aux);
            getCostumes(idNode, nodeName, info_aux);

        }

    } else if (ISFIESTA == 3) { //por aqui se accede desde el asistente de fiestas

        //var num_persosnas = $('#personas_fiesta').val();
        if (num_personas_fiesta == "" || num_personas_fiesta == undefined) {
            num_personas_fiesta = $('#personas_fiesta').val();
        }


        if (parseInt(num_personas_fiesta) >= 2) {

            console.log("Todo ok ASIS. FIESTAS " + num_personas_fiesta);
            //getProducts(idNode, nodeName);
            pantallaActual = "Asistente fiestas";
            getProductsClassified(idNode, nodeName, info_aux);

        } else {
            console.log("Todo ok ASIS. FIESTAS " + num_personas_fiesta);
            $("#texto_popup").text("Añada alguna persona a la fiesta");
            $('#popupAlert').popup('open');

        }

    } else {

        $("#texto_popup").text("Seleccione un campo valido para poder continuar");
        $('#popupAlert').popup('open');

    }

}


/**************************************************************************************************
 Da formato a un número para su visualización
 @param {(number|string)} numero Número que se mostrará
 @param {number} [decimales=null] Nº de decimales (por defecto, auto); admite valores negativos
 @param {string} [separadorDecimal=","] Separador decimal
 @param {string} [separadorMiles=""] Separador de miles
 @param {string} [simbolo=""] simbolo de la moneda
 @returns {string} Número formateado o cadena vacía si no es un número
****************************************************************************************************/
function formatoNumero(numero, decimales, separadorDecimal, separadorMiles, simbolo) {
    var partes, array;

    if (!isFinite(numero) || isNaN(numero = parseFloat(numero))) {
        return "";
    }
    if (typeof separadorDecimal === "undefined") {
        separadorDecimal = ",";
    }
    if (typeof separadorMiles === "undefined") {
        separadorMiles = "";
    }

    // Redondeamos
    if (!isNaN(parseInt(decimales))) {
        if (decimales >= 0) {
            numero = numero.toFixed(decimales);
        } else {
            numero = (
                Math.round(numero / Math.pow(10, Math.abs(decimales))) * Math.pow(10, Math.abs(decimales))
            ).toFixed();
        }
    } else {
        numero = numero.toString();
    }

    // Damos formato
    partes = numero.split(".", 2);
    array = partes[0].split("");
    for (var i = array.length - 3; i > 0 && array[i - 1] !== "-"; i -= 3) {
        array.splice(i, 0, separadorMiles);
    }
    numero = array.join("");

    if (partes.length > 1) {
        numero += separadorDecimal + partes[1];
    }

    return numero + " " + simbolo;
}


/********************************************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  No se utiliza.
  Parametros : 
  producto: info del producto a guardar
  operacion: si es añadir o restar articulos  1 sera sumar  0 restar
*********************************************************************************************************************/

function carrito(id_producto, operacion, precio) {

    //console.log("Longitud del array " + CARRITO.length);
    //console.log(id_producto);
    //console.log(CARRITO);

    if (CARRITO.length == 0) {

        //displayMasMenos(0, id_producto);
        //displayQantidadProducto(1, id_producto);
        var aux = [];

        aux['id_producto'] = id_producto;
        aux['cantidad'] = 1;
        aux['precio'] = precio;
        CARRITO.push(aux);

        //console.log(CARRITO);

    } else {

        if (operacion == 1) { //sumamos

            var encontrado = 0;
            var count = "";
            for (var i = 0; i < CARRITO.length; i++) {
                count++;
                if (id_producto == CARRITO[i].id_producto) {

                    CARRITO[i].cantidad = CARRITO[i].cantidad + 1;
                    encontrado = 1;
                    //displayQantidadProducto(CARRITO[i].cantidad, id_producto);
                    break;

                }

            }

            if (encontrado == 0) { //no existe ese articulo en nuestro array aun, lo añadimos
                var aux = [];

                aux['id_producto'] = id_producto;
                aux['cantidad'] = 1;
                aux['precio'] = precio;
                CARRITO.push(aux);
                //displayMasMenos(0, id_producto);
                //displayQantidadProducto(1, id_producto);

            }

        } else if (operacion == 0) { //restamos

            var count = "";
            if (CARRITO.length > 0) {

                for (var i = 0; i < CARRITO.length; i++) {

                    count++;
                    if (id_producto == CARRITO[i].id_producto) {

                        CARRITO[i].cantidad = CARRITO[i].cantidad - 1;
                        encontrado = 1;
                        //displayQantidadProducto(CARRITO[i].cantidad, id_producto);
                        if (CARRITO[i].cantidad == 0) {
                            CARRITO.splice(i, 1);
                            //console.log(CARRITO);
                        }
                        break;

                    }

                }


            }


        }

    }

}


/********************************************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  Parametros : 
  item: info del producto a guardar
  param: si es añadir o restar articulos  1 sera sumar  0 restar
*********************************************************************************************************************/

function addToCart(item, param, aux) {

    console.log('AddToCart con item:' + item + ' param: ' + param); // TEMP !!

    var product;
    var foundInCart = 0;

    for (var i = 0; i < PRODUCTS.length; i++) { //cogemos los datos del producto con el id que tenemos

        if (PRODUCTS[i]['id'] == item) { //si coinciden lo añadimos al carrito

            product = PRODUCTS[i];

            for (var j = 0; j < CART.length; j++) {

                console.log("Indice es " + j);

                if (CART[j]['id'] == item) {

                    console.log("AddToCart articulo encontrado . Param " + param);

                    if (CART[j].quantity < CART[j].stock_x_store) {

                        foundInCart = 1;

                        CART[j].quantity = CART[j].quantity + parseInt(param);
                        CART[j].store_quantity = CART[j].quantity;
                        CART.ammount = parseFloat((product.price_x_region[0].totalPrice * param)) + parseFloat(CART.ammount);

                        console.log('PRODUCTS[i][id] == item --> foundInCart = 1'); // TEMP !!

                        var precioArticulo = parseInt(CART[j].quantity) * parseFloat(product.price_x_region[0].totalPrice);

                        $("#labelPrecioTotalProducto" + CART[j].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));

                        displayItemOperations(CART[j].id, parseInt(CART[j].quantity), j);

                        //updateVariblesTiposDeProducto(product, (param > 0 ? true : false), foundInCart); //actulizamos variables del carrito para el pago.

                        calcularTotalStoreOnline(param);

                        updateOpcionCompraProducto();

                        if (CART[j].quantity == 0) // TEMP !!
                            deleteItemCart(j);

                        if (aux == true) {
                            setTimeout(function () {
                                displayPopupItemList();
                            }, 50);
                        }

                        break;

                    } else if (CART[j].quantity >= CART[j].stock_x_store && CART[j].stock_x_central_store > 0) { //no tenemos stock tienda añadimos stock online

                        console.log('El art. no tiene stcok tienda, añadimos stock online');

                        if ($(".ui-popup-active").length > 0) {
                            $('[data-role="popup"]').popup("close");
                        }

                        foundInCart = 1;
                        if (param < 0) {

                            if (CART[j].online_quantity > 0) {
                                CART[j].online_quantity = CART[j].online_quantity + param;
                            }

                            CART[j].quantity = CART[j].quantity + parseInt(param);
                            if (CART[j].quantity <= CART[j].stock_x_store) {
                                CART[j].store_quantity = CART[j].quantity;
                            }
                            CART.ammount = parseFloat((product.price_x_region[0].totalPrice * param)) + parseFloat(CART.ammount);

                            console.log('PRODUCTS[i][id] == item --> foundInCart = 1'); // TEMP !!

                            var precioArticulo = parseInt(CART[j].quantity) * parseFloat(product.price_x_region[0].totalPrice);

                            $("#labelPrecioTotalProducto" + CART[j].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));

                            displayItemOperations(CART[j].id, parseInt(CART[j].quantity), j);

                            //updateVariblesTiposDeProducto(product, (param > 0 ? true : false), foundInCart); //actulizamos variables del carrito para el pago.

                            calcularTotalStoreOnline();

                            updateOpcionCompraProducto();

                            if (CART[j].quantity == 0) // TEMP !!
                                deleteItemCart(j);

                            if (aux == true) {
                                setTimeout(function () {
                                    displayPopupItemList();
                                }, 50);
                            }

                            break;


                        } else {

                            if (CART[j].quantity == CART[j].stock_x_store) {

                                setTimeout(function () {
                                    $('#popupAlertProd').popup('open');
                                }, 50);

                                $("#btnPopupAlertRight").off("click").on('click', function () { //desactivamos y activamos para no duplicar eventos

                                    console.log("Hemos clicado en si");
                                    //console.log(CART[j]);

                                    CART[j].online_quantity = 1;
                                    CART[j].store_quantity = CART[j].quantity;
                                    CART[j].quantity = CART[j].quantity + 1;
                                    CART.ammount = parseFloat((product.price_x_region[0].totalPrice * param)) + parseFloat(CART.ammount);

                                    console.log("Hemos clicado en si, la cantidad es " + CART[j].quantity);

                                    var precioArticulo = parseInt(CART[j].quantity) * parseFloat(product.price_x_region[0].totalPrice);

                                    $("#labelPrecioTotalProducto" + CART[j].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));

                                    displayItemOperations(CART[j].id, CART[j].quantity);

                                    calcularTotalStoreOnline();

                                    updateOpcionCompraProducto();

                                    $('#popupAlertProd').popup('close');

                                    if (aux == true) {
                                        setTimeout(function () {
                                            displayPopupItemList();
                                        }, 50);
                                    }

                                });

                                $("#btnPopupAlertLeft").off("click").on('click', function () { //desactivamos y activamos para no duplicar eventos

                                    console.log("Hemos clicado en no");
                                    $('#popupAlertProd').popup('close');

                                });


                                break;

                            } else {

                                if (CART[j].stock_x_store == 0 && CART[j].online_quantity == undefined) {
                                    CART[j].online_quantity = 1;
                                }

                                if (CART[j].stock_x_central_store > CART[j].online_quantity) {

                                    //console.log(CART[j]);
                                    //anadirMasProd(CART[j], param);
                                    if (CART[j].online_quantity > 0) {
                                        CART[j].online_quantity = CART[j].online_quantity + param;
                                    }
                                    CART[j].quantity = CART[j].quantity + param;
                                    CART.ammount = parseFloat((product.price_x_region[0].totalPrice * param)) + parseFloat(CART.ammount);

                                    var precioArticulo = parseInt(CART[j].quantity) * parseFloat(product.price_x_region[0].totalPrice);

                                    $("#labelPrecioTotalProducto" + CART[j].id).text(jsonIdiomas.cajas.precio_total_label + formatoNumero(precioArticulo, 2, ",", ".", "€"));

                                    displayItemOperations(CART[j].id, CART[j].quantity);

                                    calcularTotalStoreOnline();

                                    updateOpcionCompraProducto();

                                    console.log("Hemos clicado en si, la cantidad es " + CART[j].quantity);

                                } else {

                                    foundInCart = 1;
                                    $.jAlert({
                                        'title': 'Alerta',
                                        'content': 'Lo sentimos, no hay más stock disponible.',
                                        'theme': 'gray',
                                        'size': 'xsm'
                                    });


                                }


                            }
                        }

                        if (aux == true) {
                            setTimeout(function () {
                                displayPopupItemList();
                            }, 50);
                        }
                        break;

                    } else if (CART[j].stock_x_store == 0 && CART[j].stock_x_central_store == 0) {

                        foundInCart = 1;
                        $.jAlert({
                            'title': 'Alerta',
                            'content': 'Lo sentimos, no hay más stock disponible.',
                            'theme': 'gray',
                            'size': 'xsm'
                        });

                    } else {

                        foundInCart = 1;
                        $.jAlert({
                            'title': 'Alerta',
                            'content': jsonIdiomas.alertas.sin_stock,
                            'theme': 'gray',
                            'size': 'xsm'
                        });

                    }
                }
            } //for
        } //if
    } //for

    //producto nuevo
    if (foundInCart == 0) { // --> develop deluxe !! -----------------------

        if (CART.ammount == undefined) {

            CART.ammount = 0;
            CART.precioTotalProductosTienda = 0;
            CART.productosSoloEnTienda = 0;
            CART.precioTotalProductosWeb = 0;
            CART.productosSoloEnWeb = 0;

            CART.productosEnTienda = 0;
            CART.productosSoloEnTienda = 0;
            CART.productosEnWeb = 0;
            CART.productosSoloEnWeb = 0;


            PRODUCTS.ammount = 0;
        }

        if (parseInt(param) > 1) {
            product.quantity = parseInt(param);
        } else {
            product.quantity = 1;
        }

        CART.ammount = (parseInt(product.quantity) * parseFloat(product.price_x_region[0].totalPrice)) + parseFloat(CART.ammount);
        PRODUCTS.ammount = CART.ammount;
        product.dedonde = nodeIds[nodeIds.length - 1];
        product.original = true; //este campo indica si el articulo ha sido sustituido o no

        product.store_quantity = product.quantity;

        if (product.stock_x_store > 0 && product.stock_x_central_store > 0) {
            product.store_quantity = product.quantity;
        }

        /*if(product.stock_x_store == 0 && product.stock_x_central_store > 0){
            product.online_quantity = param;
        }*/

        CART.push(product);

        //updateVariblesTiposDeProducto(product, (param > 0 ? true : false)); // TEMP !! actulizamos variables.

        calcularTotalStoreOnline();

        displayItemOperations(item, product.quantity);
    }


    updateOpcionCompraProducto();

    updatePrecioTotalArticulo(); // TEMP !!

    if (CART.length > 0) {
        $("#btn_finalizarpedido").show();
    }

    if (aux == true) {
        setTimeout(function () {
            displayPopupItemList();
        }, 250);
    }

}

/********************************************************************************************************************
  Esta funcion sirve para añadir o restar articulos al carrito del cliente y hacer los cambios en la interfaz grafica
  Parametros : 
  item: id del producto a guardar
  
*********************************************************************************************************************/

function addToCartAlter(id_prod_alter, id_produc) {

    console.log("Id por alter " + id_prod_alter + " id product " + id_produc);
    var product = {};
    var aux_prod;
    var cantidad;
    var foundInCart = 0;
    var units = units_alt = aux_carac = 0;
    var j, i;

    for (var i = 0; i < PRODUCTS_ALTER.length; i++) { //buscamos el producto alternativo

        if (PRODUCTS_ALTER[i].id == id_prod_alter) {

            product = PRODUCTS_ALTER[i];
            var count = PRODUCTS_ALTER[i].caracteristics.length;

            for (var l = 0; l < count; l++) {

                var caracteristicas = product.caracteristics[l];
                if (caracteristicas.type == "9") {

                    var unidades = caracteristicas.name;
                    units_alt = unidades.split(' ');
                    aux_carac = units_alt[0];
                    break;

                } else {

                    aux_carac = 1;
                    continue;

                }
            }
            i = PRODUCTS_ALTER.length;
            break;
        }
    }

    for (var j = 0; j < CART.length; j++) {

        console.log("buscando  " + id_produc + " en carrito " + CART[j]['id']);

        if (CART[j]['id'] == id_produc) {

            console.log("ENCONTRADO EN CARRITO " + j);
            console.log(CART[j]);

            foundInCart = 1;
            CART.ammount = parseFloat(CART.ammount) - (parseFloat(CART[j].quantity * CART[j].price_x_region[0].totalPrice));
            CART[j].quantity = 0;
            break;
        }
    }

    console.log("Antes de poner unidades");
    console.log(product);

    if (foundInCart == 1) { // se ha encontrado el producto en el carrito podemos sustituirlo

        if (parseInt(num_personas_fiesta) < parseInt(aux_carac)) {


            console.log("Cantidad unidades prod alternativo " + aux_carac);
            cantidad = 1;
            product.quantity = cantidad;
            product.original = false;
            product.dedonde = nodeIds[nodeIds.length - 1];
            product.store_quantity = cantidad;


            console.log("Vamos a cambiarlo ");
            console.log(product);


        } else {
            
            for (var k = 0; k < product.caracteristics.length; k++) {

                var caracteristicas = product.caracteristics[k];
                if (caracteristicas.type == "9") {

                    var unidades = caracteristicas.name;
                    units = unidades.split(' ');
                    console.log("Unidades " + units);
                    break;

                } else {

                    units = 1;
                    console.log("Unidades " + units);
                    break;

                }

            }
            
            cantidad = Math.ceil(parseInt(num_personas_fiesta) / parseInt(aux_carac));
            console.log("Cantidad prod alternativo " + cantidad + " unidades " + aux_carac);
            product.quantity = cantidad;
            product.store_quantity = product.quantity;
            product.original = false; //este campo indica si el articulo ha sido sustituido o no
            product.dedonde = nodeIds[nodeIds.length - 1];

        }

        calcularTotalStoreOnline();

        updateOpcionCompraProducto();


        //console.log(CART[j]);
        //var precio_new_art = parseInt(product.quantity) * parseInt(product.price_x_region[0].totalPrice);
        CART.push(product);

        CART.ammount = parseFloat(CART.ammount) + parseFloat(product.store_quantity * product.price_x_region[0].totalPrice);

        $("#spBtnPopupCartAmmount").text(formatoNumero(CART.ammount, 2, ",", ".", "€"));

        //PRODUCTS.push(product);
        //displayItemOperations(product.id, parseInt(product.quantity));

        updateCarritoDisplay();

        updateOpcionCompraProducto();

        updatePrecioTotalArticulo(); // TEMP !!

        refreshDisplayProducts(TEMP_PRODUCTS, product, id_produc);

    }

}

function deleteItemCart(position) { // develop 4

    console.log("Eliminar item en posicion " + position + " id: " + CART[position].id);
    $("#labelPrecioTotalProducto" + CART[position].id).text("");
    console.log("Eliminamos el " + CART[position]);

    /*if (CART[position].stock_x_store > 0) {
        productosEnTienda--;
    } else if (CART[position].stock_x_central_store > 0) {
        productosEnWeb--;
    }*/

    //updateVariblesTiposDeProducto( CART[position], false );

    updateOpcionCompraProducto(); // TEMP.

    displayItemOperations(CART[position].id, 0, position, "borrar"); //Al pasarle un 0 en el campo cantidad, lo que hacemos es borrarlo
}

/**
 *   Vacia el carrito de la compra y esconde los indicadores de cantidad.
 */
function vaciaCarrito() {

    for (var i = CART.length - 1; i >= 0; i--) { // TEMP !!
        //if (CART[i].dedonde == "Asistente fiestas") {
        //console.log("Borramos el item " + CART[i].id);

        //CART.ammount = CART.ammount - (CART[i].price_x_region[0].totalPrice * CART[i].quantity)
        deleteItemCart(i);
    }

    CART = [];

    //$("#spBtnAmountPerson").text(''); //TEMP
    $("#circuloCantidad").hide();
    $("#spBtnPopupCartAmmount").hide();
    $("#userIcoCarrito").hide();

    $("#btn_finalizarpedido").hide();

    $("#img_cesta").attr("src", "css/icons/cesta.png");
}

function closingPopUpWithVideos(tableName, popupNAme, vecIdsVideos) {
    //$("#masinfo").popup("close");
    $(popupNAme).popup("close");

    //console.group("closing videos %i", vecIdsVideos.length);

    for (i = 0; i < vecIdsVideos.length; i++) {
        //console.log("%i Closing video %s", i, vecIdsVideos[i]);

        $(vecIdsVideos[i]).hide();
        stopYoutubeVideo(vecIdsVideos[i]);
    }

    //console.groupEnd();

    $(tableName).show();
}

function stopYoutubeVideo(idOfIframe) {
    //First get the  iframe URL
    var url = $(idOfIframe).attr('src');

    //Then assign the src to null, this then stops the video been playing
    $(idOfIframe).attr('src', '');

    // Finally you reasign the URL back to your iframe, so when you hide and load it again you still have the link
    $(idOfIframe).attr('src', url);
}


function enviarSugerencia() {

    var sug_inci = $("select#suge_inci option").filter(":selected").val();
    if (sug_inci == undefined) {
        sug_inci = "incidencia";
    }
    var nombre = $("#nombre").val(); // Obligatorio
    var correo = $("#correo").val(); // Obligatorio

    var provincia = $("#provincia").val();
    var poblacion = $("#poblacion").val();

    var t_sugere = $("#tipo_sugenrencia").val(); // Obligatorio

    var telefono = $("#telf").val();
    var fecha_naci = $("#fecha_naci").val();

    var sugerencias = $("#sugerencias").val(); // Obligatorio

    console.log("Enviar sugenrencia. Nombre " + nombre + " Correo " + correo + " Provincia " + provincia + " poblacion " + poblacion + " telefono " + telefono + " fecha_naci " + fecha_naci + " sugerencia " + sugerencias);

    if (nombre != "") {
        if (correo != "") {
            if (revisarDireccionCorreo('correo')) {
                if (t_sugere != "") {
                    if (sugerencias != "") {

                        console.log("Llegamos hasta el final");

                        var info = {
                            name: nombre,
                            email: correo,
                            province: provincia,
                            city: poblacion,
                            phone: telefono,
                            birthday: fecha_naci,
                            about_sugg: t_sugere,
                            type_sugg: sug_inci,
                            suggestion: sugerencias
                        };

                        sendSugerencias(info);

                    } else {

                        $("#texto_popup").text("Escriba algo en el campo petición/sugerencia");
                        $('#popupAlert').popup('open');
                        //console.log("No has escrito la sugerencia1");

                    }

                } else {

                    $("#texto_popup").text("Escriba una sugerencia o incidencia");
                    $('#popupAlert').popup('open');
                    //console.log("No has escrito la sugerencia2");

                }
            } else {
                $("#texto_popup").text("Escriba una dirección de correo válida correcta");
                $('#popupAlert').popup('open');
                //console.log("No has escrito la sugerencia2");
            }
        } else {
            $("#texto_popup").text("Escriba un correo electronico");
            $('#popupAlert').popup('open');
            //console.log("No has escrito el correo electronico");
        }
    } else {
        $("#texto_popup").text("Escriba el nombre");
        $('#popupAlert').popup('open');
        //console.log("No has escrito el nombre");
    }

}