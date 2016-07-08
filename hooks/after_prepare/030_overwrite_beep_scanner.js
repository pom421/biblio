#!/usr/bin/env node

var fs = require('fs');

var rootdir = process.argv[2];

if (rootdir) {
    var filename = 'silence.ogg';
    var dirPart = __dirname + '/resources/';
    if(fs.existsSync(dirPart + filename)) {
        fs.createReadStream(dirPart + filename).pipe(fs.createWriteStream('platforms/android/res/raw/beep.ogg'));
    } else {
        console.warn(dirPart + filename + ' does not exist');
    }
}
