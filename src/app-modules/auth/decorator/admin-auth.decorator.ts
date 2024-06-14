import { SetMetadata } from '@nestjs/common';

export const AdminAuth = () => SetMetadata('isAdminAuth', true);
