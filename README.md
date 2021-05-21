# How To Use It

Firsst in first : You **need** to know [how to use mongoDB](https://docs.mongodb.com/) and [mongoose](https://mongoosejs.com/docs/api.html)

* You need to create your models in the ***models folder***
   
   Models files needs to have a name like "....Model.js" and must respect the inner syntax of the provided exemples
* You can import all of your models at once from ***getModel.js***
    
    - Models will be returned as an Object full of your Models. 
    - If you want to use a specific Model you will need to [destructurate](https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f "click here to be redirected to website where you can learn that") the returned Object.


Note : *(there is no autocompletion for Model Names because of the way there are loaded in the system)*
