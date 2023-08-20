// Create video element

const button = document.getElementById("pickHouse");
const numStud = 250;
const video = document.getElementById("vid");

video.src = "vids/shuffle_houses.mp4";
video.controls=false;
video.autoplay = true;
video.loop=true;

document.addEventListener("click",function(){
    video.muted = false;
   
})
let numbers = []


function randomize(){
    let number;
    do{
        
        button.disabled=true;
        number = Math.floor(Math.random() * 240)+1;
        let count = 0
        if(!numbers.includes(number)){
            video.muted = false;
            video.loop = false;
            video.src = "vids/shuffle_houses.mp4"
            numbers.push(number);
            console.log(numbers);   
            video.onended = function(){
                if(count != 1){
                    if (number <= (numStud * .25)){
                        video.src = "vids/chronos_confetti.mp4";
                    }
                    else if (number <= (numStud * .5)){
                        video.src = "vids/cybernetic_confetti.mp4";
                    }
                    else if (number <= (numStud * .75)){
                        video.src = "vids/innovators_confetti.mp4";
                    }
                    else if (number <= numStud){
                        video.src = "vids/sentinels_confetti.mp4";
                    }
                    count +=1;

                }
                else{
                    button.disabled=false;
                    return
                }
            }
            break;
        }
       
    } while(numbers.includes(number));
   
}
     

button.addEventListener("click", randomize)




// Include in HTML as child of #box



