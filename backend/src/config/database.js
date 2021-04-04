require("dotenv").config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env"
});

module.exports = {
  host: process.env.DB_HOST,//'127.0.0.1', //
  username: process.env.DB_USER,//'postgres', //
  password: process.env.DB_PASS,//'123456', //
  database: process.env.DB_NAME,//'development',//
  dialect: process.env.DB_DIALECT,// "postgres",  || "sqlite",
  storage: "./__tests__/database.sqlite",
  operatorsAliases: 0,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    uderscoredAll: true
  }
}

