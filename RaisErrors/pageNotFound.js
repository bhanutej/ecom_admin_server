const fs = require('fs');

exports.pageNotFound = (res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile(__basedir + '/public/404.html', null, (error, data) => {
    if (error) {
      res.write('Page Not Found!');
    }
    else {
      res.write(data);
    }
    res.end();
  });
}