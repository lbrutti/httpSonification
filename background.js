function logURL(requestDetails) {
    console.log("***********");
  console.log("Loading: " + requestDetails.url);
  ciao();
  var env = new Tone.AmplitudeEnvelope({
			"attack" : 0.11,
			"decay" : 0.21,
			"sustain" : 0.5,
			"release" : 1.2
		}).toMaster();

		//create an oscillator and connect it to the envelope
		var osc = new Tone.Oscillator({
			"partials" : [3, 2, 1],
			"type" : "custom",
			"frequency" : "C#4",
			"volume" : -8,
		}).connect(env).start();

				env.triggerAttack();
//				env.triggerRelease();

}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);
