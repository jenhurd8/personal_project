const axios = require("axios");

module.exports = {
  addFamily: (req, res, next) => {
    let db = req.app.get("db");
    const { name, image, dob, themecolor, email } = req.body;

    db.addFamily([name, image, dob, themecolor, email])
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
    db.deleteFamily(req.params.id).then(family => {
      db.getFamily().then(family => {
        return res.status(200).send(family);
      });
    });
  },

  updateFamily: (req, res, next) => {
    let db = req.app.get("db");
    let { name, image, dob, themecolor, email } = req.body;
    db.family
      .update(
        {
          id: req.params.id
        },
        {
          name,
          image,
          dob,
          themecolor,
          email
        }
      )
      .then(() => {
        db.getFamily().then(family => {
          return res.status(200).send(family);
        });
      });
  },

  updateFamilyName: (req, res, next) => {
    let db = req.app.get("db");
    let { name } = req.body;
    db.family
      .update(
        {
          id: req.params.id
        },
        {
          name
        }
      )
      .then(() => {
        db.getFamily().then(family => {
          return res.status(200).send(family);
        });
      });
  },

  updateFamilyImage: (req, res, next) => {
    let db = req.app.get("db");
    let { image } = req.body;
    db.family
      .update(
        {
          id: req.params.id
        },
        {
          image
        }
      )
      .then(() => {
        db.getFamily().then(family => {
          return res.status(200).send(family);
        });
      });
  },

  updateFamilyDob: (req, res, next) => {
    let db = req.app.get("db");
    let { dob } = req.body;
    db.family
      .update(
        {
          id: req.params.id
        },
        {
          dob
        }
      )
      .then(() => {
        db.getFamily().then(family => {
          return res.status(200).send(family);
        });
      });
  },

  updateFamilyColor: (req, res, next) => {
    let db = req.app.get("db");
    let { color } = req.body;
    db.family
      .update(
        {
          id: req.params.id
        },
        {
          themecolor: color
        }
      )
      .then(() => {
        db.getFamily().then(family => {
          return res.status(200).send(family);
        });
      });
  },

  addProvider: (req, res, next) => {
    //console.log(req.body);
    let db = req.app.get("db");
    const { name, specialty, address, photo, phone, email } = req.body;

    db.addProvider([name, specialty, address, photo, phone, email])
      .then(providers => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      })
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
    console.log(req.body);
    let db = req.app.get("db");
    let { name, specialty, address, photo, phone, email } = req.body;
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
          phone,
          email
        }
      )
      .then(() => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      });
  },

  updateProviderName: (req, res, next) => {
    let db = req.app.get("db");
    let { name } = req.body;
    db.providers
      .update(
        {
          id: req.params.id
        },
        {
          name
        }
      )
      .then(() => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      });
  },

  updateProviderPracticeName: (req, res, next) => {
    let db = req.app.get("db");
    let { specialty } = req.body;
    db.providers
      .update(
        {
          id: req.params.id
        },
        {
          specialty
        }
      )
      .then(() => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      });
  },

  updateProviderAddress: (req, res, next) => {
    let db = req.app.get("db");
    let { address } = req.body;
    db.providers
      .update(
        {
          id: req.params.id
        },
        {
          address
        }
      )
      .then(() => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      });
  },

  updateProviderPhoto: (req, res, next) => {
    let db = req.app.get("db");
    let { photo } = req.body;
    db.providers
      .update(
        {
          id: req.params.id
        },
        {
          photo
        }
      )
      .then(() => {
        db.getProviders().then(providers => {
          return res.status(200).send(providers);
        });
      });
  },

  updateProviderPhone: (req, res, next) => {
    let db = req.app.get("db");
    let { phone } = req.body;
    db.providers
      .update(
        {
          id: req.params.id
        },
        {
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
    const {
      family_id,
      providers_id,
      date,
      details,
      rx,
      email,
      balance
    } = req.body;
    db.addVisit([family_id, providers_id, date, details, rx, email, balance])
      .then(visits => {
        db.getVisits().then(visits => {
          return res.status(200).send(visits);
        });
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  updateVisitDate: (req, res, next) => {
    let db = req.app.get("db");
    let { date } = req.body;
    db.visits
      .update(
        {
          id: req.params.id
        },
        {
          date
        }
      )
      .then(() => {
        db.getVisits().then(visits => {
          return res.status(200).send(visits);
        });
      });
  },
  updateVisitDetails: (req, res, next) => {
    let db = req.app.get("db");
    let { details } = req.body;
    db.visits
      .update(
        {
          id: req.params.id
        },
        {
          details
        }
      )
      .then(() => {
        db.getVisits().then(visits => {
          return res.status(200).send(visits);
        });
      });
  },
  updateVisitRx: (req, res, next) => {
    let db = req.app.get("db");
    let { rx } = req.body;
    db.visits
      .update(
        {
          id: req.params.id
        },
        {
          rx
        }
      )
      .then(() => {
        db.getVisits().then(visits => {
          return res.status(200).send(visits);
        });
      });
  },

  updateVisitBalance: (req, res, next) => {
    let db = req.app.get("db");
    let { balance } = req.body;
    db.visits
      .update(
        {
          id: req.params.id
        },
        {
          balance
        }
      )
      .then(() => {
        db.getVisits().then(visits => {
          return res.status(200).send(visits);
        });
      });
  },

  searchGoogle: (req, res, next) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${completeSearchString}&inputtype=textquery&fields=photos,place_id,icon,photos,plus_code,reference,formatted_address,name,rating,opening_hours,geometry&key=${
          process.env.REACT_APP_api_key
        }`
      )
      .then(function(res) {
        console.log(res);
      });
  }
};
