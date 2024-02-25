import { createServer } from "node:http";
import { createApp, toNodeListener } from "h3";
import router from "./router";

const PORT = 3000;

async function main() {
  try {
    const app = createApp();

    app.use(router);

    createServer(toNodeListener(app)).listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
