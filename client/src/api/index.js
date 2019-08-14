import axios from 'axios';

const getHotDogList = () => axios.get('/hot-dogs')
  .then(({ data }) => data)
  .catch(() => []);


const saveImage = ({ img }) => {
  const formData = new FormData();
  formData.append('image', img, img.name);

  return fetch('/image', {
    method: 'POST',
    body: formData,
  })
    .then(result => result.json())
    .then(({ nameOfImg }) => nameOfImg)
    .catch(() => 'no-photo.png');
};


const addNewHotDog = ({ name, price, img }) => axios.post('/hot-dogs', { name, price, img })
  .then(({ data }) => data)
  .catch(({ response: { data } }) => data);


// eslint-disable-next-line object-curly-newline
const editHotDogById = ({ id, name, price, img }) => axios.patch('/hot-dogs', { id, name, price, img })
  .then(({ data }) => data)
  .catch(({ response: { data } }) => data);


const deleteHotDogById = id => axios.delete(`/hot-dogs?id=${id}`)
  .then(({ data }) => data)
  .catch(() => false);


export {
  getHotDogList,
  saveImage,
  addNewHotDog,
  editHotDogById,
  deleteHotDogById,
};
