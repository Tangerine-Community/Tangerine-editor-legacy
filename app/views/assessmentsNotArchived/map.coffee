(doc) ->

  isRightCollection = doc.collection is "curriculum" or doc.collection is "assessment"
  notArchived       = doc.archived is false or doc.archived is "false"

  emit doc.id, null if isRightCollection and notArchived
