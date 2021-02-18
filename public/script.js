/* global io */

const socket = io()

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  data: {
    x: 0,
    y: 0,
    z: 0,
    rotation: 0,
    left: 0,
    top: 0
  },
  mounted () {
    socket.on('xyz', data => {
      this.x = Number(data.x)
      this.y = Number(data.y)
      this.z = Number(data.z)
      this.calculateData()
    })
  },
  methods: {
    calculateData () {
      // this.rotation = (-(this.z - 32768) / 65536) * 360
      this.left = ((-this.x - 32768) / 65536) * 400 + 400 - 10
      this.top = ((this.y - 32768) / 65536) * 400 + 400 - 10

      this.rotation = Math.atan2(this.y, this.x) * 180 / Math.PI
    }
  }
})
