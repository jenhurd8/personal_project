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
    //console.log(req.params.id);
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

    db.getProviders().then(providers => {
      return res.status(200).send(providers);
    });
  },

  deleteProvider: (req, res, next) => {
    let db = req.app.get("db");

    db.deleteProvider(req.params.id).then(providers => {
      db.getProviders().then(providers => {
        return res.status(200).send(providers);
      });
    });
  }
};
