
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
const application = require("tns-core-modules/application");

var transitions;

if (application.ios) {
  transitions = [/*"curl", "curlDown", "fade", "flip", "flipLeft", "slide"/*, "slideRight", "slideTop", */"slideBottom"];
  } else {
    transitions = [/*"explode", "fade", "flip", "flipLeft", "slide", "slideRight", "slideTop", */"slideBottom"];
  }

exports.pageLoaded = function (args) {
    const page = args.object;
}

exports.onNavigate = function (args) {
  args.object.page.frame.navigate({
    moduleName: "home/home-page",
    animated: true,
    transition: {
      name: transitions[Math.floor(Math.random() * transitions.length)],
      duration: 380,
      curve: "easeIn"
    }
  });
}