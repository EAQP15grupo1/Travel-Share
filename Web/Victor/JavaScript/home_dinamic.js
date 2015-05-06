/**
 * Created by pc on 25/04/2015.
 */
//ESTO SE DEBE PASAR A ANGULAR

var id_click_before = 1

function expand(id_click) {
    document.getElementById(id_click_before).style.width = '400px'
    //Si el valor es 5(TagSinFiltro)
    if(id_click!=5){
        document.getElementById(id_click).style.width = '470px'
        id_click_before=id_click;
    }
}


