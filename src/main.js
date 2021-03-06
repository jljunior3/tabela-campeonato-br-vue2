// window.$ = window.jQuery = require('jquery');
// require('popper.js');
// require('style!css!bootstrap/dist/css/bootstrap.min.css');
// require('bootstrap');

import Vue from 'vue'
import {Time} from './time';
import _ from 'lodash';



new Vue({
  el: '#app',
  data :{
    filter : '',
    order: {
      keys: ['pontos', 'gm', 'gs'],
      sort: ['desc', 'desc', 'asc']
    },
    colunas: ['nome', 'pontos', 'gm', 'gs', 'saldo'],
    view: 'tabela',
    times :[
      new Time('America MG', require('./assets/america_mg_60x60.png')),
      new Time('Atletico MG', require('./assets/atletico_mg_60x60.png')),
      new Time('Atletico PR', require('./assets/atletico-pr_60x60.png')),
      new Time('Botafogo', require('./assets/botafogo_60x60.png')),
      new Time('Chapecoente', require('./assets/chapecoense_60x60.png')),
      new Time('Corinthians', require('./assets/corinthians_60x60.png')),
      new Time('Cruzeiro', require('./assets/cruzeiro_60x60.png')),
      new Time('Coritiba', require('./assets/coritiba_60x60.png')),
      new Time('Figueirense', require('./assets/figueirense_60x60.png')),
      new Time('Flamengo', require('./assets/flamengo_60x60.png')),
      new Time('Fluminense', require('./assets/fluminense_60x60.png')),
      new Time('Gremio', require('./assets/gremio_60x60.png')),
      new Time('Internacional', require('./assets/internacional_60x60.png')),
      new Time('Palmeiras', require('./assets/palmeiras_60x60.png')),
      new Time('Ponte Preta', require('./assets/ponte_preta_60x60.png')),
      new Time('Santa Cruz', require('./assets/santa_cruz_60x60.png')),
      new Time('Santos', require('./assets/santos_60x60.png')),
      new Time('São Paulo', require('./assets/sao_paulo_60x60.png')),
      new Time('Sport', require('./assets/sport_60x60.png')),
      new Time('Vitória', require('./assets/vitoria_60x60.png')),
    ],
    novoJogo: {
      casa: {
        time: null,
        gols: 0
      },
      fora: {
        time: null,
        gols: 0
      }
    }
  },
  methods: {
    fimJogo(){
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },
    createNovoJogo() {
      let indexCasa = Math.floor(Math.random() * 20),
        indexFora = Math.floor(Math.random() * 20);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;
      this.showView('novoJogo');
    },
    showView(view) {
      this.view = view;
    },
    sortBy(coluna) {
      this.order.keys = coluna;
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
      console.log(this.order.keys, this.order.sort);
    }
  },
  computed: {
    timesFiltered() {
      let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

      return _.filter(colecao, item => {
        item.nome = item.nome.toLowerCase();
        return item.nome.indexOf(this.filter.toLowerCase()) >= 0;
      })
    }
  },
  filters: {
    saldo(time){
      return time.gm - time.gs;
    },
    ucwords(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
})
