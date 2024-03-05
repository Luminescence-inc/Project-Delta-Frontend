export function formatDays(rawOpenDays: string[] | undefined): string {
  // Sanitize input
  if (rawOpenDays === undefined) {
    return "";
  }
  const days_in_order = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const sorted_days = rawOpenDays.sort(
    (a, b) => days_in_order.indexOf(a) - days_in_order.indexOf(b)
  );
  const consecutiveDays = [];
  let currentRange = [sorted_days[0]];

  for (let i = 1; i < sorted_days.length; i++) {
    let day2 = sorted_days[i];
    let day1 = sorted_days[i - 1];
    if (
      days_in_order.indexOf(day2.toLowerCase()) -
        days_in_order.indexOf(day1.toLowerCase()) ===
      1
    ) {
      currentRange.push(day2);
    } else {
      consecutiveDays.push(currentRange);
      currentRange = [day2];
    }
  }
  consecutiveDays.push(currentRange);
  let formatedResult = consecutiveDays
    .map((range) => {
      if (range.length > 1) {
        return `${range[0]?.charAt(0).toUpperCase() + range[0]?.slice(1)} - ${
          range[range.length - 1]?.charAt(0).toUpperCase() +
          range[range.length - 1].slice(1)
        }`;
      } else {
        return range[0]?.charAt(0).toUpperCase() + range[0]?.slice(1);
      }
    })
    .join(", ");

  return formatedResult;
}
