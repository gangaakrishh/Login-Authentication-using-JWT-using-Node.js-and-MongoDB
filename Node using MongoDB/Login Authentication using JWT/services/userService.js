const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
class User {
  async findOne(email) {
    try {
      const result = await UserModel.findOne({ email });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll() {
    try {
      const rows = await UserModel.find();
      const count = await UserModel.countDocuments();
      return { rows, count };
    } catch (error) {
      throw new Error(error);
    }
  }
  async register(body) {
    try {
      const findUser = await this.findOne(body.email);
      if (findUser) {
        throw new Error("Email Already Exist");
      }
      const result = await UserModel.create(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(body) {
    try {
      const findUser = await this.findOne(body.email);
      if (findUser) {
        const result = await bcrypt.compare(body.password, findUser.password);
        const data = {
          id: findUser._id,
        };
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id) {
    try {
      const remove = await UserModel.findByIdAndDelete({ _id: id });
      return remove;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { User };
