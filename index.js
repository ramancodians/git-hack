const express = require('express')
const shelljs = require('shelljs')
const app = express();
let TASK = null;

app.get("/", (req, res) => {
  shelljs.echo("shelljs -->> ")
  const ts = new Date().getTime()
  shelljs.exec(`echo "${ts} ms" >> commit-log`)
  res.send("Hello App! Works")
  console.log(process.env.ENV);
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening at 5000");
})

function start(){
  TASK = setInterval(() => {

  }, 1000)
}
