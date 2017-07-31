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

  set(key, value){
    const loadRatio  = (this.length + 1) / this._capacity;
    if(loadRatio > this.MAX_LOAD_RATIO){
      this._resize(this._capacity * this.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {key, value};
    this.length++;
  }

  _findSlot(key){
    const hash = this._hashString(key);
    const start = hash % this._capacity;

    for(let i = 0; i < start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if(slot === undefined || slot.key === key){
        return index;
      }
    }
  }

  _resize(size){
    const oldSlot = this._slots;
    this._capacity = size;
    this._length = 0;
    this._slots = [];

    for(const slot in oldSlot){
      if(slot !== undefined){
        this._set(slot.key, slot.value);
      }
    }
  }
}

