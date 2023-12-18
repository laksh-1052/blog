//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Here are your thoughts";
const aboutContent = "I'm Laksh, a full stack developer and a coffee addict.";
const contactContent = "you can contact me at tjlakshmi10@gmail.com or keep looking outside at night you might find me. (shushhh I'm Batman)";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",(req,res)=>{
  res.render("home.ejs",{
    starting:homeStartingContent,
    posts:posts,
    


  });
})




app.get("/about",(req,res)=>{
  res.render("about.ejs",{
    about: aboutContent
  });
})

app.get("/contact",(req,res)=>{
  res.render("contact.ejs",{
    contact: contactContent
  });
})

app.get("/compose",(req,res)=>{
  res.render("compose.ejs");
})


app.get("/post/:postname",function(req,res){
  console.log(req.params.postname);
  posts:posts
  
  const req_title = _.lowerCase(req.params.postname);
  
  posts.forEach(function(post){
    const sto_title= post.title;
    const stored_title = _.lowerCase(post.title);
    if(stored_title===req_title){
      res.render("post.ejs",{
        title:post.title,
        content:post.postContent
       });
      console.log("match found");
    }
 })
 //express routing parameters
 

});

app.post("/compose",(req,res)=>{
  const post={
    title:req.body.cont,
    postContent:req.body.postCont
  }
  posts.push(post);
  
  
  res.redirect("/");
}
);
















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
