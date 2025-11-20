export const isProjectNew = (dateString: string) => {
  const now = new Date();
  const projectDate = new Date(dateString);
  const diff = now.getTime() - projectDate.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  return days <= 30; // NEW badge for 30 days
};
