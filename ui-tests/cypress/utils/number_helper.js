


function get_random_number(max) {
	return Math.floor((Math.random() * max) + 1);
}

function get_formatted_amount(amount) {
	let formattedNumber = amount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
	return formattedNumber;
}

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
	  result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
  }


module.exports = {
	get_random_number,
	get_formatted_amount,
	generateRandomString
};
  