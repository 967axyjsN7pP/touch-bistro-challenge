const logic = require('./logic');
const getMedians = logic.getMedians;
const getPrimes = logic.getPrimes;

describe('getMedians', () => {
    test('returns an Array with the single median when orderedNums arg has an odd length', () => {
        expect(getMedians([1])).toEqual([1]);
        expect(getMedians([1, 2, 3])).toEqual([2]);
        expect(getMedians([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([5]);
    });

    test('returns an Array with the middle two element values of orderedNums when its length is even', () => {
        expect(getMedians([1, 2])).toEqual([1, 2]);
        expect(getMedians([1, 2, 3, 4])).toEqual([2, 3]);
        expect(getMedians([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([5, 6]);
    });

    test('throws an Error if orderedNums arg is not an Array', () => {
        expect(() => getMedians()).toThrow();
        expect(() => getMedians(null)).toThrow();
        expect(() => getMedians('123456789')).toThrow();
    });
});

describe('getPrimes', () => {
    test('returns all prime numbers less than the given limit', () => {
        expect(getPrimes(3)).toEqual([2]);
        expect(getPrimes(10)).toEqual([2, 3, 5, 7]);
        expect(getPrimes(18)).toEqual([2, 3, 5, 7, 11, 13, 17]);
        expect(getPrimes(100)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]);
    });

    test('throws an Error if limit arg is not an Integer', () => {
        expect(() => getPrimes()).toThrow();
        expect(() => getPrimes(null)).toThrow();
        expect(() => getPrimes('10')).toThrow();
        expect(() => getPrimes(18.1)).toThrow();
    });

    test('throws an Error if limit arg <= 2', () => {
        expect(() => getPrimes(-10)).toThrow();
        expect(() => getPrimes(1)).toThrow();
        expect(() => getPrimes(2)).toThrow();
        expect(() => getPrimes(3)).not.toThrow();
    });
});
