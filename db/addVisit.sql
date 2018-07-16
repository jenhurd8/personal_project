INSERT INTO visits
    (family_id, providers_id, date, details, rx, email, balance)
VALUES
    ($1, $2, $3, $4, $5, $6, $7);

SELECT *
FROM visits;