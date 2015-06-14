var id_click_before = 1

//Expandir los botones de las etiquetas
function expand(id_click) {
    document.getElementById(id_click_before).style.width = '400px';
    //Si el valor es 5(TagSinFiltro)
    if(id_click!=5){
        document.getElementById(id_click).style.width = '470px';
        id_click_before=id_click;
    }
}

//Salir del panel de informacion del evento
function exitpanel(){
    document.getElementById("panel_tag").style.visibility = 'visible';
    document.getElementById("panel_info").style.visibility = 'hidden';
    document.getElementById("panel_new_event").style.visibility = 'hidden';
    document.getElementById("buttonjoin").style.visibility = 'hidden';
}

