# How To Use It

First in first : You **need** to know [how to use mongoDB](https://docs.mongodb.com/) and [mongoose](https://mongoosejs.com/docs/api.html)

Method List :

-   `getModelsFromDirectory(path)`

    This function take a param String that say where is the folder in wich you have your models\.

    -   Models will be returned as an Object full of Models.
    -   If you want to use a specific Model you will need to [destructurate](https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f "click here to be redirected to website where you can learn that") the returned Object.

    **The path must be relative :**  
     ~~"/test/models/"~~ -> "./models/"

-   `getModelFromFile(path)`
    This function take a param String that say where is the file you want to parse\.
    **The path must be relative :**
    ~~"/test/models/user.js"~~ -> "./models/user.js"

Note : _(there is no autocompletion for Model Names because of the way there are loaded in the system)_


check [test folder if you need a better exemple](./test/)
