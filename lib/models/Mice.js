const pool = require('../utils/pool');

module.exports = class Mice {
  id;
  brand;
  name;
  price;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.name = row.name;
    this.price = row.price;
  }

  static async insert({ brand, name, price }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
                mice(brand, name, price)
            VALUES
                ($1, $2, $3)
            RETURNING
                *;
            `,
      [brand, name, price]
    );
    return new Mice(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
    SELECT 
        * 
    FROM 
        mice;`
    );
    return rows.map((row) => new Mice(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
    SELECT 
        * 
    FROM 
        mice 
    WHERE 
        id=$1`,
      [id]
    );
    return new Mice(rows[0]);
  }

  static async updateById(id, attributes) {
    const currentMouse = await Mice.findById(id);
    const updateAtts = { ...currentMouse, ...attributes };
    const { brand, name, price } = updateAtts;
    const { rows } = await pool.query(
      `UPDATE 
            mice 
        SET 
            brand=$2, name=$3, price=$4 
        WHERE  
            id=$1 
        RETURNING 
            *;`,
      [id, brand, name, price]
    );
    return new Mice(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM 
            mice 
        WHERE 
            id=$1 
        RETURNING 
            *;`,
      [id]
    );
    return new Mice(rows[0]);
  }
};
