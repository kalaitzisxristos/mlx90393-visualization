const http = require('http')
const path = require('path')

const express = require('express')
const socketIo = require('socket.io')

const Readline = require('@serialport/parser-readline')
const SerialPort = require('serialport')

const app = express()
const server = http.createServer(app)
const io = socketIo.listen(server)

app.use(express.static(path.resolve(__dirname, 'public')))

const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 })

const parser = new Readline()
port.pipe(parser)

parser.on('data', line => console.log(`> ${line}`))

io.on('connection', socket => {
  const data = {
    x: 0,
    y: 0,
    z: 0
  }

  const listener = line => {
    line = line.trim()
    if (!line.length) return
    try {
      const { X, Y, Z } = JSON.parse(line)
      data.x = X
      data.y = Y
      data.z = Z
      socket.emit('xyz', data)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  parser.on('data', listener)
  socket.on('disconnect', () => {
    parser.removeListener('data', listener)
  })
})

server.listen(3000)
