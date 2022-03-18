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
};
