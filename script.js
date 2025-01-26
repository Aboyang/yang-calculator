class Calculator {
    constructor() {
        this.operand = '0'
        this.prevOperand = null
        this.operatorBuffer = null
        this.secondOperand = false
        this.equate = false
    }

    append(digit) {

        //check for the overwriting result displayed
        if (!this.secondOperand && this.equate) {
            this.operand = digit
            this.equate = false
            return
        }

        //check for the entry of the second operand
        if (this.secondOperand) {
            this.operand = digit
            this.secondOperand = false
            return
        }

        //number of digit limit
        let len = 1
        for (let digit of this.operand) {
            if (digit == '.' | digit == '-') {continue}
            len +=1
        }
        if (len == 8) {return}


        digit = digit.toString()

        //check for 0 snd -0
        if ((this.operand == '0' | this.operand == '-0') && digit == '.') {
            //if digit entered is '.'
            this.operand = this.operand + '.'
            return
        } else {
            //if digit entered is num
            if (this.operand == '0') {
                this.operand = digit
                return 
            } else if (this.operand == '-0') {
                this.operand = '-' + digit.toString()
                return
            }
        }
        
        //operand should only have one '.'
        if (digit == '.' && this.operand.includes('.')) {return}

        this.operand += digit.toString()
    }

    display(displayScreen) {
        if (this.operand.length > 7) {
            console.log('exp')
            displayScreen.innerHTML = (Number(this.operand).toExponential(2)).toString()
        } else {
            displayScreen.innerHTML = this.operand
        }
    }

    clear(key) {
        if (key == 'AC') {
            this.operand = '0'
            this.prevOperand = null
            this.operatorBuffer = null
        } else if (key == 'DEL') {
            this.operand = this.operand.slice(0, this.operand.length - 1)
            if (this.operand == '') {
                this.operand = '0'
            } else if (this.operand == '-') {
                this.operand = '-0'
            }
        }
    }

    toggleSign() {


        if (this.secondOperand) {
            this.operand = '-0'
            this.secondOperand = false
            return
        }
    
        if (this.operand[0] == '-') {
            this.operand = this.operand.slice(1,this.operand.length)
        } else {
            this.operand = '-' + this.operand
        }
    }

    operation(operator) {

        if (!this.prevOperand) {
            this.prevOperand = this.operand
            this.operatorBuffer = operator
            this.secondOperand = true
            this.equate = false
            return
        }

        if (this.prevOperand) {

            let len1 = this.prevOperand.length
            for (let digit of this.prevOperand) {
                if (digit == '.') {
                    len1 -=1 
                    break
                }
                len1 -=1
            }
    
            let len2 = this.operand.length
            for (let digit of this.operand) {
                if (digit == '.') {
                    len2 -=1 
                    break
                }
                len2 -=1
            }
    
            let decimal = 1
            if (!(len1 == 0 && len2 == 0)) {
                decimal = 10 ** Math.max(len1, len2) 
            }
    
            console.log(decimal)
            const num1 = Number(this.prevOperand) * decimal
            const num2 = Number(this.operand) * decimal

            switch (this.operatorBuffer) {
                case '+':
                    this.operand = ((num1 + num2)/decimal).toString()
                    break
                case '-':
                    this.operand = ((num1 - num2)/decimal).toString()
                    break
                case '×':
                    this.operand = ((num1 * num2)/(decimal * decimal)).toString()
                    break
                case '÷':
                    this.operand = ((num1 / num2)).toString()
                    break
            }

            this.operatorBuffer = operator
            this.prevOperand = this.operand
            this.secondOperand = true
        }
    }

    result() {
        if (!this.prevOperand) {return}

        let len1 = this.prevOperand.length
        console.log(this.prevOperand)
        for (let digit of this.prevOperand) {
            if (digit == '.') {
                len1 -=1 
                break
            }
            len1 -=1
        }

        let len2 = this.operand.length
        for (let digit of this.operand) {
            if (digit == '.') {
                len2 -=1 
                break
            }
            len2 -=1
        }

        let decimal = 1
        if (!(len1 == 0 && len2 == 0)) {
            decimal = 10 ** Math.max(len1, len2)
        }

        console.log(decimal)
        const num1 = Number(this.prevOperand) * decimal
        const num2 = Number(this.operand) * decimal

        switch (this.operatorBuffer) {
            case '+':
                this.operand = ((num1 + num2)/decimal).toString()
                break
            case '-':
                this.operand = ((num1 - num2)/decimal).toString()
                break
            case '×':
                this.operand = ((num1 * num2)/(decimal * decimal)).toString()
                break
            case '÷':
                this.operand = ((num1 / num2)).toString()
                break
        }

        this.operatorBuffer = null
        this.prevOperand = null
        this.secondOperand = false
        this.equate = true
    }
}

//all the buttons
const numButtons = document.querySelectorAll('[data-number]')
const opeButtons = document.querySelectorAll('[data-operator]')
const togButton = document.querySelector('[data-toggle]')
const equButton = document.querySelector('[data-equal]')
const clearButtons = document.querySelectorAll('[data-clear]')
const displayScreen = document.querySelector('[data-display]')
const clickSFX = document.getElementById('click')

calc = new Calculator()


numButtons.forEach(button => {
    button.addEventListener('click', () => {
        clickSFX.play()
        calc.append(button.innerHTML)
        calc.display(displayScreen)
    })

})

clearButtons.forEach(button => {
    button.addEventListener('click', () => {
        clickSFX.play()
        calc.clear(button.innerHTML)
        calc.display(displayScreen)
    })
})

togButton.addEventListener('click', () => {
    clickSFX.play()
    calc.toggleSign()
    calc.display(displayScreen)

})

opeButtons.forEach(button => {
    button.addEventListener('click', () => {
        clickSFX.play()
        calc.operation(button.innerHTML)
        calc.display(displayScreen)
        
    })
})

equButton.addEventListener('click', () => {
    clickSFX.play()
    calc.result()
    calc.display(displayScreen)
    
})
    




