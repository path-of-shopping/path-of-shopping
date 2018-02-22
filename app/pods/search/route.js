import Route from '@ember/routing/route';
import Ember from 'ember';
import fetch from 'fetch';

export default Route.extend({
  model() {
    for (let i = 0; i < 19; i++) {
      fetch('http://192.168.0.165:3000/search', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: '{"query":{"status":{"option":"online"},"name":"The Brass Dome","type":"Gladiator Plate","stats":[{"type":"and","filters":[]}]},"sort":{"price":"asc"}}'
      }).then((test) => console.log(i, test));
    }
  }
});
