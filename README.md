# How To Use It

Firsst in first : You **need** to know [how to use mongoDB](https://docs.mongodb.com/) and [mongoose](https://mongoosejs.com/docs/api.html)

Method List :
* `getModelsFromDirectory(path)`
   
   This function take a param String that say where is the folder in wich you have your models\.
   
    - Models will be returned as an Object full of Models. 
    - If you want to use a specific Model you will need to [destructurate](https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f "click here to be redirected to website where you can learn that") the returned Object.

    **The path must be from the root of your project :**  
    ~~"\.\./test/models/"~~  -> "/test/models/"

* `getModelFromFile(path)`
    
    This function take a param String that say where is the file you want to parse\.
   
    **The path must be from the root of your project :**  
    ~~"\.\./test/models/user.js"~~  -> "/test/models/user.js"  

Note : *(there is no autocompletion for Model Names because of the way there are loaded in the system)*

# Exemple :
```js
let Guild;
const parser = require("path-to-the-parser-or-name-of-the-module");

{ Guild } = parser.getModelsFromDirectory("/test/models/");
  Guild   = parser.getModelFromJSON("/test/models/guild.js")
//same result
```
check [test index file if you need a better exemple](./test/index.js)