// AQUI VAN DEFINIDAS LAS VARIABLES QUE SE USARÁN MAS DE UNA VEZ EN MÁS DE UN FICHERO
//var urlServices = "http://partyfiesta.youtter.com/webservices/"; // URL del servidor de Webservices fuera de creapolis
var urlServices = "http://partyfiesta-prod.youtter.com/webservices/"; // URL del servidor de Webservices
var request;
var language = 2; // El idioma de la aplicación por defecto demomento CATALAN
var origin = 2; // Dispositivo desde el que se solicita la información al service: 1 Web, 2 App
var nodeNames = [];
var nodeIds = [];
var nodeImg = [];
var TIENDAS = [];
var PROVINCIAS = [];
var PAISES = [];
var W_WIDTH = "";
var W_HEIGTH = "";
var STORE = "";
var SHOPDELIVERY = "";
var ISFIESTA = "";
var INFO_USU = [];
var PRODUCTS = [];
var TEMP_PRODUCTS = [];
var PRODUCTS_ALTER = [];
var CART = [];
var CARRITO = [];
var node_cero = [];
var LOGGED = false;
var REDIRECT = false;
var popupTimeout = 150;
var idleTime = 180000; /// tiempo de inactividad
var idleTimeActive = false;
var idiomStore;
var protector;
var jsonIdiomas;
var pantallaActual;
var AUX = ""; //
var LINKINT = "";
var EMAIL_USER = "";
var COLUMS = "";
var ID_NODE = "";
var ID_ORDER = 0;
var ID_BASKET = 0;
var SHOPS = [];
var PAGADO = "";
var SIZE = "";
var INFO_AUX = [];
var num_personas_fiesta = "";
var PAGINA = 0; //pagina donde nos quedamos en la paginacion del catalogo
var POS_GRID = ""; //guardamos la posicion donde nos quedamos en la recarga de articulos del catalogo para poder la paginacion 
var opcionEnvio = 0;
var opcionCompraProductos = 1; // Opción en que nos encontramos en función de la disponibilidad de productos en tienda y online
var SEND_INFO = []; //se guarda la info de los dos tipos de envio
var PRECIOSENVIO = {};
var OPCIONPEDIDO = 0;
var OPCIONENVIO = 0;
var OPCIONENTREGA = "";
var OPCIONSELECTED = "";
//var productosEnTienda = 0;  // Número de productos disponibles en tienda del pedido actual
//var productosEnWeb = 0;     // Número de productos disponibles online del pedido actual
//var precioTotalProductosTienda = 0;     // Precio total de los productos disponibles en tienda
//var precioTotalProductosWeb = 0;        // Precio total de los productos disponibles en web