const form = document.getElementById('form');

const inputs = [{
    id: 'ime',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        },
        {
            regex: /^[A-Za-z\s]*$/,
            errorMessage: 'Dozvoljeno je samo korištenje slova'
        }
    ]
}, {
    id: 'broj-telefona',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        },
        {
            regex: /(\d{9})/,
            errorMessage: 'Broj telefona nije validan'
        }
    ]
}, {
    id: 'adresa',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        }
    ]
}, {
    id: 'kucni-broj',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        }
    ]
}, {
    id: 'postanski-broj',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        }
    ]
}, {
    id: 'mjesto',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        }
    ]
}, {
    id: 'email',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        },
        {
            regex:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            errorMessage: 'Email nije  validan'        
        }
    ]
}, {
    id: 'napomena',
    validation: [
        {
            required: true,
            errorMessage: 'Polje ne moze biti prazno'
        }
    ]
}];



const checkInputs = () => {
    let results = {};
    let isAllValid = true;

    inputs.forEach(input => {
        const inputField = document.getElementById(input.id);
        const inputValue = inputField.value.trim();

        results[input.id]  = inputValue;

        let hasError = false;

        if (input.validation && input.validation.length) {
            hasError = input.validation.some(validationItem => {
                if (validationItem.required && inputValue === '') {
                    setErrorFor(inputField, validationItem.errorMessage);
                    return true;
                }

                if (validationItem.regex) {
                    const isValid =  String(inputValue)
                        .match(
                            validationItem.regex
                        );

                    if (!isValid) {
                        setErrorFor(inputField, validationItem.errorMessage);
                        return true;
                    }
                }
            })

            if (hasError) {
                isAllValid = false;
            }
        }

        if (!hasError) {
            setSuccessFor(inputField);
        }
    })

    if (isAllValid) {
        console.log(results);
    }
}

const setErrorFor = (input, message) => {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');

    small.innerText = message;

    inputBox.className = 'input-box error';
}

const setSuccessFor = (input) => {
    const inputBox = input.parentElement;
    inputBox.className = 'input-box success';
}