# hackergame
 mewers
 'documentation' https://docs.google.com/document/d/1qulZxqb0ykvaMYeg1E4vAU6W3Bzf1skhGS0jIsoFAGw/edit?usp=sharing

# How to run
This website requires a web server to run. If you have mamp or wamp installed you can use that. 

Alternatively, we recommend using VSCode and the live server extension. Steps for this are as follows:
1. Install VSCode, VSCode has javascript interpretation built in
2. Go to extensions on the left bar
3. Look up Live Server by Ritwick Dey
4. Install this extension
5. Download all of our files. 
6. Open the folder and select the index.html file
7. On the bottom right there is a button named Go Live, click it
8. The web game should open up in your browser

# About our game
Hello! This is our submission to the 2024 Spring UA Hackathon. 
This is Sigma Blasters, a rogue-lite deckbuilding word game. First, you'll be given a deck of letters and some money to purchase additional letters from the shop.
When you're ready, you can embark on your journey to conquor the 10 sigmas of SWE and IEEE. You'll draw letters from your deck and play dictionary-authenticated words to deal damage to the Sigmas.

# About the development
Since we are all aspiring web developers, we took this chance to delve into javascript and it's potential for game development. 
We decided to use the Phaser 3 framework, which is well documented 2d game engine. We've learned a lot, and are excited to show you what we came up with!

# How to read our code
Almost all of our code is written in Phaser javascript files. Our webpage is displayed with index.htm, which loads all of our scenes (the .js scripts).
Here is the flow of our scenes, and a brief description of what the scenes do.

1. Main, preloads all of our assets and immediately goes to the Start scene.
2. Start, initializes all of our variables and displayes the start screen for the game. Links to tutorial, credits, and shop scene. 
3. Tutorial, explains how to play the game
4. Credits, gives credits to the game makers
5. Shop, the first part of the game. The shop displays cards to be bought with money, and a button to challenge the Sigma. 
6. Boss, the combat scene with a Sigma, your hand, and the ability to play words. After the boss dies, the user is sent to a shop, or the win screen if they've beat all 10 sigmas. 
7. Win, the winning screen! Only the Sigma Blaster can reach this scene. 

All of our scenes extend Phaser.scene, which gives them access to create(), preload(), and update(). Create will run when the scene is first called. 
Create has the majority of our code, since that is where we will create the majority of the content on the page. 
Preload will load any assets you need for the scene. Update is called every frame of the game, and is used for drawing things that change through the scene. 

The majority of our code is elements (text, images, buttons) that are drawn. Interactable elements have listeners to react when clicked/hovered on. 

# Authors
Phoenix Garcia, Maxamillian Mace, Samuel Moreno, William Rains