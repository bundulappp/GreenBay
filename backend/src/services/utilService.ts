export const utilService = {
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  },

  isValidPrice(number: number): boolean {
    return Number.isInteger(number) && number > 0;
  },

  generateDateTimeToMysql(date: Date): string {
    const offsetCorrectedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000,
    );
    return offsetCorrectedDate.toISOString().slice(0, 19).replace('T', ' ');
  },
};
