import { z } from 'zod';

const phoneRegex = /^010\d{8}$/;

export type OrderType = z.infer<typeof ordererSchema>;

export const ordererSchema = z.object({
  email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
  phone: z
    .string()
    .min(11, '연락처는 11자리여야 합니다.')
    .max(11, '연락처는 11자리여야 합니다.')
    .refine(
      (value) => phoneRegex.test(value),
      '010으로 시작하는 11자리 숫자를 입력해주세요',
    ),
  name: z
    .string()
    .min(2, { message: '이름은 2글자 이상이어야 합니다.' })
    .max(100, { message: '이름은 100글자 이하이어야 합니다.' }),
  recipient: z
    .string()
    .min(2, { message: '이름은 2글자 이상이어야 합니다.' })
    .max(100, { message: '이름은 100글자 이하이어야 합니다.' }),
  recipientNumber: z
    .string()
    .min(11, '연락처는 11자리여야 합니다.')
    .max(11, '연락처는 11자리여야 합니다.')
    .refine(
      (value) => phoneRegex.test(value),
      '010으로 시작하는 11자리 숫자를 입력해주세요',
    ),
  deliveryMemo: z
    .string()
    .min(2, { message: '2글자 이상이어야 합니다.' })
    .max(100, { message: '100자 이하로 입력해주세요.' }),
  postcode: z.string().min(5, { message: '우편번호는 5자리여야 합니다.' }),
  address: z.string().min(2, { message: '2글자 이상이어야 합니다.' }),
  detailAddress: z.string().min(2, { message: '2글자 이상이어야 합니다.' }),
});
