UPDATE family
SET 
name = $2,
 image = $3, 
 dob = $4, 
 themecolor = $5, 
 email = $6
WHERE id = $1;

SELECT *
FROM family;