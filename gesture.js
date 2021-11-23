// movObj emotelist for robot
const emoteList = {
    wave_left: {
        bodyPart: "left_hand",
        gesture: "wave"
    },
    look_down: {
        bodyPart: "head",
        direction: "down",
        distance: 5
    },
    look_up: {
        bodyPart: "head",
        direction: "up",
        distance: 8
    }
}


// Sends gesture commands to SSE backend
function setGesture(movement) {
    url = "http://192.168.1.34" //PI local address for raspberry
        //url = "http://alfsse.herokuapp.com/move" //Backend adress
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(movement),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(res => res.json())
        .then((res2) => {
            console.log("gesture response:", res2);
        });
}