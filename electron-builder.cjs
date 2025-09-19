/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: "com.2514765066.ym-video",
  productName: "ym-video",
  files: ["out"],
  asar: false,
  electronLanguages: ["zh-CN"],
  directories: {
    output: "dist/app",
  },

  win: {
    icon: "src/renderer/src/assets/icon.png",
  },
  nsis: {
    differentialPackage: false,
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    artifactName: "../installer/${name}-${version}-setup.${ext}",
    shortcutName: "${productName}",
    uninstallDisplayName: "${productName}",
    createDesktopShortcut: "always",
    deleteAppDataOnUninstall: true,
  },
};
