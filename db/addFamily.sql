INSERT INTO family
    (name, image, dob, themecolor)
VALUES
    ($1, $2, $3, $4);

SELECT *
FROM family;