CREATE DATABASE IF NOT EXISTS TrainDB;
USE TrainDB;

CREATE TABLE STATION (
    SID INTEGER PRIMARY KEY,
    SName VARCHAR(30),
    SLocation VARCHAR(50)
);

CREATE TABLE USER (
    UID INTEGER PRIMARY KEY,
    UName VARCHAR(30),
    PhNo BIGINT,
    Email VARCHAR(20)
);

CREATE TABLE TRAIN (
    TID INTEGER PRIMARY KEY,
    SourceSID INTEGER, 
    DestSID INTEGER,
    Capacity INTEGER,
    DTime DATETIME,
    AddedBy INTEGER,
    FOREIGN KEY fk_train_station_sourcesid (SourceSID) REFERENCES STATION(SID),
    FOREIGN KEY fk_train_station_destsid (DestSID) REFERENCES STATION(SID),
    FOREIGN KEY fk_train_user_addedby (AddedBy) REFERENCES USER(UID)
);

CREATE TABLE BOOKING (
    BID INTEGER PRIMARY KEY,
    UID INTEGER,
    TID INTEGER,
    SourceSID INTEGER,
    DestSID INTEGER,
    Price INTEGER,
    BTime DATETIME,
    FOREIGN KEY fk_booking_user_uid (UID) REFERENCES USER(UID),
    FOREIGN KEY fk_booking_train_tid (TID) REFERENCES TRAIN(TID),
    FOREIGN KEY fk_booking_station_sourcesid (SourceSID) REFERENCES STATION(SID),
    FOREIGN KEY fk_booking_station_destsid (DestSID) REFERENCES STATION(SID)
);

CREATE TABLE ROUTE (
    TID INTEGER,
    SourceSID INTEGER,
    DestSID INTEGER,
    Price INTEGER,
    FOREIGN KEY fk_route_train_tid (TID) REFERENCES TRAIN(TID),
    FOREIGN KEY fk_route_station_sourcesid (SourceSID) REFERENCES STATION(SID),
    FOREIGN KEY fk_route_station_destsid (DestSID) REFERENCES STATION(SID)
);
