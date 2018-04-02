const express = require('express')
const app = express();

app.get("/", (req, res) => {
  res.send("Hello App! Works")
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening at 5000");
})
