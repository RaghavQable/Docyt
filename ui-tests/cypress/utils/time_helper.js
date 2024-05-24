
function get_epoch_time() {
	return Date.now()
}

function get_formatted_date(format, inputDate = new Date()) {
    if (format === 'MM/DD/YYYY') {
        return inputDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});
    }
    if (format === 'YYYY-MM-DD') {
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = inputDate.getFullYear();
        return `${year}-${month}-${day}`;
    }
}

function get_current_date_of_month(){
	return new Date().getDate();
}

function get_first_date_of_current_month() {
	const today = new Date();
	const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	return firstDateOfMonth;
}

function get_last_date_of_current_month() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const lastDay = new Date(year, month, 0);
	return lastDay.getDate();
  }

module.exports = {
	get_epoch_time,
	get_formatted_date,
	get_current_date_of_month,
	get_first_date_of_current_month,
	get_last_date_of_current_month
};
  