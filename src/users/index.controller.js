const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DB = require("../../db");
const config = require("../../config/environment");
const initializePassport = require("./passportConfig");

initializePassport(passport);

const createUser = async (req, res) => {
  const client = await DB.pool.connect();
  try {
    const rd = await DB.pool.query(
      `SELECT * FROM public."USER" where "EMAIL"='${req.body.email}' OR "ID_USERS"='${req.body.id}' ;`
    );
    const user = {
      "id": req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: req.body?.phone ? req.body?.phone : null,
      last_name: req.body.last_name ? req.body.last_name : null,
      rol: 1,
    };

    if (rd.rows.length != 0) {
      res.locals.results = {
        status: {
          code: "FAILURE",
          description: "id or email is already registered '.",
        },
      };
    } else {
      const result = await DB.pool.query(`INSERT INTO public."USER"(
        "ID_USERS", "NAME", "PASSWORD", "ROLE", "EMAIL", "PHONE", "LAST_NAME")
            VALUES ('${user.id}','${user.username}', '${user.password}', ${user.rol},'${user.email}','${user.phone}','${user.last_name}') RETURNING "ID_USERS";`);
      if (result.rows.length === 0) {
        res.locals.results = {
          status: {
            code: "FAILURE",
            description: "Unable to find '.",
          },
        };
        res.status(404);
      } else {
        res.locals.results = {
          result: result.rows[0],
          status: {
            code: "SUCCESS",
            description: "Successfully retrieved .",
          },
        };
        res.status(200);
      }
    }
    return res.send(res.locals.results);
  } catch (error) {
    res.locals.results = {
      status: {
        code: "FAILURE",
        description: "token invalido '.",
      },
    };
    res.status(404);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
};

const getUser = async (req, res) => {
  const client = await DB.pool.connect();
  try {
    const result = await DB.pool.query(
      `SELECT * FROM public."USER" where "ID_USERS"='${req.params.id}';`
    );
    if (result.rows.length === 0) {
      res.locals.results = {
        status: {
          code: "FAILURE",
          description: "Unable to find '.",
        },
      };
      res.status(404);
    } else {
      res.locals.results = {
        result: result.rows[0],
        status: {
          code: "SUCCESS",
          description: "Successfully retrieved .",
        },
      };
      res.status(200);
    }
    return res.send(res.locals.results);
  } catch (error) {
    res.locals.results = {
      status: {
        code: "FAILURE",
        description: "Unable to find '.",
      },
    };
    res.status(404);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
};

function generateToken(user) {
  console.log(user)
  const u = {
    username: user.NAME,
    id: user.ID_USERS,
  };
  return (token = jwt.sign(u, config.secrets.session, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  }));
}

const LoginUser = async (req, res, next) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.locals.results = {
        status: {
          code: "FAILURE",
          description: "faile to login .",
        },
      };
      res.status(404);
      return res.send(res.locals.results);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = generateToken(user);
      res.locals.results = {
        result: token,
        status: {
          code: "SUCCESS",
          description: "Successfully retrieved .",
        },
      };
      res.status(200);

      return res.send(res.locals.results);
    });
  })(req, res, next);
};
const logoutUser = async (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
};

module.exports = {
  createUser,
  LoginUser,
  logoutUser,
  getUser,
};
