import express from 'express';
import router from './routes/index';
import './models/index';

const app = express();


const port = process.env.PORT || 3001;

// app.use(express.static(path.join(__dirname, '../client/public')))
app.use(express.urlencoded({ extended: false }))
  .use(express.text())
  .use(express.json())
  .use('/', router);


app.use((req, res) => {
  // res.sendFile(path.join(__dirname + '../client/build/error.html'));
  res.status(404).json({
    err: '404',
    message: '404-not found',
  });
});

app.use((err, req, res) => {
  res.status(500).json({
    err: '500',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
