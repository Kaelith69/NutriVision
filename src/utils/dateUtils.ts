/**
 * Returns the current date in YYYY-MM-DD format based on the user's LOCAL system time.
 * This prevents "timezone drift" where late-night logs (e.g., 11 PM) drift to the next day in UTC.
 */
export const getLocalISODate = (date: Date = new Date()): string => {
    const offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localTime = new Date(date.getTime() - offset);
    return localTime.toISOString().split('T')[0];
};

/**
 * Returns the timestamp for the start of the day (00:00:00) in LOCAL time.
 */
export const getStartOfDay = (date: Date = new Date()): number => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
};

/**
 * Returns the timestamp for the end of the day (23:59:59.999) in LOCAL time.
 */
export const getEndOfDay = (date: Date = new Date()): number => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
};
