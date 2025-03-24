const { Router } = require('express');
const router = Router();

const mockCredentials = require('./mocks/mock-creds.json');

interface ICredentials {
  email: string;
  password: string;
}

const EMPTY_CREDS_ERROR = { status: 'error', message: 'email or password not provided' };
const INVALID_CREDS_ERROR = { status: 'error', message: 'invalid credentials' };
const VALID_CREDS_MSG = { status: 'ok', message: 'login credentials passed' };

const getCredsFromDbByEmail = (email: string): ICredentials | undefined => {
  return mockCredentials.find(credsPair => {
    credsPair.email === email;
  });
};

const checkCredentials = (email: string, password: string): boolean => {
  const credentials = getCredsFromDbByEmail(email);

  if (credentials) {
    return credentials.password === password;
  }

  return false;
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    res.json(EMPTY_CREDS_ERROR);
  }

  const isCredentialsValid = checkCredentials(email, password);

  if (isCredentialsValid) {
    res.status(200);
    res.json(VALID_CREDS_MSG);
  } else {
    res.status(401);
    res.json(INVALID_CREDS_ERROR);
  }
});

module.exports = router;
