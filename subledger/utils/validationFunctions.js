function validateAmount(amount) {
  // Convert to number
  const num = Number(amount);

  // Check if it's a valid number and greater than 0
  if (isNaN(num) || num <= 0) {
    return {
      validAmount: false,
      message: "Amount must be a number greater than 0.",
    };
  }

  return { validAmount: true, amount: num };
}

function validateDate(dateString) {
  // Convert the input to a Date object
  const date = new Date(dateString);

  // Check if it's a valid date
  if (isNaN(date.getTime())) {
    return { validDate: false, message: "Invalid date format." };
  }

  // Optional: Format it as YYYY-MM-DD for PostgreSQL
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return { validDate: true, date: formattedDate };
}

module.exports = {
  validateAmount,
  validateDate,
};
