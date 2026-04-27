import { setToast } from "../../utils/toastSetting";
import { toast } from "react-toastify";

export const handleSubmit = async (obj, fun, dispatch) => {
    try {
        const { id, payload } = obj;
        console.log(payload)

        if (payload.title.length < 2) {
            toast("Назва повинна мати щонайменше 2 літери", { ...setToast });
            return;
        }

        if (payload.price < 0) {
            toast("Не вірно вказана ціна", { ...setToast });
            return;
        }

        if (payload.categoryId === null) {
            toast("Не вибрано категорію", { ...setToast });
            return;
        }

        const formData = new FormData();

        Object.keys(payload).forEach((key) => {
            if (key !== "images") {
                formData.append(key, payload[key]);
            }
        });

        // const keepImages = payload.images
        //     .filter(img => img.image_url)
        //     .map(img => img.image_url);

        // formData.append("keepImages", JSON.stringify(keepImages));

        // payload.images.forEach(img => {
        //     if (img.file) {
        //         formData.append("images", img.file);
        //     }
        // });
        payload.images.forEach(img => {
            if (img.file) {
                formData.append("images", img.file);
            }
        });

        console.log([...formData.entries()]);
        await dispatch(fun({ id, payload: formData })).unwrap();

        toast("Дані оновлено", { ...setToast });

    } catch (error) {
        toast(error, { ...setToast });
    }
};
