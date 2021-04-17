export const getLastNumbers = (payload, amountToExtract) => {
  const allData = []

  const extractData = (object) => {
    allData.push(object.data)

    if (object.next) {
      return extractData(object.next)
    }
    return allData
  }

  const extractedData = extractData(payload)
  if (amountToExtract >= extractedData.length) {
    return extractedData
  }

  return extractedData.slice(
    extractedData.length - amountToExtract,
    extractedData.length
  )
}
