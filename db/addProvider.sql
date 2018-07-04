INSERT INTO providers
    (name, specialty, address, photo, phone)
VALUES
    ($1, $2, $3, $4, $5);

SELECT *
FROM providers;