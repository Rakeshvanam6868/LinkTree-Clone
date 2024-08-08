import { checkDuplicateUsernameOrEmail } from '../middleware/verifyUser.js';
import { register, login } from '../controllers/authController.js';

export default function(app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/register',
    [
      (req, res, next) => checkDuplicateUsernameOrEmail(req, res, next)
    ],
    register
  );

  app.post('/api/auth/login', login);
}
