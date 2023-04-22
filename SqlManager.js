const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "site",
    password: "password"
});

connectToBdd();

setInterval(() => {
  con.query('SELECT 1', (error, results, fields) => {
    if (error) {
      console.log("Reconnexion to database...");
      connectToBdd(); // Reconnexion à la base de donnée
    }
  });
}, 100000); 

function connectToBdd(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");
    con.query("CREATE DATABASE IF NOT EXISTS site", function (err, result) {
      if (err) throw err;
      console.log("Database 'site' created");
      var sql = "CREATE TABLE IF NOT EXISTS site.Feedback(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, comment VARCHAR(255) NOT NULL, grade INT NOT NULL, post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
      con.query(sql, function (err, result) {
      if (err) throw err;
        console.log("Table Feedback created");
      });
      var sql2 = "CREATE TABLE IF NOT EXISTS site.Newsletter(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR (255) NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, content TEXT NOT NULL, creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
      con.query(sql2, function(err, result){
        if(err) throw err;
        console.log("Table Newsletter created");
      });
    });
  });
}

function create_feedback(username, grade, comment){
  
  const sql = "INSERT INTO site.Feedback(name, comment, grade) VALUES (?,?,?)";
  const values = [username, comment, grade];
    con.query(sql, values, (err, result) => {
    if(err) throw err;
  });
}

function compute_mean(callback){
  const sql = "SELECT AVG(grade) AS mean FROM site.Feedback"
  con.query(sql, (err, result) => {
    if(err) throw err;
    callback(result[0].mean);
  })
}

function get_feedback(callback) {
  const sql = "SELECT * FROM site.Feedback ORDER BY post_date DESC LIMIT 10";
  con.query(sql, (err, results) => {
    if(err) throw err;
    callback(results);
  });
}

function get_newsletters(callback){
  const sql = "SELECT name,title,description,image FROM site.Newsletter ORDER BY creation_date DESC";
  con.query(sql, (err, results) => {
    if(err) throw err;
    callback(results);
  });
}

function get_article(name, callback){
  const sql = "SELECT * FROM site.Newsletter WHERE name = ?";
  const values = [name];
  con.query(sql, values, (err, results) => {
    if(err) throw err;
    callback(results);
  })
}

module.exports = {
  create_feedback, 
  get_feedback, 
  get_newsletters, 
  get_article,
  compute_mean
};