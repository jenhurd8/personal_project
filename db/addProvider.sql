INSERT INTO providers
    (name, specialty, address, city, state, zip)
VALUES
    ($1, $2, $3, $4, $5, $6);

SELECT *
FROM providers;