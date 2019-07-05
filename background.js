
let envSettings = {
	"attack": 0.01,
	"decay": 0.21,
	"sustain": 0,
	"release": 0.29
};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let envSet = {};
let oscSet = {};
let pentatonicCmin = ["Co", "Eob", "Fo", "Go", "Bosib"];
function onBeforeRequestHandler(requestDetails) {
  let octave = getRandomInt(2,10);
	envSet[requestDetails.url]=envSet[requestDetails.url] || new Tone.AmplitudeEnvelope(envSettings).toMaster();
	oscSet[requestDetails.url] = oscSet[requestDetails.url] || new Tone.Oscillator({
		"partials": [3, 2, 1],
		"type": "custom",
		"frequency": pentatonicCmin[getRandomInt(0,4)].replace("o",octave),
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
