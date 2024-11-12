import Joi from "joi";

import { errorMessage, paginationObj } from "./index.validation";
import {
  HIGHER_SECONDARY_CLASS,
  HIGHER_SECONDARY_CLASS_SUBJECTS,
  INSTITUTES,
  PRE_PRIMARY_CLASS,
  PRE_PRIMARY_CLASS_SUBJECTS,
  PRIMARY_CLASS,
  PRIMARY_CLASS_SUBJECTS,
  SCHOOL_CLASS_CATEGORY,
  SCHOOL_EDUCATION_BOARD,
  SCHOOL_MEDIUM,
  SECONDARY_CLASS,
  SECONDARY_CLASS_SUBJECTS
} from "../../utils/constants";

export const userCreate = Joi.object({
  institute: Joi.string()
    .trim()
    .valid(...Object.values(INSTITUTES))
    .required()
    .messages(errorMessage("Institute")),
  school_config: Joi.object().when("institute", {
    is: INSTITUTES.SCHOOL,
    then: Joi.object({
      education_board: Joi.string()
        .trim()
        .valid(...Object.values(SCHOOL_EDUCATION_BOARD))
        .required()
        .messages(errorMessage("Education Board")),
      medium: Joi.string()
        .trim()
        .valid(...Object.values(SCHOOL_MEDIUM))
        .required()
        .messages(errorMessage("Medium")),
      class_category: Joi.string()
        .trim()
        .valid(...Object.values(SCHOOL_CLASS_CATEGORY))
        .required()
        .messages(errorMessage("Class Category")),
      class_name: Joi.string()
        .trim()
        .when("class_category", {
          is: SCHOOL_CLASS_CATEGORY.PRE_PRIMARY,
          then: Joi.valid(...Object.values(PRE_PRIMARY_CLASS))
            .required()
            .messages(errorMessage("Class Name")),
          otherwise: Joi.when("class_category", {
            is: SCHOOL_CLASS_CATEGORY.PRIMARY,
            then: Joi.valid(...Object.values(PRIMARY_CLASS))
              .required()
              .messages(errorMessage("Class Name")),
            otherwise: Joi.when("class_category", {
              is: SCHOOL_CLASS_CATEGORY.SECONDARY,
              then: Joi.valid(...Object.values(SECONDARY_CLASS))
                .required()
                .messages(errorMessage("Class Name")),
              otherwise: Joi.when("class_category", {
                is: SCHOOL_CLASS_CATEGORY.HIGHER_SECONDARY,
                then: Joi.valid(...Object.values(HIGHER_SECONDARY_CLASS))
                  .required()
                  .messages(errorMessage("Class Name")),
                otherwise: Joi.forbidden().messages(errorMessage("Class Name"))
              })
            })
          })
        }),
      class_subjects: Joi.array()
        .items(Joi.string().trim())
        .when("class_category", {
          is: SCHOOL_CLASS_CATEGORY.PRE_PRIMARY,
          then: Joi.array()
            .items(Joi.valid(...Object.values(PRE_PRIMARY_CLASS_SUBJECTS)))
            .required()
            .messages(errorMessage("Class Subjects")),
          otherwise: Joi.when("class_category", {
            is: SCHOOL_CLASS_CATEGORY.PRIMARY,
            then: Joi.array()
              .items(Joi.valid(...Object.values(PRIMARY_CLASS_SUBJECTS)))
              .required()
              .messages(errorMessage("Class Subjects")),
            otherwise: Joi.when("class_category", {
              is: SCHOOL_CLASS_CATEGORY.SECONDARY,
              then: Joi.array()
                .items(Joi.valid(...Object.values(SECONDARY_CLASS_SUBJECTS)))
                .required()
                .messages(errorMessage("Class Subjects")),
              otherwise: Joi.when("class_category", {
                is: SCHOOL_CLASS_CATEGORY.HIGHER_SECONDARY,
                then: Joi.array()
                  .items(Joi.valid(...Object.values(HIGHER_SECONDARY_CLASS_SUBJECTS)))
                  .required()
                  .messages(errorMessage("Class Subjects")),
                otherwise: Joi.forbidden().messages(errorMessage("Class Subjects"))
              })
            })
          })
        })
    })
      .required()
      .messages(errorMessage("Education Board")),
    otherwise: Joi.valid(null).optional().messages(errorMessage("Education Board"))
  })
});

// school_config: Joi.string()
//     .trim()
//     .when("institute", {
//       is: INSTITUTES.SCHOOL,
//       then: Joi.object()
//         .keys({
//           school_config: Joi.object().keys({
//             education_board: Joi.string()
//               .trim()
//               .valid(...Object.values(SCHOOL_EDUCATION_BOARD))
//               .required()
//               .messages(errorMessage("Education Board"))
//           })
//         })
//         .required()
//         .messages(errorMessage("Education Board")),
//       otherwise: Joi.valid(null).optional().messages(errorMessage("Education Board"))
//     })
