// Array of cron expressions to be parsed
const arrayOfCrons = [
    "01 13 * * 3,4",     // Every Wednesday and Thursday at 1:01 PM
    "09 05 * * 1,3,5",   // At 5:09 AM on Monday, Wednesday, and Friday
    "45 09,08 * * 2,4",  // At 9:45 AM and 8:45 AM on Tuesday and Thursday
    null,                 // Invalid cron expression (null)
    "33 18 * * 0",       // At 6:33 PM on Sunday
    "* 20 * * *",        // Every minute starting from 8:00 PM every day
    "* * * 11 *",        // Every minute in November
    "* * 23 * 3,6",      // Every minute on the 23rd of the month on Wednesday and Saturday
    "* * 15W * *",       // Every minute on the nearest weekday to the 15th of the month
    "* * L * *",         // Every minute on the last day of the month
];

// Iterate over each cron expression and parse it
arrayOfCrons.forEach(cron => console.log(parseCron(cron)));

/**
 * Parses a cron string and generates a human-readable description.
 * @param {string} cronString - The cron expression to parse.
 * @returns {string} - A description of the cron schedule.
 */
function parseCron(cronString) {
    // Check if the cron string is null or empty
    if (!cronString) {
        return 'Invalid cron string: null or empty.';
    }

    // Split the cron string into its components
    const cronParts = cronString.trim().split(/\s+/);
    // Ensure there are enough parts to form a valid cron expression
    if (cronParts.length < 5) {
        return 'Invalid cron string: expected format "minute hour day month weekday".';
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = cronParts;

    // Handle full wildcard cron expression
    if (cronString === '* * * * *') {
        return 'Fire every minute of every day.';
    }

    // Maps for converting day and month numbers to names
    const DAY_MAP = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };

    const MONTH_MAP = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    // Validate month input
    const monthNumber = parseInt(month, 10);
    if (month !== '*' && (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12)) {
        return 'Invalid cron string: month must be between 1 and 12.';
    }

    // Initialize descriptions for time, day, month, and weekday
    let timeDescription = '';
    let dayDescription = '';
    let monthDescription = '';
    let dayOfWeekDescription = '';

    // Handle special cases for dayOfMonth
    if (dayOfMonth === 'L') {
        // "L" means the last day of the month
        dayDescription = 'on the last day of the month';
    } else if (dayOfMonth.includes('W')) {
        // "W" means nearest weekday to the specified day
        const dayNum = dayOfMonth.replace('W', '');
        dayDescription = `on the nearest weekday to day ${dayNum}`;
    } else if (dayOfMonth !== '*') {
        // For specific day numbers
        dayDescription = `on day ${dayOfMonth}`;
    }

    // Determine the time description based on minute and hour values
    if (minute === '*' && hour === '*') {
        timeDescription = 'every minute';
    } else if (minute === '*') {
        timeDescription = `every minute starting at ${convertTo12Hour(`${hour}:00`)} and ending at ${convertTo12Hour(`${hour}:59`)}`;
    } else {
        // Handle multiple hours
        const hoursList = hour.split(',').map(h => convertTo12Hour(`${h}:${minute}`));
        timeDescription = `at ${hoursList.join(' and ')}`;
    }

    // Generate the month description
    monthDescription = month !== '*' ? `in ${MONTH_MAP[monthNumber]}` : '';

    // Process the day of the week description
    const dayOfWeekList = dayOfWeek === '*' ? [] : dayOfWeek.split(",").map(day => DAY_MAP[day]);
    dayOfWeekDescription = dayOfWeekList.length ? `on ${dayOfWeekList.join(", ")}` : '';

    // Combine all parts of the description into the final output
    const dateDescriptionParts = [dayDescription, dayOfWeekDescription, monthDescription]
        .filter(Boolean).join(', ');

    const descriptionParts = [
        timeDescription,
        dateDescriptionParts
    ].filter(Boolean).join(', ');

    return `Fire ${descriptionParts}.`;
}

/**
 * Converts a time in 24-hour format to 12-hour format.
 * @param {string} time24 - The time in 24-hour format (HH:mm).
 * @returns {string} - The time in 12-hour format (hh:mm AM/PM).
 */
function convertTo12Hour(time24) {
    // Validate the input format (HH:mm)
    const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!timePattern.test(time24)) {
        throw new Error('Invalid time format. Please use "HH:mm" in 24-hour format.');
    }

    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number);
    const isPM = hours >= 12;
    // Convert 0 hours to 12 for 12-hour format
    const hours12 = hours % 12 || 12; 
    const period = isPM ? 'PM' : 'AM';

    // Return the formatted time in 12-hour format
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Export the parseCron function for use in other modules
module.exports = {
    parseCron
}
