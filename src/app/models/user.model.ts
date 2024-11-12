import { Model, model, ObjectId, Schema } from "mongoose";
import {
  HIGHER_SECONDARY_CLASS,
  HIGHER_SECONDARY_CLASS_SUBJECTS,
  INSTITUTES,
  PRE_PRIMARY_CLASS,
  PRE_PRIMARY_CLASS_SUBJECTS,
  PRIMARY_CLASS,
  SCHOOL_CLASS_CATEGORY,
  SCHOOL_EDUCATION_BOARD,
  SCHOOL_MEDIUM,
  SECONDARY_CLASS,
  SECONDARY_CLASS_SUBJECTS
} from "../../utils/constants";

type schoolConfig = {
  education_board: string;
  medium: string;
  class_category: string;
  class_name: string;
  class_subjects: string[];
};

export type userDocument = {
  _id: ObjectId;
  institute: string;
  school_config: schoolConfig;
};

const schema = new Schema<userDocument>(
  {
    institute: {
      type: String,
      enum: Object.values(INSTITUTES),
      required: true
    },
    school_config: {
      education_board: {
        type: String,
        required: true,
        enum: Object.values(SCHOOL_EDUCATION_BOARD)
      },
      medium: {
        type: String,
        required: true,
        enum: Object.values(SCHOOL_MEDIUM)
      },
      class_category: {
        type: String,
        required: true,
        enum: Object.values(SCHOOL_CLASS_CATEGORY)
      },
      class_name: {
        type: String,
        required: true,
        enum: [
          ...Object.values(PRE_PRIMARY_CLASS),
          ...Object.values(PRIMARY_CLASS),
          ...Object.values(SECONDARY_CLASS),
          ...Object.values(HIGHER_SECONDARY_CLASS)
        ]
      },
      class_subjects: {
        type: [String],
        required: true,
        enum: [
          ...Object.values(PRE_PRIMARY_CLASS_SUBJECTS),
          ...Object.values(PRE_PRIMARY_CLASS_SUBJECTS),
          ...Object.values(SECONDARY_CLASS_SUBJECTS),
          ...Object.values(HIGHER_SECONDARY_CLASS_SUBJECTS)
        ]
      }
    }
  },
  { timestamps: true }
);

const USERS: Model<userDocument> = model<userDocument>("users", schema, "users");
export default USERS;
