

module.exports = {
  development_mode: {
    database: process.env.db_name,
    password: process.env.db_password,
    dialect: process.env.db_dialect,
    username: process.env.db_username,
    localhost: process.env.db_host,
  },
};

// JWt: process.env.db_SECRET,
