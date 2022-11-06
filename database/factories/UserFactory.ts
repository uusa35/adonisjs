import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import ProductFactory from "Database/factories/ProductFactory";

export default Factory.define(User, ({ faker }) => {
  return {
    password: "secret",
    email: faker.internet.email(),
    name_ar: faker.name.firstName(),
    name_en: faker.name.firstName(),
  };
})
  .relation("products", () => ProductFactory)
  .build();
