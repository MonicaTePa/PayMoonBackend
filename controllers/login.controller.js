const User = require('../auth/auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.loginUser = (req, res, next)=>{
    const userData = {
          identification: req.body.identification,
          password: req.body.password
      }
      User.findOne({identification: userData.identification}, (err, user)=>{
          if (err) return res.status(500).send('server error!');
          if (!user){
              res.status(409).send({message: 'Something is wrong'});
          } else {
              const resultPassword = bcrypt.compareSync(userData.password, user.password);
              if (resultPassword) {
                  const expiresIn = 24 * 60 * 60;
                  const accessToken = jwt.sign({id: user.id}, SECRET_KEY, { expiresIn: expiresIn });
          
          const dataUser = {
            _id: user._id,
            name: user.full_name,
            identification: user.identification,
            accessToken: accessToken,
            expiresIn: expiresIn
          }
                  res.send({ dataUser });
              } else {
                  res.status(409).send({ message: 'Something is wrong' });
              }
          }
      })
  }