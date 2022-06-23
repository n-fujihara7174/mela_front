/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const classAssignment = () => {
  const setInvalidClass = (errorMessage: string) => {
    if (errorMessage === "") {
      return "border-gray-300";
    } else {
      return "border-red-600";
    }
  };

  return {
    setInvalidClass,
  };
};
