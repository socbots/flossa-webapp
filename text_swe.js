/****** Manuscript for robot ******/

/************* SVENSKA *************/

const intro = {
    "sentence": "Hej! Jag heter Alf och hjälper till här i tandvården. Vill du lära dig hur du använder tandtråd på bästa sätt? Du kan svara genom tal eller med att trycka på min skärm.",
    "continue_no": "Nej",
    "continue_yes": "Ja"
};

const cancel = "Ha en trevlig dag!"

const sentence_video = {
    "sentence": "Fint. Det är omöjligt att göra rent mellan tänderna med en vanlig tandborste. Tandköttsinflammationer och kariesangrepp \
                startar ofta där. Därför rekommenderas du att använda tandtråden en gång varje dag innan du borstar tänderna. Ta en rejäl \
                bit tandtråd och linda den runt fingrarna. Låt tandtråden försiktigt följa den ena tandytan ner i tandköttsfickan. Dra \
                den sakta uppåt igen. För sedan ner tråden längs med den andra tandytan och upp igen. Gör så mellan alla tänder, också \
                de längst bak."
};

const question_01 = {
    "sentence": "Nu har jag en fråga till dig. Ibland börjar tänderna blöda när du använder tandtråd. Vad tror du det kan bero på. Säg: fel \
    teknik, tecken på tandköttsinflammation, eller båda. Du kan också svara genom att trycka på min skärm.",
    "answerA": "Fel teknik",
    "answerB": "Tecken på tandköttsinflammation",
    "answerC": "Båda"
};

const monologue_01 = {
    "sentence": "Båda är rätta svaret <break time='1s'/>"
};

const question_02 = {
    "sentence": "Kommer du ihåg hur ofta jag rekommenderade att du ska använda tandtråd. Säg: varje dag, varannan dag eller tredje dag. \
                Du kan också svara genom att trycka på min skärm.",
    "answerA": "Varje",
    "answerB": "Varannan",
    "answerC": "Tredje",
    "correct": "Det var rätt! Svaret är varje dag <break time='1s'/>",
    "wrong": "Det var fel. Svaret är varje dag <break time='1s'/>"
};

const outro = "Diskutera gärna med tandläkaren eller tandhygienisten vilken om vilken tandtråd,eller borste som passar dig. \
                Sköt om dig nu och ha det så bra"

const sorry_repeat = '<speak> Jag förstod inte vad du menade? <break time="1s"/></speak>'

const feedback_container_before = "Vad jag hörde: "

// Words that are listened to for starting the interaction
const activationWords = [
    "hallå",
    "hej",
    "hejsan",
    "robotar har inga känslor",
];