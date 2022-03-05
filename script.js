let bill, headCount, tipPercent
let tipAmount, total

let billInput = document.querySelector(".bill > input")
let headCountInput = document.querySelector(".head-count > input")
let tipPercentInputs = document.querySelectorAll("div.tip")
let customTipPercentInput = document.querySelector(".custom-tip")

let tipAmountOutput = document.querySelectorAll(".price")[0]
let totalOutput = document.querySelectorAll(".price")[1]

let errorMessage = document.querySelector(".error")

function calculate() {
	let baseTotalPerPerson = bill / headCount
	tipAmount = (bill * tipPercent) / headCount
	tipAmountOutput.innerText = `$${tipAmount.toFixed(2)}`
	total = tipAmount + baseTotalPerPerson
	totalOutput.innerText = `$${total.toFixed(2)}`
}

function clearTipSelection() {
	tipPercentInputs.forEach((tip) => {
		tip.classList.remove("chosen-tip")
	})
}

billInput.addEventListener("change", (e) => {
	bill = e.target.value
	if(headCount && tipPercent) calculate()
})

headCountInput.addEventListener("change", (e) => {
	if(e.target.value < 1) {
		errorMessage.hidden = false
		headCountInput.classList.add("input-error")
		headCount = undefined
	} else {
		errorMessage.hidden = true
		headCountInput.classList.remove("input-error")
		headCount = e.target.value
		if(bill && tipPercent) calculate()
	}
})


tipPercentInputs.forEach((tip) => {
	tip.addEventListener("click", (e) => {
		clearTipSelection()
		customTipPercentInput.classList.remove("chosen-tip")
		e.target.classList.toggle("chosen-tip")
		tipPercent = Number(e.target.textContent.slice(0, -1)) * 0.01
		if(bill && headCount) calculate()
	})
})

customTipPercentInput.addEventListener("click", (e) => {
	clearTipSelection()
	customTipPercentInput.classList.toggle("chosen-tip")
	if(e.target.value) {
		tipPercent = e.target.value * 0.01
		if(bill && headCount) calculate()
	}
})
customTipPercentInput.addEventListener("change", (e) => {
	if(e.target.value) {
		tipPercent = e.target.value * 0.01
		if(bill && headCount) calculate()
	}
})

// reset
let resetButton = document.querySelector(".reset")

resetButton.addEventListener("click", () => {
	// clear variables
	bill = undefined
	tipPercent = undefined
	headCount = undefined
	tipAmount = undefined
	total = undefined

	// clear display values
	billInput.value = ""
	clearTipSelection()
	customTipPercentInput.classList.remove("chosen-tip")
	customTipPercentInput.value = ""
	headCountInput.value = ""

	tipAmountOutput.innerText = "$0.00"
	totalOutput.innerText = "$0.00" 
})