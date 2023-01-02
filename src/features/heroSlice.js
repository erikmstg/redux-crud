import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// get hero
export const getHeros = createAsyncThunk("heros/getHeros", async () => {
  const response = await axios.get("http://localhost:5005/heros");
  return response.data;
});

// create
export const createHero = createAsyncThunk(
  "heros/createHero",
  async ({ heroName, role }) => {
    const response = await axios.post("http://localhost:5005/heros", {
      heroName,
      role,
    });
    return response.data;
  }
);

// delete
export const deleteHero = createAsyncThunk("heros/deleteHero", async (id) => {
  await axios.delete(`http://localhost:5005/heros/${id}`);
  return id;
});

// update
export const editHero = createAsyncThunk(
  "heros/editHero",
  async ({ id, heroName, role }) => {
    const response = await axios.patch(`http://localhost:5005/heros/${id}`, {
      heroName,
      role,
    });
    return response.data;
  }
);

const heroEntity = createEntityAdapter({
  selectId: (hero) => hero.id,
});

const heroSlice = createSlice({
  name: "hero",
  initialState: heroEntity.getInitialState(),
  extraReducers: (builder) => {
    // dari function getHeros diatas
    // urutannya: (heros/getHeros/pending) => (heros/getHeros/fulfilled) => (heros/getHeros/rejected)
    builder.addCase(getHeros.fulfilled, (state, action) => {
      // parsing state nya, lalu ambil datanya dari action.payload
      heroEntity.setAll(state, action.payload);
    });
    builder.addCase(createHero.fulfilled, (state, action) => {
      heroEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteHero.fulfilled, (state, action) => {
      heroEntity.removeOne(state, action.payload);
    });
    builder.addCase(editHero.fulfilled, (state, action) => {
      heroEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
  },
});

export const heroSelectors = heroEntity.getSelectors((state) => state.hero);
export default heroSlice.reducer;
