var http = require('http')

http.createServer(function (req, res) {
    console.log(req.connection.remoteAddress, req.ip, req.connection)
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('remoteAddress: ' + req.connection.remoteAddress + '\n')
    res.write('x-forwarded-for: ' + req.headers['x-forwarded-for'] + '\n')
    res.write('x-real-ip: ' + req.headers['x-real-ip'] + '\n')
    res.end()
}).listen(9000, '0.0.0.0')