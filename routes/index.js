exports.index = function(req, res){
  res.render('index', { 
    title: 'Express'
  , IS_PRODUCTION: process.env.NODE_ENV === 'production' // new
  })
};
