module.exports = class Mic {
  id;
  name;
  input;
  price;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.input = row.input;
    this.price = row.price;
  }
};
