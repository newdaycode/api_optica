import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import routes from './routes/routes'
import dotenv from 'dotenv'
import {createProfiles} from './libs/initialSetup'
import cors from 'cors'
dotenv.config()
const app = express()
createProfiles()

//guardar el valor de una variable y luego obtenerlar
app.set('pkg', pkg)

//indicar que estamos en modo desarrollo
app.use(morgan('dev'));

//para el consumo desde otros lugares
app.use(cors());

//para que desde express utilice el formato json
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version
    })
})


app.use('/', routes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

export default app;