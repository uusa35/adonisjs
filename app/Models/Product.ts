import { DateTime } from "luxon";
import { BaseModel, column, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public name_ar: string;
  @column()
  public name_en: string;
  @column()
  public image: string;
  @column()
  public price: number;

  @column()
  public user_id: number;

  @belongsTo(() => User, {
    foreignKey: "user_id",
  })
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
