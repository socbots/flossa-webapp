/****** Manuscript for robot ******/

/************* ENGLISH *************/

// used for user feedback
const eng_feedback_container_before = "What you said: "

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
const eng_instructions = {
    "sentence": "<break time='0.5s'/> You can answer by speech or by pressing my screen. <break time='0.5s'/>"
}

const eng_welcome = {
    "sentence": "Hi and welcome. <break time='0,5'/> My name is Snow <break time='0.5s'/> and I am an assistant here at the school."
}

const eng_present_purpose = {
    "sentence": "Usually I inform guests about different subjects <break time='0.5s'/> and today I can inform you about dental care."
}

const eng_question_01 = {
    "sentence": "Now I wonder, <break time='0,5s'/> would you like to learn about dental floss <break time='0.5s'/> or how to brush your teeth today? <break time='0.5s'/> You may also exit the application." + eng_instructions.sentence,
    "flossa": "Floss",
    "brush": "Brush",
    "stop": "Exit"
};

const eng_question_01_alternative = {
    "sentence": "Would you like to learn something more or exit the application?",
    "flossa": "Floss",
    "brush": "Brush",
    "stop": "Exit"
}

const eng_outro = {
    "sentence": "Okay. <break time='0.5s'/> Have a nice day now."
}
/**** Flossa chapter ****
* video and 2 questions */

const eng_flossa_start = {
    "sentence": "I am going to play a video from the public dental institution in Stockholm <break time='0.5s'/> while I tell you how to best use dental floss."
}

const eng_flossa_video_01 = {
    "pre_sentence":"It is impossible to completely clean between your teeth with a standard toothbrush. <break time='0.5s'/> Gingivitis and caries attacks \
    usually start from there. <break time='0.5s'/> That is why it is recommended that you use dental floss at least once a day before you brush your teeth. <break time='0.5s'/>", 
    "sentence": " Take a long enough string of dental floss and spin it around your fingers. <break time='0.5s'/> \
    Let the dental floss carefully follow the outline of your tooth and down into the gum. <break time='0.5s'/> \
    Perform a sawing motion up and down the along the tooth before you continue. <break time='1.0'/> \
    Repeat this stage for each tooth, also for the ones in the back for best result. <break time='3.5s'/>"
}

const eng_flossa_monologue_01 = {
    "sentence": "I hope the video was useful. <break time='0.5s'/> Now to make sure you really listened, I will ask you a few questions." + eng_instructions.sentence
}

const eng_flossa_question_01 = {
    "sentence": "Question 1. <break time='0.5s'/> Sometimes your gum starts to bleed when you use dental floss. What do you think is the cause of this. Say: wrong \
     technique, signs of gingivitis, or both.",
    "answerA": "Wrong technique",
    "answerB": "Signs of gingivitis",
    "answerC": "Both"
}

const eng_flossa_question_01_response = {
    "sentence": "Both is the correct answer. <break time='1s'/>"
};

// tailored nextNode depending on user answer
const eng_flossa_question_02 = {
    "sentence": "Question 2. <break time='0.5s'/> Do you remember how often I recommended you use dental floss. Say: every day, every second day or every third day.",
    "answerA": "Every day",
    "answerB": "Second day",
    "answerC": "Third day",
    "correct": "That was correct! It is every day. <break time='1s'/>",
    "wrong": "That was wrong. It is every day. <break time='1s'/>"
};

const eng_flossa_end = {
    "sentence": "That was all I had about dental floss. <break time='0.5s'/> You can always discuss with your dentist or a dental hygienist about dental floss if you wish to learn more."
}

/***** Brushing chapter *****
* 1 question and monologue */

const eng_brushing_start = {
    "sentence": "I have a few simple facts about brushing your teeth from the public dental care's web page."
}

const eng_brushing_monologue_01 = {
    "point_01": "1. It is important to brush your teeth correctly.<break time='0.5s'/>",
    "point_02":" 2. Brush your teeth twice a day, morning and evening.<break time='0.5s'/>",
    "point_03":" 3. Brush your teeth for about 2 minutes.<break time='0.5s'/>",
    "point_04":" 4. Spit the toothpaste out, but avoid drinking or rinsing your teeth after. <break time='0.5s'/> As you will remove the fluoride that protects your teeth.<break time='0.5s'/>",
    "point_05":" 5. Feel with your tongue after if your teeth are clean. <break time='0.5s'/> They should feel smooth but if they are grainy you could brush some more.<break time='0.5s'/>"
}

const eng_brushing_monologue_02 = {
    "sentence": "Now I have a question to see if you listened."
}

const eng_brushing_question_01 = {
    "sentence": "<break time='0.5s'/> Is rinsing your teeth better or worse for dental hygiene after you have brushed your teeth?" + eng_instructions.sentence,
    "answerA": "Worse",
    "answerB": "Better",
    "correct": "You knew, great! <break time='1.0s'/>",
    "wrong": "No. <break time='0.5s'/> You should avoid rinsing or drinking after brushing your teeth. <break time='1.0s'/>"
}

const eng_brushing_end = {
    "sentence": "That was all I had about brushing your teeth. <break time='0.5s'/> Remember to please discuss with your dentist or a dental hygienist about what toothbrush fits your needs the best."
}



/************* SVENSKA *************/

// used for user feedback
const swe_feedback_container_before = "Vad jag h??rde: "

// Words that are listened to for starting the interaction
const swe_activationWords = [
    "hall??",
    "hej",
    "hejsan",
    "b??rja",
    "starta",
    "snow",
    "start",
    "begin",
    "activate"
];

// intructions sentence with speech pauses before and after
const swe_instructions = {
    "sentence": "<break time='0.5s'/> Ni kan svara genom tal eller med att trycka p?? min sk??rm. <break time='0.5s'/>"
}

const swe_welcome = {
    "sentence": "Hej och v??lkommen. <break time='0,5'/> Jag heter Snow och hj??lper till h??r i huset."
}

const swe_present_purpose = {
    "sentence": "Jag brukar informera g??ster och personal h??r i huset om olika saker, <break time='0.5s'/> och just idag informerar jag om tandv??rd."
}

const swe_question_01 = {
    "sentence": "Nu ??r jag fundersam p?? om ni vill l??ra er om tandtr??d <break time='0.5s'/> eller tandborstning? <break time='0.5s'/> Ni kan ocks?? avsluta samtalet." + swe_instructions.sentence,
    "flossa": "Trandtr??d",
    "brush": "Tandborste",
    "stop": "Avsluta"
};

const swe_question_01_alternative = {
    "sentence": "Vill ni l??ra er om n??got mer eller avsluta?",
    "flossa": "Trandtr??d",
    "brush": "Tandborste",
    "stop": "Avsluta"
}

const swe_outro = {
    "sentence": "Okej. <break time='0.5s'/> Sk??t om dig nu och ha det s?? bra."
}
/**** Flossa chapter ****
* video and 2 questions */

const swe_flossa_start = {
    "sentence": "Jag kommer visa en video fr??n folktandv??rden i Stockholm <break time='0.5s'/> och samtidigt ber??ttar jag om hur man anv??nder tandtr??d."
}

const swe_flossa_video_01 = {
    "pre_sentence":"Det ??r om??jligt att g??ra rent mellan t??nderna med en vanlig tandborste. <break time='0.5s'/> Tandk??ttsinflammationer och kariesangrepp \
    startar ofta d??r. <break time='0.5s'/> D??rf??r rekommenderas ni att anv??nda tandtr??d en g??ng varje dag innan ni borstar t??nderna. <break time='0.5s'/>", 
    "sentence": " Se till att ta en rej??l bit tandtr??d och linda den runt fingrarna. <break time='0.5s'/> \
    L??t tandtr??den sedan f??rsiktigt f??lja den ena tandytan ner i tandk??ttsfickan. <break time='0.5s'/>  \
    S??ga sedan upp och ner l??ngst med tandens yta n??gra g??nger innan du forts??tter p?? n??sta tand. <break time='1.0s'/> \
    G??r s?? mellan alla t??nder, ocks?? de l??ngst bak f??r b??sta resultat. <break time='3.5s'/>"
}


const swe_flossa_monologue_01 = {
    "sentence": "Hoppas videon var till nytta. <break time='0.5s'/> Nu har jag n??gra fr??gor ??t er f??r att se om ni verkligen lyssnade." + swe_instructions.sentence
}

const swe_flossa_question_01 = {
    "sentence": "Fr??ga 1. <break time='0.5s'/> Ibland b??rjar t??nderna bl??da n??r du anv??nder tandtr??d. Vad tror du det beror p??. S??g: fel \
    teknik, tecken p?? tandk??ttsinflammation, eller b??da.",
    "answerA": "Fel teknik",
    "answerB": "Tecken p?? tandk??ttsinflammation",
    "answerC": "B??da"
}

const swe_flossa_question_01_response = {
    "sentence": "B??da ??r r??tta svaret. <break time='1s'/>"
};

// tailored nextNode depending on user answer
const swe_flossa_question_02 = {
    "sentence": "Fr??ga 2. <break time='0.5s'/> Kommer ni ih??g hur ofta det rekommenderades att ni b??r anv??nda tandtr??d. Ni kan svara: varje dag, varannan dag eller tredje dag.",
    "answerA": "Varje",
    "answerB": "Varannan",
    "answerC": "Tredje",
    "correct": "Det var r??tt! Svaret ??r varje dag. <break time='1s'/>",
    "wrong": "Det var fel. Svaret ??r varje dag. <break time='1s'/>"
};

const swe_flossa_end = {
    "sentence": "Det var allt jag hade om tandtr??d. <break time='0.5s'/> Kom ih??g att diskutera med en riktig tandl??kare eller tandhygienist f??r att l??ra er mer."
}

/***** Brushing chapter *****
* 1 question and monologue */

const swe_brushing_start = {
    "sentence": "Jag har fem enkla punkter direkt fr??n folktandv??rdens hemsida om hur ni b??r borsta t??nderna."
}

const swe_brushing_monologue_01 = {
    "point_01": "1. Det ??r viktigt att du borstar dina t??nder p?? r??tt s??tt.<break time='0.5s'/>",
    "point_02":" 2. Borsta dina t??nder tv?? g??nger om dagen, morgon och kv??ll.<break time='0.5s'/>",
    "point_03":" 3. Borsta t??nderna i tv?? minuter, ungef??r en minut i vardera k??ke.<break time='0.5s'/>",
    "point_04":" 4. Spotta ut tandkr??men, men undvik att sk??lja munnen eller dricka n??got efter??t. <break time='0.5s'/> D?? sk??ljer du bort fluoret som skyddar dina t??nder.<break time='0.5s'/>",
    "point_05":" 5. K??nn med tungan efter??t om dina t??nder ??r rena. <break time='0.5s'/> Tungan ska glida l??tt och t??ndernas yta ska k??nnas glatt. Om ytan k??nns str??v beh??ver du borsta lite mer.<break time='0.5s'/>"
}

const swe_brushing_monologue_02 = {
    "sentence": "Nu har jag en fr??ga f??r att se om ni lyssnade."
}

const swe_brushing_question_01 = {
    "sentence": "<break time='0.5s'/> P??stod jag att det ??r b??ttre eller s??mre att sk??lja munnen efter tandborstning?" + swe_instructions.sentence,
    "answerA": "S??mre",
    "answerB": "B??ttre",
    "correct": "Vilken tur att ni visste! <break time='1.0s'/>",
    "wrong": "Nej. <break time='0.5s'/> Man b??r undvika att sk??lja eller dricka efter att man borstat t??nderna. <break time='1.0s'/>"
}

const swe_brushing_end = {
    "sentence": "Det var allt jag hade om tandborstning. <break time='0.5s'/> Kom ih??g att diskutera med en riktig tandl??kare eller tandhygienist f??r att l??ra er mer."
}