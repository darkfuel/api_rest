import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
}
const pool = new Pool(config)
const db = async (query, values) => {
  try {
    const result = await pool.query(query, values)
    console.log('Respuesta exitosa')
    return result.rows
  } catch (error) {
    console.error('[db_connetc => db]', error)
  }
}
export default db
