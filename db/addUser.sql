INSERT INTO users
    (displayname, google_id, google_user_id, email, picture, email_verified)
VALUES
    ($1, $2, $3, $4, $5, $6);
SELECT *
FROM users
WHERE email = $1;