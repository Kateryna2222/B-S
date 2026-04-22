import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";


export const handleSubmit = async (formValues, images, fun, dispatch, navigate) => {
    try {

        if(formValues.title.length < 2){
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


        const formData = new FormData();

        Object.keys(formValues).forEach((key) => {
            if (key !== "images") {
                formData.append(key, formValues[key]);
            }
        });

        images.forEach((img) => {
            formData.append("images", img);
        });


        await dispatch(fun(formData)).unwrap();
        toast('Оголошення створено', { ...setToast });
        navigate('/')
    } 
    catch (error) {
        toast(error, { ...setToast });
    }
}


