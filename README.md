# Gem Store

[App][] from [shapping up with angular.js][] course from codeschool.com with Node.js backend and cloudant ready to deploy on bluemix

## Run the app locally

1. [Install Node.js][]
3. cd into the app directory
4. Run `npm install` to install the app's dependencies
5. Replace the user and password from cloudant service
5. Run `npm start` to start the app
6. Access the running app in a browser at http://localhost:6001

## Deploy app on bluemix
1. Create a bluemix account
2. [Install Node.js][]
3. [Install Cloud Foundry CLI]
4. Create a app on bluemix using Node.js SDK with name GemStore
5. Add a new cloudant service binding to GemStore
6. cd into the app directory
7. Run `cf push`

[Install Node.js]: https://nodejs.org/en/download/
[Install Cloud Foundry CLI]: https://github.com/codeschool/ShapingUpWithAngular.js
[App]: https://github.com/codeschool/ShapingUpWithAngular.js
[shapping up with angular.js]: https://www.codeschool.com/courses/shaping-up-with-angular-js