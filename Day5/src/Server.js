import express from 'express';
import router from './Router/Router.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});