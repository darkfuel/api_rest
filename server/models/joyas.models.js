import db from '../database/db_connect.js'
import format from 'pg-format'

export const findall = async ({ limits = 3, orderBy = 'stock_ASC' }) => {
  const [column, sort] = orderBy.split('_')
  const query = 'SELECT * FROM inventario'
  const formatQuery = format(`${query} ORDER BY %s %s LIMIT %s;`, column, sort, limits)
  return await db(formatQuery)
}
