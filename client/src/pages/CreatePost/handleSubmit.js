import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";


export const handleSubmit = async (formValues, fun, dispatch, navigate) => {
    try {

        if(formValues.title < 2){
            toast("Назва повинна мати щонайменше 2 літери", {...setToast})
            return
        }

        if(formValues.price < 0){
            toast("Не вірно вказана ціна", {...setToast})
            return
        }

        if(formValues.categoryId === null){
            toast("Не вибрано категорію", {...setToast})
            return
        }

        await dispatch(fun(formValues)).unwrap();
        toast('Оголошення створено', { ...setToast });
        navigate('/')
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}


