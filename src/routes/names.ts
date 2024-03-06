const {Router} = require('express');
const router = Router();
const mockNames = require('./mocked-names.json');

router.get('/', (req, res) => {
  res.json('Hello World!');
});

router.get('/names', async (req, res) => {
  const searchString = req.query.search;

  if (!searchString) {
    return res.json(mockNames);
  }

  const filteredNames = mockNames.filter(name => (name.value.toLowerCase().includes(searchString.toLowerCase())));

  res.json(filteredNames);
});

module.exports = router;
