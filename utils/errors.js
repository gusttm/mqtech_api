var err = {
    OK: 0,
    NOT_A_NUMBER: 299,
    ERROR_ALREADY_RESERVATION_FOR_RESTAURANT: 300,
    data: data,
    getErrors: getErrors
};

var errors = [{
        code: err.OK,
        message: "Sucesso!",
        httpStatus: 200,
        type: 'success'
    },
    {
        code: err.NOT_A_NUMBER,
        message: "Voucher não encontrado.",
        httpStatus: 500
    },
    {
        code: err.ERROR_ALREADY_RESERVATION_FOR_RESTAURANT,
        message: "Você já possui uma reserva para este restaurante.",
        httpStatus: 500
    }
];

function data(code) {
    return errors.find(error => error.code === code);
}

function getErrors() {
    return errors;
}

module.exports = err;