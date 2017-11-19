
function required(value) {
	return value
	? undefined
	: true;
}

function validateEmail(value) {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? true
		: undefined;
}

export const validationHelpers = {
	required,
	validateEmail
};
