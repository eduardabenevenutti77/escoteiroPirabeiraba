export const parseLocalDate = (dateString) => {
    if (!dateString) return new Date();

    const cleanDate = dateString.split("T")[0];
    const [year, month, day] = cleanDate.split("-").map(Number);

    const fixed = new Date(Date.UTC(year, month - 1, day));
    fixed.setMinutes(fixed.getMinutes() + fixed.getTimezoneOffset());

    return fixed;
};
