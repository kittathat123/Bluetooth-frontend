var currentEvent = 'rotation-begin';

function turnOffFan () {
	var fan = document.getElementById("fan");
   
	console.log(currentEvent);

    fan.dispatchEvent(new CustomEvent(currentEvent))
    switch(currentEvent) {
      case 'rotation-begin':
      case 'rotation-resume':
        currentEvent = 'rotation-pause'
      break
      case 'rotation-pause':
        currentEvent = 'rotation-resume'          
      break  
    }
}	