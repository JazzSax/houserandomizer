// Create video element


const video = document.getElementById("vid");
const numPerBatch = 10;
const numStud = Math.ceil(84/numPerBatch);
const showList1 = document.getElementById('show-outputs');  
const showList2 = document.getElementById('show-outputs2');  
const chronos = document.getElementById('chronos');
const cyber = document.getElementById('cyber');
const inno =  document.getElementById('inno');
const senti = document.getElementById('senti');
video.controls=false;
video.autoplay = true;
video.loop=true;

document.addEventListener("click",function(){
    video.muted = false;
   
})
let numbers = []


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function displaySelectedNames(names) {
    showList1.innerHTML = "";
    showList2.innerHTML = "";
    const list1 = document.createElement('ul');
    const list2 = document.createElement('ul');

    // Split the names array into two equal parts
    const middleIndex = Math.floor(names.length / 2);
    const namesList1 = names.slice(0, middleIndex);
    const namesList2 = names.slice(middleIndex);

    namesList1.forEach(randomName => {
        const listItem = document.createElement('li');
        listItem.textContent = randomName;
        list1.appendChild(listItem);
    });

    namesList2.forEach(randomName => {
        const listItem = document.createElement('li');
        listItem.textContent = randomName;
        list2.appendChild(listItem);
    });

    showList1.appendChild(list1);
    showList2.appendChild(list2);
}

let namesArray; // Declare namesArray in the global scope

// Function to parse CSV and return an array of names
async function parseCsvAndReturnArray(csvFilePath) {
    return new Promise((resolve, reject) => {
        Papa.parse(csvFilePath, {
            download: true,
            header: true,
            complete: function(results) {
                const parsedNamesArray = results.data.map(row => row['Name (Last Name, First Name M.I.)']);
                resolve(parsedNamesArray);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

async function initialize() {
    try {
        console.log(namesArray)
        namesArray = await parseCsvAndReturnArray('csv/Mapúa MCL GDAP Academic Roadshow 2023 Feedback Form(1-83).csv'); // Assign to the global namesArray
        shuffleArray(namesArray);
        console.log(namesArray); // Log the initial namesArray value
       
        // Call any other functions that use namesArray here
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
initialize();
// Initialize the data

const random_char = () => {
    const possible = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
          "0123456789" +
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
          "abcdefghijklmnopqrstuvwxyz";
    return possible.charAt(Math.floor(Math.random() * possible.length));
  };

  const mask = (chars, progress) => {
    const masked = [];

    for (let i = 0; i < chars.length; i++) {
      const position = (i + 1) / chars.length;
      if (position > progress) {
        masked.push(random_char());
      } else {
        masked.push(chars[i]);
      }
    }

    return masked.join('');
  };

  const shuffle = el => {
    const chars = el.textContent.split('');

    const params = {
      progress: 0
    };

    const a = anime({
      targets: params,
      progress: 1,
      delay: 0,
      duration: 8000,
      easing: 'easeInQuad',
      update: () => {
        el.textContent = mask(chars, params.progress);
      },
      complete: () => {
        el.classList.add('completed');
      }
    });
   
  };
function randomize(){
    button1.style.display = "none";
    button.style.display = "block";
    let number;
    for (const el of document.querySelectorAll('.shuffle')){
        el.style.display = "none";
    }
    do{
        button.disabled=true;
        number = Math.floor(Math.random() * numStud)+1;
        let count = 0
        if(!numbers.includes(number)){
            video.muted = false;
            video.loop = false;
            video.src = "vids/shuffle_house_5_secs_intense.mp4";
            numbers.push(number);
            console.log(numbers); 
            //localStorage.setItem('generatedNumbers', JSON.stringify(numbers));  
            if (number <= (numStud * .25)){
                       
                chronos.style.display = "block"
                chronos.classList.remove('completed');
                shuffle(chronos);
               
                
            }
            else if (number <= (numStud * .5)){
             
                cyber.style.display = "block"
                cyber.classList.remove('completed');
                shuffle(cyber);
               
               
            }
            else if (number <= (numStud * .75)){
                inno.style.display = "block";   
                inno.classList.remove('completed');
                shuffle(inno);
               
               
            }
            else if (number <= numStud){
                senti.style.display = "block";
                senti.classList.remove('completed');
                shuffle(senti);
               
               
                
            }
            video.onended = function(){
                if(count != 1){
                    if (number <= (numStud * .25)){
                       
                      
                        video.src = "vids/chronos.mp4";
                        
                    }
                    else if (number <= (numStud * .5)){
                     
                    
                        video.src = "vids/cybernetics.mp4";
                       
                    }
                    else if (number <= (numStud * .75)){
                       
                        video.src = "vids/innovators.mp4";

                       
                    }
                    else if (number <= numStud){
        
                        video.src = "vids/sentinels.mp4";
                       
                        
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
let names;
function randomizeNames() {
    button.style.display = "none";
    button1.style.display = "block";
    for (const el of document.querySelectorAll('.shuffle')){
        el.style.display = "none";
    }
    video.src = "vids/shuffle house harry potter.mp4"
    if (namesArray.length >= numPerBatch) {
         names = namesArray.splice(0, numPerBatch);
       
    } else {
        names = namesArray.splice(0, namesArray.length);
    }
    displaySelectedNames(names);

}


// Call the initialize function to populate namesArray


// Add an event listener to the button
const button = document.getElementById("pickNames");
button.addEventListener("click", randomizeNames);

const button1 = document.getElementById("pickHouse");
button1.addEventListener("click",randomize);









