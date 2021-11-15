<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <!-- enlazamos el Archivo Css para modificar el estilo de la pagina -->
    <link href="View/CSS/IndiceCss.css" rel="stylesheet">
    <title>Simon Dice</title>
</head>

<body>

    <header class="header">

        <!-- Aqui esta el titulo del juego Simon Dice que podemos ver en la pantalla de juego, y añadimos el nombre a partir de un controlador y luego a su vista -->
        <div class="header__container--titulo">
            <?php require __DIR__ . "/Controller/controller_header_title.php"; ?>  
        </div>

        <!-- Aqui esta la info del juego Simon Dice Score, Nivel y Nombre -->
        <div class="header__container--info">
            <?php require __DIR__ . "/Controller/controller_header_info.php"; ?>
        </div>

    </header>

    <section class="section">
        <!-- Aqui esta el GameBoard o mejor dicho el SimonDice -->
        <div class="section__gameboard">
            <?php require __DIR__ . "/Controller/controller_section_gameboard.php"; ?>
        </div>

    </section>

    <!-- enlazamos el Archivo JS para crear las acciones de la pagina -->
    <script src="View/JS/IndiceJs.js"></script>
    <!-- Para que funcionen los alert como de has ganado, o has perdido -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.0/sweetalert.min.js"></script>
    

</body>



</html>
