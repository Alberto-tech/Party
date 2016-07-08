function translateButtons(idioma) {

    switch (idioma) {

    case "en":

        jsonIdiomas = {
            "alertas": {
                "pan_inter_asis_fiestas": "Solo se permiten números",
                "form_imcompleto": "¡Faltan datos!",
                "error_login": "Usuario o contraseña incorrectos",
                "error_timeout": "Error de TimeOut... compruebe su conexion de internet",
                "error_ws": "Error ws",
                "error_usr": "El usuario ya existe",
                "select_tienda": "!Seleccione una tienda!",
                "sin_stock": "No hay mas productos en stock"
            },
            "inicio": {
                "labelInicio": "Seleccioneu una botiga:",
                "selectInicio": ""
            },
            "header": {
                "menu": "Menu",
                "login": "login!",
                "labelProductos": " Prod"
            },
            "menu_lateral": {
                "menu": "Go to menu"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "How many people will attend the party?",
                "btn_continuar": "NEXT",
                "btn_continuar_fiestas": "NEXT",
                "btn_añadir_prod": "Añadir"
            },
            "asistente_disfraces": {
                "select_sexo_button": "Who is the disguise?",
                "btn_continuar": "CONTINUE",
                "categoria": "Categorias"
            },
            "pagina_pago": {
                "envio_email": "Send email",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "select_sexo_button": "Who is the disguise?",
                "btn_continuar": "CONTINUE",
                "labelSugNom": "Name:",
                "labelSugNaci": "Birthdate:",
                "labelSugMail": "Email:",
                "labelSugNPob": "Population:",
                "labelSugTelf": "Phone number:",
                "labelSugProv": "Province:",
                "labelSugTipo": "Type suggestion:",
                "labelSugNSugPreg": "On what is the request / suggestion?",
                "sugerenciasPlaceholder": "Write them down here ...",
                "enviar_sugerencia": "Send!",
                "selectOption": "Incidence",
                "labelSugPreg": "Do you have any suggestions?"
            },
            "pop_checkOut": {
                "realizar_pedido": "Checkout"
            },
            "popup_errores": {
                "tituloPopUp": "Products in the cart",
                "tituloPopUpDisponiblesTienda": "Products available in store",
                "tituloPopUpDisponiblesWeb": "Products available on web",
                "tituloBoton": "Empty cart",
                "campo_vacio": "Fill in this field",
                "displayProductos": {
                    "isfiesta_3": "All selects ok",
                    "else": "Select a valid field to continue"
                },
                "evento_click": {
                    "cam_contraseña": "Type a password",
                    "enviar_registro": "Fill in all fields . Thank you",
                    "contra_nocoinciden": "Do not match",
                    "mail_no_valido": "Not a valid adress"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Item price: ",
                "unidades": "units"
            },
            "proceso_pago": {
                "tl_pregunta": "¿QUE QUIERE HACER CON SU PEDIDO?",
                "tl_pregunta_2": "¿QUE QUIERE HACER?",
                "tl_uno": "TODOS LOS ARTICULOS ESTAN DISPONIBLES",
                "tl_dos": "TANTO EN TIENDA COMO ONLINE",
                "tl_tres": "TIENE",
                "tl_quatro": "PRODUCTOS EN TIENDA",
                "tl_cinco": "PRODUCTOS ONLINE",
                "tl_seis": "PAGO EN CAJA Y RECOGER YO MISMO EN TIENDA",
                "tl_siete": "PEDIDO ONLINE",
                "tl_ocho": "COMPRAR SOLO LO DISPONIBLE EN TIENDA",
                "tl_nueve": "COMPRAR ONLINE(TODO EL PEDIDO)",
                "tl_diez": "RECOGER LO DISPONIBLE EN TIENDA Y EL RESTO ONLINE",
                "tl_once": "PEDIDO ONLINE(TODO EL PEDIDO)",
                "tl_doce": "ENVIO A DOMICILIO 48H",
                "tl_trece": "CLICK AND COLLECT 48H",
                "tl_catorce": "OPCIONES DE PAGO",
                "tl_quince": "PAGAR EN CAJA",
                "tl_diezyseis": "Ya puede pasar a pagar su pedido en caja.Identifíquese con su nombre."
            },
            "pt_inter_pago_login": {
                "titulo": "INFO USUARIO",
                "Identificarse": "Identificarse",
                "Registrarse": "Registrarse",
            },
            "reg_pant_pedido": {
                "tl_uno": "registro usuario",
                "email": "email",
                "rep_email": "repetir email",
                "contra": "contraseña",
                "rep_contra": "repetir contraseña",
                "direcc": "Dirección",
                "nombre": "Nombre",
                "apellido": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "continuar": "Continuar"
            },
            "dir_facturacion": {
                "tl_direccion": "Dirección",
                "sel_dir_fac_envio": "Dirección de entrega y facturación coinciden",
                "nombre": "Nombre",
                "apellidos": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "tl_dir_fac": "Dirección de Facturación",
                "continuar": "Continuar",
                "cancelar": "Cancelar pedido"
            },
            "pan_pago_tienda": {
                "tl_tienda": "¿Que deseas hacer con el pedido?",
                "imprimir": "Imprimir en tienda",
                "envio_email": "Enviar correo",
                "cancelar": "Cancelar pedido"
            },
            "exclusivoWeb": "EXCLUSIVE WEB!",
            "soloEnWeb": "ONLY WEB",
            "btn_finalizar_pedido": "Finalizar pedido",
            "btn_paypal": "PAGAR POR PAYPAL",
            "pago_caja": "PAGO EN CAJA"

        }

        //pagina de inicio  
        $('#btn_acceder').text('Access');
        $('#labelInicio').text('Select a store:');
        $('#labelCargando').text('Loading...');

        //header    
        $('#labelCarrito').text('Tú carrito');
        $('#labelItems').text('Artículos');

        //popup login
        $('#labelIniciarSession').text('Log in');
        $('#labelLoginUsuario').text('User');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Password');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Login');
        $('#registrarse').text('Singup');
        $('#olviContra').text('¿Has olvidado la contraseña?');


        //popup cambio de pass
        $('#tituloCamContra').text('Forgot your password?');
        $('#labelSuUsuario').text('Username');
        $('#cam_contraseña').text('Request a new password!');
        $('#volver').text('Back');

        //pop up registro
        $('#labelRegistrarse').text("Sign up");
        $('#usernamesignup').text("User");
        $('#emailsignup').attr("placeholder", 'Ex. myemail@email.com');
        $('#labelpasswordsignup').text("Password");
        $('#passwordsignup').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirm password");
        $('#passwordsignup_confirm').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelcodpos').text("Postal Code");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Create account");
        $('#labelYAesClient').text("Already a customer?");
        $('#linkIniSes').text("Login");
        var avisoText = "He leído y acepto el ";
        var avisoLink = "Aviso legal";
        $('#aviso_legal').html(avisoText + '<a id="link_aviso_legal" href="http://www.partyfiesta.com/es/ayuda/aviso-legal" target="_blank">' + avisoLink + '</a>');

        break;

    case "es":

        jsonIdiomas = {
            "alertas": {
                "pan_inter_asis_fiestas": "Solo se permiten números",
                "form_imcompleto": "¡Faltan datos!",
                "error_login": "Usuario o contraseña incorrectos",
                "error_timeout": "Error de TimeOut... compruebe su conexion de internet",
                "error_ws": "Error ws",
                "error_usr": "El usuario ya existe",
                "select_tienda": "!Seleccione una tienda!",
                "sin_stock": "No hay mas productos en stock"

            },
            "inicio": {
                "labelInicio": "Seleccione una tienda:",
                "selectInicio": ""
            },
            "header": {
                "menu": "Menú",
                "login": "identificarse!",
                "labelProductos": " Prod"
            },
            "menu_lateral": {
                "menu": "Ir al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Cuantas personas asistirán a la fiesta?",
                "btn_continuar": "CONTINUAR",
                "btn_continuar_fiestas": "CONTINUAR",
                "btn_añadir_prod": "Añadir"
            },
            "pagina_pago": {
                "envio_email": "Enviar lista por email",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre:",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidencia",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "asistente_disfraces": {
                "select_sexo_button": "¿Para quién es el disfraz?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Que talla tiene?",
                "categoria": "Categorias"
            },
            "pop_checkOut": {
                "realizar_pedido": "Realizar pedido"
            },
            "popup_errores": {
                "labelCargando": "Cargando...",
                "tituloPopUp": "Productos en la cesta",
                "tituloPopUpDisponiblesTienda": "Productos disponibles en tienda",
                "tituloPopUpDisponiblesWeb": "Productos disponibles en web",
                "tituloBoton": "Vaciar carro",
                "campo_vacio": "Rellene este campo",
                "displayProductos": {
                    "isfiesta_3": "Todos los selects ok",
                    "else": "Seleccione un campo valido para poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Escriba una contraseña",
                    "enviar_registro": "Rellene todos los campos. Gracias",
                    "contra_nocoinciden": "No coinciden",
                    "mail_no_valido": "Dirección no válida"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total artículo: ",
                "unidades": "unidad"
            },
            "proceso_pago": {
                "tl_pregunta": "¿QUE QUIERE HACER CON SU PEDIDO?",
                "tl_pregunta_2": "¿QUE QUIERE HACER?",
                "tl_uno": "TODOS LOS ARTICULOS ESTAN DISPONIBLES",
                "tl_dos": "TANTO EN TIENDA COMO ONLINE",
                "tl_tres": "TIENE",
                "tl_quatro": "PRODUCTOS EN TIENDA",
                "tl_cinco": "PRODUCTOS ONLINE",
                "tl_seis": "PAGO EN CAJA Y RECOGER YO MISMO EN TIENDA",
                "tl_siete": "PEDIDO ONLINE",
                "tl_ocho": "COMPRAR SOLO LO DISPONIBLE EN TIENDA",
                "tl_nueve": "COMPRAR ONLINE(TODO EL PEDIDO)",
                "tl_diez": "RECOGER LO DISPONIBLE EN TIENDA Y EL RESTO ONLINE",
                "tl_once": "PEDIDO ONLINE(TODO EL PEDIDO)",
                "tl_doce": "ENVIO A DOMICILIO 48H",
                "tl_trece": "CLICK AND COLLECT 48H",
                "tl_catorce": "OPCIONES DE PAGO",
                "tl_quince": "PAGAR EN CAJA",
                "tl_diezyseis": "Ya puede pasar a pagar su pedido en caja.Identifíquese con su nombre."
            },
            "pt_inter_pago_login": {
                "titulo": "INFO USUARIO",
                "Identificarse": "Identificarse",
                "Registrarse": "Registrarse",
            },
            "reg_pant_pedido": {
                "tl_uno": "registro usuario",
                "email": "email",
                "rep_email": "repetir email",
                "contra": "contraseña",
                "rep_contra": "repetir contraseña",
                "direcc": "Dirección",
                "nombre": "Nombre",
                "apellido": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "continuar": "Continuar"
            },
            "dir_facturacion": {
                "tl_direccion": "Dirección",
                "sel_dir_fac_envio": "Dirección de entrega y facturación coinciden",
                "nombre": "Nombre",
                "apellidos": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "tl_dir_fac": "Dirección de Facturación",
                "continuar": "Continuar",
                "cancelar": "Cancelar pedido"
            },
            "pan_pago_tienda": {
                "tl_tienda": "¿Que deseas hacer con el pedido?",
                "imprimir": "Imprimir en tienda",
                "envio_email": "Enviar correo",
                "cancelar": "Cancelar pedido"
            },
            "exclusivoWeb": "EXCLUSIVO WEB!",
            "soloEnWeb": "SOLO WEB",
            "btn_finalizar_pedido": "Finalizar pedido",
            "btn_paypal": "PAGAR POR PAYPAL",
            "pago_caja": "PAGO EN CAJA"
        }

        //pagina de inicio    
        $('#btn_acceder').text('Acceder');
        $('#labelInicio').text('Seleccione una tienda:');
        $('#labelCargando').text('Cargando...');

        //header 
        $('#labelCarrito').text('Your cart');
        $('#labelItems').text('Items');

        //popup login    
        $('#labelIniciarSession').text('Iniciar sessión');
        $('#labelLoginUsuario').text('Usuario');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Contraseña');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Iniciar session');
        $('#registrarse').text('Registrarse');
        $('#olviContra').text('¿Has olvidado la contraseña?');

        //popup cambio de pass
        $('#tituloCamContra').text('Cambio de contraseña');
        $('#labelSuUsuario').text('Su usuario');
        $('#cam_contraseña').text('¡Pedir una nueva contraseña!');
        $('#volver').text('Volver');

        //pop up registro
        $('#labelRegistrarse').text("Registrarse");
        $('#usernamesignup').text("Usuario");
        $('#emailsignup').attr("placeholder", 'Ej. myemail@email.com');
        $('#labelpasswordsignup').text("Contraseña");
        $('#passwordsignup').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contraseña");
        $('#passwordsignup_confirm').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelcodpos').text("Código postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crear cuenta");
        $('#labelYAesClient').text("¿Ya es cliente?");
        $('#linkIniSes').text("Iniciar sessión");
        var avisoText = "He leído y acepto el ";
        var avisoLink = "Aviso legal";
        $('#aviso_legal').html(avisoText + '<a id="link_aviso_legal" href="http://www.partyfiesta.com/es/ayuda/aviso-legal" target="_blank">' + avisoLink + '</a>');

        break;

    case "ca":

        jsonIdiomas = {
            "alertas": {
                "pan_inter_asis_fiestas": "Únicament es permeten números",
                "form_imcompleto": "¡Falten dades!",
                "error_login": "Usuari o contrasenya incorrecte",
                "error_timeout": "Temps excedit... comprovi conexió Internet",
                "error_ws": "Error ws",
                "error_usr": "L'usuari ja existeix",
                "select_tienda": "!Seleccioneu una tenda!",
                "sin_stock": "No hi ha més productes en stock"

            },
            "inicio": {
                "labelInicio": "Seleccioneu una botiga:",
                "selectInicio": ""
            },
            "header": {
                "menu": "Menú",
                "login": "identificar-se!",
                "labelProductos": " Prod",
            },
            "menu_lateral": {
                "menu": "Tornar al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Quantes persones assistiran a la festa?",
                "btn_continuar": "CONTINUAR",
                "btn_continuar_fiestas": "CONTINUAR",
                "btn_añadir_prod": "Afegir"
            },
            "pagina_pago": {
                "envio_email": "Enviar lista per correu",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "labelSugNom": "Nom:",
                "labelSugNaci": "Data de naixement:",
                "labelSugMail": "Correu electrònic:",
                "labelSugNPob": "Població:",
                "labelSugTelf": "Telèfon:",
                "labelSugProv": "Província:",
                "labelSugTipo": "Tipus de suggeriment:",
                "labelSugNSugPreg": "Sobre que és la petició / suggeriment?",
                "sugerenciasPlaceholder": "Escriviu aquí ...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidència",
                "labelSugPreg": "Té algun suggeriment?"
            },
            "asistente_disfraces": {
                "select_sexo_button": "Per a qui és la disfressa?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Quina talla té?",
                "categoria": "Categories"
            },
            "form_sugerencias": {
                "labelSugNom": "Nom:",
                "labelSugNaci": "Data de naixement:",
                "labelSugMail": "Correu electrònic:",
                "labelSugNPob": "Població:",
                "labelSugTelf": "Telèfon:",
                "labelSugProv": "Província:",
                "labelSugTipo": "Tipus de suggeriment:",
                "labelSugNSugPreg": "Sobre que és la petició / suggeriment?",
                "sugerenciasPlaceholder": "Escriviu aquí ...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidència",
                "labelSugPreg": "Té algun suggeriment?"
            },
            "pop_checkOut": {
                "realizar_pedido": "Fer la comanda"
            },
            "popup_errores": {
                "labelCargando": "Carregant...",
                "tituloPopUp": "Productes en la cistella",
                "tituloPopUpDisponiblesTienda": "Productes disponibles en tenda",
                "tituloPopUpDisponiblesWeb": "Productes disponibles a la web",
                "tituloBoton": "Buidar carro",
                "campo_vacio": "Ompli aquest camp",
                "displayProductos": {
                    "isfiesta_3": "Tots els selects ok",
                    "else": "Seleccioni un camp valid per poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Introduïu una contrasenya",
                    "enviar_registro": "Ompli tots els camps . Gràcies",
                    "contra_nocoinciden": "No coincideixen",
                    "mail_no_valido": "Adreça no vàlida"
                },
                "opcion_no_valida": "Seleccioneu una opció vàlida"
            },
            "popup_info_item": {
                "alternativos": "Productes alternatius",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total article: ",
                "unidades": "unitats"
            },
            "proceso_pago": {
                "tl_pregunta": "QUE VOL FER AMB LA SEVA COMANDA?",
                "tl_pregunta_2": "QUE VOL FER?",
                "tl_uno": "TOTS ELS ARTICLES ESTAN DISPONIBLES",
                "tl_dos": "TANT EN BOTIGA COM EN WEB",
                "tl_tres": "TÉ ",
                "tl_quatro": "PRODUCTES EN BOTIGA",
                "tl_cinco": "PRODUCTOS ONLINE",
                "tl_seis": "RECOLLIR JO MATEIX A LA TENDA I PAGAMENT EN CAIXA",
                "tl_siete": "DEMANAR ONLINE",
                "tl_ocho": "COMPRAR NOMÉS EL DISPONIBLE A LA TENDA",
                "tl_nueve": "COMPRAR ONLINE(TOTA LA COMANDA)",
                "tl_diez": "RECOLLIR LO DISPONIBLE A LA TIENDA I LA RESTA ONLINE",
                "tl_once": "COMANDA ONLINE(TOTA LA COMANDA)",
                "tl_doce": "ENVIAMENT A DOMICILI 48H",
                "tl_trece": "CLICK AND COLLECT 48H",
                "tl_catorce": "OPCIONS DE PAGAMENT",
                "tl_quince": "PAGAR A CAIXA",
                "tl_diezyseis": "Ja pot passar a pagar la seva comanda a caja. Identifiquis amb el teu nom."
            },
            "pt_inter_pago_login": {
                "titulo": "INFO USUARI",
                "Identificarse": "Identificar-se",
                "Registrarse": "Registrar-se",
            },
            "reg_pant_pedido": {
                "tl_uno": "Registre usuari",
                "email": "email",
                "rep_email": "repetir email",
                "contra": "contrasenya",
                "rep_contra": "repetir contrasenya",
                "direcc": "Direcció",
                "nombre": "Nom",
                "apellido": "Cognoms",
                "telf": "telèfon",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Codi postal",
                "ciudad": "Ciutat",
                "pais": "País",
                "prov": "província",
                "continuar": "Continuar"
            },
            "dir_facturacion": {
                "tl_direccion": "Direcció",
                "sel_dir_fac_envio": "Direcció de lliurament i facturació coincideixen",
                "nombre": "Nom",
                "apellidos": "Cognom",
                "telf": "telèfon",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "tl_dir_fac": "Direcció de Facturació",
                "continuar": "Continuar",
                "cancelar": "Cancelar comanda"
            },
            "pan_pago_tienda": {
                "tl_tienda": "Que vols fer amb la comanda?",
                "imprimir": "Imprimir en tenda",
                "envio_email": "Enviar correu",
                "cancelar": "Cancelar comanda"
            },
            "exclusivoWeb": "EXCLUSIU WEB!",
            "soloEnWeb": "UNICAMENT WEB",
            "btn_finalizar_pedido": "finalitzar comanda",
            "btn_paypal": "PAGAR PAYPAL",
            "pago_caja": "PAGAMENT EN CAIXA"

        }

        //pagina de inicio    
        $('#btn_acceder').text('Accedir');
        $('#labelInicio').text('Seleccioneu una botiga:');
        $('#labelCargando').text('Carregant...');

        //header 
        $('#labelCarrito').text('La cistella');
        $('#labelItems').text('Articles');

        //popup login    
        $('#labelIniciarSession').text('Inicia sessió');
        $('#labelLoginUsuario').text('Usuari');
        $('#usrnm').attr("placeholder", 'Correu');
        $('#labelLoginContra').text('Contrasenya');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Inicia sessió');
        $('#registrarse').text('Registrar');
        $('#olviContra').text('¿Ha oblidat la contrasenya?');

        //popup cambio de pass
        $('#tituloCamContra').text('Canvi de contrasenya');
        $('#labelSuUsuario').text('El seu usuari');
        $('#cam_contraseña').text('¡Demanar una nova contrasenya!');
        $('#volver').text('Tornar');

        //pop up registro
        $('#labelRegistrarse').text("Registra't");
        $('#usernamesignup').text("Usuari");
        $('#emailsignup').attr("placeholder", 'Ex. myemail@email.com');
        $('#labelpasswordsignup').text("Contrasenya");
        $('#passwordsignup').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contrasenya");
        $('#passwordsignup_confirm').attr("placeholder", 'Ex. X8df!90EO');
        $('#labelcodpos').text("Codi postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crea un compte");
        $('#labelYAesClient').text("Ja és client?");
        $('#linkIniSes').text("Inicia sessió");
        var avisoText = "He leído y acepto el ";
        var avisoLink = "Aviso legal";
        $('#aviso_legal').html(avisoText + '<a id="link_aviso_legal" href="http://www.partyfiesta.com/es/ayuda/aviso-legal" target="_blank">' + avisoLink + '</a>');


        break;

    case "pr":

        jsonIdiomas = {
            "alertas": {
                "pan_inter_asis_fiestas": "Solo se permiten números",
                "form_imcompleto": "¡Faltan datos!",
                "error_login": "Usuario o contraseña incorrectos",
                "error_timeout": "Error de TimeOut... compruebe su conexion de internet",
                "error_ws": "Error ws",
                "error_usr": "El usuario ya existe",
                "select_tienda": "!Seleccione una tienda!",
                "sin_stock": "No hay mas productos en stock"

            },
            "inicio": {
                "labelInicio": "Seleccioneu una botiga:",
                "selectInicio": ""
            },
            "header": {
                "menu": "Menu",
                "login": "login!",
                "labelProductos": " Prod"
            },
            "menu_lateral": {
                "menu": "Ir al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Cuantas personas asistirán a la fiesta?",
                "btn_continuar": "CONTINUAR",
                "btn_continuar_fiestas": "CONTINUAR",
                "btn_añadir_prod": "Añadir"
            },
            "pagina_pago": {
                "envio_email": "Enviar correo",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre:",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidencia",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "asistente_disfraces": {
                "select_sexo_button": "¿Para quién es el disfraz?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Que talla tiene?"
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidència",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "pop_checkOut": {
                "realizar_pedido": "Checkout"
            },
            "popup_errores": {
                "campo_vacio": "Rellene este campo",
                "displayProductos": {
                    "isfiesta_3": "Todos los selects ok",
                    "else": "Seleccione un campo valido para poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Escriba una contraseña",
                    "enviar_registro": "Rellene todos los campos. Gracias",
                    "contra_nocoinciden": "No coinciden",
                    "mail_no_valido": "Dirección no válida"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total artículo: ",
                "unidades": "unidad"
            },
            "proceso_pago": {
                "tl_pregunta": "¿QUE QUIERE HACER CON SU PEDIDO?",
                "tl_pregunta_2": "¿QUE QUIERE HACER?",
                "tl_uno": "TODOS LOS ARTICULOS ESTAN DISPONIBLES",
                "tl_dos": "TANTO EN TIENDA COMO ONLINE",
                "tl_tres": "TIENE",
                "tl_quatro": "PRODUCTOS EN TIENDA",
                "tl_cinco": "PRODUCTOS ONLINE",
                "tl_seis": "PAGO EN CAJA Y RECOGER YO MISMO EN TIENDA",
                "tl_siete": "PEDIDO ONLINE",
                "tl_ocho": "COMPRAR SOLO LO DISPONIBLE EN TIENDA",
                "tl_nueve": "COMPRAR ONLINE(TODO EL PEDIDO)",
                "tl_diez": "RECOGER LO DISPONIBLE EN TIENDA Y EL RESTO ONLINE",
                "tl_once": "PEDIDO ONLINE(TODO EL PEDIDO)",
                "tl_doce": "ENVIO A DOMICILIO 48H",
                "tl_trece": "CLICK AND COLLECT 48H",
                "tl_catorce": "OPCIONES DE PAGO",
                "tl_quince": "PAGAR EN CAJA",
                "tl_diezyseis": "Ya puede pasar a pagar su pedido en caja.Identifíquese con su nombre."
            },
            "pt_inter_pago_login": {
                "titulo": "INFO USUARIO",
                "Identificarse": "Identificarse",
                "Registrarse": "Registrarse",
            },
            "reg_pant_pedido": {
                "tl_uno": "registro usuario",
                "email": "email",
                "rep_email": "repetir email",
                "contra": "contraseña",
                "rep_contra": "repetir contraseña",
                "direcc": "Dirección",
                "nombre": "Nombre",
                "apellido": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "continuar": "Continuar"
            },
            "dir_facturacion": {
                "tl_direccion": "Dirección",
                "sel_dir_fac_envio": "Dirección de entrega y facturación coinciden",
                "nombre": "Nombre",
                "apellidos": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "tl_dir_fac": "Dirección de Facturación",
                "continuar": "Continuar",
                "cancelar": "Cancelar pedido"
            },
            "pan_pago_tienda": {
                "tl_tienda": "¿Que deseas hacer con el pedido?",
                "imprimir": "Imprimir en tienda",
                "envio_email": "Enviar correo",
                "cancelar": "Cancelar pedido"
            },
            "exclusivoWeb": "EXCLUSIVE WEB!",
            "soloEnWeb": "Només WEB",
            "btn_finalizar_pedido": "Finalizar pedido",
            "btn_paypal": "PAGAR POR PAYPAL",
            "pago_caja": "PAGO EN CAJA"
        }

        //pagina de inicio    
        $('#btn_acceder').text('Acceder');
        $('#labelInicio').text('Select a store:');
        $('#labelCargando').text('Loading...');

        //header 
        $('#labelCarrito').text('Tú carrito');
        $('#labelItems').text('Artículos');

        //popup login    
        $('#labelIniciarSession').text('Iniciar sessión');
        $('#labelLoginUsuario').text('Usuario');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Contraseña');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Iniciar session');
        $('#registrarse').text('Registrarse');
        $('#olviContra').text('¿Has olvidado la contraseña?');

        //popup cambio de pass
        $('#tituloCamContra').text('Cambio de contraseña');
        $('#labelSuUsuario').text('Su usuario');
        $('#cam_contraseña').text('¡Pedir una nueva contraseña!');
        $('#volver').text('Volver');

        //pop up registro
        $('#labelRegistrarse').text("Registrarse");
        $('#usernamesignup').text("Usuario");
        $('#emailsignup').attr("placeholder", 'Ej. myemail@email.com');
        $('#labelpasswordsignup').text("Contraseña");
        $('#passwordsignup').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contraseña");
        $('#passwordsignup_confirm').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelcodpos').text("Código postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crear cuenta");
        $('#labelYAesClient').text("¿Ya es cliente?");
        $('#linkIniSes').text("Iniciar sessión");
        var avisoText = "He leído y acepto el ";
        var avisoLink = "Aviso legal";
        $('#aviso_legal').html(avisoText + '<a id="link_aviso_legal" href="http://www.partyfiesta.com/es/ayuda/aviso-legal" target="_blank">' + avisoLink + '</a>');

        break;

    case "fr":

        jsonIdiomas = {
            "alertas": {
                "pan_inter_asis_fiestas": "Solo se permiten números",
                "form_imcompleto": "¡Faltan datos!",
                "error_login": "Usuario o contraseña incorrectos",
                "error_timeout": "Error de TimeOut... compruebe su conexion de internet",
                "error_ws": "Error ws",
                "error_usr": "El usuario ya existe",
                "select_tienda": "!Seleccione una tienda!",
                "sin_stock": "No hay mas productos en stock"

            },
            "inicio": {
                "labelInicio": "Seleccioneu una botiga:",
                "selectInicio": ""
            },
            "header": {
                "menu": "Menu",
                "login": "login!",
                "labelProductos": " Prod"
            },
            "menu_lateral": {
                "menu": "Ir al Menú"
            },
            "asistente_fiestas": {
                "label_num_per_fiesta": "¿Cuantas personas asistirán a la fiesta?",
                "btn_continuar": "CONTINUAR",
                "btn_continuar_fiestas": "CONTINUAR",
                "btn_añadir_prod": "Añadir"
            },
            "pagina_pago": {
                "envio_email": "Enviar correo",
                "envio_casa": ""
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre:",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "selectOption": "Incidencia",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "asistente_disfraces": {
                "select_sexo_button": "¿Para quién es el disfraz?",
                "btn_continuar": "CONTINUAR",
                "talla": "¿Que talla tiene?"
            },
            "form_sugerencias": {
                "labelSugNom": "Nombre",
                "labelSugNaci": "Fecha de nacimiento:",
                "labelSugMail": "Correo electrónico:",
                "labelSugNPob": "Población:",
                "labelSugTelf": "Teléfono:",
                "labelSugProv": "Provincia:",
                "labelSugTipo": "Tipo de sugerencia:",
                "labelSugNSugPreg": "¿Sobre que es la petición/sugerencia?",
                "sugerenciasPlaceholder": "Escríbalas aquí...",
                "enviar_sugerencia": "¡Enviar!",
                "labelSugPreg": "¿Tiene alguna sugerencia?"
            },
            "popup_errores": {
                "campo_vacio": "Rellene este campo",
                "displayProductos": {
                    "isfiesta_3": "Todos los selects ok",
                    "else": "Seleccione un campo valido para poder continuar"
                },
                "evento_click": {
                    "cam_contraseña": "Escriba una contraseña",
                    "enviar_registro": "Rellene todos los campos. Gracias",
                    "contra_nocoinciden": "No coinciden",
                    "mail_no_valido": "Dirección no válida"
                },
                "opcion_no_valida": "Seleccione una opcion válida"
            },
            "popup_info_item": {
                "alternativos": "Productos alternativos",
                "campo_vacio": "Fill in this field"
            },
            "cajas": {
                "precio_total_label": "Total artículo: ",
                "unidades": "unidad"
            },
            "proceso_pago": {
                "tl_pregunta": "¿QUE QUIERE HACER CON SU PEDIDO?",
                "tl_pregunta_2": "¿QUE QUIERE HACER?",
                "tl_uno": "TODOS LOS ARTICULOS ESTAN DISPONIBLES",
                "tl_dos": "TANTO EN TIENDA COMO ONLINE",
                "tl_tres": "TIENE",
                "tl_quatro": "PRODUCTOS EN TIENDA",
                "tl_cinco": "PRODUCTOS ONLINE",
                "tl_seis": "PAGO EN CAJA Y RECOGER YO MISMO EN TIENDA",
                "tl_siete": "PEDIDO ONLINE",
                "tl_ocho": "COMPRAR SOLO LO DISPONIBLE EN TIENDA",
                "tl_nueve": "COMPRAR ONLINE(TODO EL PEDIDO)",
                "tl_diez": "RECOGER LO DISPONIBLE EN TIENDA Y EL RESTO ONLINE",
                "tl_once": "PEDIDO ONLINE(TODO EL PEDIDO)",
                "tl_doce": "ENVIO A DOMICILIO 48H",
                "tl_trece": "CLICK AND COLLECT 48H",
                "tl_catorce": "OPCIONES DE PAGO",
                "tl_quince": "PAGAR EN CAJA",
                "tl_diezyseis": "Ya puede pasar a pagar su pedido en caja.Identifíquese con su nombre."
            },
            "pt_inter_pago_login": {
                "titulo": "INFO USUARIO",
                "Identificarse": "Identificarse",
                "Registrarse": "Registrarse",
            },
            "reg_pant_pedido": {
                "tl_uno": "registro usuario",
                "email": "email",
                "rep_email": "repetir email",
                "contra": "contraseña",
                "rep_contra": "repetir contraseña",
                "direcc": "Dirección",
                "nombre": "Nombre",
                "apellido": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "continuar": "Continuar"
            },
            "dir_facturacion": {
                "tl_direccion": "Dirección",
                "sel_dir_fac_envio": "Dirección de entrega y facturación coinciden",
                "nombre": "Nombre",
                "apellidos": "Apellidos",
                "telf": "Tel&eacute;fono",
                "dni": "DNI/CIF",
                "numero": "Número",
                "codPos": "Código postal",
                "ciudad": "Ciudad",
                "pais": "País",
                "prov": "Provincia",
                "tl_dir_fac": "Dirección de Facturación",
                "continuar": "Continuar",
                "cancelar": "Cancelar pedido"
            },
            "pan_pago_tienda": {
                "tl_tienda": "¿Que deseas hacer con el pedido?",
                "imprimir": "Imprimir en tienda",
                "envio_email": "Enviar correo",
                "cancelar": "Cancelar pedido"
            },
            "exclusivoWeb": "EXCLUSIVE WEB!",
            "soloEnWeb": "ONLY WEB",
            "btn_finalizar_pedido": "Finalizar pedido",
            "btn_paypal": "PAGAR POR PAYPAL",
            "pago_caja": "PAGO EN CAJA"
        }

        //pagina de inicio    
        $('#btn_acceder').text('Acceder');
        $('#labelInicio').text('Select a store:');
        $('#labelCargando').text('Loading...');

        //header 
        $('#login').text('identificarse!');
        $('#labelProductos').text(' Prod');
        $('#labelCargando').text('Chargement...');

        //popup login    
        $('#labelIniciarSession').text('Iniciar sessión');
        $('#labelLoginUsuario').text('Usuario');
        $('#usrnm').attr("placeholder", 'Email');
        $('#labelLoginContra').text('Contraseña');
        $('#pswd').attr("placeholder", '');
        $('#iniciar_session').text('Iniciar session');
        $('#registrarse').text('Registrarse');
        $('#olviContra').text('¿Has olvidado la contraseña?');

        //popup cambio de pass
        $('#tituloCamContra').text('Cambio de contraseña');
        $('#labelSuUsuario').text('Su usuario');
        $('#cam_contraseña').text('¡Pedir una nueva contraseña!');
        $('#volver').text('Volver');

        //pop up registro
        $('#labelRegistrarse').text("Registrarse");
        $('#usernamesignup').text("Usuario");
        $('#emailsignup').attr("placeholder", 'Ej. myemail@email.com');
        $('#labelpasswordsignup').text("Contraseña");
        $('#passwordsignup').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelpasswordsignup_confirm').text("Confirmar contraseña");
        $('#passwordsignup_confirm').attr("placeholder", 'Ej. X8df!90EO');
        $('#labelcodpos').text("Código postal");
        $('#cod_pos').attr("placeholder", '08041');
        $('#enviar_registro').text("Crear cuenta");
        $('#labelYAesClient').text("¿Ya es cliente?");
        $('#linkIniSes').text("Iniciar sessión");
        var avisoText = "He leído y acepto el ";
        var avisoLink = "Aviso legal";
        $('#aviso_legal').html(avisoText + '<a id="link_aviso_legal" href="http://www.partyfiesta.com/es/ayuda/aviso-legal" target="_blank">' + avisoLink + '</a>');


        break;


    }


}