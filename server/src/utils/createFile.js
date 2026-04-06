import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createFile = async (img, folder) => {
    const ext = path.extname(img.name);
    const fileName = uuidv4() + ext;
    await img.mv(path.resolve(__dirname, '..', `static/${folder}`, fileName));
    return fileName;
}

export const deleteFile = async (folder, fileName) => {
    try {
        const filePath = path.resolve(__dirname, '..', `static/${folder}`, fileName);
        await fs.unlink(filePath); // видаляємо файл
        console.log(`Файл ${fileName} успішно видалено`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn(`Файл ${fileName} не знайдено`);
        } else {
            throw err; // інші помилки кидаємо далі
        }
    }
};

export default createFile;