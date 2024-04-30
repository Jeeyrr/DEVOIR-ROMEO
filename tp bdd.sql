-- Q1

SELECT NOMPILOTE, ADRESSE
from PILOTE;

-- Q2

SELECT DISTINCT VILLEDEP
FROM VOL;

-- Q3 

SELECT NUMVOL, VILLEDEP, VILLEARR, HEUREDEP, HEUREARR
from VOL
where VILLEDEP = 'Paris' AND HEUREDEP BETWEEN '14:00' AND '16:00';

-- Q4

SELECT *
from AVION
where NOMAVION LIKE 'Airbus%';

-- Q5

SELECT *
from PILOTE
WHERE NOMPILOTE LIKE '_i%';

-- Q6

SELECT *
from AVION
where CAPACITE BETWEEN 200 AND 300;


-- Q7

SELECT NUMAVION, NOMAVION, LOCALISATION
FROM AVION
WHERE LOCALISATION <> 'Nice' AND CAPACITE > 200
ORDER BY NUMAVION DESC;


-- Q8

SELECT DISTINCT P.NOMPILOTE
from PILOTE P
join VOL V ON P.NUMPILOTE = V.NUMPILOTE
where V.VILLEDEP = 'Paris';


-- Q9

SELECT DISTINCT P.NOMPILOTE
from PILOTE P
JOIN AVION A ON P.ADRESSE = A.LOCALISATION
where A.NOMAVION LIKE 'Airbus%';

-- Q10

SELECT DISTINCT P.NOMPILOTE
from PILOTE P
JOIN VOL V1 ON P.NUMPILOTE = V1.NUMPILOTE
join VOL V2 ON V1.NUMAVION = V2.NUMAVION
WHERE V2.NUMPILOTE = 2;


-- Q11

SELECT A.NUMAVION, A.NOMAVION
from AVION A
join VOL V ON A.LOCALISATION = V.VILLEDEP
where A.CAPACITE BETWEEN 200 AND 300 AND V.NUMVOL = 'USA050';


-- Q12

SELECT *
FROM AVION
WHERE CAPACITE > ALL (SELECT CAPACITE FROM AVION WHERE LOCALISATION = 'Nice');


-- Q13

SELECT *
FROM AVION
WHERE CAPACITE > ANY (SELECT CAPACITE FROM AVION WHERE LOCALISATION = 'Nice');



-- PARTIE 2 



-- Q17

SELECT NUMAVION, NOMAVION
FROM AVION
WHERE CAPACITE * 1.1 > 250;





