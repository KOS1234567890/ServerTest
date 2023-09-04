const express = require('express')
const cors = require('cors');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/abc', function (req, res) { //req : 사용자들이 데이터를 요구함 res: 사용자들에게 요구한 데이터를 줌
  const jsonData=fs.readFileSync('./test.json')
  res.send(JSON.parse(jsonData))
});





app.get('/abc/:id', function (req, res) { 
  const jsonData=fs.readFileSync('./test.json');
  const data= JSON.parse(jsonData);
  const {id}=req.params;
  const aaa=data.filter(n=>n.id==id) //사용자가 입력한 아이디와 같은 값을 제이슨에서 찾아주세요 하는중
  res.send(aaa)  
});

app.post('/insert',function(req,res){
  console.log(req.body);
  fs.writeFileSync('./test.json',JSON.stringify(req.body))
  res.send('성공');
});

app.listen(3000)