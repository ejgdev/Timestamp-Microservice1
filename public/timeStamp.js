'use strict';

module.exports = function(app) {
  app.get('/:query', function(req, res) {
    const input = req.params.query;
    const isUnix = /^\d+$/.test(input);
    const isNatural = /^\w[^0-9]+\s\d{1,2}\,\s\d{4}$/.test(input);
    let natural = null;
    let unix = null;
    
    if (isNatural) {
      const date = Math.floor(new Date(input).getTime() / 1000);
      natural = isNaN(date) ? null : input;
      unix = isNaN(date) ? null : date;
    }
    if (isUnix) {
    const date = new Date(input * 1000);
    unix = parseInt(input);
    natural = date.toLocaleString('en-us', { month: 'long' })+' '+ date.getDate()+','+date.getFullYear();
    }
        
    res.send({ unix: unix, natural: natural});
  }
)}