

module.exports = {
  development_mode: {
    database: process.env.db_name,
    password: process.env.db_password,
    dialect: process.env.db_dialect,
    username: process.env.db_username,
    localhost: process.env.db_host,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
     FLOUCI_API_KEY : process.env.FLOUCI_API_KEY,
     FLOUCI_API_SECRET : process.env.FLOUCI_API_SECRET,
  },
};

// JWt: process.env.db_SECRET,
