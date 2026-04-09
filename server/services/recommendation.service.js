// Recommendation Service - AI-powered recommendations
class RecommendationService {
  async getRecommendations(criteria) {
    const { budget, duration, tripStyle } = criteria;

    // Mock AI recommendations - replace with actual AI logic
    const recommendations = {
      tripStyle: tripStyle || this.determineTripStyle(budget),
      suggestedCities: this.suggestCities(budget, duration),
      hotels: this.suggestHotels(budget, tripStyle),
      tours: this.suggestTours(budget, duration),
      estimatedCost: budget,
      itinerary: this.buildItinerary(duration, tripStyle),
    };

    return recommendations;
  }

  determineTripStyle(budget) {
    if (budget < 1200) return 'Simple';
    if (budget < 3000) return 'Comfort';
    return 'Luxury';
  }

  suggestCities(budget, duration) {
    const cityOptions = {
      Simple: ['Fes', 'Chefchaouen'],
      Comfort: ['Marrakech', 'Merzouga', 'Fes'],
      Luxury: ['Marrakech', 'Sahara', 'Essaouira'],
    };

    const tripStyle = this.determineTripStyle(budget);
    return cityOptions[tripStyle] || ['Marrakech', 'Merzouga'];
  }

  suggestHotels(budget, tripStyle) {
    return [
      { name: 'Riad Name 1', price: budget * 0.2, rating: 4.8 },
      { name: 'Riad Name 2', price: budget * 0.25, rating: 4.5 },
    ];
  }

  suggestTours(budget, duration) {
    return [
      { name: 'Desert Tour', duration: 3, price: budget * 0.4, rating: 4.9 },
      { name: 'City Tour', duration: 2, price: budget * 0.3, rating: 4.7 },
    ];
  }

  buildItinerary(duration, tripStyle) {
    const days = [];
    for (let i = 1; i <= duration; i++) {
      days.push({
        day: i,
        activity: `Day ${i} activity for ${tripStyle} travelers`,
      });
    }
    return days;
  }
}

module.exports = new RecommendationService();
