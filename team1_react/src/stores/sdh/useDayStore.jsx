import { create } from 'zustand';

const useDayStore = create(set => ({
  today: new Date(),
  updateDate: date => set({ today: date }),
}));

export default useDayStore;