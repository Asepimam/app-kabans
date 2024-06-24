export function formatTimeDifference(expiredAt: string, createdAt: string): string {
  const expiredDate = new Date(expiredAt);
  const createdDate = new Date(createdAt);

  const diffInMs = expiredDate.getTime() - createdDate.getTime();

  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;

  // Get the difference in days
  const diffInDays = Math.floor(diffInMs / msInDay);

  // If the dates are the same, calculate the difference in hours and minutes
  if (expiredDate.toDateString() === createdDate.toDateString()) {
      const diffInHours = Math.floor(diffInMs / msInHour);
      return `${diffInHours} hours`;
  } else {
      return `${diffInDays} days`;
  }
}


  