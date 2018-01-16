/* action */
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

const increment = () => {
  return {type: INCREMENT}
}

const decrement = () => {
  return {type: DECREMENT}
}

const reset = () => {
  return {type: RESET}
}

export default increment;
export default decrement;
export default reset;