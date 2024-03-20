export const reset = (Inputs: HTMLInputElement[]) => {
  for (let input of Inputs) {
    console.log(input)
    input.value = ""
  }
}
