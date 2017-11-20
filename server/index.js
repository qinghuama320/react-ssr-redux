import express from 'express';
import {serverRender, api} from './handleReq';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../dist')));

app.set('views', path.join(__dirname, '../src'));

app.use('/api', api);

app.use('/', serverRender);

const port = 3001;

app.listen(port, () => console.log(`server started，at ${port}`));