<?php

echo "hola<br>";

$email = $_GET['email'];

if(empty($email) != true){
    
    $correo = $email;

}else{
    
    //echo "No hemos recibido nada<br>";

}

?>

    <html>

    <head>
        <title>Party Fiesta</title>

        <script src="lib/jquery-2.1.4.min.js"></script>
        <script src="lib/jquery.mobile-1.4.5.min.js"></script>

    </head>

    <script>
        
        var correo = <?php echo $correo ?>;
        console.log("Correo " + correo);

        if (correo) {

            console.log("Email es " + EMAIL_USER);

            var dataSend = {
                email: EMAIL_USER,
                carrito: CART,
                store_email: STORE.email
            };

            var request = $.ajax({
                data: dataSend,
                url: urlServices + 'sendEmail.php',
                dataType: 'json',
                type: 'POST',
                success: function (response) {

                    console.log("Respuesta es:");
                    console.log(response);

                    if (parseInt(response.result) == parseInt(1)) {

                        $("#texto_popup").text("Correo enviado a " + EMAIL_USER);

                        console.log("Enviamos email");

                    } else if (parseInt(response.result) == parseInt(0)) {



                    } else if (parseInt(response.result) == parseInt(2)) {



                    } else if (parseInt(response.result) == parseInt(0)) {



                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {

                    if (textStatus === "timeout") {



                    } else {



                    }

                },
            });

        }
    </script>

    <body>
        <center>
            <div style="margin-top:30%;width: 50%;">
                <img src="css/icons/logo.png" style="width: 100%;">
            </div>
            <br>
            <div class="ui-grid-solo" style="">
                <div class="ui-block-a">
                    <label>SU PEDIDO ONLINE HA SIDO PAGADO</label>
                </div>
            </div>
            <br>
            <div class="ui-grid-b" style="width: 50%;background-color:#0197d4;height:45px;">
                <div class="ui-block-a" style="width: 15%;float: left;"><img src="img/check.png" style="width:45px"></div>
                <div class="ui-block-b" style="width: 85%">
                    <label style="color:white;line-height: 45px;">ENVIO 48H (lab) ESPAÑA PENÍNSULA</label>
                </div>
            </div>
        </center>
    </body>

    </html>

    <?php

echo "hola<br>";

?>