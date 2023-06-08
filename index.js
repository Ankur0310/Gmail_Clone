import express from 'express';
import connection from './database/db.js';
import routes from './routes/route.js';
import cors from 'cors';
import path from 'path';


const __dirname=path.resolve();
const app= express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json({extended : true} ));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.use('/', routes);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get('*', function (_, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
    res.status(500).send(err);
  })
})


const PORT= process.env.PORT || 8000;
connection();

app.listen(PORT, () =>console.log( `Server is started on PORT ${PORT}`));