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
    console.log(req.body);
    let db = req.app.get("db");
    const { name, specialty, address, photo, phone } = req.body;

    db.addProvider([name, specialty, address, photo, phone])
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
  },

  updateProvider: (req, res, next) => {
    let db = req.app.get("db");
    let { name, specialty, address, photo, phone } = req.body;
    db.providers
      .update(
        {
          id: req.params.id
        },
        {
          name,
          specialty,
          address,
          photo,
          phone
        }
      )
      .then(() => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      });
  },

  getVisits: (req, res, next) => {
    let db = req.app.get("db");

    db.getVisits().then(visits => {
      return res.status(200).send(visits);
    });
  },

  deleteVisit: (req, res, next) => {
    let db = req.app.get("db");

    db.deleteVisit(req.params.id).then(visits => {
      db.getVisits().then(visits => {
        return res.status(200).send(visits);
      });
    });
  },

  addVisit: (req, res, next) => {
    let db = req.app.get("db");
    const { family_id, providers_id, date, details, rx, email } = req.body;

    db.addVisit([family_id, providers_id, date, details, rx, email])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  }
};
