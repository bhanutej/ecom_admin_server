module.exports = (exception) => {
  const errors = [];
  if (exception.code === 11000) {
    const uniqeKey = Object.keys(exception.keyValue)[0];
    errors.push(`${uniqeKey} is already existed`);
  } else if (exception.name === "CastError") {
    errors.push(`Data not found`);
  } else {
    const exceptionMessage = exception.message;
    const allErrors = exceptionMessage
      .substring(exceptionMessage.indexOf(":") + 1)
      .trim();
    const allErrorsInArrayFormat = allErrors
      .split(",")
      .map((err) => err.trim());
    allErrorsInArrayFormat.forEach((error) => {
      const [key, value] = error.split(":").map((err) => err.trim());
      errors.push(value);
    });
  }
  return errors;
};
