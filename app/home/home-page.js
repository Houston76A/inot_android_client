/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

// const HomeViewModel = require("./home-view-model")
// const dialogsModule = require("tns-core-modules/ui/dialogs");
const {fromObjectRecursive} = require('tns-core-modules/data/observable')
const application = require("tns-core-modules/application");
const httpModule = require("tns-core-modules/http");
const applicationModule = require("tns-core-modules/application");
// const Button = require("tns-core-modules/ui/button").Button;

// const myButton = new Button();
// myButton.text = "Tap me!";
// myButton.className = "btn btn-primary btn-active";
// myButton.on("tap", (data) => {
//     // args is of type EventData
//     alert("Button Tapped!");
// });

var transitions;

if (application.ios) {
transitions = [/*"curl", "curlDown", "fade", "flip", "flipLeft", */"slide"/*, "slideRight", "slideTop", "slideBottom"*/];
} else {
  transitions = [/*"explode", "fade", "flip", "flipLeft", */"slide"/*, "slideRight", "slideTop", "slideBottom"*/];
}

exports.pageLoaded = function (args) {
    const page = args.object;
  };


exports.onNavigate = function (args) {
  args.object.page.frame.navigate({
    moduleName: "registration/registration-page",
    animated: true,
    transition: {
      name: transitions[Math.floor(Math.random() * transitions.length)],
      duration: 100,
      curve: "easeIn"
    }
  });
}

exports.onTap = function (args) {
  args.object.page.frame.navigate({
    moduleName: "chats/chats-page",
    animated: true,
    transition: {
      name: transitions[Math.floor(Math.random() * transitions.length)],
      duration: 100,
      curve: "easeIn"
    }
  });
}

