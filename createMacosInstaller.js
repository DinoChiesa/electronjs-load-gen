// createMacosInstaller.js
// ------------------------------------------------------------------
//
// created: Tue Feb  6 16:40:26 2018
// last saved: <2018-February-07 14:53:59>

'use strict';

const path = require('path');
const pkg = require('./package.json');
const childProcess = require('child_process');
const targetDmg = 'installers/macos/electron-load-generator-'+ pkg.version + '.dmg';
const commands = {

  '0-makeApp': 'electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds',
  '1-makeDmg' : 'electron-installer-dmg ./release-builds/electron-load-generator-darwin-x64/electron-load-generator.app  electron-load-generator',
  '2-mvDmg' : 'mv electron-load-generator.dmg ' + targetDmg,
  '3-computeSha': 'shasum -a 256 '  + targetDmg
};


Object.keys(commands).sort().forEach( (key) => {
  console.log('\n\n' + commands[key]);
  childProcess.execSync(commands[key], {stdio:[0,1,2]});
});
