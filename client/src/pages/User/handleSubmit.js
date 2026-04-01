import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/scrollToTop";

const phoneRegex = /^\+\d{1,4}\d{6,12}$/;

export const handleSubmit = async (formValues, fun, dispatch) => {
    try {

        if(!phoneRegex.test(formValues.phoneNumber)){
            toast('Невірний формат телефону', {...setToast})
            return
        }

        if(formValues.oldPassword && formValues.newPassword.length < 8){
            toast('Пароль повинен містити не менше 8 символів', {...setToast})
            return
        }

        if(formValues.username < 2){
            toast("Ім'я повинно мати щонайменше 2 літери", {...setToast})
            return
        }

        await dispatch(fun(formValues)).unwrap();
        toast('Дані оновлено', { ...setToast });
        scrollToTop();
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}


