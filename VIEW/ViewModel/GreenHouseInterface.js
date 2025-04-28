class GreenHouseInterface {
  constructor() {
    this.data = null;
    this.isLoading = false;
    this.error = null;
    this.listeners = [];
  }

  addListener(callback) {
    throw new Error("Method addListener() must be implemented.");
  }

  notifyListeners() {
    throw new Error("Method notifyListeners() must be implemented.");
  }

  async fetchData() {
    throw new Error("Method fetchData() must be implemented.");
  }
}

export default GreenhouseViewModelInterface;
