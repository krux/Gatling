// For more info on Qunit tests 
// http://net.tutsplus.com/tutorials/javascript-ajax/how-to-test-your-javascript-code-with-qunit/ 
var trackerTests = [ 
	{ 
		name: "gatling.tracker.krux.js", 
		runTests: function() { 
			module(this.name); 
			test("krux tracker", function() { 
				stop(); // tell qunit that this is async, run these later 
				expect(2); 

				ok(GatlingTest.tagExists("script", "krux.js"), "krux.js exists"); 
				ok(GatlingTest.tagExists("script", "cdn.krxd.net\/config"), "cdn.krxd.net/config call exists"); 

				setTimeout(start, 1500); // Wait this long to check to make sure it worked. 
			}); 
		} 
	}
    // Add more tests for other trackers here...

];
