//=================
// Port
//=================

process.env.PORT = process.env.PORT || 3000;


//================
// Environment
//================

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//================
// Connection string
//================

let connectionString;

if (process.env.NODE_ENV === 'development') {
    connectionString = 'mongodb://localhost:27017/cafe';
} else {
    connectionString = process.env.MONGO_CONNECTION_STRING;
}

process.env.CONNECTION_STRING = connectionString;
