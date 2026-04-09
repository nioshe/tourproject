// City controller - placeholder for city operations
exports.getAllCities = async (req, res) => {
  try {
    const cities = [
      { id: 1, name: 'Marrakech', region: 'Central', rating: 4.6 },
      { id: 2, name: 'Fes', region: 'Northern', rating: 4.7 },
      { id: 3, name: 'Chefchaouen', region: 'Northern', rating: 4.8 },
      { id: 4, name: 'Merzouga', region: 'Sahara', rating: 4.5 },
      { id: 5, name: 'Essaouira', region: 'Coastal', rating: 4.4 },
      { id: 6, name: 'Casablanca', region: 'Coastal', rating: 4.3 },
    ];

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!cityId) {
      return res.status(400).json({
        success: false,
        message: 'cityId is required',
      });
    }

    const city = {
      id: cityId,
      name: 'Marrakech',
      description: 'Markets, courtyards, rooftops, and a high-energy luxury city experience.',
      rating: 4.6,
      region: 'Central',
    };

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.searchCities = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAttractions = async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!cityId) {
      return res.status(400).json({
        success: false,
        message: 'cityId is required',
      });
    }

    const attractions = [
      { id: 1, name: 'Jemaa el-Fnaa', description: 'Historic square in the medina' },
      { id: 2, name: 'Koutoubia Mosque', description: 'Iconic mosque with beautiful architecture' },
      { id: 3, name: 'Bahia Palace', description: 'Luxurious palace with intricate tilework' },
    ];

    res.status(200).json({
      success: true,
      data: attractions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!cityId) {
      return res.status(400).json({
        success: false,
        message: 'cityId is required',
      });
    }

    const hotels = [
      { id: 1, name: 'Luxury Riad', price: 250, rating: 4.8 },
      { id: 2, name: 'Comfort Hotel', price: 120, rating: 4.5 },
      { id: 3, name: 'Budget Hostel', price: 30, rating: 4.2 },
    ];

    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
