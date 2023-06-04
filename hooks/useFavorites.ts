import { create } from "zustand";

interface FavoritesStore {
  favoriteIds: string[];
  setfavoriteIds: (favs: string[]) => void;
}

const useFavorites = create<FavoritesStore>((set) => ({
  favoriteIds: [],
  setfavoriteIds: (favs) => set({ favoriteIds: favs }),
}));

export default useFavorites;
