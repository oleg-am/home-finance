import express from 'express';
import routes from './routes';

import getLogger from 'helpers/logger';
import PromiseRouter from 'helpers/PromiseRouter';

/* eslint new-cap:0 */
const router = PromiseRouter(express.Router);

const logger = getLogger('API:ROUTER');

const checkSession = routes.sessions.check.bind(routes.sessions);

router.getAsync('/users', routes.users.list.bind(routes.users));
router.postAsync('/users', routes.users.create.bind(routes.users));

router.postAsync('/sessions', routes.sessions.create.bind(routes.sessions));

router.postAsync('/budgets', checkSession, routes.budgets.create.bind(routes.budgets));

router.getAsync('/currencies', routes.currencies.list.bind(routes.currencies));
router.postAsync('/currencies', routes.currencies.create.bind(routes.currencies));

router.postAsync('/categories', checkSession, routes.categories.create.bind(routes.categories));

router.use((req, res) => {
  logger.error(`${req.method} ${req.url}`);
  logger.error('BODY: ', req.body);
  logger.error('-------------------');

  res.send({
    status: 0,
    error: {
      code: 'UNKNOWN_API_ENDPOINT',
      message: 'Please, contact your system administartor!',
    },
  });
});

export default router;
