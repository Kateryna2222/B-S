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

export default createFile;