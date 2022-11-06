import Product from "App/Models/Product";
import Factory from "@ioc:Adonis/Lucid/Factory";

export default Factory.define(Product, ({ faker }) => {
  return {
    name_ar: faker.name.firstName(),
    name_en: faker.name.firstName(),
    price: faker.datatype.number({ min: 100, max: 200 }),
  };
}).build();
