const http = require("http")
const host = "localhost"
const PORT = process.env.PORT || 5000


// cb function yang akan digunakan untuk .createServer()
// Logika untuk menangani dan menanggapi request dituliskan
const requestListener = (req, res) => {
    res.setHeader('Content-Type', "application.json")
    // memberitahu client teknologi server yang digunakan
    res.setHeader("X-Powered-By", "NodeJS")

    // destructure property method dari object req
    const { method, url } = req

    if (url === "/") {

        if (method === "GET") {
            res.statusCode = 200
            // JSON.stringify() : mengubah objek JS menjadi JSON string
            res.end(JSON.stringify({
                message: "Ini adalah homepage"
            }))
        } else {
            res.statusCode = 404
            res.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan method ${method} request`
            }))
        }

    } else if (url === "/about") {

        if (method === "GET") {
            res.statusCode = 200
            res.end(JSON.stringify({
                message: `Hello! ini adalah halaman about!`
            }))
        } else if (method === "POST") {
            let body = []
            req.on('data', chunk => {
                body.push(chunk)
            })
            req.on("end", () => {
                // merubah data buffer menjadi data bertipe string yang siap dipakai
                body = Buffer.concat(body).toString();
                // merubah string json menjadi JS object
                const { name } = JSON.parse(body)
                res.statusCode = 201
                res.end(JSON.stringify({
                    message: `Hello ${name}, ini adalah about page!`
                }))
            })
        } else {
            res.statusCode = 400
            res.end(JSON.stringify({
                message: `Halaman ${url} tidak dapat diakses dengan ${method} request`
            }))
        }

    } else {
        res.statusCode = 404
        res.end(JSON.stringify({
            message: "Halaman tidak ditemukan!"
        }))
    }

}


// instance dari http.server()
const server = http.createServer(requestListener)

server.listen(PORT, host, () => console.log(`Server running PORT : ${PORT}`))