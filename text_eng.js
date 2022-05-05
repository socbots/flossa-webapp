/************* English *************/
/****** Manuscript for robot ******/

// Words that are listened to for starting the interaction
const activationWordsEng = [
    "hello",
    "hi",
    "hey",
    "computer",
    "okay google",
];

const sorryRepeatEng = '<speak> Sorry, I did not understand you? <break time="1s"/></speak>'

// used for user feedback
const feedBackContainerBeforeEng = "What I heard: "

const treeEng = {
    type: "monologue",
    sentence: "Hello and welcome! <break time='0,5'/> My name is Snow and I help around here in the building.",
    nextNode: {
        type: "monologue",
        sentence: "I usually inform guests and staff about relevant happenings in the house \
            <break time='0.5s'/> and today I am informing about dental hygene.",
        nextNode: {
            type: "question",
            checkpoint: true,
            sentence: "Now I'm wondering if you'd like to learn about dental flossing<break time='0.5s'/> \
            or brushing techniques? <break time='0.5s'/> You can also choose to stop this dialogue.",
            answerA: "Floss",
            nodeA: {
                type: "monologue",
                sentence: "Now I am going to show you a video from the Swedish Public Dental Care \
                <break time='0.5s'/> and simultaneously tell you how to use dental floss.",
                nextNode: {
                    type: "video",
                    sentence: "It is impossible to completely clean between your teeth with a standard toothbrush.\
                    <break time='0.5s'/> Gingivitis and caries attack usually start from there.\
                    <break time='0.5s'/> That is why it is recommended that you use dental \
                    floss at least once a day before you brush your teeth. <break time='0.5s'/> \
                    Take a long enough string of dental floss and spin it around your fingers \
                    <break time='0.5s'/>  Let the dental floss carefully follow the outline of your tooth and down into the gum. \
                    <break time='0.5s'/>  Pull the dental floss carefully up again and down on the other side of your tooth. \
                    <break time='1.0s'/>  Repeat this stage for each tooth, even the ones in the back.",
                    videoUrl: "./media/tutorial540p.mp4#t=12",
                    videoDelayStart: 12000,
                    videoDuration: 20000,
                    nextNode: {
                        type: "monologue",
                        sentence: "I hope the video was useful. <break time='0.5s'/> \
                        Now I have a few questions for you to make sure you really listened.",
                        nextNode: {
                            type: "trickQuestion",
                            sentence: "Question 1. <break time='0.5s'/> Sometimes your gum starts to bleed when you use dental floss. \
                            What do you think is the cause of this. Say bad technique, signs of gingivitis, or both.",
                            answerA: "Bad technique",
                            answerB: "Signs of gingivitis",
                            answerC: "Both",
                            nextNode: {
                                type: "monologue",
                                sentence: "Both is the correct answer. <break time='1s'/>",
                                nextNode: {
                                    type: "question",
                                    sentence: "Question 2. <break time='0.5s'/> Do you remember how often I \
                                    recommended you use dental floss. Say: every day, every other day or every third day",
                                    answerA: "Every day",
                                    nodeA: {
                                        type: "monologue",
                                        sentence: "That was correct! It is every day. <break time='1s'/>",
                                        nextNode: {
                                            type: "reset",
                                            sentence: "That's all I had about flossing. \
                                    <break time='0.5s'/> Please discuss with your dentist or dental hygienist \
                                    about what dental floss or toothbrush fits your needs the best.",
                                        },
                                    },
                                    answerB: "Other day",
                                    nodeB: {
                                        type: "monologue",
                                        sentence: "That was wrong. It is every day. <break time='1s'/>",
                                        nextNode: {
                                            type: "reset",
                                            sentence: "That's all I had about flossing. \
                                    <break time='0.5s'/> Please discuss with your dentist or dental hygienist \
                                    about what dental floss or toothbrush fits your needs the best.",
                                        },
                                    },
                                    answerC: "Third day",
                                    nodeC: {
                                        type: "monologue",
                                        sentence: "That was wrong. It is every day. <break time='1s'/>",
                                        nextNode: {
                                            type: "reset",
                                            sentence: "That's all I had about flossing. \
                                    <break time='0.5s'/> Please discuss with your dentist or dental hygienist \
                                    about what dental floss or toothbrush fits your needs the best.",
                                        },
                                    },
                                }
                            }
                        }
                    }
                }
            },
            answerB: "Brush",
            nodeB: {
                type: "monologue",
                sentence: "Jag har fem enkla punkter direkt från folktandvårdens hemsida om hur ni bör borsta tänderna.",
                nextNode: {
                    type: "monologue",
                    sentence: "1. Det är viktigt att du borstar dina tänder på rätt sätt.<break time='0.5s'/>",
                    nextNode: {
                        type: "monologue",
                        sentence: "2. Borsta dina tänder två gånger om dagen, morgon och kväll.<break time='0.5s'/>",
                        nextNode: {
                            type: "monologue",
                            sentence: "3. Borsta tänderna i två minuter, ungefär en minut i vardera käke.<break time='0.5s'/>",
                            nextNode: {
                                type: "monologue",
                                sentence: "4. Spotta ut tandkrämen, men undvik att skölja munnen \
                                eller dricka något efteråt. <break time='0.5s'/> Då sköljer du bort fluoret som skyddar dina tänder.<break time='0.5s'/>",
                                nextNode: {
                                    type: "monologue",
                                    sentence: "5. Känn med tungan efteråt om dina tänder är rena. \
                                    <break time='0.5s'/> Tungan ska glida lätt och tändernas yta ska \
                                    kännas glatt. Om ytan känns sträv behöver du borsta lite mer.<break time='0.5s'/>",
                                    nextNode: {
                                        type: "monologue",
                                        sentence: "Nu har jag en fråga för att se om ni lyssnade.",
                                        nextNode: {
                                            type: "question",
                                            sentence: "<break time='0.5s'/> Påstod jag att det är bättre\
                                             eller sämre att skölja munnen efter tandborstning?",
                                            answerA: "Sämre",
                                            nodeA: {
                                                type: "monologue",
                                                sentence: "Vilken tur att ni visste! <break time='1.0s'/>",
                                                nextNode: {
                                                    type: "reset",
                                                    sentence: "Det var allt jag hade om tandborstning. <break time='0.5s'/> \
                                            Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
                                                }
                                            },
                                            answerB: "Bättre",
                                            nodeB: {
                                                type: "monologue",
                                                sentence: "Nej. <break time='0.5s'/> Man bör undvika att skölja\
                                                 eller dricka efter att man borstat tänderna. <break time='1.0s'/>",
                                                nextNode: {
                                                    type: "reset",
                                                    sentence: "Det var allt jag hade om tandborstning. <break time='0.5s'/> \
                                            Kom ihåg att diskutera med en riktig tandläkare eller tandhygienist för att lära er mer."
                                                }
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            answerC: "Quit",
            nodeC: {
                type: "reset",
                sentence: "Okay. <break time='0.5s'/> Take care now and farewell.",
            }
        }
    }
};
