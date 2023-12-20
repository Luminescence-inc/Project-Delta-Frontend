interface IDaysOfWeek {
  Sunday: number;
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Satutrday: number;
}
export function formatDays(rawOpenDays: string[] | undefined): string {
  // Sanitize input
  if (rawOpenDays === undefined) {
    return "";
  }
  rawOpenDays = rawOpenDays.map((day) => day.trim());
  let result: string[] = [];
  let daysOfWeekArray: IDaysOfWeek = {
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Satutrday: 7,
  };
  const compareFun = (a: string, b: string): number => {
    return (
      daysOfWeekArray[a as keyof typeof daysOfWeekArray] -
      daysOfWeekArray[b as keyof typeof daysOfWeekArray]
    );
  };
  rawOpenDays = rawOpenDays.sort(compareFun);
  //console.log(rawOpenDays);
  let currentGroup: string[] = [rawOpenDays[0]];
  for (let i = 1; i < rawOpenDays.length; i++) {
    let currentDay = rawOpenDays[i];
    let previousDay = rawOpenDays[i - 1];
    //console.log("prev", previousDay);
    //console.log("curr", currentDay);
    let defference = Math.abs(
      daysOfWeekArray[currentDay as keyof typeof daysOfWeekArray] -
        daysOfWeekArray[previousDay as keyof typeof daysOfWeekArray]
    );
    console.log("difference " + defference);
    if (defference === 1) {
      //console.log(" Inside prev", previousDay);
      //console.log(" Insee curr", currentDay);
      //console.log("Grp", currentGroup);
      currentGroup.push(currentDay);
    } else {
      if (currentGroup.length > 1) {
        result.push(
          currentGroup[0] + " - " + currentGroup[currentGroup.length - 1]
        );
      } else {
        result.push(currentGroup.join("-"));
      }

      currentGroup = [currentDay];
    }
  }
  if (currentGroup.length > 1) {
    result.push(
      currentGroup[0] + " - " + currentGroup[currentGroup.length - 1]
    );
  } else {
    result.push(currentGroup.join("-"));
  }
  //console.log(result);
  let formatedString: string = result.join(", ");
  return formatedString;
}
