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
    let test = true

    // Available targets with urls for gesture stream
    const targets = {
        'raspberry': "http://192.168.1.34",
        'herokuapp': "http://alfsse.herokuapp.com/move", //Currently down?
        'rahti': 'https://socbots-flask-production-socbots-flask.rahtiapp.fi/move',
    }

    // Delay to customize timings of gesture
    // default = 0ms
    setTimeout(() => {
        // select target and set url
        target = 'rahti'
        url = targets[target]
        fetch(url, {
                method: 'POST',
                body: JSON.stringify(movement.gesture),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res => res.json())
            .then((res2) => {
                console.log("gesture response from ", target, ": ", res2);
            });
    }, movement.time);
}