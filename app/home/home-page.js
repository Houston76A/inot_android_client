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
// const Https = require('nativescript-https');
const fileSystemModule = require("tns-core-modules/file-system");
const Toast = require("nativescript-toast");

// import * as Https from 'nativescript-https'
// console.log('Https', Https.request)
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
const fromObject = require("tns-core-modules/data/observable").fromObject;
let source = fromObject({ 
  username: "admin",
  password: "admin",
});
let view =  require("tns-core-modules/ui/core/view");

exports.pageLoaded = function (args) {
    const page = args.object;
    
    
    
    const documents = fileSystemModule.knownFolders.currentApp();
   
    const access_folder = documents.getFolder("access");
    const file = access_folder.getFile(`access_key.txt`);    
    file.readText()
        .then((res) => {
           
            console.log("Вы уже авторизованы! Ваш ключ доступа", res);
            args.object.page.frame.navigate({
              moduleName: "chats/chats-page",
              animated: true,
              transition: {
                name: transitions[Math.floor(Math.random() * transitions.length)],
                duration: 100,
                curve: "easeIn"
              }
            });
            console.log("isItemVisible", true);
        });





    const usernameTextField = view.getViewById(page, "username-text-field");

    const usernameFieldBindingOptions = {
      sourceProperty: "username",
      targetProperty: "text",
      twoWay: true
    };
    usernameTextField.bind(usernameFieldBindingOptions, source)

    const passwordTextField = view.getViewById(page, "password-text-field");

    const passwordFieldBindingOptions = {
      sourceProperty: "password",
      targetProperty: "text",
      twoWay: true
    };
    passwordTextField.bind(passwordFieldBindingOptions, source)




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
// export class AppComponent {

//   public showToast(message: string) {
//   Toast.makeText(message).show();


// // import { knownFolders } from 'file-system'
// const fs = require("tns-core-modules/file-system");
// // console.log(typeof(fs.knownFolders))
// // // Https.disableSSLPinning()
// console.log('FOLDER EXIST: ', fs.knownFolders.currentApp().getFolder('images/certs').getEntitiesSync())
// let dir = fs.knownFolders.currentApp().getFolder('images/certs')
// let certificate = dir.getFile('cerificate.cer').path
// // console.log('cert', certificate)

// Https.enableSSLPinning({ host: 'botcoint.ru', certificate })


exports.onTap = function (args) {

  console.log(source)
  console.log('kek')
  
  httpModule.request({
      url: "http://botcoint.ru/sign_in_for_apk",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          login: source.username,
          password:source.password
      })
  }).then((response) => {
      console.log('good')
      
      const result = response.content.toJSON();
      if (result.code == "0"){
        console.log("Good authentication, your access key: "+result.access_key);
      
        args.object.page.frame.navigate({
          moduleName: "chats/chats-page",
          animated: true,
          transition: {
            name: transitions[Math.floor(Math.random() * transitions.length)],
            duration: 100,
            curve: "easeIn"
          }
        });
        
        const documents = fileSystemModule.knownFolders.currentApp();
        console.log("kekekek")
        const access_folder = documents.getFolder("access");
        const file = access_folder.getFile(`access_key.txt`);
        file.writeText(result.access_key)
        .then((result) => {
            file.readText()
                .then((res) => {
                    console.log("successMessage", `Successfully saved in${file.path}`);
                    console.log("writtenContent", res);
                    console.log("isItemVisible", true);
                });
        }).catch((err) => {
            console.log(err);
        });

         
      }
      else{
        console.log('Username or password is wrong')
        Toast.makeText("Username or password is wrong", "long").show();
      }
       
      
  }, (e) => {
    console.log('bad', e)
    Toast.makeText("Connection error!", "long").show();
  });


  
}



