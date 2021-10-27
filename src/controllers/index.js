import fs from 'fs'
import path from 'path';
const files = fs.readdirSync(__dirname);

files.forEach(function(file){

	var fileName = path.basename(file, '.js');
	if(fileName !== 'index'){
		exports[fileName]= require('./'+fileName);
	}

});