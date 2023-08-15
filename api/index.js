import 'dotenv/config';
import app from './src/app.js';
import DB from './src/db.js';

const PORT = process.env.PORT;
const { db } = DB;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.error(error));