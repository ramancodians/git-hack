const express = require('express')
const shelljs = require('shelljs')
const app = express();
const git = require('simple-git/promise');
const isProd = process.env.ENV === "production"
//                        ms     s    m    h
const duration = false  ? 1000 * 60 * 60 * 12 : 1000 * 5
let TASK = null;
const USER = process.env.GIT_USERNAME;
const PASS = process.env.GIT_PASSWORD;
const REPO = `github.com/${USER}/git-hack`;

const remote = `https://${USER}:${PASS}@${REPO}`;

console.log("Duration -> ", duration);
console.log("Remore -> ", remote);
shelljs.exec("git init")
shelljs.exec(`git remote add origin ${remote}`)
shelljs.exec('git config --global user.email "raman.choudhary65@gmail.com"')
shelljs.exec('git config --global user.name "Raman Choudhary"')
shelljs.exec('git pull origin master')
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

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening at 5000");
})

function start(){
  console.log("Process Started");
  TASK = setInterval(() => {
    try{
      const ts = new Date().getTime()
      // git()
      // .silent(true)
      // .add("./*")
      // .commit(`added a new comment at ${ts}`)
      // .addRemote('origin', remote)
      // .push(['-u', 'origin', 'master'], () => {
      //   console.log("Pushed Successfully");
      // })
      console.log(`Action Started at ${ts}`);
      shelljs.exec(`echo "${ts} ms" >> commit-log`);
      shelljs.exec("git add .")
      shelljs.exec(`git commit -m"commed at ${ts}ms"`)
      shelljs.exec("git fetch origin master");
      shelljs.exec("git reset —hard FETCH_HEAD");
      shelljs.exec("git push origin master");
      shelljs.exec("git clean -df");
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
