/**
 * Created by Alejandro on 4/5/15.
 */
window.onload=getUser();
function getUser() {

    $.ajax({
        url : "http://10.89.254.7:3000/user/554897823fbb18ee03000001",
        type : 'GET',
        crossDomain : true,
        dataType: "json",
        success:function(data) {

        var user = data;

            $("#userNick").text("Nick: "+user.nick);
            $("#userAge").text("Edad: "+user.age);
            $("#userNation").text("Nacionalidad: "+user.nation);
            $("#userDescription").text(user.descrip);


    }, error: function() {
            window.alert("FAIL: Los monos ya han tocado algo que no debian...");
    }

});
}