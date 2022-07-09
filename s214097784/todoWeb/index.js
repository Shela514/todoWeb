var getRawBody = require('raw-body')
var body = require('body');
const r = require('./route')

module.exports.handler = function(req, resp, context) {

    console.log('hello world')
    console.log(req.url)

    resp.setHeader('content-type', 'application/json')

    var uri = (req.url).split('/')

    if(uri.length == 0) {
        resp.send(JSON.stringify({
            'code': 400, 
            'body': 'Bad Request'}
            , null, ''))
        } else {

            var route = uri[uri.length-1]
            console.log(route)

        switch(req.method) {
            case "GET": 
                resp.send(JSON.stringify(r.get(route)))
                break
            case "POST":
                getRawBody(req, (err, body) => {
                    resp.send(JSON.stringify(r.post(route, body.toString())))
                });
                break
            case "PUT":
                getRawBody(req, (err, body) => {
                    resp.send(JSON.stringify(r.put(route, body.toString())))
                });
                break
            }
    } 
}


