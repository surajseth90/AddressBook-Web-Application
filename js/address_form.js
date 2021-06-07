isUpdate = false;

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error')
    name.addEventListener('input', function () {
        if (name.value.length = 0) {
            textError.textContent = ""
            return
        }
        try {
            (new AddressBook()).name = name.value;;
            textError.textContent = ""
        } catch (e) {
            textError.textContent = e;
        }
    });

    const phoneNo = document.querySelector('#phone-number');
    const phoneNo_error = document.querySelector('.phoneNo-error');
    phoneNo.addEventListener('input', function () {
        if (phoneNo.value.length = 0) {
            phoneNo_error.textContent = ""
            return
        }
        try {
            (new AddressBook()).phone = phoneNo.value;;
            phoneNo_error.textContent = ""
        } catch (e) {
            phoneNo_error.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zip_error = document.querySelector('.zip-error')
    zip.addEventListener('input', function () {
        if (zip.value.length = 0) {
            zip_error.textContent = ""
            return
        }
        try {
            (new AddressBook()).zip = zip.value;;
            zip_error.textContent = ""
        } catch (e) {
            zip_error.textContent = e;
        }
    });

    checkForUpdate();

});

const saveForm = () => {
    try {
        let addressBookObj = setAddressBook();
        createAndUpdateStorage(addressBookObj);
        resetForm();
        window.location.replace("../pages/homepage.html")
    } catch (e) {
        return;
    }
}

const setAddressBook = () => {
        let addressBookObj = new AddressBook();
        addressBookObj._id = new Date().getTime() + 1;
        addressBookObj._name = document.querySelector('#name').value;
        addressBookObj._phone = document.querySelector('#phone-number').value;
        addressBookObj._address = document.querySelector('#address').value;
        addressBookObj._city = document.querySelector('#city').value;
        addressBookObj._state = document.querySelector('#state').value;
        addressBookObj._zip = document.querySelector('#zip').value;
        return addressBookObj;
    }


const createAndUpdateStorage = (addressBookObj) => {
        let contactList = JSON.parse(localStorage.getItem("ContactList"));
        if (contactList) {
            let contactCheckForUpdate = localStorage.getItem('editAddressBook');
            if (contactCheckForUpdate == null) {
                contactList.push(addressBookObj);
            } else {
                const index = contactList.map(contact => contact._id).indexOf(contactCheckForUpdate._id);
                contactList.splice(index, 1, addressBookObj);
            }
        } else {
            contactList = [addressBookObj]
        }
        alert(addressBookObj.toString())
        localStorage.setItem("ContactList", JSON.stringify(contactList));
        resetForm();
    }

    const checkForUpdate = () => {
        const contactCheckForUpdate = localStorage.getItem('editAddressBook');
        isUpdate = contactCheckForUpdate ? true : false;
        if (!isUpdate) return;
        addressBookObj = JSON.parse(contactCheckForUpdate);
        setForm();
    }

    const setForm = () => {
        document.querySelector('#name').value = addressBookObj._name;
        document.querySelector('#phone-number').value = addressBookObj._phone;
        document.querySelector('#address').value = addressBookObj._address;
        document.querySelector('#city').value = addressBookObj._city;
        document.querySelector('#state').value = addressBookObj._state;
        document.querySelector('#zip').value = addressBookObj._zip;
    }

    const resetForm = () => {
        document.querySelector("#name").value = "";
        document.querySelector('#phone-number').value = "";
        document.querySelector('#address').value = "";
        document.querySelector('#city').value = "";
        document.querySelector('#state').value = "";
        document.querySelector('#zip').value = "";
    }