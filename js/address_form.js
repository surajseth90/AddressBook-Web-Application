let AddressBookObj = new AddressBook();

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
        setAddressBookObject();
        createAndUpdateStorage();
    } catch (e) {
        return;
    }
    alert(AddressBookObj.toString());
}

const resetForm = () => {
    document.querySelector("#name").value = "";
    document.querySelector('#phone-number').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#city').value = "";
    document.querySelector('#state').value = "";
    document.querySelector('#zip').value = "";
}

const setAddressBookObject = () => {
    try {
        AddressBookObj._id = createNewContactId();
        AddressBookObj._name = document.querySelector('#name').value;
        AddressBookObj._phone = document.querySelector('#phone-number').value;
        AddressBookObj._address = document.querySelector('#address').value;
        AddressBookObj._city = document.querySelector('#city').value;
        AddressBookObj._state = document.querySelector('#state').value;
        AddressBookObj._zip = document.querySelector('#zip').value;
    } catch (e) {
        alert("Please enter valid details!");
    }
}

const createNewContactId = () => {
    let personID = localStorage.getItem("ContactID");
    personID = !personID ? 1 : (parseInt(personID) + 1).toString();
    localStorage.setItem("ContactID", personID);
    return personID;
}

const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if (contactList) {
        let contactData = contactList.find(contact => contact._id == AddressBookObj._id);
        if (!contactData) {
            contactList.push(AddressBookObj);
        } else {
            const index = contactList.map(contact => contact._id).indexOf(AddressBookObj._id);
            contactList.splice(index, 1, AddressBookObj);
        }
    } else {
        contactList = [AddressBookObj]
    }
    alert(AddressBookObj.toString())
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const checkForUpdate = () => {
    const contactJSON = localStorage.getItem('editEmp');
    isUpdate = contactJSON ? true : false;
    if (!isUpdate) return;
    AddressBookObj = JSON.parse(contactJSON);
    setForm();
}

const setForm = () => {
    document.querySelector('#name').value = AddressBookObj._name;
    document.querySelector('#phone').value = AddressBookObj._phone;
    document.querySelector('#address').value = AddressBookObj._address;
    document.querySelector('#city').value = AddressBookObj._city;
    document.querySelector('#state').value = AddressBookObj._state;
    document.querySelector('#zip').value = AddressBookObj._zip;
}