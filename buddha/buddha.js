const tmi = require('tmi.js');

// Define configuration options
var identity = require('./identity.json');
const opts = identity;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } 
  else if (commandName == '!helloworld') {
    client.say(target, `Hello World!`);
    console.log(`* Executed ${commandName} command`);
  }
  else if (commandName.search(`@${identity.identity.username}`) != -1) {
    if (commandName.toLowerCase().search('hi') != -1 || commandName.toLowerCase().search('hello') != -1) {
      client.say(target, `Hello ${context.username} !`);
    }
  }
  else if (commandName == '!pc') {
    client.say(target, `${context.username} Buddha plays on the Alienware Gaming Desktop | Intel core i7-9700 CPU | NVIDIA GeForce RTX 2060 GPU`);
    console.log(`* Executed ${commandName} command`);
  }
  else if (commandName == '!mic') {
    client.say(target, 'Buddha is using the HyperX Quadcast!');
    commandExecuted(commandName);
  }
  else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a command executes successfully
function commandExecuted(commandName) {
  console.log(`* Executed ${commandName} command`);
}