export const isValidDateString = (text: string): boolean => {
  // Regular expression to match the format "Day Mon DD YYYY"
  const dateStringPattern = /^[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4}$/;

  // Check if the text matches the pattern
  if (!dateStringPattern.test(text)) {
    return false;
  }

  // Further validate the date part
  const [dayOfWeek, month, day, year] = text.split(" ");
  const dayNumber = parseInt(day, 10);
  const yearNumber = parseInt(year, 10);

  // Check valid ranges and month names
  const validDays = new Set(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  const validMonths = new Set([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  if (
    !validDays.has(dayOfWeek) ||
    !validMonths.has(month) ||
    isNaN(dayNumber) ||
    isNaN(yearNumber)
  ) {
    return false;
  }

  // Convert month name to number (0-based index)
  const monthIndex = Array.from(validMonths).indexOf(month);

  // Validate the date
  const date = new Date(yearNumber, monthIndex, dayNumber);

  return (
    date.getFullYear() === yearNumber &&
    date.getMonth() === monthIndex &&
    date.getDate() === dayNumber
  );
};
export const checkAt = (colTwo: string): boolean => {
  return colTwo.includes("@");
};
export const removeAt = (colTwo: string) => {
  return colTwo.replace("@", "");
};
export const checkHashtag = (colTwo: string): boolean => {
  return colTwo.includes("#");
};
export const removeHashtag = (colTwo: string) => {
  return colTwo.replace("#", "");
};
