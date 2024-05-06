CREATE TABLE restaurants(
id VARCHAR(12) NOT NULL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
priceRange VARCHAR(5) CHECK (priceRange IN ('$','$$', '$$$','$$$$','$$$$'))
);



CREATE TABLE reviews (
    id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    restaurant_id VARCHAR(12) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
