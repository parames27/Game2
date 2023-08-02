function flight() {
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37:    // key left
                $("#flight").finish().animate({ left: '-=50' });
                break;
            case 38:    // key up
                $("#flight").finish().animate({
                    top: "-=50"
                });
                break;
            case 39:    // key right
                $("#flight").finish().animate({
                    left: "+=50"
                });
                break;
            case 40:    // key down
                $("#flight").finish().animate({
                    top: "+=50"
                });
                break;
        }
    });
}

function bird() {
    $("#bird0").css({ "top": '0px' }).show();
    $("#bird0").animate({ top: '+=900px' }, 4500);

    $("#bird1").css({ "top": '0px' }).fadeIn(500).delay(200).show();
    $("#bird1").animate({ top: '+=900px' }, 4500);

    $("#bird2").css({ "top": '0px' }).fadeIn(200).delay(300).show();
    $("#bird2").animate({ top: '+=900px' }, 4500);

    $("#bird3").css({ "top": '0px' }).fadeIn(300).delay(400).show();
    $("#bird3").animate({ top: '+=900px' }, 4500);

    $('#bird0,#bird1,#bird2,#bird3').delay(200).fadeOut(200, bird);
}

function showDialog(message) {
    var dialogBox = $("<div></div>")
        .html(message)
        .css({
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "#fff",
            border: "2px solid #000",
            "font-size": "24px",
        });

    $("body").append(dialogBox);

    setTimeout(function () {
        dialogBox.remove();
        startNewGame();
    }, 3000);
}

function endGame() {
    showDialog("Game Over");
    $(document).off('keydown'); // Disable further keydown events
    clearInterval(gameInterval); // Stop the game loop
}

function startNewGame() {
    $("#flight").css({ top: "700px", left: "817px" });
    bird();
}

$(window).on('load', function () {
    flight();
    bird();

    var gameInterval = setInterval(function () {
        var flightPos = $("#flight").offset();
        var flightWidth = $("#flight").width();
        var flightHeight = $("#flight").height();

        var birdPos = $("#bird0").offset();
        var birdWidth = $("#bird0").width();
        var birdHeight = $("#bird0").height();

        if (
            flightPos.left < birdPos.left + birdWidth &&
            flightPos.left + flightWidth > birdPos.left &&
            flightPos.top < birdPos.top + birdHeight &&
            flightPos.top + flightHeight > birdPos.top
        ) {
            // Bird hit the airplane
            endGame();
        }

    });
});