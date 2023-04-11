export const TruncateWithoutRounding = (value, decimals) => {
  if (value) {
    const parts = value.toString().split(".");

    if (parts.length === 2) {
      return Number([parts[0], parts[1].slice(0, decimals)].join("."));
    }
    return Number(parts[0]);
  }
};
