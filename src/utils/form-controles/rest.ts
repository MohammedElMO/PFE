export const reset = (Inputs: HTMLInputElement[]) => {
  for (let input of Inputs) {
    input.value = ""
  }
}
