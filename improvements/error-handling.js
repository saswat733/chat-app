import { create } from "zustand";

const useErrorStore = create((set) => ({
  errors: [],
  addError: (error) =>
    set((state) => ({
      errors: [
        ...state.errors,
        {
          id: Date.now(),
          message: error.message,
          type: error.type || "error",
          timestamp: new Date(),
        },
      ],
    })),
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    })),
  clearErrors: () => set({ errors: [] }),
}));

// Error boundary component
import React from "react";
import toast from "react-hot-toast";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    toast.error("Something went wrong. Please refresh the page.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { useErrorStore, ErrorBoundary };
