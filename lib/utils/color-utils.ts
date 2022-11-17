/**
 * Converts a decimal percent to hex
 * @param p percent to convert. Should be an integer between 0 and 100, other values are bounded to that range.
 * Decimal values are rounded to the nearest integer
 */
export const percentToHex = (p: number) => {
  const percent = Math.max(0, Math.min(100, p)); // bound percent from 0 to 100
  const intValue = Math.round((percent / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation

  return hexValue.padStart(2, "0"); // format with leading 0
};
