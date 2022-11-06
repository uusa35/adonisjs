import { BaseModelFilter } from "@ioc:Adonis/Addons/LucidFilter";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>;

  name(name: string) {
    this.$query.where((builder) => {
      builder
        .where("name_ar", "LIKE", `%${name}%`)
        .orWhere("name_en", "LIKE", `%${name}%`);
    });
  }

  min(min: number) {
    this.$query.where((builder) => {
      builder.where("price", ">=", `%${min}%`);
    });
  }

  max(max: number) {
    this.$query.where((builder) => {
      builder.where("price", "<=", `%${max}%`);
    });
  }

  email(email: number) {
    this.$query.where((builder) => {
      builder.where("email", "LIKE", `%${email}%`);
    });
  }
}
