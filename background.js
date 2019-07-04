
let env = new Tone.AmplitudeEnvelope({
	"attack": 0.11,
	"decay": 0.21,
	"sustain": 0.5,
	"release": 1.2
}).toMaster();

let envSet = {};
let oscSet = {};

function onBeforeRequestHandler(requestDetails) {
	envSet[requestDetails.url]=envSet[requestDetails.url] || new Tone.AmplitudeEnvelope({
		"attack": 0.5,
		"decay": 0,
		"sustain": 0,
		"release": 0
	}).toMaster();
	oscSet[requestDetails.url] = oscSet[requestDetails.url] || new Tone.Oscillator({
		"partials": [3, 2, 1],
		"type": "custom",
		"frequency": Math.random()*20000,
		"volume": -8,
	}).connect(envSet[requestDetails.url]).start();

	envSet[requestDetails.url].triggerAttack();

}

function onCompletedHandler(requestDetails){
	envSet[requestDetails.url].triggerRelease();
}

browser.webRequest.onBeforeRequest.addListener(
	onBeforeRequestHandler,
	{ urls: ["<all_urls>"] }
);

browser.webRequest.onCompleted.addListener(
	onCompletedHandler, 
	{ urls: ["<all_urls>"] }
);
