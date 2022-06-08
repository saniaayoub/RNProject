# REACT NATIVE BOILER PLATE

In order to use this boiler plate in your project, You need to create latest react-native project and then copy-paste/replace the following items in your project.

`./src`
`./index.js`
`./App.js`
`./react-native.config.js`

After adding the above items to your project. 

Remove the following folders/files before moving forward.
`./node_modules`
`./yarn.lock` or `package-lock.json`
`./ios/Pods`
`./ios/Podfile.lock`

Make sure to install the following libraries in your project through npm/yarn.

Run the following command in your root folder. 

```yarn add @react-native-community/async-storage @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context axios react-native-vector-icons react-native-gesture-handler react-redux redux redux-logger redux-saga react-native-toast-message && cd ios && pod install && cd .. && npx react-native link```


## NOTE : Make sure to strictly follow the define pattern of the boiler plate in your project. Must go through the structure of the project before starting the project.

1. END POINTS SHOULD BE DEFINED IN VARIABLES' FILE IN CONFIG FOLDER `./src/config/variables/index.js`
2. ALL REUSABLE FUNCTIONS SHOULD BE DEFINED IN UTIL FOLDER `./src/config/util/index.js`
3. ALL FONTS & COLORS SHOULD BE PREDEFINED IN THE RESPECTIVE FOLDERS `./src/config`
4. ALL NAVIGATORS SHOULD BE DEFINED IN NAVIGATION CONFIG FOLDER `./src/navigationConfig`
5. ALL ACTIONS, REDUCERS, MIDDLEWARES SAGAS & CONSTANTS SHOULD BE DEFINED IN RESPECTIVE FOLDERS `./src/store`
6. ALL REUSABLE COMPONENTS SUCH AS BUTTONS, TEXTFIELD etc. SHOULD BE DEFINED IN THE COMPONENTS FOLDER WITH PREDEFINED PROPS WITH DEFAULT VALUES. ALL COMPONENTS SHOULD BE WRAPPED IN REACT MEMO `React.memo(Component)` IN ORDER TO PREVENT RERENDERING (refer to pre-created components) `./src/components`