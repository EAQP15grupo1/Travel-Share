$("#LoginBtn").click(function () {
    var o = {};
    var a = $("#userForm").serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    var dataOK = JSON.stringify(o);
    window.location.href = "index.html"
    //window.alert(dataOK);

});

$("#RegisterBtn").click(function () {
    window.location.href = "createUser.html"
});