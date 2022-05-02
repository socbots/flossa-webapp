/****** Manuscript for robot ******/

/************* ENGLISH *************/

// used for user feedback
const feedback_container_before = "What you said: "

// Words that are listened to for starting the interaction
const activationWords = [
    "hello",
    "hi",
    "hey",
    "snow",
    "start",
    "begin",
    "activate"
];

// intructions sentence with speech pauses before and after
const instructions = {
    "sentence": "<break time='0.5s'/> You can answer by speech or by pressing my screen. <break time='0.5s'/>"
}

const welcome = {
    "sentence": "Hi and welcome. <break time='0,5'/> My name is Snow <break time='0.5s'/> and I am an assistant here at the school."
}

const present_purpose = {
    "sentence": "Usually I inform guests about different subjects <break time='0.5s'/> and today I can inform you about dental care."
}

const question_01 = {
    "sentence": "Now I wonder <break time='0,5s'/> What would you like to learn about dental floss <break time='0.5s'/> or how to brush your teeth? <break time='0.5s'/> You may also end the conversation." + instructions.sentence,
    "flossa": "Floss",
    "brush": "Brush",
    "stop": "End"
};

const question_01_alternative = {
    "sentence": "Would you like to learn something more or end the conversation?",
    "flossa": "Floss",
    "brush": "Brush",
    "stop": "End"
}

const outro = {
    "sentence": "Okay. <break time='0.5s'/> Have a nice day now."
}
/**** Flossa chapter ****
* video and 2 questions */

const flossa_start = {
    "sentence": "I am going to show a video from public dental institution in Stockholm <break time='0.5s'/> while I tell you how to best use dental floss."
}

const flossa_video_01 = {
    "sentence": "It is impossible to completely clean between your teeth with a standard toothbrush. <break time='0.5s'/> Gingivitis and caries attacks \
    usually start from there. <break time='0.5s'/> That is why it is recommended that you use dental floss at least once a day before you brush your teeth. <break time='0.5s'/>  Take a long enough string \
    of dental floss and spin it around your fingers. <break time='0.5s'/>  Let the dental floss carefully follow the outline of your tooth and down into the gum. <break time='0.5s'/> \
    Pull the dental floss carefully up again and down on the other side of your tooth. <break time='1.0s'/> Repeat this stage for each tooth, also for the ones in the back for best result."
}

const flossa_monologue_01 = {
    "sentence": "I hope the video was useful. <break time='0.5s'/> Now to make sure you really listened, I will ask a few questions form you." + instructions.sentence
}

const flossa_question_01 = {
    "sentence": "Question 1. <break time='0.5s'/> Sometimes your gum starts to bleed when you use dental floss. What do you think is the cause of this. Say: wrong \
     technique, signs of gingivitis, or both.",
    "answerA": "Wrong technique",
    "answerB": "Signs of gingivitis",
    "answerC": "Both"
}

const flossa_question_01_response = {
    "sentence": "Both is the correct answer. <break time='1s'/>"
};

// tailored nextNode depending on user answer
const flossa_question_02 = {
    "sentence": "Question 2. <break time='0.5s'/> Do you remember how often I recommended you use dental floss. Say: every day, every second day or every third day.",
    "answerA": "Every day",
    "answerB": "Second day",
    "answerC": "Third day",
    "correct": "That was correct! It is every day. <break time='1s'/>",
    "wrong": "That was wrong. It is every day. <break time='1s'/>"
};

const flossa_end = {
    "sentence": "That was all I had about dental floss. <break time='0.5s'/> You can always discuss with your dentist or a dental hygienist about dental floss if you wish to learn more."
}

/***** Brushing chapter *****
* 1 question and monologue */

const brushing_start = {
    "sentence": "I have fem simple facts about brushing your teeth from the public dental care's web page."
}

const brushing_monologue_01 = {
    "point_01": "1. It is important to brush your teeth correctly.<break time='0.5s'/>",
    "point_02":" 2. Brush your teeth twice a day, morning and evening..<break time='0.5s'/>",
    "point_03":" 3. Brush your teeth for about 2 minutes.<break time='0.5s'/>",
    "point_04":" 4. Spit the toothpaste out, but avoid drinking or rinsing your teeth after. <break time='0.5s'/> As you will remove the fluoride that protects your teeth.<break time='0.5s'/>",
    "point_05":" 5. Feel with your tongue after if your teeth are clean. <break time='0.5s'/> They should feel smooth but if they are grainy you could brush some more.<break time='0.5s'/>"
}

const brushing_monologue_02 = {
    "sentence": "Now I have a question to see if you listened."
}

const brushing_question_01 = {
    "sentence": "<break time='0.5s'/> Is rinsing your teeth better or worse for dental hygiene after you have brushed your teeth?" + instructions.sentence,
    "answerA": "Worse",
    "answerB": "Better",
    "correct": "You knew, great! <break time='1.0s'/>",
    "wrong": "No. <break time='0.5s'/> You should avoid rinsing or drinking after brushing your teeth. <break time='1.0s'/>"
}

const brushing_end = {
    "sentence": "That was all I had about brushing your teeth. <break time='0.5s'/> Remember to please discuss with your dentist or a dental hygienist about what toothbrush fits your needs the best."
}
