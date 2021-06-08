class AddressBook {
    id;
    
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Invalid Name!";
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        let regExp = RegExp('^[0-9]{10}$');
        if (regExp.test(phone))
            this._phone = phone;
        else throw "Invalid number!! please enter valid 10 digit number :)"
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
    get zip() {
        return this._zip;
    }
    set zip(zip) {
        let regExp = RegExp('^[0-9]{6}$');
        if (regExp.test(zip))
            this._zip = zip;
        else throw "Incorrect Zip !!"
    }
    toString() {
        return "id:" + this.id + ", Name: " + this.name + ", Address: " + this.address + ", City: " + this.city + ", State: "
            + this.state + ", Zip: " + this.zip + ", Phone: " + this.phone;
    }
}