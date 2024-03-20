
const text = document.querySelector(".effect") as HTMLHeadingElement
let animatedTexture = "Welcome To Pharmacy Net"

const letters = animatedTexture.split("")

letters.forEach((c) => {
  const letter = document.createElement("span")
  letter.innerText = c
  letter.className = "animate-swing"
  text.append(letter)
})
