import axios from "axios";

export default {
  simulation: {
    calculate: (data, callback, error) => {
      axios
        .post(
          "https://contagion-calculator-backend.herokuapp.com/api/simulation/calculate",
          //"/api/simulation/calculate",
          { data }
        )
        .then((res) => {
          callback(res.data);
        })
        .catch((err) => {
          error(err);
        });
    },
  },
};
