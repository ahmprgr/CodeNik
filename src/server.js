const app = require("./app");
require("dotenv").config();
const runDB = require("./../configs/db");
const port = process.env.PORT || 1404;

async function bootstrap() {
  await app.listen(port, () => {
    console.log(`The server is runnig on port ${port}`);
  });
  await runDB();
}
bootstrap();
