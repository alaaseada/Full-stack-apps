connectToDBMySQL2()
  .then(() => {
    console.log('Successfully connected to the DB...')
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}`)
    })
  })
  .catch((err) => {
    console.log('An error occured while connecting to the db')
  })
