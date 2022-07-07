var userSequence=[];
var gameSequence=[];

var oldLvl=0;lvl=0;
var gameOver=true;splash=true;

var main = new Audio('audio/main.mp3');

function playMainAudio() {
    main.volume=0.2;
    main.play();
}

$('#confirm span').click(function(){
    $('#confirm').css('opacity','0');
    $('#confirm').css('z-index','-10');
    splash=false;
    playMainAudio();

});

if ($(window).width() < 1024){
    $('#confirm').html('<br> Memo Game <span> Play </span>');
    $('#confirm span').click(function(){
        $('#confirm').css('opacity','0');
        $('#confirm').css('z-index','-10');
        splash=false;
        playMainAudio();
    
    });
    $('#titleDiv').click(function(){
        if(gameOver && !splash){
            main.pause();
            main.currentTime = 0;
            userSequence=[];
            gameSequence=[];
            gameOver=false;
            $('#titleDiv').removeClass('blink');
            $('#titleDiv').addClass('quickerBlink');
            $('#titleDiv').text('Starting');
            setTimeout(() => { nextSequ() }, 1500);
        }
    })
}

$(document).on('keypress',function(){
    if(gameOver && !splash){
        main.pause();
        main.currentTime = 0;
        userSequence=[];
        gameSequence=[];
        gameOver=false;
        $('#titleDiv').removeClass('blink');
        $('#titleDiv').addClass('quickerBlink');
        $('#titleDiv').text('Starting');
        setTimeout(() => { nextSequ() }, 1500);
    }
})

$('.block').click(function(){
    if (!gameOver) {
        userSequence.push($(this).attr('id'));
        var audio = new Audio('audio/'+$(this).attr('id')+'.mp3');
        audio.volume=0.2;
        audio.play();
        $(this).css('opacity','0.5');
        $(this).css('border','6px solid #ccc ');
        setTimeout(() => { $(this).css('opacity','1'); $(this).css('border','6px solid #fff ')}, 100);
        checkSequ();
    }
});

function checkSequ(){
    if(gameSequence[userSequence.length-1]===userSequence[userSequence.length-1]){
        if(gameSequence.length==userSequence.length){
            setTimeout(() => { nextSequ(); }, 400); 
        }
    }else{
        lvl=0;
        $('#titleDiv').html("GAME OVER :(</br></br>Press Any Key To Start!");
        $('body').css('background-color','red');
        var audio = new Audio('audio/fail.mp3');
        audio.volume=0.2;
        audio.play();
        gameOver=true;
        setTimeout(() => { $('body').css('background-color','#191919'); }, 100);
        setTimeout(() => { $('#titleDiv').addClass('blink');playMainAudio() }, 2000);

    }
}

function nextSequ(){
    $('#titleDiv').removeClass('quickerBlink');
    if (lvl>oldLvl) {
        $('#hs').text('Highest Score : '+lvl);
    }
    lvl++;
    $('#titleDiv').text('Level '+lvl);
    var randomNum = Math.floor((Math.random()*4)+1);
    var selected='b'+randomNum;
    setTimeout(() => { $('#'+selected).css('opacity','0.5')}, 600);
    setTimeout(() => { $('#'+selected).css('opacity','1'); }, 900);
    gameSequence.push(selected);
    userSequence=[];
}














/*function startGame(){
    $('#titleDiv').removeClass('quickerBlink');
    $('#titleDiv').text('Level '+lvl);
    
    
    

    console.log('this is Game '+gameSequence);
    $(".block").click(function(){
        console.log($(this).attr('id'));
        userSequence.push($(this).attr('id'));
        console.log('this is User '+userSequence);
        if (gameSequence[0]==userSequence[0]){
            console.log('true');
        }else{
            console.log('false');
        }
    });
    setTimeout(() => { lvl=2; $('#titleDiv').text('Level '+lvl); }, 1000);
        
    setTimeout(() => { lvl=3; $('#titleDiv').text('Level '+lvl); }, 2000);
    correct=false;
    setTimeout(() => { $('#titleDiv').text('GAME OVER :(');$('#titleDiv').addClass('blink') }, 3000);
    setTimeout(() => { $('#titleDiv').text(' Press Any Key To Start!'); }, 6000);
    

}*/