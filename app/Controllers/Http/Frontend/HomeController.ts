import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class HomeController {
  public async index({ request, inertia }: HttpContextContract) {
    const elements = User.query()
      .filter(request.qs())
      .preload("products")
      .paginate(request.input("page", 10), 10);
    return inertia.render("Home", { elements });
  }

  public async about({ request, inertia }: HttpContextContract) {
    const elements = User.query()
      .filter(request.qs())
      .preload("products")
      .paginate(request.input("page", 10), 10);
    return inertia.render("About", { elements });
  }
}
