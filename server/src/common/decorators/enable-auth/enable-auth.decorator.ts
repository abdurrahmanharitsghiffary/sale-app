import { SetMetadata } from '@nestjs/common';

export const EnableAuthToken = Symbol('enable-auth');

export const EnableAuth = () => SetMetadata(EnableAuthToken, true);
