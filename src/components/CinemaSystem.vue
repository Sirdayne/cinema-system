<template lang="pug">
#cinema
  #cinema-system(:class="{'active': rerender}")
    .row(v-for="row in seats")
      .seat-container(v-for="seat in row")
        .seat(v-if="seat.free", @click="pickSeat(row, seat)", :class="{'picked': seat.pick}")
        .seat(v-else, class="busy")
  #cinema-total
    #window
      .container(v-for="seat in seats")
        .container(v-for="pick in seat")
          .stroke(v-if="pick.pick") ряд {{pick.row}} место {{pick.seat}}
    .buttons
      .total {{ totalSum }} рублей
      button(@click="buyTickets") Купить
      button(@click="cancelTickets") Отмена
  .modal Спасибо за заказ!
</template>

<script>

import $ from "jquery";

export default {
  name: 'CinemaSystem',
  data() {
    return {
      seats: [],
      totalSum: 0,
      rerender: false
    }
  },
  created() {
    this.initData()
    this.banSeats()
  },
  methods: {
    initData() {
      this.seats = []
      for (let row = 1; row <= 10; row++) {
        this.seats[row] = []
        for (let seat = 1; seat <=10; seat++){
          let place = {
            row: row,
            seat: seat,
            free: true,
            pick: false
          }
          this.seats[row].push(place)
        }
      }
    },
    banSeats() {
      let banned = 0
      while(banned < 10) {
        let randomRow = this.random()
        let randomSeat = this.random()
        banned += this.banSeat(randomRow, randomSeat)
      }
    },
    banSeat(row, seat) {
      let finded = this.seats[row].find(s => s.seat === seat)
      if (!finded.free)
        return 0
      else
        finded.free = false
        return 1
    },
    random() {
      return Math.floor(Math.random() * 10) + 1
    },
    pickSeat(row, seat) {
      seat.pick = !seat.pick
      this.calcTotalSum()
      this.reRender()
    },
    buyTickets() {
      this.seats.forEach(s => {
        s.forEach(seat => {
          seat.free = seat.pick || !seat.free ? false : true
          seat.pick = false
        })
      })
      if (this.totalSum > 0) {
        $('.modal').slideDown(400).delay(2000).slideUp(400)
      }
      this.calcTotalSum()
      this.reRender()
    },
    cancelTickets() {
      this.seats.forEach(s => {
        s.forEach(seat => {
          seat.pick = false
        })
      })
      this.calcTotalSum()
      this.reRender()
    },
    calcTotalSum() {
      this.totalSum = 0
      this.seats.forEach(s => {
        s.forEach(seat => {
          if (seat.pick) {
            this.totalSum += 100
          }
        })
      })
    },
    reRender() {
      this.rerender = !this.rerender
    }
  }
}
</script>

