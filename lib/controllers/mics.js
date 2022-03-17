const { Router } = require('express');
const Mic = require('../models/Mics');
const pool = require('../utils/pool');

// async function createMic({ name, input, price }) {
//     const { rows } = await
// };

module.exports = Router()
  .post('/', async (req, res) => {
    const mic = await Mic.insert(req.body);
    res.send(mic);
  })

  .get('/', async (req, res) => {
    const mics = await Mic.findAll();
    res.send(mics);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const mic = await Mic.findById(req.params.id);
      res.send(mic);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT 
          *
        FROM
          mics
        WHERE
          id=$1;
        `,
        [id]
      );
      const existingMic = result.rows[0];

      if (!existingMic) {
        const error = new Error(`Order ${id} not found, try again`);
        error.status = 404;
        throw error;
      }

      const name = req.body.name ?? existingMic.name;
      const input = req.body.input ?? existingMic.input;
      const price = req.body.price ?? existingMic.price;
      const { rows } = await pool.query(
        `UPDATE 
          mics
        SET
          name=$2,
          input=$3,
          price=$4
        WHERE
          id=$1
        RETURNING *;
        `,
        [id, name, input, price]
      );
      const mic = new Mic(rows[0]);

      res.send(mic);
    } catch (error) {
      next(error);
    }
  });
