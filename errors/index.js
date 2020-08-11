
const handlePSQL400s = (err, req, res, next) => {
    console.log('-psql400->>', err)
    if (err.code === '22P02') {
      res
      .status(400)
      .send({msg: 'bad request'})
    } else {
      next(err);
    };
  };

  const handle500s = (err, req, res, next) => {
    console.log('-500->>', err)
    res.status(500).send({msg: 'server error!!'})
  }

const handleCustomErrors = (err, req, res, next) => {
      if(err.hasOwnProperty('msg')) {
        res.status(err.status)
        .send({msg: err.msg})
      } else {
        next(err);
      }
  };

  const send405Error = (err, req, res, next) => {
    res.status(405).send({msg: 'method not allowed!'})
  }

module.exports = {handlePSQL400s, handleCustomErrors, handle500s, send405Error};
