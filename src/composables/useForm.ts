import { ref, reactive } from "vue";
import { AxiosError } from 'axios';

interface UseFormOptions {
    apiFn: (paramFunApi:object) => Promise<void>;
    fieldsForm: object,
    onSuccess: Function,
    dataTransform?: any
}

export default function useForm({
                                    apiFn,
                                    fieldsForm,
                                    onSuccess,
                                    dataTransform = false
                                }:UseFormOptions) {
    const dataForm = reactive(fieldsForm); //входные данные с формы
    const errors = ref<Record<string, string>>({}); //ошибки
    const externalError = ref<string | null>(null); //серьезные ошибки с формы
    const pending = ref(false); // ожидание отправки формы
    const done = ref(false); //форма завершила свою отправку
    async function send(){
        errors.value = {};
        externalError.value = null
        pending.value = true;

        try {
            const paramFunApi = dataTransform ? dataTransform(dataForm) : dataForm;
            const result = await apiFn(paramFunApi);
            done.value = true;
            onSuccess(result);
        }
        catch (e) {
            const error = e as AxiosError;

            if(error.response?.status == 422) {
                let { errorText } = error.response.data as { errorText: Record<string, string> };

                errors.value = errorText;

                for (let [key, value] of Object.entries(errorText)) {
                    errors.value[key]= `${value}`;
                }

            } else {
                externalError.value = 'Some error on server';
            }
        }
        finally {
            pending.value = false;
        }
    }

    return { dataForm, errors, externalError, send, pending, done };
};