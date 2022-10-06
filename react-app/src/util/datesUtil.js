const MONTHS = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

const DAYS = {
  "01": "1st",
  "02": "2nd",
  "03": "3rd",
  "04": "4th",
  "05": "5th",
  "06": "6th",
  "07": "7th",
  "08": "8th",
  "09": "9th",
  10: "10th",
  11: "11th",
  12: "12th",
  13: "13th",
  14: "14th",
  15: "15th",
  16: "16th",
  17: "17th",
  18: "18th",
  19: "19th",
  20: "20th",
  21: "21st",
  22: "22nd",
  23: "23rd",
  24: "24th",
  25: "25th",
  26: "26th",
  27: "27th",
  28: "28th",
  29: "29th",
  30: "30th",
  31: "31st",
};

// 2023-02-24 START DATE
// 2023-06-21 END DATE

export function startsBefore(start, end) {
  if (start === end) {
    return true;
  }
  start = start.split("-").map((el) => parseInt(el));
  end = end.split("-").map((el) => parseInt(el));
  for (let i = 0; i < 3; i++) {
    if (start[i] > end[i]) {
      return false;
    }
  }
  return true;
}

export function formatDate([year, month, day]) {
  return `${MONTHS[month]} ${DAYS[day]}, ${year}`;
}

export function getCurrentDate() {
  const today = new Date();
  const dd = today.getDate().toString().padStart(2, "0");
  const mm = (today.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
}
