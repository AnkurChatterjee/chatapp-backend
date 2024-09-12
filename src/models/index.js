require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const db = {};

const { DB_NAME, DB_TYPE, DB_HOST, DB_PASS, DB_PORT, DB_USER, SCHEMA } =
  process.env;

const basename = path.basename(__filename);

const config = {
  database: DB_NAME,
  dialect: DB_TYPE,
  host: DB_HOST,
  password: DB_PASS,
  port: DB_PORT,
  schema: SCHEMA,
  username: DB_USER,
};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

sequelize
  .authenticate()
  .then(() => console.info("DB Connection has been established successfully!"))
  .catch((err) => {
    throw new Error(err);
  });

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    let model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    if (config.schema && config.schema.length > 0) {
      model = model.schema(config.schema);
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
