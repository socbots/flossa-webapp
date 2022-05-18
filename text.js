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
    "sentence": "Now I wonder, <break time='0,5s'/> would you like to learn about dental floss <break time='0.5s'/> or how to brush your teeth today? <break time='0.5s'/> You may also end the conversation." + eng_instructions.sentence,
    "flossa": "Floss",
    "brush": "Brush",
    "stop": "End"
};

const eng_question_01_alternative = {
    "sentence": "Would you like to learn something more or end the conversation?",
    "flossa": "Floss",
    "brush": "Brush",
    "stop": "End"
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
const swe_feedback_container_before = "Vad jag hörde: "

// Words that are listened to for starting the interaction
const swe_activationWords = [
    "hallå",
    "hej",
    "hejsan",
    "börja",
    "starta",
    "snow",
    "start",
    "begin",
    "activate"
];

// intructions sentence with speech pauses before and after
const swe_instructions = {
    "sentence": "<break time='0.5s'/> Ni kan svara genom tal eller med att trycka på min skärm. <break time='0.5s'/>"
}

const swe_welcome = {
    "sentence": "Hej och välkommen. <break time='0,5'/> Jag heter Snow och hjälper till här i huset."
}

const swe_present_purpose = {
    "sentence": "Jag brukar informera gäster och personal här i huset om olika saker, <break time='0.5s'/> och just idag informerar jag om tandvård."
}

const swe_question_01 = {
    "sentence": "Nu är jag fundersam på om ni vill lära er om tandtråd <break time='0.5s'/> eller tandborstning? <break time='0.5s'/> Ni kan också avsluta samtalet." + swe_instructions.sentence,
    "flossa": "Trandtråd",
    "brush": "Tandborste",
    "stop": "Avsluta"
};

const swe_question_01_alternative = {
    "sentence": "Vill ni lära er om något mer eller avsluta?",
    "flossa": "Trandtråd",
    "brush": "Tandborste",
    "stop": "Avsluta"
}

const swe_outro = {
    "sentence": "Okej. <break time='0.5s'/> Sköt om dig nu och ha det så bra."
}
/**** Flossa chapter ****
* video and 2 questions */

const swe_flossa_start = {
    "sentence": "Jag kommer visa en video från folktandvården i Stockholm <break time='0.5s'/> och samtidigt berättar jag om hur man använder tandtråd."
}

const swe_flossa_video_01 = {
    "pre_sentence":"Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste. <break time='0.5s'/> Tandköttsinflammationer och kariesangrepp \
    startar ofta där. <break time='0.5s'/> Därför rekommenderas ni att använda tandtråd en gång varje dag innan ni borstar tänderna. <break time='0.5s'/>", 
    "sentence": " Se till att ta en rejäl bit tandtråd och linda den runt fingrarna. <break time='0.5s'/> \
    Låt tandtråden sedan försiktigt följa den ena tandytan ner i tandköttsfickan. <break time='0.5s'/>  \
    Såga sedan upp och ner längst med tandens yta några gånger innan du fortsätter på nästa tand. <break time='1.0s'/> \
    Gör så mellan alla tänder, också de längst bak för bästa resultat. <break time='3.5s'/>"
}


const swe_flossa_monologue_01 = {
    "sentence": "Hoppas videon var till nytta. <break time='0.5s'/> Nu har jag några frågor åt er för att se om ni verkligen lyssnade." + swe_instructions.sentence
}

const swe_flossa_question_01 = {
    "sentence": "Fråga 1. <break time='0.5s'/> Ibland börjar tänderna blöda när du använder tandtråd. Vad tror du det beror på. Säg: fel \
    teknik, tecken på tandköttsinflammation, eller båda.",
    "answerA": "Fel teknik",
    "answerB": "Tecken på tandköttsinflammation",
    "answerC": "Båda"
}

const swe_flossa_question_01_response = {
    "sentence": "Båda är rätta svaret. <break time='1s'/>"
};

// tailored nextNode depending on user answer
const swe_flossa_question_02 = {
    "sentence": "Fråga 2. <break time='0.5s'/> Kommer ni ihåg hur ofta det rekommenderades att ni bör använda tandtråd. Ni kan svara: varje dag, varannan dag eller tredje dag.",
    "answerA": "Varje",
    "answerB": "Varannan",
    "answerC": "Tredje",
    "correct": "Det var rätt! Svaret är varje dag. <break time='1s'/>",
    "wrong": "Det var fel. Svaret är varje dag. <break time='1s'/>"
};

const swe_flossa_end = {
    "sentence": "Det var allt jag hade om tandtråd. <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
}

/***** Brushing chapter *****
* 1 question and monologue */

const swe_brushing_start = {
    "sentence": "Jag har fem enkla punkter direkt från folktandvårdens hemsida om hur ni bör borsta tänderna."
}

const swe_brushing_monologue_01 = {
    "point_01": "1. Det är viktigt att du borstar dina tänder på rätt sätt.<break time='0.5s'/>",
    "point_02":" 2. Borsta dina tänder två gånger om dagen, morgon och kväll.<break time='0.5s'/>",
    "point_03":" 3. Borsta tänderna i två minuter, ungefär en minut i vardera käke.<break time='0.5s'/>",
    "point_04":" 4. Spotta ut tandkrämen, men undvik att skölja munnen eller dricka något efteråt. <break time='0.5s'/> Då sköljer du bort fluoret som skyddar dina tänder.<break time='0.5s'/>",
    "point_05":" 5. Känn med tungan efteråt om dina tänder är rena. <break time='0.5s'/> Tungan ska glida lätt och tändernas yta ska kännas glatt. Om ytan känns sträv behöver du borsta lite mer.<break time='0.5s'/>"
}

const swe_brushing_monologue_02 = {
    "sentence": "Nu har jag en fråga för att se om ni lyssnade."
}

const swe_brushing_question_01 = {
    "sentence": "<break time='0.5s'/> Påstod jag att det är bättre eller sämre att skölja munnen efter tandborstning?" + swe_instructions.sentence,
    "answerA": "Sämre",
    "answerB": "Bättre",
    "correct": "Vilken tur att ni visste! <break time='1.0s'/>",
    "wrong": "Nej. <break time='0.5s'/> Man bör undvika att skölja eller dricka efter att man borstat tänderna. <break time='1.0s'/>"
}

const swe_brushing_end = {
    "sentence": "Det var allt jag hade om tandborstning. <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
}