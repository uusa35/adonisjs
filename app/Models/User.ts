import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  beforeSave,
} from "@ioc:Adonis/Lucid/Orm";
import Product from "App/Models/Product";
import Hash from "@ioc:Adonis/Core/Hash";
import UserFilter from "App/Models/Filters/UserFilter";
import { compose } from "@ioc:Adonis/Core/Helpers";
import { Filterable } from "@ioc:Adonis/Addons/LucidFilter";

export default class User extends compose(BaseModel, Filterable) {
  public static $filter = () => UserFilter;

  @column({ isPrimary: true })
  public id: number;
  @hasMany(() => Product, {
    foreignKey: "user_id",
  })
  public products: HasMany<typeof Product>;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @column()
  public email: string;
  @column()
  public name_ar: string;
  @column()
  public name_en: string;
  @column()
  public image: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
