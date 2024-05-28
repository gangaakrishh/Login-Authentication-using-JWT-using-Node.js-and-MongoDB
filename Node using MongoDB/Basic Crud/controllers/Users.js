const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("./../models/UserModel");

const FetchUser = expressAsyncHandler(async (req, res) => {
    const query = User.find({}, { password: 0 });

    const Usersdata = await query;
    res.json(Usersdata);
});

const RegisterUser = expressAsyncHandler(async (req, res) => {
    const userdata = req.body;
    // console.log(req)
    try {
      if (await User.findOne({ email: userdata.email })) {
        throw new Error("Email Already Exist");
      }
      const Create = await User.create(req.body);
      res.json({
        message: "Data Inserted successfully",
        status: true,
      });
    } catch (error) {
      throw new Error(error);
    }
});

const LoginUser = expressAsyncHandler(async (req,res) => {
    const userdata = req.body
    const finduser = await User.findOne({ username : userdata.username})
    // console.log(finduser)

    if (finduser && (await bcrypt.compare(userdata.password, finduser.password))) {
        res.json({
          message: "Login Successful",
          status: true,
        });
    } else {
      throw new Error("Give Valid Credentials");
    }
});

const UpdateUser = expressAsyncHandler ( async (req,res) =>{
    const {id} = req.params
    const finduser = await User.findById(id)

    if(finduser) {
        try {
            const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body)
            res.json({
                message: "Updated",
                status: true,   
            });
        }catch (error){
            throw new Error(error)
        }
    }else{
        throw new error("Invalid User!!!")
    }
})

const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const findUser = await User.findById(id);
      if (findUser) {
        const updateUser = await User.findByIdAndDelete({ _id: id }, req.body);
        res.json({
          message: "User Deleted Successfully",
          status: true,
        });
      } else {
        throw new Error("Invalid User");
      }
    } catch (error) {
      throw new Error(error);
    }
});

module.exports = {
    FetchUser,
    RegisterUser,
    LoginUser,
    UpdateUser,
    deleteUser
}