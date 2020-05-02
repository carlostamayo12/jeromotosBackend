export default (error) => {
    //console.log(error)
    var m
    try {
      m = JSON.stringify(error.errors[0].message)
    } catch (e) {
      try {
        m = error.getMessage()
      } catch (er) {
        try {
          m = error.errors[0].message
        } catch (e) {
          try {
            m = error.message
          } catch (el) {
            m = error
          }
        }
  
      }
    }
  
    var e = {
      error: true,
      mensaje: m
    }
  
    return e
  }
  