import store from '../redux/store';

const returnIdUser = () =>{
    const idUser = store.getState().user.info.id;
    return idUser;
}

export default returnIdUser;