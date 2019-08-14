closeModalMessage = () => {
  const { status } = this.state;
  if (status) {
    this.setState({
      ...initialState, change: { isEdit: false, edited: true },
    });
  } else {
    this.setState({
      ...this.state, visible: false, message: '', status: false,
    });
  }
};
