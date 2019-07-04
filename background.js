function onBeforeRequestHandler(requestDetails) {
	console.log("***********");
	console.log("Loading: " + requestDetails.url);

	oscSet[requestDetails.url] = oscSet[requestDetails.url] || new Tone.Oscillator({
		"partials": [3, 2, 1],
		"type": "custom",
		"frequency": "C#4",
		"volume": -8,
	}).connect(env).start();

	env.triggerAttack();

}

function onCompleteddHandler(requestDetails){
	env.triggerRelease();
}
let env = new Tone.AmplitudeEnvelope({
	"attack": 0.11,
	"decay": 0.21,
	"sustain": 0.5,
	"release": 1.2
}).toMaster();
let oscSet = {};
browser.webRequest.onBeforeRequest.addListener(
	onBeforeRequestHandler,
	{ urls: ["<all_urls>"] }
);

browser.webRequest.onCompleted.addListener(
	onCompleteddHandler, 
	{ urls: ["<all_urls>"] }
);
