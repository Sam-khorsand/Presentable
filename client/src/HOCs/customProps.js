const styles = {
    day() {
        return {
            minScale: 1,
            maxScale: 30,
            stretch: 14,
        }
    },
    month() {
        return {
            minScale: 1,
            maxScale: 12,
            stretch: 34,
        }
    },
    year(currentYear) {
        return {
            minScale: 1,
            maxScale: currentYear,
            stretch: 0.2,
        }
    }
};
export default styles;