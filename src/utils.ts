// @TODO: Fix types later
export const shuffleArray = <T>(array: T): T => {
  // @ts-ignore
  return (
    array
      // @ts-ignore
      .map((value) => ({ value, sort: Math.random() }))
      // @ts-ignore
      .sort((a, b) => a.sort - b.sort)
      // @ts-ignore
      .map(({ value }) => value)
  );
};
