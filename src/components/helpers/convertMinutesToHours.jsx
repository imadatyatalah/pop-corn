export const convertMinutesToHours = (n) => {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours == 0 ? "" : `${rhours}h`} ${
    rminutes == 0 ? "" : `${rminutes}m`
  }`;
};
