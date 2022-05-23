const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const DB = require('../../db');

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    DB.pool.query(
      `SELECT * FROM public."USER" WHERE "EMAIL" = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];
          console.log(user)
          bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            // password is incorrect
            return done(null, false, { message: 'Password is incorrect' });
          });
        } else {
          // No user
          return done(null, false, {
            message: 'No user with that email address',
          });
        }
      },
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      authenticateUser,
    ),
  );
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.id));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((id, done) => {
    db.pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
      if (err) {
        return done(err);
      }
      // console.log(`ID is ${results.rows[0].id}`);

      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
