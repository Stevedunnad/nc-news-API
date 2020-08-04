
const handlePSQL400s = () => {
  (err, req, res, next) => {
    if (err.code === '22P02') {
      res
      .status(400)
      .send({msg: 'bad request'})
    } else {
      next(err);
    };
  }
}

const handleCustomErrors = () => {
  (err, req, res, next) => {
    if ('status' in err) {
      res.status(err.status)
      .send({msg: err.msg})
    } else {
      console.log('-->', err)
    }
  }
};

module.exports = {handlePSQL400s, handleCustomErrors};
