export const calculateAge = (dob: string) => {
  const birthday = new Date(dob);

  const diff = Date.now() - birthday.getTime();

  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
