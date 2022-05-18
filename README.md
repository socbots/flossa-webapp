# Flossa V2
**Webapp using node-tree structure to interact and teach users how to use floss with Coqui-ai STT and Google TTS**
**Build for the [MäRI project](https://www.arcada.fi/sv/forskning/projekt/mari-manniska-robot-interaktion-den-sociala-roboten) at Arcada 2022**

# Table of Contents



Write a goal
Dual language interaction app for Flossa V2, using Coqui-ai STT on the robot Snow
summary stuff

# Preview

![preview](./media/readme/question.png)
![preview](./media/readme/talking.png)


# Technologies

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [WebRTC](https://webrtc.org/)
- [Socket.IO](https://socket.io/)

# Scope of functionalities

# Examples of use

# Project status

# Sources

# Other information




# Files

## index.html
- index.html 

## text.js
- Objects for text to the application, used primarily in *tree.js*

## functions.js
`nodeStart()`, loops nodes from *tree.js*, starting with `rootNode`

-   `currentNode` keeps track of active node
-   Child-nodes are set on parent-node to progress interaction
-   Each dialogue goes through textToSpeech() in *speech.js* to query for audio files.
    - Audio user input is handled with **webRTC && Coqui-ai**
    - User input outside scope of childnodes gets passed through `nodeStart()` with `currentNode`
-   Depending on class and user input, childnode is set to `currentNode`.
-   New `currentNode` is activated with `nodeStart()`
-   Tree ends with node class `EndTree`
	- `EndTree` refreshes page with reload.

When node has been passed through tts it goes to
- interaction()
  - interaction handles node based on class and forwards to appropriate functionality

## speech.js
- Contains code for tts & stt
- Forwards all classes but Video to next node and calls for recording

## tree.js
Code for the interaction tree with 5 node classes.

`Question`<br>
Takes between 2-3 answers for a question<br>
Set child nodes with setNodes

`trickQuestion`<br>
Takes between 2-3 answers for a question<br>
Set child node with setNextNode

`Monologue`<br>
Only tts<br>
Set child node with setNextNode

`Video`<br>
Plays a video in a Modal<br>
Can start and stop video on custom timers<br>
Set child node with setNextNode<br>
If given text for tts:<br>
&ensp;&ensp;&ensp; Mutes video and lets the robot talk or lets the video play with sound.

`EndTree`<br>
Class that ends the interaction


### To build a tree:
- First make a parent node
- Then create the child node
- Finally set the child node on the parent node
- Additional parameters, like video, set as needed
- All nodes but `Video` class **requires a string** for tts


## initiate.js
- Initiates the app and sets the application
- import after other scripts but before webRTC module


## webRTC/
- Audio recording using webRTC files
- Soundmeter to gauge sound volume
- audio.js calls checkUserInput for Question and trickQuestion node classes to forward next node

## media/
- video tutorial and images


