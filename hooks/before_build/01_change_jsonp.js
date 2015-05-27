#!/usr/bin/env node
 
// Reemplaza la cadena de la web a la del app
// Sacado de aquí: http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

var fs = require('fs');
var path = require('path');
 
var rootdir = process.argv[2];
 
function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}
 
var target = "stage";
if (process.env.TARGET) {
    target = process.env.TARGET;
}
 
if (rootdir) {
    // CONFIGURE HERE
    // with the names of the files that contain tokens you want 
    // replaced.  Replace files that have been copied via the prepare step.
    var filestoreplace = [
        // android
        "www/index.html",
    ];
    filestoreplace.forEach(function(val, index, array) {
        var fullfilename = path.join(rootdir, val);
        if (fs.existsSync(fullfilename)) {
            // CONFIGURE HERE
            // with the names of the token values. For example, 
            // below we are looking for the token 
            // /*REP*/ 'api.example.com' /*REP*/ and will replace 
            // that token
	    console.log(fullfilename);
            replace_string_in_file(fullfilename, 
				   "'resultados.jsonp'", 
				   "'http://elecciones-ugr.github.io/resultados.jsonp'" );
	    replace_string_in_file(fullfilename, 
				   "'resultados.json'", 
				   "'http://elecciones-ugr.github.io/resultados.json'" );
	    replace_string_in_file(fullfilename, 
				   "resultados.csv", 
				   "'http://elecciones-ugr.github.io/resultados.csv'" );
		
            // ... any other configuration options
        } else {
            //console.log("missing: "+fullfilename);
        }
    });
 
}
