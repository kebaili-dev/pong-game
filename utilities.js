/*-----------------------Biblio de fonction --------------------------------*/

/**
 * Renvoie un nombre aléatoire entre min et max
 * 
 * @param int min Le nombre minimum
 * @param int max Le nombre maximum
 * @return int Un nombre compris entre min et max
 */
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Renvoie la position de la souris par rapport à un élément html
 * 
 * @param HTMLElement element L'élément dont on veut récupérer la position de la souris
 * @param Number x Le x par rapport au haut de la page
 * @param Number y Le y par rapport au haut de la page
 * @return Object Un objet avec les propriétés x et y représentante la position de la souris
 */
function getMouseLocation(element, x, y)
{
    const boundings = element.getBoundingClientRect();
    
    return {
        x: x - boundings.left,
        y: y - boundings.top
    }
}