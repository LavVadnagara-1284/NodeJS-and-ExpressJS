const fs = require('fs');

function logReqRes(filename) {
   return (req, res, next) => {
      fs.appendFile(filename, `${new Date().toLocaleString()}: ${req.method} - ${req.path}\n`, (err, data) => {
         if (err) {
            console.error(`Error logging request: ${err}`);
         } else {
            console.log(`Logged request to ${filename}`);
         }
         next();
      });
   }
}

module.exports = { logReqRes };