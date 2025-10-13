export const parseLocalDate = (dateString) => {
    if (!dateString) return new Date();
    if (dateString.includes("T")) {
        const d = new Date(dateString);
        return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    }

    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
};
