<template>
  <div class="home-wrapper container">
    <header class="page-header">Flight Booking</header>
    <div class="row">
      <div class="col-sm-4 col-md-3 col-xs-12 sidebar">
        <div class="form-container box">
          <form novalidate autocomplete="off" @submit.prevent="searchFlight()">
            <div class="input-element">
              <input name="flight" type="radio" @click="roundtrip=false" :checked="!roundtrip">&nbsp;&nbsp;One way
              <input name="flight" type="radio" @click="roundtrip=true">&nbsp;&nbsp;Round trip
            </div>
            <div class="input-element">
              <select name="search_origin" id="" v-model="search_data.search_origin" class="form-control"
                      v-validate.disable="'required'">
                <option :value="undefined">Select Origin</option>
                <option v-for="(place, index) in flight_places" :value="place" :key="index" v-show="place != search_data.search_dest">{{place
                  }}</option>
              </select>
              <div class="error" v-show="errors.first('search_origin')">
                Required
              </div>
            </div>
            <div class="input-element">
              <select name="search_dest" id="" v-model="search_data.search_dest" class="form-control"
                      v-validate.disable="'required'">
                <option :value="undefined">Select Destination</option>
                <option v-for="(place, index) in flight_places" :value="place" v-show="place != search_data.search_origin" :key="index">{{place}}</option>
              </select>
              <div class="error" v-show="errors.first('search_dest')">
                Required
              </div>
            </div>
            <div class="input-element">
              <datepicker class="datepicker form-control"
                          name="date1"
                          placeholder="Start Date"
                          v-model="search_data.date1"
                          v-validate.disable="'required'"
                          v-on:selected="disableTo()"
                          :ref="'datereference'">
              </datepicker>
              <div class="error" v-show="errors.first('date1')">
                Required
              </div>
            </div>
            <div v-if="roundtrip" class="input-element">
              <datepicker class="datepicker form-control"
                          :disabledDates="search_data.disabled"
                          name="date2"
                          placeholder="Return Date"
                          v-model="search_data.date2"
                          v-validate.disable="'required'">
              </datepicker>
              <div class="error" v-show="errors.first('date2')">
                Required
              </div>
            </div>
            <div class="input-element">
              <input name="no_passengers" placeholder="No of passengers" type="number" :min="1"
                     v-model="search_data.no_passengers" class="form-control" v-validate.disable="'required'">
              <div class="error" v-show="errors.first('no_passengers')">
                Required
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Search</button>
            <button class="btn btn-danger" type="button" @click="clearSearch()">Clear</button>
          </form>
        </div>
        <div class="slider-container box">
          <h4>Refine flight search</h4>
          <vue-slider
            v-model="slider_range"
            :max="max"
            :interval="10"
            :dotSize="12"
            :show="true"
            :tooltip="'hover'"
            :height="10"
            :clickable="false"
            @drag-end="dragEnd"></vue-slider>
        </div>
      </div>
      <div class="col-sm-8 col-md-9 col-xs-12">
        <div class="flight-container">
          <div class="row search-results" v-if="search_filter.search_origin">
            <div class="col-sm-8 search-filter">
              <span>{{ search_filter.search_origin }}</span>
              <span>{{ search_filter.search_dest }}</span>
              <span v-if="returnflight">{{ search_filter.search_origin }}</span>
            </div>
            <div class="col-sm-4 col-md-3 col-xs-12">
              <div>
                Depart: {{ search_filter.date1 | formatDate }}
              </div>
              <div v-if="returnflight">
                Return: {{ search_filter.date2 | formatDate }}
              </div>
            </div>
          </div>
          <div class="flight" v-for="(flight, index) in filtered_data" v-if="filtered_data.length > 0" :key="index">
            <div class="row">
              <div class="col-sm-8 col-md-9 col-xs-12">
                <div class="flight-information">
                  <div class="flight-cost">
                    Rs. <span v-if="!returnflight">{{ flight.cost[0] }}</span>
                    <span v-else>{{ flight.cost[1] }}</span>
                  </div>
                  <div class="row">
                    <div class="flight-info" :class="returnflight? 'col-sm-6':'col-sm-12'">
                      <div class="flight-id">
                        Ai-202
                      </div>
                      <div class="flight-places">
                        <span>{{ flight.origin }}</span> > <span>{{ flight.destination }}</span>
                      </div>
                      <div class="flight-timings">
                        <div>
                          <span>Depart:</span><span>{{ flight.timing1.startTime | formatTime }}</span>
                        </div>
                        <div>
                          <span>Arrive:</span><span>{{ flight.timing1.endTime | formatTime }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 flight-info" v-if="returnflight">
                      <div class="flight-id">
                        Ai-202
                      </div>
                      <div class="flight-places">
                        <span>{{ flight.destination }}</span> > <span>{{ flight.origin }}</span>
                      </div>
                      <div class="flight-timings">
                        <div>
                          <span>Depart:</span><span>{{ flight.timing2.startTime | formatTime }}</span>
                        </div>
                        <div>
                          <span>Arrive:</span><span>{{ flight.timing2.endTime | formatTime }}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="col-sm-8 col-md-3 col-xs-12">
                <div>
                  <img :src="flight.img" alt="" class="" height="110" width="100px">
                </div>
                <button class="btn btn-primary">
                  Book this flight
                </button>
              </div>
            </div>
          </div>
          <div v-if="filtered_data.length == 0">
            <h1>
              No Flight Available
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./home.js"></script>
