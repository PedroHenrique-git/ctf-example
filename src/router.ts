import { createRouter, eventHandler, getQuery, setResponseStatus } from "h3";
import getDB from "./db";
import { seed } from "./db/seed";

const router = createRouter();

router.get(
  "/",
  eventHandler(() => {
    return { message: "It works!" };
  })
);

router.get(
  "/seed",
  eventHandler(async () => {
    const message = await seed();

    return { message };
  })
);

router.get(
  "/s",
  eventHandler(async (event) => {
    const db = await getDB();

    const query = getQuery<{ q: string }>(event);
    const term = query.q;

    if (!term) {
      setResponseStatus(event, 400);

      return { message: "Invalid term" };
    }

    const sql =
      "SELECT id, name, price, description, created_at FROM products WHERE name LIKE '%" +
      term +
      "%'";

    const [products] = await db.query(sql);

    await db.end();

    return { products, sql };
  })
);

export default router;
