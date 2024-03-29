/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import { users } from '../data/data';

// eslint-disable-next-line consistent-return
export const checkUserExists = (req, res, next) => {
  // eslint-disable-next-line no-shadow
  const user = users.find(user => user.email === req.body.email);
  if (user) return res.status(409).send({ message: 'user already exists' });
  next();
};

export function agentCheck(req, res, next) {
  const agent = users.find(user => user.email === res.locals.user.email)
  // if(!agent) return res.send({error:404, message:'Your details were not correctly stored signup again'})
  if (agent.isAdmin === false) return res.status(403).send({error:403, message:'Only agent can access this service'})
  res.locals.email = agent.email
  next();
}