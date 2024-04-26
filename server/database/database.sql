CREATE TABLE restaurants(
id VARCHAR(12) NOT NULL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
priceRange VARCHAR(5) CHECK (priceRange IN ('$','$$', '$$$','$$$$','$$$$'))
);

CREATE TABLE reviews(
id VARCHAR(12) NOT NULL PRIMARY KEY,
restaurant_id VARCHAR(12) NOT NULL REFERENCES restaurant(id),
review TEXT NOT NULL,
rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
	)
);
