


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


module.exports = {
	get_random_number,
	get_formatted_amount
};
  