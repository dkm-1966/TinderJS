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
    "interest" VARCHAR(255) NOT NULL,
    "category_id" INTEGER NOT NULL
);

CREATE TABLE "user_interest"(
    "profile_id" INTEGER NOT NULL,
    "interest_id" INTEGER NOT NULL
);

CREATE TABLE "match"(
    "id" SERIAL PRIMARY KEY,
    "first_partner" INTEGER NOT NULL,
    "second_partner" BIGINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "message" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "match" ADD CONSTRAINT "match_first_partner_second_partner_unique" UNIQUE("first_partner", "second_partner");

CREATE TABLE "category"(
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR(255) NOT NULL
);

CREATE TABLE "picture"(
    "id" SERIAL PRIMARY KEY,
    "picture_url" VARCHAR(255) NOT NULL,
    "profile_id" BIGINT NOT NULL
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