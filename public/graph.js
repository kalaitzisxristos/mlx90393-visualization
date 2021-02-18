/* global d3 */

const h = 400
const w = 400

let time = 0
const num = 100

const data = [0]
const deltas = [0]

let latestData = [0]
let latestDeltas = [0]

const x = d3.scaleLinear().range([0, w - 40])
const y = d3.scaleLinear().range([h - 40, 0])

const xAxis = d3.axisBottom(x)
  .tickSize(-h + 40, 0)
  .tickPadding(10)

const yAxis = d3.axisLeft(y)
  .tickSize(-w + 40, 0)
  .tickPadding(10)

const line = d3.line()
  .x((d, i) => x(i + time - num))
  .y(d => y(d))

const _svg = d3.select('#some-gay-gruf').append('svg')
_svg.attr({ width: w, height: h })
const svg = _svg.append('g')
  .attr('transform', 'translate(30, 20)')

const $xAxis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${h - 40})`)
  .call(xAxis)

const $yAxis = svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis)

const $data = svg.append('path')
  .attr('class', 'line data')

function tick () {
  time++
  data[time] = 5 - Math.random() * 10
  // data[time] = Math.max(data[time], 0)

  deltas[time] = data[time] - data[time - 1]

  if (time <= num) {
    latestData = data.slice(-num)
    latestDeltas = deltas.slice(-num)
  } else {
    latestData.shift()
    latestDeltas.shift()
    latestData.push(data[time])
    latestDeltas.push(deltas[time])
  }
}

function update () {
  x.domain([time - num, time])
  const yDom = d3.extent(latestData)
  yDom[0] = -5
  yDom[1] += 1
  y.domain([-5, 5])

  $xAxis.call(xAxis)
  $yAxis.call(yAxis)

  $data
    .datum(latestData)
    .attr('d', line)
}

for (let i = 0; i < num + 50; i++) {
  tick()
}

update()

setInterval(() => {
  tick()
  update()
}, 10)
