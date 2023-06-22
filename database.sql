
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE badges (
  id serial PRIMARY KEY,
  img varchar,
  name varchar
);

CREATE TABLE groups (
  id serial PRIMARY KEY,
  status boolean DEFAULT FALSE,
  badge_id integer REFERENCES badges(id),
  region varchar,
  book_name varchar,
  team_name varchar,
  cover varchar,
  logo varchar,
  cohort integer,
  start_date timestamp,
  end_date timestamp,
  details varchar
);

CREATE TABLE "user" (
  id serial PRIMARY KEY,
  region varchar,
  username varchar,
  password varchar,
  avatar varchar,
  role integer,
  created_at timestamp default NOW()
);

CREATE TABLE whiteboard (
  id serial PRIMARY KEY,
  groups_id integer REFERENCES groups(id),
  notes varchar
);

CREATE TABLE posts (
  id serial PRIMARY KEY,
  title varchar,
  body text,
  user_id integer REFERENCES "user"(id),
  badge_id integer REFERENCES badges(id),
  status integer,
  created_at timestamp default NOW()
);

CREATE TABLE user_groups (
  id serial PRIMARY KEY,
  user_id integer REFERENCES "user"(id),
  reading_group_id integer REFERENCES groups(id),
  role integer
);

CREATE TABLE users_badges (
  id serial PRIMARY KEY,
  user_id integer REFERENCES "user"(id),
  badge_id integer REFERENCES badges(id),
  tier integer,
  date timestamp
);