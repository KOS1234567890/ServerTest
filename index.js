const express = require('express')
const cors = require('cors');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data={
  select:function(){
    return JSON.parse(fs.readFileSync('./test.json'));
  },
  insert:function(newobj){
    const jsonData = data.select();
    let newdata=[...jsonData,{id:jsonData.length+1, ...newobj}]
    /*
      ...은{let a=1;}와 같이 괄호안에있는 값을 밖으로 꺼내줌 let a=1; 

      id에는 jsonData의 문자열0부터 인데 +1을 하여 1부터 올라가는 형식

      ...jsonData=>초기데이터 
      {id:jsonData.length+1, ...req.body}=>새롭게 입력받는 데이터 

    */
    fs.writeFileSync('./test.json',JSON.stringify(newdata))
    return newdata;
  },
  update:function(){},
  delete:function(){}
}

app.get('/abc', function (req, res) { //req : 사용자들이 데이터를 요구함 res: 사용자들에게 요구한 데이터를 줌
  const jsonData=fs.readFileSync('./test.json')
  res.send(data.select())
});

app.delete('/abc/:id', function (req, res) { 
  const jsonData=data.select();
  const {id}=req.params;
  // const data= JSON.parse(jsonData);
  const delData=jsonData.filter(n=>n.id!=id) //사용자가 입력한 아이디와 같은 값을 제이슨에서 찾아주세요 하는중
  fs.writeFileSync('./test.json',JSON.stringify(delData))
  res.send(delData)  
});

app.post('/insert',function(req,res){ //데이터가 추가되는 작업
  
  res.send(data.insert(req.body));
  console.log(data);
});

app.listen(3000)

/* 
  const data={
    select:function(){},
    insert:function(){},
    update:function(){},
    delete:function(){}
  }
*/