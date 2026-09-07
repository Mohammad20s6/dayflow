import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarCollapsed: false,
  activeView: "today", // today | all | categories | settings
  searchQuery: "",
  filters: {
    category: "all",
    status: "all",
  },
  modal: {
    addTaskOpen: false,
    editingTaskId: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setActiveView(state, action) {
      state.activeView = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCategoryFilter(state, action) {
      state.filters.category = action.payload;
    },
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    openAddTaskModal(state) {
      state.modal.addTaskOpen = true;
      state.modal.editingTaskId = null;
    },
    openEditTaskModal(state, action) {
      state.modal.addTaskOpen = true;
      state.modal.editingTaskId = action.payload;
    },
    closeTaskModal(state) {
      state.modal.addTaskOpen = false;
      state.modal.editingTaskId = null;
    },
  },
});

export const {
  toggleSidebar,
  setActiveView,
  setSearchQuery,
  setCategoryFilter,
  setStatusFilter,
  openAddTaskModal,
  openEditTaskModal,
  closeTaskModal,
} = uiSlice.actions;

export default uiSlice.reducer;
