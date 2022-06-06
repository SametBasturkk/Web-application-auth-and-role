var express = require("express");
const cors = require("cors");

const { Pool, Client } = require("pg");
const { json } = require("express/lib/response");

const pool = new Pool({
  user: "x",
  host: "x",
  database: "x",
  password: "x",
  port: 5432,
});

var app = express();

app.use(express.json());
app.use(cors());

let users;

app.get("/users", (req, res) => {
  pool
    .query(
      "select distinct user_id,user_name,isbanned,registration_date,last_login from public.users ORDER BY user_id"
    )
    .then((res) => {
      users = res.rows;
      return users;
    });

  return res.send(JSON.stringify(users));
});

app.post("/register", function (request, response) {
  console.log(request.body);
  response.sendStatus(200);

  parsedJson = request.body;
  user_name = parsedJson.name;
  user_pass = parsedJson.password;

  pool.query(
    "INSERT INTO public.users (user_name, user_pass,isbanned) VALUES ('" +
      user_name +
      "', '" +
      user_pass +
      "', 'no')"
  );

  pool.query("SELECT * FROM public.users ORDER BY user_id ASC ").then((res) => {
    console.log(res.rows);
  });
});

app.post("/login", function (request, response) {
  console.log(request.body);

  parsedJson = request.body;
  user_name = "'" + parsedJson.name + "'";
  user_pass = "'" + parsedJson.password + "'";
  last_login = "'" + parsedJson.lastLogin + "'";

  pool
    .query(
      "SELECT * FROM public.users WHERE user_name=" +
        user_name +
        " AND " +
        "user_pass=" +
        user_pass +
        "AND isbanned LIKE 'no'"
    )
    .then((res) => {
      pool.query(
        "UPDATE public.users SET last_login =" +
          last_login +
          "WHERE user_name = " +
          user_name
      );
      if (res.rowCount == 1) {
        response.sendStatus(200);
        console.log("Login Success");
      } else {
        response.sendStatus(401);
        console.log("Login Failed");
      }
    });
});

app.post("/usercheck", function (request, response) {
  parsedJson = request.body;
  user_name = "'" + parsedJson.name + "'";

  pool
    .query(
      "SELECT * FROM public.users WHERE user_name=" +
        user_name +
        "AND isbanned LIKE 'no'"
    )
    .then((res) => {
      if (res.rowCount == 1) {
        response.sendStatus(200);
      } else {
        response.sendStatus(401);
      }
    });
});

app.post("/ban", function (request, response) {
  console.log(request.body);

  parsedJson = request.body;
  ban_id = parsedJson.id;

  console.log(ban_id);

  for (var i = 0; i < ban_id.length; i++) {
    console.log(ban_id[i]);
    pool.query(
      "UPDATE public.users SET isbanned = 'yes' WHERE user_id = " + ban_id[i]
    );
  }
});

app.post("/unban", function (request, response) {
  console.log(request.body);

  parsedJson = request.body;
  unban_id = parsedJson.id;

  console.log(unban_id);

  for (var i = 0; i < unban_id.length; i++) {
    console.log(unban_id[i]);
    pool.query(
      "UPDATE public.users SET isbanned = 'no' WHERE user_id = " + unban_id[i]
    );
  }
});

app.post("/remove", function (request, response) {
  console.log(request.body);

  parsedJson = request.body;
  remove_id = parsedJson.id;

  console.log(remove_id);

  for (var i = 0; i < remove_id.length; i++) {
    console.log(remove_id[i]);
    pool.query("DELETE FROM public.users WHERE user_id = " + remove_id[i]);
  }
});

console.log("Listening on port 3001");
app.listen(3001);
