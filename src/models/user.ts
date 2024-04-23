import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

interface UserDocumentInterface extends Document {
  username_: string,
  mail_: string,
}

const UserSchema = new Schema<UserDocumentInterface>({
  username_: {
    type: String,
    required: true,
    unique: true,
  },
  mail_: {
    type: String,
    validate: (result : string) => validator.isEmail(result)  
  },
});

export const userModel = model<UserDocumentInterface>('User', UserSchema);