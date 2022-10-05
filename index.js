export default data => {
  if (typeof data == 'string') {
    const Data = data.split('\n').map(l => l.trim())
  } else if (data && typeof data == 'object') {

  } else {
    throw "You must pass an object to generate a CNAB file or a string that represents a CNAB file to parse it to JSON"
  }
}
