module.exports = {
  addFamily: (req, res, next) => {
    let db = req.app.get("db");
    const { name, image, dob, themecolor } = req.body;

    db.addFamily([name, image, dob, themecolor])
      .then(family => {
        db.getFamily().then(family => {
          return res.status(200).send(family);
        });
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getFamily: (req, res, next) => {
    let db = req.app.get("db");

    db.getFamily().then(family => {
      return res.status(200).send(family);
    });
  },

  deleteFamily: (req, res, next) => {
    let db = req.app.get("db");
    console.log(req.params.id);
    db.deleteFamily(req.params.id).then(family => {
      db.getFamily().then(family => {
        return res.status(200).send(family);
      });
    });
  },

  addProvider: (req, res, next) => {
    let db = req.app.get("db");
    const { name, specialty, address, city, state, zip } = req.body;

    db.addProvider([name, specialty, address, city, state, zip])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getProviders: (req, res, next) => {
    let db = req.app.get("db");
    // axios
    // .get(
    // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Nadera%20Sweiss&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${
    //   process.env.key
    // }`
    // )
    // .then(function(response) {
    //   console.log("google response:" + response);
    // });
    db.getProviders().then(providers => {
      return res.status(200).send(providers);
    });
  },

  deleteProvider: (req, res, next) => {
    let db = req.app.get("db");

    db.delete_provider(req.params.id).then(providers => {
      return res.status(200).send(providers);
    });
  }
};
