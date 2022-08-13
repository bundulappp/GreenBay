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
};
