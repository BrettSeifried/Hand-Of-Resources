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

  .get('/:id', async (req, res) => {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          mics
        WHERE
          id=$1;
        `,
      [req.params.id]
    );

    if (!rows[0]) return null;
    const mic = new Mic(rows[0]);

    res.send(mic);
  });
