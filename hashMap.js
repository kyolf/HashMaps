'use strict';

class HashMap {
  constructor(initialCapacity = 8){
    this._capacity = initialCapacity;
    this.length = 0;
    this._slots = [];
    this.MAX_LOAD_RATIO = 0.9;
    this.SIZE_RATIO = 3;
    this._deleted = 0;
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
    const loadRatio  = (this.length + this._deleted + 1) / this._capacity;
    if(loadRatio > this.MAX_LOAD_RATIO){
      this._resize(this._capacity * this.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {key, value, deleted: false};
    this.length++;
  }

  _findSlot(key){
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for(let i = 0; i < start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if(slot === undefined || (slot.key === key && !slot.deleted)){
        return index;
      }
    }
  }

  _resize(size){
    const oldSlot = this._slots;
    this._capacity = size;
    this._length = 0;
    this._slots = [];

    for(const slot of oldSlot){
      if(slot !== undefined && !slot.deleted){
        this.set(slot.key, slot.value);
      }
    }
  }

  remove(key){
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if(slot === undefined){
      throw new Error('The slot was undefined.');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }
}

const hash = new HashMap();

hash.set('bob', 'the builder');
hash.set('frank', 'the tank');
hash.set('bill', 'the ill');
hash.set('jill', 'the pill');
hash.set('thomas', 'the train');
hash.set('jack', 'and jill');
hash.set('when', 'up the hill');
hash.set('idk', 'how the story goes after that');
console.log(hash.length);
hash.remove('bob');
console.log(hash.length);
console.log(hash._deleted);