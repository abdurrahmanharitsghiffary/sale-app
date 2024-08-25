import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { GlobalFilter } from './filters/global/global.filter';
import { AuthorizationGuard } from './guards/authorization/authorization.guard';
import { ResponseMappingInterceptor } from './interceptors/response-mapping/response-mapping.interceptor';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [
    { provide: APP_FILTER, useClass: GlobalFilter },
    { provide: APP_GUARD, useClass: AuthorizationGuard },
    { provide: APP_INTERCEPTOR, useClass: ResponseMappingInterceptor },
    PrismaService,
  ],
  exports: [PrismaService],
})
export class CommonModule {}
