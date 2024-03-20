const feature_toggler = document.querySelectorAll(
  ".default-toggle .tog",
) as NodeListOf<HTMLDivElement>

const switchPrefference = (e: MouseEvent) => {
  const currentToggler = e.target as HTMLDivElement
  const parentTargetChild = currentToggler.parentElement
  if (currentToggler.classList.contains("on")) {
    currentToggler.classList.remove("on")
    parentTargetChild?.classList.remove("on-p")
  } else {
    currentToggler.classList.add("on")
    parentTargetChild?.classList.add("on-p")
  }
}
feature_toggler.forEach((el) => {
  el.addEventListener("click", switchPrefference)
})
