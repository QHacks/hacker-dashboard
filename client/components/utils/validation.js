
function required(value) {
	return value
	? undefined
	: true;
}

function validateEmail(value) {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? 'Please enter a valid email!'
		: undefined;
}

function validatePhoneNumber(value) {
	return value && !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i.test(value)
		? 'Please enter a valid phone number!'
		: undefined;
}

function validateBirthDate(value) {
	const selected = new Date(value);
	const now = new Date();
	return (selected > now)
		? 'Please enter a valid birth date!'
		: undefined;
}

export const validationHelpers = {
	required,
	validateEmail,
	validateBirthDate,
	validatePhoneNumber
};
