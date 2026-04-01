import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/scrollToTop";
import { register } from "../../store/user/authFunctions";

const phoneRegex = /^\+\d{1,4}\d{6,12}$/;

export const handleSubmit = async (formValues, type, fun, dispatch, navigate) => {
    try {

        if(type === 'registration'){

            if(!formValues.username){
                toast('Введіть ім\'я', {...setToast})
                return
            }

            if(!formValues.phoneNumber){
                toast('Введіть номер телефону', {...setToast})
                return
            }

            if(!phoneRegex.test(formValues.phoneNumber)){
                toast('Невірний формат телефону', {...setToast})
                return
            }

        }

        if(!formValues.email){
            toast('Введіть електронну пошту', {...setToast})
            return
        }
        if(formValues.password.length < 8){
            toast('Пароль повинен містити не менше 8 символів', {...setToast})
            return
        }

        await dispatch(fun(formValues)).unwrap();
        if(type === 'registration'){
            navigate('/auth/registration/submit')
        }
        if(type === 'login'){
            toast(
                'Раді Вас бачити!', { ...setToast });
            navigate('/');
        }
        scrollToTop();
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}

export const handleRegistration = async (formValues, fun, dispatch, navigate) => {
    try {

        if(!formValues.username){
                toast('Введіть ім\'я', {...setToast})
                return
            }

        if(!formValues.phoneNumber){
            toast('Введіть номер телефону', {...setToast})
            return
        }

        if(!phoneRegex.test(formValues.phoneNumber)){
            toast('Невірний формат телефону', {...setToast})
            return
        }

        if(!formValues.email){
            toast('Введіть електронну пошту', {...setToast})
            return
        }
        if(formValues.password.length < 8){
            toast('Пароль повинен містити не менше 8 символів', {...setToast})
            return
        }

        await dispatch(fun(formValues)).unwrap();
        toast('Лист активації надіслано на Вашу пошту!', { ...setToast });
        
        toast('Ласкаво просимо!', { ...setToast });
        navigate('/');
        scrollToTop();
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}

export const handleSubmitRecover = async (formValues, activationLink, fun, dispatch, navigate) => {
    try {

        if(formValues.password.length < 8){
            toast('Пароль повинен містити не менше 8 символів', {...setToast})
            return
        }
        if(formValues.passwordRepeat !== formValues.password){
            toast('Паролі не співпадають', {...setToast})
            return
        }

        await dispatch(fun({activationLink, password: formValues.password})).unwrap();
        toast(
            'Пароль змінено!', 
            { ...setToast });
        navigate('/auth/login');
        scrollToTop();
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}

export const sendMail = async (data, fun, dispatch) => {
    try {
        await dispatch(fun({email: data.email})).unwrap();
        toast('Підтвердження надіслано на Вашу пошту!', { ...setToast });
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}