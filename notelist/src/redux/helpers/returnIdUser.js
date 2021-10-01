import store from '../store';

const returnIdUser = () =>{
    const idUser = store.getState().user.info.id;
    return idUser;
}

export default returnIdUser;