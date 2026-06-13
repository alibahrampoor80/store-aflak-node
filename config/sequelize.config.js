import Sequelize from "@sequelize/core";

const sequelizeConfig = new Sequelize({
    dialect: process.env.DIALECT_DB,
    host: process.env.HOST_DB,
    port: Number(process.env.PORT_DB),
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    logging: false,
})

sequelizeConfig.authenticate().then(async () => {
    // await sequelize.sync({alter: true})
    console.log(`connected to database...`);
}).catch(err => {
    console.error(`cannot connect to database...`);
})

export {sequelizeConfig};