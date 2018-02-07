// createWindowsInstaller.js
// ------------------------------------------------------------------
//
// created: Tue Feb  6 16:40:26 2018
// last saved: <2018-February-07 14:52:44>

'use strict';

const childProcess = require('child_process');
const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');
const pkg = require('./package.json');
const commands = {'0-makeApp': 'electron-packager . electron-load-gen --asar --overwrite --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=Google --version-string.FileDescription=LoadGenerator --version-string.ProductName="Load Generator App"'};


Object.keys(commands).sort().forEach( (key) => {
  console.log('\n\n' + commands[key]);
  childProcess.execSync(commands[key], {stdio:[0,1,2]});
});

console.log('\n\n');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  })

function getVersionedInstallImageName() {
  return 'LoadGeneratorAppInstaller-'+ pkg.version +'.exe';
}

function getInstallerConfig () {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const releaseBuildPath = path.join(rootPath, 'release-builds');
  const installerOutPath = path.join(rootPath, 'installers');

  return Promise.resolve({
    appDirectory: path.join(releaseBuildPath, 'electron-load-gen-win32-ia32/'),
    authors: 'Dchiesa@google.com',
    noMsi: true,
    outputDirectory: path.join(installerOutPath, 'windows'),
    exe: 'electron-load-gen.exe',
    setupExe: getVersionedInstallImageName(),
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  });
}
