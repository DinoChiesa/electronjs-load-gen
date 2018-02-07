// createInstaller.js
// ------------------------------------------------------------------
//
// created: Tue Feb  6 16:40:26 2018
// last saved: <2018-February-06 16:47:47>

'use strict';

const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  })

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
    setupExe: 'ElectronLoadGeneratorAppInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  });
}
