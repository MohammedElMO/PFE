import $ from "jquery"

const text = $(".effect")
let animatedTexture = "Welcome To Pharmacy Net"

const letters = animatedTexture.split("")

letters.forEach((c) => {
  const letter = document.createElement("span")
  letter.innerText = c
  letter.className = "animate-swing"
  text.append(letter)
})

// let i = animatedTexture.length - 1
// let reanimation: any
// let erasing = setInterval(eraseChar, 500)

// function eraseChar() {
//   // const chars = animatedTexture.slice(0, i)
//   const letters = text.children("span")[i]
//   i -= 1
//   letters.className = "animate-fade-in"
//   setTimeout(() => {
//     letters.remove()
//   }, 700)

//   if (i === -1) {
//     i = 0
//     clearInterval(erasing)
//     // reanimation = setInterval(reanimate, 100)
//   }
// }
// function reanimate() {
//   const letters = text.children("span")[i]

//   i += 1
//   letters.className = ""

//   if (i === animatedTexture.length + 1) {
//     clearInterval(reanimation)
//     erasing = setInterval(eraseChar, 100)
//   }
// }
