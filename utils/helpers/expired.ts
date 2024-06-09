export function formatTimeDifference(expiredAt: string, createdAt: string): string {
    const expiredDate = new Date(expiredAt);
    const createdDate = new Date(createdAt);
  
    const diffInMs = expiredDate.getTime() - createdDate.getTime();
  
    const msInHour = 1000 * 60 * 60;
    const msInDay = msInHour * 24;
  
    const diffInDays = Math.floor(diffInMs / msInDay);
  
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / msInHour);
      return `${diffInHours} hours`;
    } else {
      return `${diffInDays} days`;
    }
}

  