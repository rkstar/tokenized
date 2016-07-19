const _ = require('lodash')
let instance = null

class Tokenized {
  constructor(){
    instance = instance || null
    return instance
  }

  addToken(token='randomtokenizrtokenstring'){
    this.underLimit()
      ? this.bucket.push(token)
      : this.stopAddingToken(token, true)
  }

  getToken(){
    const token = this.bucket.shift()
    const ref = this.intervalReferences[token]
    if( ref && ref.paused && this.underLimit() ){
      this.intervalReferences[token].paused = false
      this.addTokenAtInterval(ref.token, ref.interval, ref.intervalValue)
    }
    return token
  }

  addTokenAtInterval({token, interval=1000, intervalValue='ms'}){
    if( !_.isNumber(interval) ){
      return
    }

    let iv = interval
    switch( intervalValue ){
      case 'd':
      case 'day':
      case 'days':
        iv *= 1000 * 60 * 60 * 24
        break

      case 'h':
      case 'hr':
      case 'hrs':
      case 'hour':
      case 'hours':
        iv *= 1000 * 60 * 60
        break

      case 'm':
      case 'min':
      case 'mins':
      case 'minute':
      case 'minutes':
        iv *= 1000 * 60
        break

      case 's':
      case 'sec':
      case 'secs':
      case 'second':
      case 'seconds':
        iv *= 1000
        break
    }

    this.addTokenIntervalReference({token, interval, intervalValue})
    this.intervals[token] = setInterval(()=>{
      this.addToken(token)
    }, iv)
  }

  addTokenIntervalReference({token, interval=1000, intervalValue='ms'}){
    this.intervalReferences[token] = {token, interval, intervalValue}
  }

  stopAddingToken({token, pause=false}){
    if( this.intervals[token] ){
      clearInterval(this.intervals[token])
      delete this.intervals[token]
      if( pause ){
        this.intervalReferences[token].paused = true
      } else {
        delete this.intervalReferences[token]
      }
    }
  }

  underLimit(){
    return this.limit
      ? (this.bucket.length < this.limit)
      : true
  }

  get bucket(){
    if( !this._bucket ){
      this.bucket = []
    }
    return this._bucket
  }
  set bucket(value){
    this._bucket = _.isArray(value) ? value : [value]
  }

  get intervals(){
    if( !this._intervals ){
      this.intervals = {}
    }
    return this._intervals
  }
  set intervals(value){
    this._intervals = _.isObject(value) ? value : {value}
  }

  get intervalReferences(){
    if( !this._intervalReferences ){
      this.intervalReferences = {}
    }
    return this._intervalReferences
  }
  set intervalReferences(value){
    this._intervalReferences = _.isObject(value) ? value : {value}
  }

  get limit(){
    if( !this._limit ){
      this.limit = 0
    }
    return this._limit
  }
  set limit(value){
    this._limit = _.isNumber(value) ? parseInt(value) : 0
  }

}

module.exports = Tokenized