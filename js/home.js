let AddressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true"))
        getContactDetailsFromLocalStorage();
    else
        getContactDetailsFromJSONServer();

});

const getContactDetailsFromLocalStorage = () => {
    AddressBookList = localStorage.getItem('ContactList') ?
        JSON.parse(localStorage.getItem('ContactList')) : [];
    processAddessBookDataResponse();
}

const getContactDetailsFromJSONServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            console.log(responseText);
            AddressBookList = JSON.parse(responseText);
            processAddessBookDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            AddressBookList = [];
            processAddessBookDataResponse();
        })
}

const processAddessBookDataResponse = () => {
    document.querySelector(".contact-count").textContent = AddressBookList.length;
    createInnerHtml();
    localStorage.removeItem('editAddressBook');

}
const createInnerHtml = () => {
    if (AddressBookList.length == 0) return;
    const headerHtml = "<th>Name</th><th>Address</th><th>City</th>"
        + "<th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const contact of AddressBookList) {
        innerHtml = `${innerHtml}
      <tr>
      <td>${contact._name}</td>
      <td>${contact._address}</td>
      <td>${contact._city}</td>
      <td>${contact._state}</td>
      <td>${contact._zip}</td>
      <td>${contact._phone}</td>
      <td>
          <img id="${contact.id}" onclick="remove(this)" alt="delete"
              src="../assets/icons/delete-black-18dp.svg">
          <img id="${contact.id}" alt="edit" onclick="update(this)" 
              src="../assets/icons/create-black-18dp.svg">
      </td>
      </tr>
      `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contact = AddressBookList.find(contactobj => contactobj.id == node.id);
    if (!contact) return;
    const index = AddressBookList.map(contactobj => contactobj.id).indexOf(contact.id);
    AddressBookList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem('ContactList', JSON.stringify(AddressBookList));
        document.querySelector('.contact-count').textContent = AddressBookList.length;
        createInnerHtml();
    } else {
        const deleteURL = site_properties.server_url + contact.id.toString();
        makeServiceCall("DELETE", deleteURL, true)
            .then(responseText => {
                document.querySelector('.contact-count').textContent = AddressBookList.length;
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: " + JSON.stringify(error));
            });
    }
}

const update = (node) => {
    let contact = AddressBookList.find(contactObj => contactObj.id == node.id);
    if (!contact) return;
    localStorage.setItem('editAddressBook', JSON.stringify(contact))
    window.location.replace("../pages/address_form.html");
}