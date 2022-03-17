const { Router } = require('express');
const Mic = require('../models/Mics');
const pool = require('../utils/pool');

// async function createMic({ name, input, price }) {
//     const { rows } = await
// };

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `INSERT INTO 
        mics(name, input, price) 
    VALUES 
        ($1, $2, $3) 
    RETURNING 
    *;
    `,
    [req.body.name, req.body.input, req.body.price]
  );
  console.log('rows', rows);
  const mic = new Mic(rows[0]);

  res.send(mic);
});
