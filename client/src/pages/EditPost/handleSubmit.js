import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";


export const handleSubmit = async (obj, fun, dispatch) => {
    try {

        if(obj.payload.title < 2){
            toast("Назва повинна мати щонайменше 2 літери", {...setToast})
            return
        }

        if(obj.payload.price < 0){
            toast("Не вірно вказана ціна", {...setToast})
            return
        }

        if(obj.payload.categoryId === null){
            toast("Не вибрано категорію", {...setToast})
            return
        }

        await dispatch(fun(obj)).unwrap();
        toast('Дані оновлено', { ...setToast });
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}


