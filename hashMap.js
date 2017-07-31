'use strict';

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    const newNode = {
      value
    };

    if (index == 0) {
      newNode.next = this.head;
      this.head = newNode;
    }
    else {
      // Find the node which we want to insert after
      const node = this._find(index - 1);
      newNode.next = node.next;
      node.next = newNode;
    }

    this.length++;
  }

  _find(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    return this._find(index).value;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (index === 0) {
      this.head = this.head.next;
    }
    else {
      // Find the node before the one we want to remove
      const node = this._find(index - 1);
      node.next = node.next.next;
    }

    this.length--;
  }
}

const display = (linklist) => {
  let node = linklist.head;
  while (node !== null) {
    console.log(node.value);
    node = node.next;
  }
};

const size = (linklist) => {
  let node = linkedList.head;
  let counter = 0;
  while (node.next !== null){
    node = node.next;
    counter++;
  }
  return counter;
};

const isEmpty = (link) => {
  if(link.head === null) return true;
  return false;
};

const findPrevious = (link, value) => {
  let node = link.head;
  while(node.next !== null){
    if(node.next.value === value) return node;
    node = node.next;
  }
};

const findLast = (link) => {
  let node = link.head;
  while(node.next !== null){
    node = node.next;
  }
  return node;
};

class HashMap2 {
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

  get(key){
    const index = this._findSlot(key);
    if(this._slots[index] === undefined){
      return undefined;
    }
    return this._slots[index].value;
  }

  set(key, value){
    const loadRatio  = (this.length + this._deleted + 1) / this._capacity;
    if(loadRatio > this.MAX_LOAD_RATIO){
      this._resize(this._capacity * this.SIZE_RATIO);
    }
    let {start, index} = this._findNode(key);
    if(!this._slots[start]){
      const llist = new LinkedList();
      llist.insert(0, key);
      // llist.deleted = false;
      this._slots[start] = llist; 
    }
    else{
      this._slots[start].insert(index, key);
    }
    this.length++;
  }

  _findNode(key){
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    const initialSlot = this._slots[start];
    let index = 0;
    if(!initialSlot){
      return {start, index};
    }
    let node = this._slots[start].head;
    while(node !== null){
      if(node.value === key){
        return {start, index};
      }
      node = node.next;
      index++;
    }
    return {start, index};
  }

  _resize(size){
    const oldSlot = this._slots;
    this._capacity = size;
    this._length = 0;
    this._slots = [];

    for(const slot of oldSlot){
      if(slot !== undefined ){
        this.set(slot.key, slot.value);
      }
    }
  }

  remove(key){
    const {start, index} = this._findNode(key);
    const slot = this._slots[start];
    if(slot === undefined){
      throw new Error('The slot was undefined.');
    }
    // slot.deleted = true;
    this._slots[start].remove(index);
    this.length--;
    this._deleted++;
  }
}

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

  get(key){
    const index = this._findSlot(key);
    if(this._slots[index] === undefined){
      return undefined;
    }
    return this._slots[index].value;
  }

  set(key, value){
    const loadRatio  = (this.length + this._deleted + 1) / this._capacity;
    if(loadRatio > this.MAX_LOAD_RATIO){
      this._resize(this._capacity * this.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    if(this._slots[index] === undefined){
      this._slots[index] = {key, value, deleted: false};
      this.length++;
    }
    else{
      this._slots[index] = {key, value, deleted: false};    
    }
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

function isPermPalidrome(string, hashMap){
  for(let i = 0; i < string.length; i++){
    const char = string.charAt(i);
    const value = hashMap.get(char);
    if(value === undefined){
      hashMap.set(char, 1);
    }
    else{
      hashMap.set(char, value+1);
    }
  }
  
  let counter = 0;
  const noDup = string.split('').filter((el, index, arr) => {
    if(arr.indexOf(el) === index){
      return el;
    }
  });
  for(let i = 0; i < noDup.length; i++){
    const char = string.charAt(i);
    if(hashMap.get(char) % 2 === 1){
      counter++;
    }
    if(counter > 1){
      return false;
    }
  }
  return true;
}

//console.log(isPermPalidrome('dabde', hash));

// const handleAnagrams = (arr, hash) => {
//   arr.forEach(word => {
//     //console.log(hash.get(word));
//     const hashedWord = HashMap._hashString(word);
//     if(!hash.get(HashMap._hashString(word))){
//       hash.set(HashMap._hashString(word), [word]);
//     }else{
//       hash.set(HashMap._hashString(word), [...hash.get(word), word]);
//     }
//   });
//   console.log(hash._slots);
//   return hash;
// };

//handleAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], hash);

const hashMop = new HashMap2();
hashMop.set('bob','');
hashMop.set('bbo', '');
hashMop.remove('bob');
hashMop.set('love','');
hashMop.set('Tanner is smart','');
console.log(hashMop._slots);

