import {FLIGHT_DATA, FLIGHT_PLACES} from "../assets/constants";
import Datepicker from 'vuejs-datepicker';
import VueSlideBar from 'vue-slide-bar';
import vueSlider from 'vue-slider-component';

export default {
  name: "HomePage",
  components: {
    Datepicker,
    VueSlideBar,
    vueSlider
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      flight_data: FLIGHT_DATA,
      search_data: {},
      filtered_data: [],
      search_filter: {},
      stored_date: [],
      slider_range: [],
      roundtrip: false,
      returnflight: false,
      flight_places: FLIGHT_PLACES,

      slider_range: [
        "1",
        "20000"
      ],
      width: "100%",
      height: 10,
      dotSize: 14,
      min: 1,
      max: 20000,
      interval: 4,
      disabled: false,
      show: true,
      tooltip: "always",
      piecewise: true
    }
  },
  mounted: function () {
    this.stored_date = this.filtered_data = Object.assign([], this.flight_data);
  },
  methods: {
    searchFlight() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.search_filter = Object.assign({}, this.search_data);
          this.returnflight = this.roundtrip;
          this.stored_date = this.filtered_data = this.flight_data.filter(flight => {
            let date1 = this.search_data.date1.toISOString().substr(0, this.search_data.date1.toISOString().indexOf('T'));
            if (flight.origin == this.search_data.search_origin &&
              flight.destination == this.search_data.search_dest &&
              flight.timing1.startTime.indexOf(date1) > -1 &&
              flight.empty_seats >= this.search_data.no_passengers
            ) {
              if (this.roundtrip) {
                let date2 = this.search_data.date2.toISOString().substr(0, this.search_data.date2.toISOString().indexOf('T'));
                if (flight.timing2.startTime.indexOf(date2) > -1) {
                  return flight;
                }
              }
              else {
                return flight;
              }
            }
          });
          this.slider_range = [
            "1",
            "20000"
          ]
        }
      })
    },
    dragEnd() {
      let index = this.roundtrip ? 1 : 0;
      this.filtered_data = this.stored_date.filter(flight => {
        if (flight.cost[index] >= this.slider_range[0] && flight.cost[index] <= this.slider_range[1]) {
          return flight
        }
      })
    },
    disableTo() {
      this.search_data['disabled'] = {
        from: null,
        to: this.$refs['datereference'].$data.selectedDate,
      };
    },
    clearSearch() {
      this.stored_date = this.filtered_data = Object.assign([], this.flight_data);
      this.search_data = {};
      this.search_filter = {};
      this.slider_range = [
        "1",
        "20000"
      ]
    }
  }
};
