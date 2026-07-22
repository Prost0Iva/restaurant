import mongoose from 'mongoose';

interface RawSetting {
    key: string;
    name: string;
    object: string;
    title: string;
    multiple: boolean;
}
const settingSchema = new mongoose.Schema<RawSetting>({
    key: String,
    name: String,
    object: String,
    title: String,
    multiple: Boolean
});

export default mongoose.model<RawSetting>('setting', settingSchema, 'settings');
