/****** Manuscript for robot ******/

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