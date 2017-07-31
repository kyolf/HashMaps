'use strict';

class HashMap {
  constructor(initialCapacity = 8){
    this._capacity = initialCapacity;
    this.length = 0;
    this._slots = [];
    this.MAX_LOAD_RATIO = 0.9;
    this.SIZE_RATIO = 3;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

