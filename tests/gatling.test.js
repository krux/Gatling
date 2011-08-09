var GatlingTest = {
    debug:          true, // turn on console messages
    reportErrors:   true // report javascript errors as a failed test
};

GatlingTest.debug = function(msg) {
    this.debug && window.console && window.console.log(msg);
};


GatlingTest.loadScript = function(url, onload){
    GatlingTest.debug("Loading " + url);
    var tag = document.createElement("script");
    tag.src = url;
    var script1 = document.getElementsByTagName('script')[0];
    script1.parentNode.insertBefore(tag, script1);
};


GatlingTest.tagExists = function (tagType, domain) {
    GatlingTest.debug("Checking for a tag of " + tagType + " matching " + domain);
	var tags = document.getElementsByTagName(tagType);
	var re = new RegExp(domain, i);
	for (var i = 0, l = tags.length; i < l; i++){
		if (re.test(tags[i].src)) {
			return true;
		}
	}
	return false;
};


/* Thin wrapper around qunit */
GatlingTest.wrapper = function (testName, actual, expected){
    window.test(testName, function() {
        window.expect(1);
        window.strictEqual(actual, expected);
    });
};


GatlingTest.waitForIt = function (testName, testFunc, runFunc, interval, tries){
    interval = interval || 75;
    tries = tries || 1;
    if (testFunc()){
        runFunc();
    } else if ((interval * tries) < this.maxTime){
        tries++;
        window.setTimeout(function(){ GatlingTest.waitForIt(testName, testFunc, runFunc, interval, tries);}, interval);
    } else {
        GatlingTest.wrapper(testName + ": gave up waiting afterl " + (tries * interval) + " milliseconds", true, false);
    }
};


GatlingTest.onerror = function(msg, url, line) {
    if (! GatlingTest.reportErrors) {
        return false;
    }
    var m;
    if (arguments.length === 3) {
        m = msg;
    } else {
        // Safari <= 5.0 passes an object instead of 3 args
        // Only for script download errors though
        for (var key in msg) {
            m += key + "=" + msg[key] + ";";
        }
    }

    GatlingTest.wrapper("Javascript error: " + m + " on line #" + line + " of " + url, true, false);

    return false; // so the error continues to bubble to the browser
};
window.onerror = GatlingTest.onerror;
