/* Krux is a Data Manaagement Platform and Tag Management solution
 * For more information visit www.kruxdigital.com */
var KRUXSetup = { pubid:"0fd0bb10-6db5-11df-be2b-0800200c9a66" };  // test publisher id
jQuery.gatling.declare([
   {
	  name: 'krux',
	  definition: {
		  path: 'cdn.krxd.net/krux.js',
		  globals: ['KRUXSetup']
	  }
   }
]);
jQuery.gatling.load([ { type: 'krux' }]);
