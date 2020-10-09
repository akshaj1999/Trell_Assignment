const mysql = require('mysql');
const express = require('express');
const { render } = require('ejs');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'trell_db'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


app.get('/', (req, res) => {
   
    res.render('index'); 
});
app.post('/login',(req, res) => {
    var email= req.body.d[email];
  var password = req.body.d[password];
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password);
        if(results[0].password == password)
        comparision = true;
        else
        comparision = false;
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
    });
    
});
app.get('/signup',(req,res)=> {
    res.render('signup');
});
app.post('/signup',(req,res) => {
    var username = req.body.email;
    var password = req.body.password;
});

app.get("/home",(req,res) => {
    res.render("home");
});
app.get("/add_movie", (req,res)=>{
    res.send({"success":"To movies page"});
});
app.get("/add_moveies",(req,res)=>{
    res.render("add_movie");
});

app.get("/add_timing", (req,res)=>{
    res.send({"success":"To movies page"});
});
app.get("/add_timings",(req,res)=>{
    res.render("add_timings");
});

app.get("/ticket", (req,res)=>{
    res.send({"success":"To movies page"});
});
app.get("/tickets",(req,res)=>{
    res.render("but_tickets");
});


app.get("/get_movies",(req,res)=>{

    connection.connect((err) => {
        if (err) throw err;
        var sql = "Select movie from movies;";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send({"success":"Data received","movies":result});
          });
      });
});
app.get("/get_timings",(req,res)=>{

    connection.connect((err) => {
        if (err) throw err;
        var sql = "Select movie,timings from timings;";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send({"success":"Data received","movies":result});
          });
      });
});

app.post("/add_movie",(req,res)=>{
   var movie_name = req.body.movie_name;
   var description = req.body.description;
   var direction = req.body.direction;
   var duration = req.body.duration;
   connection.connect((err) => {
    if (err) throw err;
    var sql = "INSERT INTO movies (movie, description,direction,duration) VALUES"+
    +"('"+movie_name+"','"+description+"','"+direction+"','"+duration+"');";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send({"success":"Inserted in database"});
      });
  });
});

app.post("/buy_ticket",(req,res)=>{
    var movie_name = req.body.movie;
    var timing = req.body.timing;
    var ticket = req.body.ticket;
    connection.connect((err) => {
        if (err) throw err;
        var sql = "INSERT INTO ticket (movie,timing,ticket) VALUES"+
        +"('"+movie_name+"','"+timing+"','"+ticket+"');";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send({"success":"Inserted in database"});
          });
      });

})

app.post("/add_timing",(req,res) => {
    var movie_name = req.body.movie;
    var start = req.body.start;
    var end = req.body.end;
    var price = req.body.price;
    var total = req.body.total;
    connection.connect((err) => {
        if (err) throw err;
        var sql = "INSERT INTO timings (movie, start,end,price,total) VALUES"+
        +"('"+movie_name+"','"+start+"','"+end+"','"+price+"','"+total+"');";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.send({"success":"Inserted in database"});
          });
})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});