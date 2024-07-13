import db from '../database/db_connect.js'
import format from 'pg-format'

export const findall = async ({
  limits = 3,
  orderBy = 'stock_ASC',
  page = 0,
  categoria,
  metal,
  precioMin,
  precioMax
}) => {
  let query = 'SELECT * FROM inventario'
  const filters = []
  const values = []

  // filtros para la ruta /joyas/filter
  if (precioMin) {
    values.push(precioMin)
    filters.push(`precio >= $${values.length}`)
  }

  if (precioMax) {
    values.push(precioMax)
    filters.push(`precio <= $${values.length}`)
  }

  if (categoria) {
    values.push(categoria)
    filters.push(`categoria = $${values.length}`)
  }

  if (metal) {
    values.push(metal)
    filters.push(`metal = $${values.length}`)
  }

  if (filters.length > 0) {
    query += ` WHERE ${filters.join(' AND ')}`
  }
  // ordenando y formateando la query
  const [column, sort] = orderBy.split('_')
  const offset = Math.abs(page > 0 ? page : 0) * limits
  const formatQuery = format(`${query} ORDER BY %s %s LIMIT %s OFFSET %s;`, column, sort, limits, offset)
  console.log(formatQuery)
  return await db(formatQuery, values)
}
