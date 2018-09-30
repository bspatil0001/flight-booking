import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('MMM DD, YYYY')
  }
});

Vue.filter('formatTime', function (value) {
  if (value) {
    return moment(value).format('HH:mm A')
  }
})
