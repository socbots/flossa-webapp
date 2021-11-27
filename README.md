# alf_frontend
Interaction app for alf robot

<span style="font-size:2em; color:#FF6666"> App must be run in Firefox </span>
## Preview

![preview_gif](./media/readme/preview.gif)


## Files

### index.html
- index.html

### main.js
- Main logic

`forwardNodeTree()`, loops nodes from *tree.js*, starting with `rootNode`

-   `currentNode` keeps track of active node
-   Child-nodes are set on parent-node to progress interaction
-   Each dialogue goes through textToSpeech() in *speech.js* to query for audio files.
-   Recording is controlled with `isRec()` variable.
    - Audio user input is handled with **webRTC**
    - User input outside scope of childnodes gets passed through `forwardNodeTree()` with `currentNode` and attribute `understood` set to false
-   Depending on class and user input, childnode is set to `currentNode`.
-   New `currentNode` is activated with `forwardNodeTree()`
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
    - Forwards new node in main.js -> checkInput()
  - trickQuestion
    - Takes between 2-3 answers for a question
    - Set child node with setNextNode
    - Forwards to next node in main.js -> checkInput()
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
### gesture.js
- List of emotes and gesures
- Function for sending gestures to SSE backend
### webRTC/
- Audio recording using webRTC files
- Soundmeter to gauge sound volume
- audio.js calls checkInput for Question and trickQuestion node classes to forward next node

### media/
- video tutorial and images

### englishVersionResources/
- modified files to build an English version of the app
  - mainly url changes

## Flow diagram
Shows how the application and its surrounding systems work in conjunction.
![flow](./media/readme/alf-flow-long.png)

## 3rd party services
The following services and applications are used to make the whole system work.

### TTS & STT
[Github](https://github.com/socbots/ALFTTSNuggPy)

Available on [heroku](https://alf-tts-api.herokuapp.com/)

- Uses google services for text-to-speech and speech-to-text
- Different ports for Swedish and English

Can also be run on local Raspberry

### SSE Backend
[Github](https://github.com/socbots/sse_backend)

Run on local Raspberry

- Stream to post movement commands for Mobile SDK

### Mobile SDK
[Github](https://github.com/socbots/MobileSDK)

Run from phone in virtualwing @Arcada

- Grants access to movements
- Listens to SSE stream for movement instructions
