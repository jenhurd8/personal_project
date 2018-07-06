INSERT INTO visits
    (family_id, providers_id, date, details, rx, email)
VALUES
    ($1, $2, $3, $4, $5, $6);

SELECT *
FROM visits;