const express = require('express')
const shelljs = require('shelljs')
const app = express();
//                                                  ms     s    m    h
const duration = process.env.ENV === "production" ? 1000 * 60 * 60 * 12 : 1000 * 5
let TASK = null;

console.log("Duration -> ", duration);

start();

app.get("/", (req, res) => {
  shelljs.echo("shelljs -->> ")

  res.send("Hello App! Works")
  console.log(process.env.ENV);
})

app.get("/you-shall-stop", (req, res) => {
  end();
  res.send("Task Stopped");
})

app.get("/start", (req, res) => {
  start();
  res.send("Task Started");
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening at 5000");
})

function start(){
  TASK = setInterval(() => {
    try{
      const ts = new Date().getTime()
      console.log(`Action Started at ${ts}`);
      shelljs.exec(`echo "${ts} ms" >> commit-log`);
      shelljs.exec("git add .")
      shelljs.exec(`git commit -m"commed at ${ts}ms"`)
      shelljs.exec("git push origin master");
      console.log("Action Successfull");
    }catch(e){
      console.log("Action Failed");
      console.log(e);
    }
  }, duration)
}

function end(){
  console.log("Task Stopped");
  clearInterval(TASK)
}
