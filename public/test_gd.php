<?php
// Test de l'extension GD
if (extension_loaded('gd')) {
    echo "L'extension GD est activée !<br>";
    print_r(gd_info()); // Affiche les infos GD
} else {
    echo "L'extension GD n'est pas activée !";
}
