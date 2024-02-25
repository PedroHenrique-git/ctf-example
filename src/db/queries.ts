export const USER_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id int primary key auto_increment,
        name varchar(100) not null,
        email varchar(100) not null,
        password varchar(255) not null,
        created_at timestamp NOT NULL DEFAULT NOW()
    );
`;

export const PRODUCT_TABLE = `
    CREATE TABLE IF NOT EXISTS products (
        id int primary key auto_increment,
        name varchar(100) not null,
        price decimal not null,
        description varchar(255) not null,
        created_at timestamp NOT NULL DEFAULT NOW()  
    );
`;
