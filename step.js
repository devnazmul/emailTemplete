// MESSAGE TEXT
const messageText = document.getElementById('message-container')

// NEXT BUTTON 
const firstNextButton = document.getElementById('step-one-next-button')
const secondNextButton = document.getElementById('step-two-next-button')
const thirdNextButton = document.getElementById('step-three-next-button')

// PREVIUS BUTTON 
const secondPrevButton = document.getElementById('step-two-prev-button')
const thirdPrevButton = document.getElementById('step-three-prev-button')

// STEP INDICATIOR
const stepOneIndicator = document.getElementById('step2');
const stepTwoIndicator = document.getElementById('step2');
const stepThreeIndicator = document.getElementById('step3');

// STEPS 
const stepOne = document.getElementById('step-1');
const stepTwo = document.getElementById('step-2');
const stepThree = document.getElementById('step-3');

// MOBILE STEPS 
const mobileStepOne = document.getElementById('step-1-mobile');
const mobileStepTwo = document.getElementById('step-2-mobile');
const mobileStepThree = document.getElementById('step-3-mobile');

// INPUT FIELDS 

const address = document.getElementById('address');
const line_1 = document.getElementById('line_1');
const country = document.getElementById('country');
const district = document.getElementById('district');
const locality = document.getElementById('locality');
const postcode = document.getElementById('postcode');
const residential = document.getElementById('residential');

const date_time = document.getElementById('date_time');



const name_title = document.getElementById('name_title');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');



const closeMessage = () => {
    messageText.innerHTML = ''
}


firstNextButton.addEventListener('click', () => {
    if (address.value === '') {
        alert('address is required')
    } else {
        // REVEAL THE SECOND STEP 
        stepOne.style.display = 'none'
        stepTwo.style.display = 'block'
        stepThree.style.display = 'none'

        mobileStepOne.style.display = 'none'
        mobileStepTwo.style.display = 'flex'
        mobileStepThree.style.display = 'none'

        stepTwoIndicator.classList.replace('form-stepper-unfinished', 'form-stepper-active');
        stepOneIndicator.classList.add('')
        stepTwoIndicator.classList.remove('')
    }
})
secondNextButton.addEventListener('click', () => {
    if (date_time.value === '') {
        alert('date and time both are is required')
    } else {
        // REVEAL THE THIRD STEP 
        stepOne.style.display = 'none'
        stepTwo.style.display = 'none'
        stepThree.style.display = 'block'

        mobileStepOne.style.display = 'none'
        mobileStepTwo.style.display = 'none'
        mobileStepThree.style.display = 'flex'


        stepThreeIndicator.classList.replace('form-stepper-unfinished', 'form-stepper-active')
        stepOneIndicator.classList.remove('')
        stepTwoIndicator.classList.add('')
    }
})


secondPrevButton.addEventListener('click', () => {
    // REVEAL THE FIRST STEP 
    stepOne.style.display = 'block'
    stepTwo.style.display = 'none'
    stepThree.style.display = 'none'
    
    mobileStepOne.style.display = 'flex'
    mobileStepTwo.style.display = 'none'
    mobileStepThree.style.display = 'none'


    stepThreeIndicator.classList.replace('form-stepper-active', 'form-stepper-unfinished')
    stepOneIndicator.classList.remove('')
})

thirdPrevButton.addEventListener('click', () => {
    // REVEAL THE SECOND STEP 
    stepOne.style.display = 'none'
    stepTwo.style.display = 'block'
    stepThree.style.display = 'none'
        
    mobileStepOne.style.display = 'none'
    mobileStepTwo.style.display = 'flex'
    mobileStepThree.style.display = 'none'


    stepThreeIndicator.classList.replace('form-stepper-active', 'form-stepper-unfinished')
    stepOneIndicator.classList.add('')
    stepTwoIndicator.classList.remove('')
})


function validateForm() {
    if (name.value === "" || phone.value === "" || email.value === "") {
        alert("Please fill in all required fields");
        return false;
    }
    const data = {
        address: `${address.value} ${line_1.value} ${country.value} ${district.value} ${locality.value} ${postcode.value}`,
        date_time: date_time.value,
        sale_price: sale_price.value,
        name_title: name_title.value,
        name: name.value,
        phone: phone.value,
        email: email.value
    };
    fetch('https://mughalsignandprint.co.uk/Email/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            response.json()
        })
        .then(data => {
            // SHOW MESSAGE 
            messageText.style.color = 'green'
            // messageText.style.borderColor = 'green'
            messageText.innerHTML = `
            <div id="message">
                <span onclick='closeMessage()' class="message-cross-button">x</span>
                Thank you for reaching out to us, We have received your message and will get back to you as soon as possible.
            </div>`

            // SHIFT TO STEP 1
            stepOne.style.display = 'block'
            stepTwo.style.display = 'none'
            stepThree.style.display = 'none'

            console.log(data)
        })
        .catch(error => {

            messageText.style.color = 'red'
            messageText.style.borderColor = 'red'
            messageText.innerHTML = `
            <div id="message">
                <span onclick='closeMessage()' class="message-cross-button">x</span> 
                Error 
            </div>`
            console.error(error)
        })


    console.log({
        address: `${address.value} ${line_1.value} ${country.value} ${district.value} ${locality.value} ${postcode.value}`,
        date_time: date_time.value,
        sale_price: sale_price.value,
        name_title: name_title.value,
        name: name.value,
        phone: phone.value,
        email: email.value
    })
    return false; // YOU HAVE TO TRUE THE VALUE OF THIS RETURN TO REDIRECT TO THE PHM FILE
}