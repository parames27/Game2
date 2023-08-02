
function saveGoal(){

    var goalKeeper1 = $("#goalKeeper1");
    var goalKeeper2 = $("#goalKeeper2");
    var pos1 = goalKeeper1.position().left ;
    var pos2 = goalKeeper2.position().left ;

    start1 = true;
    start2 = true;

    interval = setInterval(function () {   

        if (pos1 >450){
            start1 = false
        }
        if (pos1 <100){
            start1 = true
        }

        if (start1==true) { 
            pos1=pos1+10;
            goalKeeper1.css('left', pos1 );
        } else {
            pos1=pos1-10;
            goalKeeper1.css('left', pos1 );
      } 
    }, 40);

    interval2 = setInterval(function () {   

        if (pos2 >440){
            start2 = false
        }
        if (pos2 <110){
            start2 = true
        }

        if (start2==true) { 
            pos2=pos2+10;
            goalKeeper2.css('left', pos2 );
        } else {
            pos2=pos2-10;
            goalKeeper2.css('left', pos2 );
      } 
    }, 50);
}



function kick(ball,x,y){
    
    kickAction = setInterval(function () {   

        if (y <310){
            
            clearInterval(kickAction);
        }
        
        y=y-10;
        ballSize =y/7;       
        ball.css('top', y );   
        ball.css('height', ballSize );   
     }, 60)

}

function hanldeMouse(){

    footBall = $('#footBall');

    $(document).mousemove(function(event){
        
        footBall.css('left', event.pageX );
        footBall.css('top', event.pageY );
      });

    footBall.click(function() {
        kick(footBall,event.pageX,event.pageY)
    });
      
}

function initialize(){
    $("#goalKeeper1").css('left', Math.random() * (+450 - +100) + +100 );
    $("#goalKeeper2").css('left', Math.random() * (+440 - +110) + +110 );
}

$(window).on('load', function() {
    initialize();
    saveGoal();
    hanldeMouse();
})


function collisionDetection(ball, goalkeeper) {
    var ballPos = ball.position();
    var goalkeeperPos = goalkeeper.position();
  
    if (
      ballPos.left < goalkeeperPos.left + goalkeeper.width() &&
      ballPos.left + ball.width() > goalkeeperPos.left &&
      ballPos.top < goalkeeperPos.top + goalkeeper.height() &&
      ballPos.top + ball.height() > goalkeeperPos.top
    ) {
      clearInterval(kickAction);
      alert("Goalkeeper Save!");
    }
  }
  
  function kick(ball, x, y) {
    kickAction = setInterval(function () {
      if (y < 280) {
        clearInterval(kickAction);
      }
  
      y = y - 10;
      ballSize = y / 9;
      ball.css('top', y);
      ball.css('height', ballSize);
      
      // Check collision with goalkeepers
      var goalKeeper1 = $("#goalKeeper1");
      var goalKeeper2 = $("#goalKeeper2");
      collisionDetection(ball, goalKeeper1);
      collisionDetection(ball, goalKeeper2);
    },50);
  }
