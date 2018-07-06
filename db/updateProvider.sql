UPDATE providers
SET 
name = $2,
 specialty = $3, 
 address = $4, 
 photo = $5, 
 phone = $6
WHERE id = $1;

SELECT *
FROM providers;