CREATE TABLE Locations (
    Id INT PRIMARY KEY,
    Hall VARCHAR(50) NOT NULL,
    Parcel INT NOT NULL,
    Surface INT NOT NULL
);

INSERT INTO Locations (Id, Hall, Parcel, Surface) VALUES (1, 'Hall A', 1, 100);
INSERT INTO Locations (Id, Hall, Parcel, Surface) VALUES (2, 'Hall B', 2, 150);
INSERT INTO Locations (Id, Hall, Parcel, Surface) VALUES (3, 'Hall C', 3, 200);

CREATE TABLE Company (
    Id INT PRIMARY KEY,
    Siret VARCHAR(14) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    LocationId INT,
    FOREIGN KEY (LocationId) REFERENCES Locations(Id)
);

INSERT INTO Company (Id, Siret, Name, LocationId) VALUES (1, '12345678900001', 'Entreprise 1', 1);
INSERT INTO Company (Id, Siret, Name, LocationId) VALUES (2, '12345678900002', 'Entreprise 2', 2);
INSERT INTO Company (Id, Siret, Name, LocationId) VALUES (3, '12345678900003', 'Entreprise 3', 3);

CREATE TABLE Contacts (
    Id INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    CompanyId INT,
    FOREIGN KEY (CompanyId) REFERENCES Company(Id)
);

INSERT INTO Contacts (Id, Name, Phone, CompanyId) VALUES (1, 'Contact 1', '123-456-7890', 1);
INSERT INTO Contacts (Id, Name, Phone, CompanyId) VALUES (2, 'Contact 2', '987-654-3210', 1);
INSERT INTO Contacts (Id, Name, Phone, CompanyId) VALUES (3, 'Contact 3', '456-789-0123', 2);
