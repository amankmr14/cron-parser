const { parseCron } = require('./index.js');

describe('parseCron', () => {
    it('should parse a valid cron expression', () => {
        const result = parseCron("01 13 * * 3,4");
        expect(result).toBe("Fire at 1:01 PM, on Wednesday, Thursday.");
    });

    it('should parse a cron expression with multiple hours', () => {
        const result = parseCron("45 09,08 * * 2,4");
        expect(result).toBe("Fire at 9:45 AM and 8:45 AM, on Tuesday, Thursday.");
    });

    it('should return an error for a null cron string', () => {
        const result = parseCron(null);
        expect(result).toBe('Invalid cron string: null or empty.');
    });

    it('should return an error for an invalid month', () => {
        const result = parseCron("* * * 13 *");
        expect(result).toBe('Invalid cron string: month must be between 1 and 12.');
    });

    it('should return every minute for a wildcard cron expression', () => {
        const result = parseCron('* * * * *');
        expect(result).toBe('Fire every minute of every day.');
    });

    it('should handle a cron expression with day of month', () => {
        const result = parseCron('* * 23 * 3,6');
        expect(result).toBe('Fire every minute, on day 23, on Wednesday, Saturday.');
    });

    it('should return the correct description for month names', () => {
        const result = parseCron('* * * 11 *');
        expect(result).toBe('Fire every minute, in November.');
    });

    it('should handle cases with no specific day or month', () => {
        const result = parseCron('* * * * *');
        expect(result).toBe('Fire every minute of every day.');
    });

    it('should handle multiple day of week values correctly', () => {
        const result = parseCron('* * * * 0,1');
        expect(result).toBe('Fire every minute, on Sunday, Monday.');
    });

    it('should handle L for the last day of the month', () => {
        const result = parseCron('* * L * *');
        expect(result).toBe('Fire every minute, on the last day of the month.');
    });
    
    it('should handle W for the nearest weekday', () => {
        const result = parseCron('* * 15W * *');
        expect(result).toBe('Fire every minute, on the nearest weekday to day 15.');
    });
});
