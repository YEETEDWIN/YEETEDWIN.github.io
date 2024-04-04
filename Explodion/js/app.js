const btn = document.querySelector('.talk');
const gif = document.querySelector('.gif')
const content = document.querySelector('.content');
const stop = document.querySelector('.stop');

let SpeechAPI = true

class person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    setName(name) {
        this.name = name
    }
}

class assistant {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    setName(name) {
        this.name = name
    }
}

var Person = new person("Boss");
var Explodion = new assistant("Explodion");

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}
function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning "+Person.name);
    }

    else if(hr == 12) {
        speak("Good Noon "+Person.name);
    }

    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon "+Person.name);
    }

    else {
        speak("Good Evening "+Person.name);
    }
}

window.addEventListener('load', ()=>{
    if (!('webkitSpeechRecognition' in window)) {
      SpeechAPI = false
      content.innerHTML = "Web Speech API is not supported by this browser"
    } else {
      speak("Activating Explodion");
      speak("Going online");
      wishMe();
    }  
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
  if (SpeechAPI) {
    recognition.start();
  }
})

gif.addEventListener('click', ()=>{
  if (SpeechAPI) {
    recognition.start();
  }
})

stop.addEventListener('click', ()=>{
    window.speechSynthesis.cancel();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    
    speech.text = "I did not understand what you said, please try again";

    if(/\bhi\b/i.test(message) || /\bhello\b/i.test(message) || /\bhey\b/i.test(message)) {
        greetings = ["Hey, how can I help you"+Person.name, "Hey, what's up?"+Person.name, "I'm listening"+Person.name, "How can I help you?"+Person.name, "Hello"+Person.name]
        greet = greetings[Math.floor(Math.random() * greetings.length)];
        const finalText = greet
        speech.text = finalText;
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine "+Person.name+" tell me how can i help you";
        speech.text = finalText;
    }

    else if(message.includes('what is your name') || message.includes("what's your name") || message.includes('tell me your name')) {
        let finalText
        if (Person.name !== "Boss") {
            finalText = "My name is "+Explodion.name+", "+Person.name
        }
        else {
            finalText = "My name is "+Explodion.name+". what's your name?"
        }
        speech.text = finalText;
    }

    else if(message.includes('call me') || message.includes('my name is')) {
        if (message.includes("me")) {
            Person.setName(message.split('me').pop())
        }
        else {
            Person.setName(message.split('is').pop())
        }
        const finalText = "Okay, i will remember that it is" + Person.name;
        speech.text = finalText;
    }

    else if(message.includes('your name is') || message.includes('your name should be')) {
        if (message.includes("is")) {
            Explodion.setName(message.split('is').pop())
        }
        else {
            Explodion.setName(message.split('be').pop())
        }
        const finalText = "Okay, i will remember that my name is "+Explodion.name;
        speech.text = finalText;
    }

    else if(message.includes('what is my location') || message.includes('where am i') || message.includes('find my location')) {
        const finalText = "As per Google Maps, it seems that you are in "+geoplugin_city()+", "+geoplugin_region()+" in "+geoplugin_countryName();
        speech.text = finalText;
        window.open("https://www.google.com/maps/search/Where+am+I+?/", "_blank");
    }

    else if(message.includes('who has the best only fans')) {
        const finalText = "Lohit";
        speech.text = finalText;
    }

    else if (message.includes('capture screenshot')) {
      html2canvas(document.documentElement).then(canvas => {
          const dataURL = canvas.toDataURL('image/png');

          const modalContainer = document.createElement('div');
          modalContainer.className = 'screenshot-modal';

          const screenshotImage = new Image();
          screenshotImage.src = dataURL;

          const closeButton = document.createElement('button');
          closeButton.textContent = 'Close';
          closeButton.addEventListener('click', () => {
              document.body.removeChild(modalContainer);
          });

          modalContainer.appendChild(screenshotImage);
          modalContainer.appendChild(closeButton);
          document.body.appendChild(modalContainer);

          const finalText = "Capturing screenshot. Click the 'Close' button to close the modal.";
          speech.text = finalText;
          window.speechSynthesis.speak(speech);
      });
      speech.text = finalText
    }

    else if (message.includes('tell me an interesting fact')) {
        const apiUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';

        (async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.text) {
                    const fact = data.text;
                    const finalText = `Here's an interesting fact: ${fact}`;
                    speech.text = finalText;
                } else {
                    throw new Error('No valid fact found');
                }
            } catch (error) {
                console.error('Error fetching interesting fact:', error);
                speech.text = "Sorry, I couldn't fetch an interesting fact at the moment.";
            } finally {
                window.speechSynthesis.speak(speech);
            }
        })();
      speech.text = finalText
    }

    else if (message.includes('check the weather') || message.includes('what is the weather') || message.includes('what is the temperature')) {
      
      const apiKey = 'f4dc5f1fdf6f60490cbe65cfa20fcf28';
      const cityRegex = /(in|for)\s+([a-zA-Z\s]+)/i;
      const match = message.match(cityRegex);
  
      if (match && match[2]) {
          const city = match[2].trim();
          console.log(city)
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
          (async () => {
              try {
                  const response = await fetch(apiUrl);
                  const data = await response.json();
  
                  if (data.cod === '404') {
                      speech.text = "Sorry, I couldn't find the weather for the specified city.";
                  } else {
                      const temperature = Math.round(data.main.temp - 273.15);
                      const weatherDescription = data.weather[0].description;
                      const finalText = `The current temperature in ${city} is ${temperature} degrees Celsius, with ${weatherDescription}.`;
                      speech.text = finalText;
                  }
              } catch (error) {
                  console.error('Error fetching weather data:', error);
                  speech.text = "Sorry, there was an error fetching the weather information.";
              } finally {
                  window.speechSynthesis.speak(speech);
              }
          })();
      } else {
          speech.text = "Please specify a city for the weather check.";
          window.speechSynthesis.speak(speech);
      }
      speech.text = finalText
    }

    else if (message.includes('tell me a joke')) {
        const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';

        (async () => {
            try {
                const response = await fetch(jokeApiUrl);
                const data = await response.json();

                if (data.setup && data.delivery) {
                    const setup = data.setup;
                    const delivery = data.delivery;
                    const finalText = `${setup}... ${delivery}`;
                    speech.text = finalText;
                } else {
                    throw new Error('No valid joke found');
                }
            } catch (error) {
                console.error('Error fetching joke:', error);
                speech.text = "Sorry, I couldn't fetch a joke at the moment.";
            } finally {
                window.speechSynthesis.speak(speech);
            }
        })();
      speech.text = finalText
    }

    else if (message.includes('self-destruct') || message.includes('self destruct')) {
      setTimeout(() => {
        window.location.href = "https://cdn.mos.cms.futurecdn.net/Wc5NinaNydq5KzrGrxL6Md-1200-80.jpg";
      }, 10000);

      // Create particles directly on the document body
      let particles = [];

      // Function to create a new particle at a random position on the screen
      function newParticle() {
          let x = Math.random() * window.innerWidth;
          let y = Math.random() * window.innerHeight;
          let type = Math.random() < 0.5 ? 0 : 1;

          particles.push({
              x: x,
              y: y,
              xv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
              yv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
              c: type ? `rgb(255, ${Math.floor(200 * Math.random())}, ${Math.floor(80 * Math.random())})` : 'rgb(255,255,255)',
              s: type ? 5 + 10 * Math.random() : 1,
              a: 1
          });
      }

      // Function to draw particles on the screen
      function drawParticles() {
          let body = document.body;
          for (let i = 0; i < particles.length; i++) {
              let p = particles[i];
              let particle = document.createElement('div');
              particle.className = 'particle';
              particle.style.left = p.x + 'px';
              particle.style.top = p.y + 'px';
              particle.style.width = p.s + 'px';
              particle.style.height = p.s + 'px';
              particle.style.backgroundColor = p.c;
              body.appendChild(particle);
          }
      }

      // Function to update particle positions and animate them
      function updateParticles() {
          for (let i = 0; i < particles.length; i++) {
              let p = particles[i];
              p.x += p.xv;
              p.y += p.yv;
              p.a *= 0.99;
          }
      }

      // Function to remove particles that are no longer visible
      function removeParticles() {
          particles = particles.filter(p => p.a > 0.01 && p.x >= 0 && p.x <= window.innerWidth && p.y >= 0 && p.y <= window.innerHeight);
      }

      // Function to loop the animation
      function startLoop(newTime) {
          drawParticles();
          updateParticles();
          removeParticles();
          requestAnimationFrame(startLoop);
      }

      // Start the animation loop
      requestAnimationFrame(startLoop);

      // Function to periodically create new particles
      setInterval(newParticle, 10);

      // Responding with a message
      speech.text = "Initiating self-destruct sequence. Please evacuate the area.";
    }

    else if (message.includes('set an alarm for')) {
        const timeRegex = /(\d{1,2}):(\d{2})/;
        const match = message.match(timeRegex);
    
        if (match && match[1] && match[2]) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
    
            const now = new Date();
            const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    
            const currentTime = now.getTime();
            const alarmTimeMillis = alarmTime.getTime();
    
            const timeDiff = alarmTimeMillis - currentTime;
    
            if (timeDiff > 0) {
                setTimeout(() => {
                    const audio = new Audio('./alarm.wav');
                    audio.play();
                    speak("Your alarm is ringing now!");
                    // Add any additional actions you want to perform when the alarm goes off
                }, timeDiff);
    
                const formattedTime = alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const finalText = `Alarm set for ${formattedTime}.`;
                speech.text = finalText;
            } else {
                speech.text = "Please provide a future time for the alarm.";2
            }
        } else {
            speech.text = "Please provide a valid time for the alarm.";
        }
    }

    /*else if (message.includes('set a reminder')) {
        const timeRegex = /(\d{1,2})\s*(minutes?|mins?|hours?|hrs?)\s*for\s*(.*)/i;
        const match = message.match(timeRegex);

        if (match && match[1] && match[2] && match[3]) {
            const quantity = parseInt(match[1], 10);
            const unit = match[2].toLowerCase();
            const reminderFor = match[3];

            let timeInMillis;

            switch (unit) {
                case 'minute':
                case 'minutes':
                case 'min':
                case 'mins':
                    timeInMillis = quantity * 60 * 1000;
                    break;
                case 'hour':
                case 'hours':
                case 'hr':
                case 'hrs':
                    timeInMillis = quantity * 60 * 60 * 1000;
                    break;
                default:
                    speech.text = "Invalid time unit for the reminder.";
                    window.speechSynthesis.speak(speech);
                    return;
            }

            const currentTime = new Date().getTime();
            const reminderTime = currentTime + timeInMillis;

            // Request permission
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        // Execute the reminder logic here after permission is granted
                        setTimeout(() => {
                            const now = new Date().getTime();
                            if (now >= reminderTime) {
                                speech.text = `Reminder: Don't forget ${reminderFor}`;
                                window.speechSynthesis.speak(speech);
                            }
                        }, timeInMillis);
                    } else {
                        speech.text = "Reminder setting requires notification permission.";
                        window.speechSynthesis.speak(speech);
                    }
                });
            }
        } else {
            speech.text = "Invalid input for setting a reminder.";
            window.speechSynthesis.speak(speech);
        }
    }*/

    else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if (message.includes('open instagram') || message.includes('open insta')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening Instagram";
        speech.text = finalText;
    }

    else if (message.includes('open youtube') || message.includes('open yt')) {
      window.open("https://youtube.com", "_blank");
      const finalText = "Opening YouTube";
      speech.text = finalText;
  }

    else if (message.includes('open facebook')) {
        window.open("https://facebook.com", "_blank");
        const finalText = "Opening Facebook";
        speech.text = finalText;
    }

    else if (message.includes('tell me about') || message.includes('who is')) {
      //FIXME: Requires you to go to https://cors-anywhere.herokuapp.com/corsdemo to activate temp access
      const searchTerm = message.replace(/(tell me about|what is|who is)/i, '').trim();
      const wikipediaURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${encodeURIComponent(searchTerm)}`;
      const stripHtmlTags = (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.body.textContent || '';
      };
  
      const getWikipediaInfo = async () => {
          try {
              const response = await fetch(wikipediaURL);
              const data = await response.json();
  
              const pages = data.query.pages;
              const pageId = Object.keys(pages)[0];
              const extract = pages[pageId].extract;
  
              if (extract) {
                  const cleanText = stripHtmlTags(extract);
                  const finalText = `Here's some information about ${searchTerm}: ${cleanText}`;
                  console.log(cleanText);
                  window.open(`https://en.wikipedia.org/wiki/${searchTerm}`, "_blank");
                  speech.text = finalText;
              } else {
                  speech.text = `Sorry, I couldn't find information about ${searchTerm}.`;
              }
            } catch (error) {
              console.error('Error fetching Wikipedia info:', error);
              speech.text = `Sorry, there was an error fetching information about ${searchTerm}. ${error.message || ''}`;
            } finally {
              window.speechSynthesis.speak(speech);
            }
          };
        getWikipediaInfo();
        speech.text = finalText
    }

    else if (/\bwikipedia\b/i.test(message)) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speech.text = finalText;
    }

    else if (message == "time") {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }
    
    else if (message == "date") {
      const date = new Date().toLocaleString(undefined, {month: "long", day: "numeric", year: "numeric"})
      const finalText = date;
      speech.text = finalText;
  }

    else if (message.includes('what is the time in') || message.includes('what is the date in')) {
        const cityRegex = /in\s+([a-zA-Z\s]+)/i;
        const match = message.match(cityRegex);
    
        if (match && match[1]) {
            const city = match[1].trim();
    
            $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
                headers: { 'X-Api-Key': '9NjRq1GsY9YqrLz+urOGPg==prkhcxS9VchBniUX'},
                contentType: 'application/json',
                success: function(result) {
                    // Handle the API response here
                    console.log(result);
                    
                    // Extract relevant information and generate a response
                    const [date, time] = result.datetime.split(' ');
                    if (message.includes('time')) {
                      const finalText = `The current time in ${city} is ${time}.`;
                      speech.text = finalText;
                      window.speechSynthesis.speak(speech);
                    }
                    else if (message.includes('date')) {
                      const finalText = `The current date in ${city} is ${date}.`;
                      speech.text = finalText;
                      window.speechSynthesis.speak(speech);
                    }
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                    speech.text = "Sorry, there was an error fetching the city information.";
                    window.speechSynthesis.speak(speech);
                }
            });
        } else {
            speech.text = "Please specify a city to check the time or date.";
            window.speechSynthesis.speak(speech);
        }
        speech.text = finalText
    }

    else if (/\bcalculator\b/i.test(message) || /\bcalc\b/i.test(message)) {
        window.open('calc/calculator.html')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    // Add a new else if statement for the calculator
    else if (message.includes('calculate') || message.includes('what is') || message.includes('evaluate')) {
        try {
            // Extract the mathematical expression from the message
            const expression = message
                .replace('calculate', '')
                .replace('what is', '')
                .replace('evaluate', '')
                .trim();

            // Use the eval function to calculate the result
            console.log(expression)
            const result = math.evaluate(expression);
            console.log(result)
            // Check if the result is a number
            if (!isNaN(result)) {
                speech.text = `The result of ${expression} is ${result}.`;
            } else {
                speech.text = 'Sorry, I couldn\'t calculate the result.';
            }
        } catch (error) {
            console.error('Error evaluating expression:', error);
            speech.text = 'Sorry, there was an error evaluating the expression.';
        }
    }
    
    else if (message == "close") {
      const finalText = "I will always be watching you "+Person.name;
      speech.text = finalText;
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}
