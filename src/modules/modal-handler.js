export const modalInfo = {
  header: null,
  body: null,
  footer: null,
  state: null,
  hideButton: false
};

export const setModal = (state = 0) => {
  function setModalInfo(par) {
    const keys = Object.keys(modalInfo);
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(par, key))
        modalInfo[key] = par[key];
      else modalInfo[key] = null;
    }
  }
  switch (state) {
    case 0:
      setModalInfo({
        header: "Success!",
        body: "Card added to database",
        footer: null,
        hideButton: false,
        state: state
      });
      break;
    case 1:
      setModalInfo({
        header: "Info",
        body: "Please fill the required fields",
        footer: null,
        hideButton: false,
        state: state
      });
      break;
    case 3:
      setModalInfo({
        header: "Error",
        body: "A problem occoured while connecting to the database",
        footer: null,
        hideButton: false,
        state: state
      });
      break;
    case 10:
      setModalInfo({
        header: "Adding card...",
        body: null,
        footer: null,
        hideButton: true,
        state: state
      });
      break;
    case 11:
      setModalInfo({
        header: "Removing card...",
        body: null,
        footer: null,
        hideButton: true,
        state: state
      });
      break;
    case 12:
      setModalInfo({
        header: "Success!",
        body: "Card removed from database",
        footer: null,
        hideButton: false,
        state: state
      });
      break;
  }
};
