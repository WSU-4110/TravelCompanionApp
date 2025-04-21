
  
const {
    sortByLowestPrice,
    sortByHighestPrice,
    sortByHighRating,
    sortByLowRating,
    sortByAvgRating,
    sortByCheckins
  } = require('../sortFunctions'); 

  global.localStorage = {
    store: {},
    getItem: function(key) {
      return this.store[key] || null;
    },
    setItem: function(key, value) {
      this.store[key] = value.toString();
    },
    removeItem: function(key) {
      delete this.store[key];
    },
    clear: function() {
      this.store = {};
    }
  };
  describe('Sorting functions for attractions', () => {
    const testAttractions = [
      { registrationFee: 10, rating: 3, avgRating: 3.5, key: 'a' },
      { registrationFee: 5, rating: 5, avgRating: 4.2, key: 'b' },
      { registrationFee: 20, rating: 2, avgRating: 2.9, key: 'c' }
    ];
  
    beforeEach(() => {
      localStorage.setItem('checkins_a', '2');
      localStorage.setItem('checkins_b', '5');
      localStorage.setItem('checkins_c', '1');
    });
  
    test('sortByLowestPrice sorts by increasing registrationFee', () => {
      const sorted = sortByLowestPrice(testAttractions);
      expect(sorted[0].registrationFee).toBe(5);
      expect(sorted[2].registrationFee).toBe(20);
    });
  
    test('sortByHighestPrice sorts by decreasing registrationFee', () => {
      const sorted = sortByHighestPrice(testAttractions);
      expect(sorted[0].registrationFee).toBe(20);
      expect(sorted[2].registrationFee).toBe(5);
    });
  
    test('sortByHighRating sorts by rating high to low', () => {
      const sorted = sortByHighRating(testAttractions);
      expect(sorted[0].rating).toBe(5);
      expect(sorted[2].rating).toBe(2);
    });
  
    test('sortByLowRating sorts by rating low to high', () => {
      const sorted = sortByLowRating(testAttractions);
      expect(sorted[0].rating).toBe(2);
      expect(sorted[2].rating).toBe(5);
    });
  
    test('sortByAvgRating sorts by average rating high to low', () => {
      const sorted = sortByAvgRating(testAttractions);
      expect(sorted[0].avgRating).toBe(4.2);
      expect(sorted[2].avgRating).toBe(2.9);
    });
  
    test('sortByCheckins sorts by check-ins high to low', () => {
      const sorted = sortByCheckins(testAttractions);
      expect(sorted[0].key).toBe('b');
      expect(sorted[2].key).toBe('c');
    });
  });
  