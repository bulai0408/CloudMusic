const getSongUrl = (id, navigation) => {
  return {
    type: 'GET_SONG_URL',
    id,
    navigation
  }
}

const getSongDetail = (ids, navigation) => {
  return {
    type: 'GET_SONG_DETAIL',
    ids,
    navigation
  }
}

export {
  getSongUrl,
  getSongDetail  
}