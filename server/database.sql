CREATE TABLE koalas(
"id" SERIAL PRIMARY KEY,
"koalaName" varchar(120),
"age" INTEGER,
"sex" varchar(1),
"readyToTransfer" BOOLEAN,
"notes" text
);


INSERT INTO koalas ("koalaName", "age", "sex", "readyToTransfer", "notes")
VALUES ('Scotty', 4, 'M', true, 'Born in Guatamala'),
('Jean', 5, 'F', true, 'Allergic to lots of lava'),
('Ororo', 7, 'F', false, 'Loves listening to Paula Abdul'),
('Logan', 15, 'M', false, 'Loves the sauna'),
('Charlie', 9, 'M', true, 'Favorite band is Nirvana'),
('Betsy', 4, 'F', true, 'Has a pet iguana');


