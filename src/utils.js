export const timeDifference = (targetTime) => {
    const targetDate = new Date(targetTime);
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = 60 * millisecondsPerSecond;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;

    const days = Math.floor(timeDifference / millisecondsPerDay);
    const hours = Math.floor((timeDifference % millisecondsPerDay) / millisecondsPerHour);
    const minutes = Math.floor((timeDifference % millisecondsPerHour) / millisecondsPerMinute);
    const seconds = Math.floor((timeDifference % millisecondsPerMinute) / millisecondsPerSecond);

    return {days, hours, minutes, seconds};
}