const storeForm = document.querySelector('#store-form')
const storeId = document.querySelector('#store-id')
const storeAddress = document.querySelector('#store-address')


/**
 * Send POST to API
 * @param {SubmitEvent} e 
 */
const addStore = async e => {
    e.preventDefault()

    if (storeId.value === '' || storeAddress.value === '') {
        alert('Pleas fill in all fields')
        return
    }

    const sendBody = {
        storeId: storeId.value,
        address: storeAddress.value
    }

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody),
        });

        const data = await res.json()

        if (res.status === 400) {
            throw Error('Store already exists!')
            console.log(data);
        }

        if (res.status !== 201) {
            throw Error('An error occured')
            console.log(data);
        }

        alert('Store added!')

        window.location.href = 'index.html'

    } catch (error) {
        alert(error)
    }
}

storeForm.addEventListener('submit', addStore)