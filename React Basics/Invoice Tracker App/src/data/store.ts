import { AppData } from './types';
import { initialData } from './sampleData';

const STORAGE_KEY = 'invoice_tracker_data';

export const store = {
  /**
   * Retrieves the application data from Local Storage.
   * If no data is found, returns the initial sample data.
   */
  getData(): AppData {
    try {
      const serializedData = localStorage.getItem(STORAGE_KEY);
      if (serializedData) {
        return JSON.parse(serializedData) as AppData;
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
    
    // No data yet, initialize with sample data so the app won't be empty
    this.saveData(initialData);
    return initialData;
  },

  /**
   * Saves the provided application data entirely back to Local Storage.
   */
  saveData(data: AppData): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serializedData);
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  },

  /**
   * Restores the application to the initial sample data state.
   */
  resetToSampleData(): AppData {
    this.saveData(initialData);
    return initialData;
  }
};
