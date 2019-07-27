import { CstElement } from "chevrotain";

export function getImage(contextNode) {
  return contextNode[0].image;
}

export function createOrUpdate(arr, id, value) {
  arr[id] = arr[id] ? arr[id] : []
  arr[id].push(value)
  
  return arr;
}