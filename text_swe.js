/****** Manuscript for robot ******/

/************* SVENSKA *************/

// used when user responds in a way the stt can't compute
const sorry_repeat = '<speak> Jag förstod inte vad du menade? <break time="1s"/></speak>'

// used for user feedback
const feedback_container_before = "Vad jag hörde: "

// Words that are listened to for starting the interaction
const activationWords = [
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
const instructions = {
    "sentence": "<break time='0.5s'/> Ni kan svara genom tal eller med att trycka på min skärm. <break time='0.5s'/>"
}

const welcome = {
    "sentence": "Hej och välkommen. <break time='0,5'/> Jag heter Snow och hjälper till här i huset."
}

const present_purpose = {
    "sentence": "Jag brukar informera gäster och personal här i huset om olika saker <break time='0.5s'/> och just idag informera jag om tandvård."
}

const question_01 = {
    "sentence": "Nu är jag fundersam på om ni vill lära er om tandtråd <break time='0.5s'/> eller tandborstning? <break time='0.5s'/> Ni kan också avsluta samtalet." + instructions.sentence,
    "flossa": "Trandtråd",
    "brush": "Tandborste",
    "stop": "Avsluta"
};

const question_01_alternative = {
    "sentence": "Vill ni lära er om något mer eller avsluta?",
    "flossa": "Trandtråd",
    "brush": "Tandborste",
    "stop": "Avsluta"
}

const outro = {
    "sentence": "Okej. <break time='0.5s'/> Sköt om dig nu och ha det så bra."
}
/**** Flossa chapter ****
* video and 2 questions */

const flossa_start = {
    "sentence": "Jag kommer visa en video från folktandvården i Stockholm <break time='0.5s'/> och samtidigt berättar jag om hur man använder tandtråd."
}

const flossa_video_01 = {
    "sentence": "Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste. <break time='0.5s'/> Tandköttsinflammationer och kariesangrepp \
    startar ofta där. <break time='0.5s'/> Därför rekommenderas ni att använda tandtråden en gång varje dag innan ni borstar tänderna. <break time='0.5s'/>  Se till att ta en rejäl \
    bit tandtråd och linda den runt fingrarna. <break time='0.5s'/>  Låt tandtråden sedan försiktigt följa den ena tandytan ner i tandköttsfickan. <break time='0.5s'/>  Dra \
    tandtråden sedan sakta uppåt igen och för den ner tråden längs med den andra tandens yta och sedan upp igen. <break time='1.0s'/>  Gör så mellan alla tänder, också \
    de längst bak för bästa resultat."
}

const flossa_monologue_01 = {
    "sentence": "Hoppas videon var till nytta. <break time='0.5s'/> Nu har jag några frågor åt er för att se om ni verkligen lyssnade." + instructions.sentence
}

const flossa_question_01 = {
    "sentence": "Fråga 1. <break time='0.5s'/> Ibland börjar tänderna blöda när du använder tandtråd. Vad tror du det beror på. Säg: fel \
    teknik, tecken på tandköttsinflammation, eller båda.",
    "answerA": "Fel teknik",
    "answerB": "Tecken på tandköttsinflammation",
    "answerC": "Båda"
}

const flossa_question_01_response = {
    "sentence": "Båda är rätta svaret. <break time='1s'/>"
};

// tailored nextNode depending on user answer
const flossa_question_02 = {
    "sentence": "Fråga 2. <break time='0.5s'/> Kommer ni ihåg hur ofta det rekommenderades att ni bör använda tandtråd. Ni kan svara: varje dag, varannan dag eller tredje dag.",
    "answerA": "Varje",
    "answerB": "Varannan",
    "answerC": "Tredje",
    "correct": "Det var rätt! Svaret är varje dag. <break time='1s'/>",
    "wrong": "Det var fel. Svaret är varje dag. <break time='1s'/>"
};

const flossa_end = {
    "sentence": "Det var allt jag hade om tandtråd. <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
}

/***** Brushing chapter *****
* 1 question and monologue */

const brushing_start = {
    "sentence": "Jag har fem enkla punkter direkt från folktandvårdens hemsida om hur ni bör borsta tänderna."
}

const brushing_monologue_01 = {
    "point_01": "1. Det är viktigt att du borstar dina tänder på rätt sätt.<break time='0.5s'/>",
    "point_02":" 2. Borsta dina tänder två gånger om dagen, morgon och kväll.<break time='0.5s'/>",
    "point_03":" 3. Borsta tänderna i två minuter, ungefär en minut i vardera käke.<break time='0.5s'/>",
    "point_04":" 4. Spotta ut tandkrämen, men undvik att skölja munnen eller dricka något efteråt. <break time='0.5s'/> Då sköljer du bort fluoret som skyddar dina tänder.<break time='0.5s'/>",
    "point_05":" 5. Känn med tungan efteråt om dina tänder är rena. <break time='0.5s'/> Tungan ska glida lätt och tändernas yta ska kännas glatt. Om ytan känns sträv behöver du borsta lite mer.<break time='0.5s'/>"
}

const brushing_monologue_02 = {
    "sentence": "Nu har jag en fråga för att se om ni lyssnade."
}

const brushing_question_01 = {
    "sentence": "<break time='0.5s'/> Påstod jag att det är bättre eller sämre att skölja munnen efter tandborstning?" + instructions.sentence,
    "answerA": "Sämre",
    "answerB": "Bättre",
    "correct": "Vilken tur att ni visste! <break time='1.0s'/>",
    "wrong": "Nej. <break time='0.5s'/> Man bör undvika att skölja eller dricka efter att man borstat tänderna. <break time='1.0s'/>"
}

const brushing_end = {
    "sentence": "Det var allt jag hade om tandborstning. <break time='0.5s'/> Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
}