import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Application from "@ioc:Adonis/Core/Application";

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const page = request.input("page", 1);
    return await User.query()
      .filter(request.qs())
      // .whereHas("products", (q) => q.where("price", ">=", 10))
      .preload("products")
      .paginate(page, 10);
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const validate = await schema.create({
        email: schema.string({ trim: true }, [rules.required(), rules.email()]),
        password: schema.string({ trim: true }, [
          rules.required(),
          rules.minLength(3),
        ]),
        name_ar: schema.string(),
        name_en: schema.string(),
      });
      const payload = await request.validate({ schema: validate });
      const element = await User.create(payload);
      if (element) {
        const coverImage = await request.file("image", {
          size: "2mb",
          extnames: ["gif"],
        })!;
        await coverImage.move(Application.publicPath("images/uploads/"));
        const { fileName } = coverImage;
        await element.merge({ image: fileName }).save();
      }
      return element;
    } catch (e) {
      return response.badRequest(e);
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const element = User.query().where("id", params.id).preload("products");
      return element;
    } catch (e) {
      return response.badRequest(e);
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const validate = schema.create({
        password: schema.string.optional(),
        name_ar: schema.string.optional(),
        name_en: schema.string.optional(),
        email: schema.string({ trim: true }, [rules.required(), rules.email()]),
      });
      const payload = await request.validate({ schema: validate });
      const element = await User.findOrFail(params.id);
      if (element && request.file("image")) {
        const coverImage = await request.file("image")!;
        await request.validate({
          schema: schema.create({
            image: schema.file({
              size: "2mb",
              extnames: ["gif", "jpg", "jpeg"],
            }),
          }),
        });
        await coverImage.move(Application.publicPath("images/uploads/"));
        const { fileName } = coverImage;
        await element.merge({ image: fileName }).save();
      }
      await element.merge(payload).save();
      return element;
    } catch (e) {
      return response.badRequest(e);
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const element = await User.findOrFail(params.id);
      return await element.delete();
    } catch (e) {
      return response.badRequest(e);
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      const token = await auth.use("api").attempt(email, password);
      return token;
    } catch {
      return response.unauthorized("Invalid credentials");
    }
  }
}
