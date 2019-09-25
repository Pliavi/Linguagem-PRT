const get = key => object => object[key];
const arrayToObjectString = arr => `{${arr.join(", ")}}`;

export default {
  get,
  arrayToObjectString
};
