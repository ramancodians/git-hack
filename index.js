const express = require('express')
const shelljs = require('shelljs')
const app = express();
const git = require('simple-git/promise');
const isProd = process.env.ENV === "production"
//                        ms     s    m    h
const duration = false  ? 1000 * 60 * 60 * 12 : 1000 * 5
let TASK = null;
const USER = process.evn.GIT_USERNAME;
const PASS = process.env.GIT_PASSWORD;
const REPO = `github.com/${USER}/git-hack`;

const remote = `https://${USER}:${PASS}@${REPO}`;

console.log("Duration -> ", duration);
shelljs.exec("git init")
shelljs.exec("git remote add origin https://github.com/ramancodians/git-hack.git")
shelljs.exec('git config --global user.email "raman.choudhary65@gmail.com"')
shelljs.exec('git config --global user.name "Raman Choudhary"')
console.log("Git Initiated");

start();

app.get("/you-shall-stop", (req, res) => {
  end();
  res.send("Task Stopped");
})

app.get("/start", (req, res) => {
  start();
  res.send("Task Started");
});

app.get("/test", (req, res) => {
  const userName = process.env.GIT_USERNAME
  res.send(userName)
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening at 5000");
})

function start(){
  console.log("Process Started");
  TASK = setInterval(() => {
    try{
      const ts = new Date().getTime()
      git()
      .silent(true)
      .add("./*")
      .commit(`added a new comment at ${ts}`)
      .addRemote('origin', remote)
      .push(['-u', 'origin', 'master'], () => {
        console.log("Pushed Successfully");
      })
      // console.log(`Action Started at ${ts}`);
      // shelljs.exec(`echo "${ts} ms" >> commit-log`);
      // shelljs.exec("git add .")
      // shelljs.exec(`git commit -m"commed at ${ts}ms"`)
      // shelljs.exec("git push origin master");
      // console.log("Action Successfull");
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
