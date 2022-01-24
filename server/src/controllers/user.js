// import model
const { user, rbac, role } = require("../../models");

// import bcrypt
const bcrypt = require("bcrypt");

// import jsonwebtoken
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    if (req.user.role_id === 2) {
      return res.send({
        status: 'failed',
        message: 'only admin can add user'
      })
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      role_id: 2,
    });

    const data = {
      id: newUser.id,
      role_id: newUser.role_id,
    };

    const token = jwt.sign(data, process.env.SECRET_KEY);

    await rbac.create({
      role_id: req.user.role_id,
      route_id: 2
    });

    res.send({
      status: "success",
      data: {
        user: {
          fullName: newUser.fullName,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.send({
        status: "failed",
        message: "Password not match",
      });
    }

    const data = {
      id: userExist.id,
      email: userExist.email,
      role_id: userExist.role_id
    };

    const token = jwt.sign(data, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        id: userExist.id,
        fullName: userExist.fullName,
        email: userExist.email,
        role_id: userExist.role_id,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "id"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed - user not found",
      });
    }

    await rbac.create({
      role_id: req.user.role_id,
      route_id: 1
    });

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullName: dataUser.fullName,
          email: dataUser.email,
          age: dataUser.age,
          address: dataUser.address,
          role_id: dataUser.role_id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.editUser = async (req, res) => {
  try {
    const { id } = req.params
    await user.update({...req.body}, {
      where: {
        id,
      },
    });

    await rbac.create({
      role_id: req.user.role_id,
      route_id: 3
    });

    //response
    res.send({
      status: "success"
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    await rbac.create({
      role_id: req.user.role_id,
      route_id: 4
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const id = req.user.id;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await user.update( { password: hashedPassword },
      {
        where: {
          id,
        },
      }
    );

    await rbac.create({
      role_id: req.user.role_id,
      route_id: 5
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash('qwerty', salt);

    await user.update( { password: hashedPassword },
      {
        where: {
          email : req.body.email,
        },
      }
    );
    res.send({
      status: "success",
      message: 'password reset to "qwerty"'
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const dataUser = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: dataUser
    })
  }  catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
}
exports.checkAuth = async (req, res) => {
  try {
    const { id } = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed - user not found",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullName: dataUser.fullName,
          email: dataUser.email,
          role_id: dataUser.role_id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
