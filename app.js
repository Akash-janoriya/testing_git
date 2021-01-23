  const express = require("express");
  const bodyParser = require("body-parser");
  const request = require("request");
  const https = require("https");

  const app =  express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

  app.get("/", function(req, res){
    res.sendFile(__dirname + '/SignUp.html');
  });

  app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
      members:[
        {
          email_address:email,
          status: "subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:lastName
          }
        }
      ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/50e7167733";

    const options ={
      method:"post",
      auth:"akash8:2214e860d3a38a9d8696a1d59c9a0ced-us7"
    }

    const request = https.request(url, options, function(response){

   if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html")
   }else{
     res.sendFile(__dirname + "/failure.html")
   }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })

    })

    // request.write(jsonData);
    request.end();
  })

  app.post("/failure", function(req, res){
    res.redirect('/')
  })

    app.listen(process.env.PORT || 3000, function (){
      console.log("server is runningon port 3000");
    });

    // api key
// 2214e860d3a38a9d8696a1d59c9a0ced-us7

// list idea
// 50e7167733
