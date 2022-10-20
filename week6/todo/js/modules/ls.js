export default class localStorageHelper{
    /*
    * Read a value from local storage and parse it as JSON 
    *
    * @param {string} key The key under which the value is stored under in LS
    * @return {array} The value as an array of objects
    */
    static readFromLS(key){
        return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)) : null;
    }

    /*
    * Writes an array of objects to local storage under the provided key
    * 
    * @param {string} key The key under which the value is stored under in LS
    * @param {array} data The information to be stored as an array of objects.
    */
    static writeToLS(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }

}


