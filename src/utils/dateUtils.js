export const formatData = (date = new Date()) => {
	return new Intl.DateTimeFormat('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(date);
};
