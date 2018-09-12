if(process.env.NODE_ENV === 'production'){
    module.exports = { mongoURI: 'mongodb://shahzaib:12345s@ds153552.mlab.com:53552/olx-pk'}
}
else{
    module.exports = { mongoURI: 'mongodb://localhost/olx'}
}