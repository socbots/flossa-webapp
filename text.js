/****** Manuscript for robot ******/

/************* SVENSKA *************/

const intro = {
    "sentence": "Hej! Vänligen välj scen",
    "present": "Presentera",
    "say":"VAD man vill NÄR man vill",
    "deaf": "Förstod inte vad du menade?"

};

const present_txt = '<break time="4s"/> Hej <break time="1s"/>'

const present_continue_txt = 'Jag heter Alf och hjälper till här på Arcada som en humanoid robot <break time="1s"/> humanoid <break time="0.5s"/> human <break time="0.5s"/> Error <break time="0.5s"/> Inte människa <break time="0.5s"/> Robot <break time="0.5s"/> Error'

const say_txt = '<break time="4s"/> Få roboten att säga VAD man vill <break time="1s"/> NÄR man vill.'

const deaf_txt = '<break time="4s"/> Jag förstod inte vad du menade? <break time="1s"/>'

const sorry_repeat = '<speak> Jag förstod inte vad du menade? <break time="1s"/></speak>'

const feedback_container_before = " "