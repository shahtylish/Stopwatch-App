$(function(){
//    define some important variables:
    var mode = false; //App Mode
    var interval;
    var interval2;
    var lapNumber = 0;
    
    var timeMin = 0, timeSec = 0, timeMilisec = 0;
    var lapMin = 0, lapSec = 0, lapMilisec = 0;
    
//    on app load show start and lap buttons:
    hideShowButtons("#start", "#lapButton");
    
//    When click on start button, App mode is on and show stop and lap buttons and start the counters:
    $("#start").click(function(){
        mode = true;
        hideShowButtons("#stop", "#lapButton");
        startTime();
        startLap();
    });
    
//    When click on the stop button, show the resume and reset buttons and stop the counters;
    $("#stop").click(function(){
        hideShowButtons("#resume", "#reset");
        clearInterval(interval);
        clearInterval(interval2);
    });
    
//    When click on the resume button, show the stop and lap buttons and resume the counters;
    $("#resume").click(function(){
        hideShowButtons("#stop", "#lapButton");
        startTime();
        startLap();
    });
    
//    When click on the reset button, the app reloads:
    $("#reset").click(function(){
        location.reload();
    });
    
//    When click on the lap button, Stop the counter, reset lap counter and print lap details in the lap div and again start counter;
    $("#lapButton").click(function(){
        if(mode){
            clearInterval(interval2);
            
            printLap();
            
            lapMin = 00;
            $("#lapMin").html('00');
            lapSec = 00;
            $("#lapSec").html('00');
            lapMilisec = 00;
            $("#lapMilisec").html('00');
            
            startLap();
        }
    });
    
    
    
    
    
//    functions:
//    function for show two buttons:
    function hideShowButtons(x, y){
        $(".buttons").hide();
        $(x).show();
        $(y).show();
    }
//    function for counter:
    function timer1(){
        timeMilisec++;
        $("#timeMilisec").html(format(timeMilisec));
        
        if(timeMilisec >= 100){
            timeSec++;
            $("#timeSec").html(format(timeSec));
            timeMilisec = 0;
        }
        else if(timeSec >= 60){
            timeMin++;
            $("#timeMin").html(format(timeMin));
            timeSec = 0;
        }
    }
    
    function timer2(){
        lapMilisec++;
        $("#lapMilisec").html(format(lapMilisec));
        
        if(lapMilisec >= 100){
            lapSec++;
            $("#lapSec").html(format(lapSec));
            lapMilisec = 0;
        }
        else if(lapSec >= 60){
            lapMin++;
            $("#lapMin").html(format(lapMin));
            lapSec = 0;
        }
    }
    
//    function for start timers:
    function startTime(){
        interval = setInterval(timer1, 10);
    }
    function startLap(){
        interval2 = setInterval(timer2, 10);
    }
    
//    function for formatting numbers:
    function format(number){
        if(number < 10){
            return '0' + number;
        }
        else{
            return number;
        }
    }
    
//    function for print lap detail in the lap div:
    function printLap(){
        lapNumber++;
        var lapDetails = '<div class = "codeLapDiv">' + 
            '<div class = "codeLapTitle">' + 'Lap' + lapNumber + '</div>' +
            '<div class = "codeLapTime">' + '<span>' + format(lapMin) + '</span>:' + '<span>' + format(lapSec) + '</span>.' + '<span id="codeLapMilisec">' + format(lapMilisec) + '</span>' + '</div>' + 
            '</div>';
        $(lapDetails).prependTo("#lapsDiv");
    }
    
    
    
});