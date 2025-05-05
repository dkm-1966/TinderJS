CREATE TABLE "profile"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "age" INTEGER,
    "info" VARCHAR(255),
    "country" VARCHAR(255),
    "city" VARCHAR(255),
    "user_id" INTEGER
);

CREATE TABLE "interests"(
    "id" SERIAL PRIMARY KEY,
    "interest" VARCHAR(255),
    "category_id" INTEGER
);

CREATE TABLE "user_interest"(
    "profile_id" INTEGER,
    "interest_id" INTEGER
);

CREATE TABLE "match"(
    "id" SERIAL PRIMARY KEY,
    "first_partner" INTEGER NOT NULL,
    "second_partner" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "match" ADD CONSTRAINT "match_first_partner_second_partner_unique" UNIQUE("first_partner", "second_partner");

CREATE TABLE "category"(
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR(255) NOT NULL
);

CREATE TABLE "picture"(
    "id" SERIAL PRIMARY KEY,
    "picture_url" VARCHAR(255),
    "profile_id" INTEGER NOT NULL
);

CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
    );

ALTER TABLE
    "user_interest" ADD CONSTRAINT "user_interest_profile_id_foreign" FOREIGN KEY("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;
ALTER TABLE
    "picture" ADD CONSTRAINT "picture_user_id_foreign" FOREIGN KEY("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE;
ALTER TABLE
    "profile" ADD CONSTRAINT "profile_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE
    "user_interest" ADD CONSTRAINT "user_interest_interest_id_foreign" FOREIGN KEY("interest_id") REFERENCES "interests"("id") ON DELETE CASCADE;
ALTER TABLE
    "interests" ADD CONSTRAINT "interests_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id") ON DELETE CASCADE;
ALTER TABLE
    "match" ADD CONSTRAINT "match_first_partner_foreign" FOREIGN KEY("first_partner") REFERENCES "profile"("id") ON DELETE CASCADE;
ALTER TABLE
    "match" ADD CONSTRAINT "match_second_partner_foreign" FOREIGN KEY("second_partner") REFERENCES "profile"("id") ON DELETE CASCADE;

INSERT INTO category (category) VALUES 
  ('Sports'),
  ('Music'),
  ('Learning');

-- Вставка інтересів (з прив'язкою до категорій через підзапит)
INSERT INTO interests (interest, category_id) VALUES
  -- 🏀 Sports
  ('Football', (SELECT id FROM category WHERE category = 'Sports')),
  ('Basketball', (SELECT id FROM category WHERE category = 'Sports')),
  ('Yoga', (SELECT id FROM category WHERE category = 'Sports')),
  ('Running', (SELECT id FROM category WHERE category = 'Sports')),
  ('Swimming', (SELECT id FROM category WHERE category = 'Sports')),

  -- 🎵 Music
  ('Singing', (SELECT id FROM category WHERE category = 'Music')),
  ('Guitar', (SELECT id FROM category WHERE category = 'Music')),
  ('Piano', (SELECT id FROM category WHERE category = 'Music')),
  ('Drums', (SELECT id FROM category WHERE category = 'Music')),
  ('Music', (SELECT id FROM category WHERE category = 'Music')),

  -- 📚 Learning
  ('Programming', (SELECT id FROM category WHERE category = 'Learning')),
  ('Languages', (SELECT id FROM category WHERE category = 'Learning')),
  ('History', (SELECT id FROM category WHERE category = 'Learning')),
  ('Mathematics', (SELECT id FROM category WHERE category = 'Learning')),
  ('Philosophy', (SELECT id FROM category WHERE category = 'Learning'));

  INSERT INTO match (first_partner, second_partner, status) VALUES (2, 1, 'match');
  INSERT INTO match (first_partner, second_partner, status) VALUES (1, 3, 'match');
  INSERT INTO match (first_partner, second_partner, status) VALUES (4, 3, 'pending');