var canvas = document.getElementById('radarCanvas');
var context = canvas.getContext('2d');
var circles = [];
var imageObj = new Image();

window.onload = function () {
    loadBackground();
    loadCircles();
}

function loadBackground() {
    imageObj.src = 'img/radar.png';
    context.drawImage(imageObj, 0, 0, 600, 600);
}

function loadCircles() {
    var draw = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = fillcolor;
        context.fill();
        context.lineWidth = linewidth;
        context.strokeStyle = strokestyle;
        context.stroke();

        context.fillStyle = fontcolor;
        context.textAlign = textalign;
        context.font = fonttype;

        //context.fillText(filltext, x, y);
    };

    var Circle = function (x, y, radius, id) {
        this.left = x - radius;
        this.top = y - radius;
        this.right = x + radius;
        this.bottom = y + radius;
        this.id = id;
    };

    var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles, id) {
        draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
        var circle = new Circle(x, y, radius, id);
        circles.push(circle);
    };

    drawCircle(context, 300, 100, "#FFFF99", 30, 5, "#FF9933", "white", "center", "bold 32px Arial", "1", circles, "xoxoloco");
    drawCircle(context, 200, 350, "#FF4D4D", 30, 5, "#800000", "white", "center", "bold 32px Arial", "2", circles, "ChupaPilas");
    drawCircle(context, 450, 450, "#CCFF99", 30, 5, "#336600", "white", "center", "bold 32px Arial", "3", circles, "User3");

    $('#radarCanvas').click(function (e) {
        var clickedX = e.pageX - $(this).offset().left;
        var clickedY = e.pageY - $(this).offset().top;

        for (var i = 0; i < circles.length; i++) {
            if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
                alert('Se abre el perfil de usuario: ' + (circles[i].id));
            }
        }
    });
}