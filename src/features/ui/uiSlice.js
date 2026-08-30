import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarCollapsed: false,
  filters: {
    category: "all",
    status: "all", // all | completed | pending
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
  setCategoryFilter,
  setStatusFilter,
  openAddTaskModal,
  openEditTaskModal,
  closeTaskModal,
} = uiSlice.actions;

export default uiSlice.reducer;
