import { debounce, sortArrayByValue } from './feedsPageHelper';

// Mocking setTimeout to control the passage of time in tests
jest.useFakeTimers();

describe('debounce', () => {
  it('should debounce the callback', () => {
    // Mock callback function
    const callback = jest.fn();

    // Create a debounced function with a delay of 200 milliseconds
    const debouncedFunction = debounce(callback, 200);

    // Call the debounced function multiple times within a short time period
    debouncedFunction('a');
    debouncedFunction('b');
    debouncedFunction('c');

    // Advance time by 199 milliseconds
    jest.advanceTimersByTime(199);

    // The callback should not have been called yet
    expect(callback).not.toHaveBeenCalled();

    // Advance time by 1 more millisecond (total of 200 milliseconds)
    jest.advanceTimersByTime(1);

    // The callback should have been called with the last argument ('c')
    expect(callback).toHaveBeenCalledWith('c');
    expect(callback).toHaveBeenCalledTimes(1);

    // Call the debounced function again
    debouncedFunction('d');

    // Advance time by 199 milliseconds
    jest.advanceTimersByTime(199);

    // The callback should not have been called yet
    expect(callback).toHaveBeenCalledTimes(1);

    // Advance time by 1 more millisecond (total of 200 milliseconds)
    jest.advanceTimersByTime(1);

    // The callback should have been called with the last argument ('d')
    expect(callback).toHaveBeenCalledWith('d');
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('sortArrayByValue', () => {
  const testData = [
    { id: 1, name: 'John', role: 'Admin' },
    { id: 2, name: 'Jane', role: 'User' },
    { id: 3, name: 'Doe', role: 'Admin' },
  ];

  it('should sort the array by matching value at the top', () => {
    const sortedArray = sortArrayByValue(testData, 'role', 'Admin');

    // The first element should have 'Admin' as its role
    expect(sortedArray[0].role).toBe('Admin');

    // The second element should also have 'Admin' as its role
    expect(sortedArray[1].role).toBe('Admin');

    // The last element should have 'User' as its role
    expect(sortedArray[2].role).toBe('User');
  });

  it('should maintain the original order for other cases', () => {
    const sortedArray = sortArrayByValue(testData, 'role', 'User');

    // The first element should have 'User' as its role
    expect(sortedArray[0].role).toBe('User');

    // The second and third elements should have 'Admin' as their role
    expect(sortedArray[1].role).toBe('Admin');
    expect(sortedArray[2].role).toBe('Admin');
  });
});
