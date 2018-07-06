INSERT INTO users
    (displayname, google_id, google_user_id, email, picture)
VALUES
    ($1, $2, $3, $4, $5);
SELECT *
FROM users
WHERE email = $1;