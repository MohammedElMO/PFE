
const text = document.querySelector(".effect") as HTMLHeadingElement
let animatedTexture = "PharmacyMarocco"

const letters = animatedTexture.split("")

letters.forEach((c) => {
  const letter = document.createElement("span")
  letter.innerText = c
  letter.className = "animate-swing"
  text.append(letter)
})
