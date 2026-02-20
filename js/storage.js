const STORAGE_KEY = 'ds_tours_ratings';

const StorageService = {
    // Save a new rating
    saveRating: async function (ratingData) {
        // Local Storage Only
        const ratings = await this.getRatings();
        const newRating = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...ratingData
        };
        ratings.unshift(newRating);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
        return newRating;
    },

    // Get all ratings
    getRatings: async function () {
        // Local Storage Only
        const ratingsJson = localStorage.getItem(STORAGE_KEY);
        return ratingsJson ? JSON.parse(ratingsJson) : [];
    },

    // Delete a rating
    deleteRating: async function (id) {
        // Local Storage Only
        const ratings = await this.getRatings();
        const filteredRatings = ratings.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRatings));
    },

    // Calculate average rating
    getAverageRating: async function () {
        const ratings = await this.getRatings();
        if (ratings.length === 0) return 0;

        const sum = ratings.reduce((acc, curr) => acc + parseInt(curr.rating), 0);
        return (sum / ratings.length).toFixed(1);
    },

    // Get rating distribution
    getRatingDistribution: async function () {
        const ratings = await this.getRatings();
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        ratings.forEach(r => {
            const star = parseInt(r.rating);
            if (distribution[star] !== undefined) {
                distribution[star]++;
            }
        });

        return distribution;
    }
};

// Export to global scope
window.StorageService = StorageService;

