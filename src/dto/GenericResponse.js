// GenericResponse.js
function GenericResponse(message, success, data) {
    this.message = message;
    this.success = success;
    this.data = data;
}

module.exports = GenericResponse;
