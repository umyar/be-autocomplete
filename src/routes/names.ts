const { Router } = require('express');
const router = Router();
const mockNames = require('./mocks/mocked-names.json');

router.get('/', (_, res) => {
  res.json('Hello World!');
});

router.get('/names', async (req, res) => {
  const searchString = req.query.search;

  if (!searchString) {
    return res.json(mockNames);
  }

  const filteredNames = mockNames.filter(name => name.value.toLowerCase().includes(searchString.toLowerCase()));

  res.json(filteredNames);
});

module.exports = router;
