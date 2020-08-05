
const handlePSQL400s = (err, req, res, next) => {
    console.log('-->>', err)
    if (err.code === '22P02') {
      res
      .status(400)
      .send({msg: 'bad request'})
    } else {
      next(err);
    };
  };

const handleCustomErrors = (err, req, res, next) => {
      //if custom error...
      if(err.hasOwnProperty('msg')) {
        res.status(err.status)
        .send({msg: err.msg})
      } else {
        next(err);
      }
  };

  const handle500s = (err, req, res, next) => {
    console.log('-=>>', err)
    res.status(500).send({msg: 'server error!!'})
  }

module.exports = {handlePSQL400s, handleCustomErrors, handle500s};
