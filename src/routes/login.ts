const { Router } = require('express');
const mockCredentials = require('./mocks/mock-creds.json');

const loginRouter = Router();

interface ICredentials {
  email: string;
  password: string;
}

const EMPTY_CREDS_ERROR = { status: 'error', message: 'email or password not provided' };
const INVALID_CREDS_ERROR = { status: 'error', message: 'invalid credentials' };
const VALID_CREDS_MSG = { status: 'ok', message: 'login credentials passed' };

const getCredsFromDbByEmail = (email: string): ICredentials | undefined => {
  return mockCredentials.find((credsPair: ICredentials) => {
    return credsPair.email === email;
  });
};

const checkCredentials = (email: string, password: string): boolean => {
  const credentials = getCredsFromDbByEmail(email);

  if (credentials) {
    return credentials.password === password;
  }

  return false;
};

loginRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json(EMPTY_CREDS_ERROR);
  }

  const isCredentialsValid = checkCredentials(email, password);

  if (isCredentialsValid) {
    return res.status(200).json(VALID_CREDS_MSG);
  } else {
    return res.status(401).json(INVALID_CREDS_ERROR);
  }
});

module.exports = loginRouter;
