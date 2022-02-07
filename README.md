# Flossa V2 Concept - Kaldi branch
Interaction app for Flossa V2, using Kaldi and Snow

<span style="font-size:2em; color:#FF6666"> App must be run in Firefox on Snow</span>

## Preview

![preview](./media/readme/question.png)
![preview](./media/readme/talking.png)


## Files

### index.html
- index.html

### main.js
- Main logic

`nodeStart()`, loops nodes from *tree.js*, starting with `rootNode`

-   `currentNode` keeps track of active node
-   Child-nodes are set on parent-node to progress interaction
-   Each dialogue goes through textToSpeech() in *speech.js* to query for audio files.
-   Recording is controlled with `isRec()` variable.
    - Audio user input is handled with **webRTC**
    - User input outside scope of childnodes gets passed through `nodeStart()` with `currentNode` and attribute `understood` set to false
-   Depending on class and user input, childnode is set to `currentNode`.
-   New `currentNode` is activated with `nodeStart()`
-   Tree ends with node class `EndTree`


### text.js
- Holds all text as dictionaries that are used in tree.js
### tree.js
- Code for the interaction tree with 5 node classes
- All nodes but Video class requires a string for tts
- Make a parent node, then create the child node
  - Then set the child node on the parent node

  - Question
    - Takes between 2-3 answers for a question
    - Set child nodes with setNodes
    - Forwards new node in main.js -> checkUserInput()
  - trickQuestion
    - Takes between 2-3 answers for a question
    - Set child node with setNextNode
    - Forwards to next node in main.js -> checkUserInput()
  - Monologue
    - Only tts
    - Set child node with setNextNode
    - Forwards in speech.js
  - Video
    - Plays a video in a Modal
    - Can start and stop video on custom timers
    - Set child node with setNextNode
    - If give tts
      - Mutes video and talks
    - Else video plays with sound
    - Forwards to next node in main.js -> setVideo()
  - EndTree
    - Class that ends the interaction
    - Forwards/Ends in speech.js

- Current node tree layout

![tree](./media/readme/tree-flow.png)
### speech.js
- Contains code for tts & stt
- Forwards all classes but Video to next node and calls for recording
### interface.js
- Interface scripts
  - For example: toggle full screen, hide buttons or video modal
### ~~gesture.js~~
- ~~List of emotes and gesures~~
- ~~Function for sending gestures to SSE backend~~
- Remove? soon&trade;
### webRTC/
- Audio recording using webRTC files
- Soundmeter to gauge sound volume
- audio.js calls checkUserInput for Question and trickQuestion node classes to forward next node
### media/
- video tutorial and images
## Flow diagram
Shows how the application and its surrounding systems work in conjunction.
- Coming soon&trade;

