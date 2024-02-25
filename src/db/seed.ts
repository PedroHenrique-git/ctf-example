import getDB from ".";
import { PRODUCT_TABLE, USER_TABLE } from "./queries";
import { faker } from "@faker-js/faker";

const generateProducts = (quantity = 10) => {
  let inserts: string =
    "INSERT INTO products (name, price, description) VALUES";

  for (let i = 0; i < quantity; i++) {
    const last = i === quantity - 1;

    const productName = faker.commerce.productName();

    const productPrice = faker.number.float({
      min: 100,
      max: 1000,
      precision: 2,
    });

    const productDescription = faker.lorem.text().slice(0, 255);

    inserts = inserts.concat(
      ` ('${productName}', ${productPrice}, '${productDescription}')${
        last ? "" : ","
      }`
    );
  }

  return `${inserts};`;
};

const generateUsers = (quantity = 10) => {
  let inserts: string = `INSERT INTO users (name, email, password) VALUES`;

  for (let i = 0; i < quantity; i++) {
    const last = i === quantity - 1;
    const userName = faker.person.fullName();
    const userEmail = faker.internet.email();
    const userPassword = faker.internet.password({ length: 8 });

    inserts = inserts.concat(
      ` ('${userName}', '${userEmail}', '${userPassword}')${last ? "" : ","}`
    );
  }

  return `${inserts};`;
};

export async function seed() {
  const db = await getDB();

  const userInserts = generateUsers();
  const productInserts = generateProducts();

  try {
    await Promise.all([
      db.query(USER_TABLE),
      db.query(PRODUCT_TABLE),
      db.query(userInserts),
      db.query(productInserts),
    ]);

    return "database was successfully populated";
  } catch (err) {
    return err?.message ?? "error when trying to populate the database";
  } finally {
    await db.end();
  }
}
