SELECT *,
    v.id as VisitId,
    v.email as VisitEmail,
    p.id as ProvidersId,
    p.name as ProvidersName,
    p.email as ProvidersEmail,
    f.id as FamilyId,
    f.name as FamilyName,
    f.email as FamilyEmail
FROM visits v
    JOIN family f on v.family_id = f.id
    JOIN providers p on v.providers_id = p.id;

   

   