// Time conversion constants
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE; // 3600
export const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR; // 86400
export const MILLISECONDS_PER_SECOND = 1000;

// Format uptime in a human-readable way (e.g., "1d 2h 3m 4s")
export function formatDuration(seconds: number) {
	const days = Math.floor(seconds / SECONDS_PER_DAY);
	seconds %= SECONDS_PER_DAY; // seconds = seconds % SECONDS_PER_DAY;

	const hours = Math.floor(seconds / SECONDS_PER_HOUR);
	seconds %= SECONDS_PER_HOUR;

	const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
	const secs = Math.floor(seconds % SECONDS_PER_MINUTE);

	const parts: string[] = [];
	if (days > 0) parts.push(`${days}d`);
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

	return parts.join(' ');
}

// Adjust date to specified GMT offset using time constants
export function gmtDate(date: Date, gmt: string) {
	const match = gmt.match(/GMT([+-]\d+)/);
	if (!match) throw new Error('Invalid GMT format. Expected "GMT+X" or "GMT-X"');

	const offsetHours = parseInt(match[1], 10);
	const offsetMs = offsetHours * SECONDS_PER_HOUR * MILLISECONDS_PER_SECOND;

	// Adjust the date by adding the offset
	const adjustedTime = date.getTime() + offsetMs;
	return new Date(adjustedTime);
}
