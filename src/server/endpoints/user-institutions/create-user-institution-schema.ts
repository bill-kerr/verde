import * as Yup from 'yup';

export const createUserInstitutionSchema = Yup.object({
	publicToken: Yup.string().required(),
}).required();
