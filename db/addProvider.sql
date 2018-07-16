INSERT INTO providers
    (name, specialty, address, photo, phone, email)
VALUES
    ($1, $2, $3, $4, $5, $6);

SELECT *
FROM providers;