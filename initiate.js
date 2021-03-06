// Create node tree from tree.js, save rootNode incase of reset
const rootNodeSwe = createTreeSwe();
const rootNodeEng = createTreeEng();
let currentNode = appLanguage === "swe" ? rootNodeSwe : rootNodeEng;

// Call and create functions from the speech.js file
let textToSpeech = createSpeechFunction();

// Initialization
document.getElementById("speak").addEventListener("click", () => {
    currentNode = appLanguage === "swe" ? rootNodeSwe : rootNodeEng;
    // Disable voice activation
    idle = false;
    // Disable language toggle
    document.getElementById("app-language").disabled = true;
    // Hide start-wrapper
    changeInterfaceIntoInteraction();
    nodeStart(currentNode)
})
