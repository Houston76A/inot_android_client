
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
const application = require("tns-core-modules/application");
const httpModule = require("tns-core-modules/http");

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

// const fromObject = require("tns-core-modules/data/observable").fromObject;
// let source = fromObject({ 
//   username: "123",
//   password: "321",
// });
// let view =  require("tns-core-modules/ui/core/view");

// exports.pageLoaded = function (args) {
//     const page = args.object;
    

//     const usernameTextField = view.getViewById(page, "username-text-field");

//     const usernameFieldBindingOptions = {
//       sourceProperty: "username",
//       targetProperty: "text",
//       twoWay: true
//     };
//     usernameTextField.bind(usernameFieldBindingOptions, source)

//     const passwordTextField = view.getViewById(page, "password-text-field");

//     const passwordFieldBindingOptions = {
//       sourceProperty: "password",
//       targetProperty: "text",
//       twoWay: true
//     };
//     passwordTextField.bind(passwordFieldBindingOptions, source)
// };



// exports.onTap = function (args) {
//     // console.log(source)
//     httpModule.request({
//         url: "http://botcoint.ru/sign_in_for_apk",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         content: JSON.stringify({
//             login: source.username,
//             firstname: source.firstname,
//             lastname: source.lastname,
//             email: source.email,
//             password: source.password,
//             confpassword: source.confpassword
//         })
//     }).then((response) => {
//         console.log('good')
        
//         const result = response.content.toJSON();
//         if (result.code == "0"){
//           console.log("Good authentication, your access key: "+result.access_key);
//           args.object.page.frame.navigate({
//             moduleName: "chats/chats-page",
//             animated: true,
//             transition: {
//               name: transitions[Math.floor(Math.random() * transitions.length)],
//               duration: 100,
//               curve: "easeIn"
//             }
//           });
//         }
//         else{
//           console.log('Username or password is wrong')
//         }
         
        
//     }, (e) => {
//       console.log('bad')
//     });
// }