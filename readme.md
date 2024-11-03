# Cron Parser

This is a JavaScript application that parses cron expressions and converts them into human-readable descriptions. It handles various cron formats, including minute, hour, day of month, month, and day of week specifications. Additionally, it provides validations for invalid inputs.

## Features

- Parses standard cron expressions.
- Converts times from 24-hour to 12-hour format.
- Handles wildcards (`*`) for all time fields.
- Supports lists and ranges in hour, day of month, month, and day of week fields.
- Handles special characters like `L` for the last day of the month and `W` for the nearest weekday.
- Validates input for null values and incorrect month specifications.
- Outputs descriptive strings for scheduled tasks.

## Installation

To use this cron parser, you need to have a JavaScript environment set up. This can be done using Node.js or within a browser console.

### Prerequisites

- [Node.js](https://nodejs.org/) (if running outside a browser)

## Usage

1. Clone or download this repository.
2. Open the file in a JavaScript environment or run it using Node.js.

## Additional Features to be Added
- Improved handling for cron expressions with ranges (e.g., 1-5 for day of week).
- Support for more complex expressions like */5 for every 5 minutes.
- Enhanced validation and error reporting for edge cases.

### Example Cron Expressions

You can add cron expressions to the `arrayOfCrons` array in the code:

```javascript
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
