INSERT INTO family
    (name, image, dob, themecolor, email)
VALUES
    ($1, $2, $3, $4, $5);

SELECT *
FROM family;