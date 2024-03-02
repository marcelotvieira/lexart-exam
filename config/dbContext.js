import * as pg from 'pg';
import { Sequelize } from "sequelize";

const connectionString = process.env.POSTGRES_URL

const sequelize = new Sequelize(connectionString, {
  dialectModule: pg
})

try {
  const test = async () => {
    await sequelize.authenticate()
    console.log("CONECTADO...\n")
  }
  test()
} catch (err) {
  console.error('Não foi possível conectar ao banco de dados\n')
}

export default sequelize

