import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";


export const handleSubmit = async (formValues, type, fun, dispatch) => {
    try {

        if(formValues.title < 2){
            toast("Назва повинна мати щонайменше 2 літери", {...setToast})
            return
        }

        if(formValues.price < 0){
            toast("Не вірно вказана ціна", {...setToast})
            return
        }

        if(formValues.categoryId < 0){
            toast("Не вибрано категорію", {...setToast})
            return
        }

        await dispatch(fun(formValues)).unwrap();
        if(type === 'create'){
            toast('Оголошення створено', { ...setToast });
        }
        else{
            toast('Дані оновлено', { ...setToast });
        }
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}


